import {OptionsWithUrl} from "request";
import {ginConfig, GinPoolConfig} from "./../config";
import {Lazy, promiseSetTimeout} from "./../util";
import {GinUrlOptions, RequestStrategy} from "./index";

const Queue = require("promise-queue") as Queue;

const TICK = 33;


interface Queue {
  new (maxConcurrent: number, maxQueued?: number): Queue;

  add<T>(generator: () => Promise<T>): Promise<T>;

  getQueueLength(): number;

  getPendingLength(): number;
}


export type GinPoolQueue = GinPoolConfig & { queue: QueuePool };

let pools: Array<GinPoolQueue>;

export interface ActivePool {
  id: number;

  uri: GinUrlOptions;
  item?: Lazy<Promise<any>>;
  isActive: boolean;
}

export type HistoryPool =
  ActivePool
  & { resolved?: Date, started?: Date, created: Date, failed?: boolean, error?: any };

export interface QueuePool {
  queue(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any>;

  // history: HistoryPool[];
}


export function request(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any> {
  let pool: GinPoolQueue;

  if (!ginConfig.config.pooling || !(pool = getPool(uri))) {
    return strategy.request(uri);
  }

  return pool.queue.queue(uri, strategy);
}


export function getPool(uri: GinUrlOptions): GinPoolQueue {
  pools = pools || buildPool();

  const url = isOptionsWithUrl(uri)
    ? uri.url.toString()
    : uri;

  return pools.find(x => !!url.match(x.match));
}


function isOptionsWithUrl(uri: GinUrlOptions): uri is OptionsWithUrl {
  return (<OptionsWithUrl>uri).url !== undefined;
}

export function rebuildPool() {
  pools = buildPool();
}


function buildPool(): Array<GinPoolQueue> {
  const {pooling} = ginConfig.config;

  const pools: Array<GinPoolQueue> = [];

  for (let p in pooling) {
    const pool: GinPoolConfig = pooling[p];

    let queue: QueuePool;

    if (pool.requestInterval) {
      queue = new IntervalPool(pool);
    }
    else {
      if (pool.simultaneousRequests) {
        queue = new ConcurrentQueue(pool);
      }
      else {
        throw new Error("unknown pool type");
      }
    }

    pools.push({...pool, queue});
  }

  return pools;
}

//
// export class IntervalPool implements QueuePool {
//   private _currId: number = 0;
//
//   private _active: ActivePool;
//   // private _history: {[id: string]: HistoryPool} = {};
//   private _history = new Map<number, HistoryPool>();
//
//   get history(): HistoryPool[] {
//     return Array.from(this._history.values());
//   } // copy list
//
//
//   get isActive(): boolean {
//     return !!this._active;
//   }
//
//
//   private set active(value: ActivePool) {
//     // const h = this._history[this._active.id];
//     // h.resolved = true;
//     this._active = value;
//   }
//
//
//   constructor(private _config: GinPoolConfig) {
//   }
//
//
//   queue(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any> {
//     let id = this.getNextId();
//     const last = this._history.get(id - 1);
//     const history: HistoryPool = {
//       id,
//       uri,
//       isActive: true,
//       created: new Date(),
//     };
//     this._history.set(id, history);
//
//     let lazy = new Lazy(async () => {
//       try {
//         history.started = new Date();
//         return await strategy.request(uri);
//       }
//       finally {
//         history.resolved = new Date();
//       }
//     });
//
//     if (last) {
//       lazy = history.item = this.waitForLast(last, lazy);
//     }
//
//     return this.execItem(id, lazy);
//   }
//
//   private async execItem(id: number, lazy: Lazy<Promise<any>>) {
//     const h = this._history.get(id);
//
//     try {
//       this.active = {
//         id,
//         uri: h.uri,
//         isActive: true,
//       };
//       h.item = lazy;
//       return await lazy.value.catch(x => {
//         throw h.error = x;
//       });
//     }
//     finally {
//       h.failed = true;
//       h.isActive = false;
//       this.active = null;
//     }
//   }
//
//   private waitForLast(last: HistoryPool, lazy: Lazy<Promise<any>>): Lazy<Promise<any>> {
//     const {requestInterval} = this._config;
//     return new Lazy(async () => {
//       while (last.isActive) {
//         await last.item.value // just wait until the last finish or fails, if it fails we should ignore the exception
//           .catch((e) => e);
//       }
//       const dt = last.resolved;
//       const passedTime = Date.now() - dt.getTime();
//
//       const missing = requestInterval - passedTime;
//
//       if (missing > 0) {
//         await promiseSetTimeout(missing);
//       }
//       return await lazy.value;
//     });
//   }
//
//   private getNextId() {
//     return this._currId++;
//   }
// }


export class ConcurrentQueue implements QueuePool {
  private _currId: number = 0;

  private _history = new Map<number, HistoryPool>();
  get history(): HistoryPool[] {
    return Array.from(this._history.values());
  } // copy list

  private readonly _queue: Queue;


  constructor(private _config: GinPoolConfig) {
    this._queue = new Queue(_config.simultaneousRequests);
  }


  async queue(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any> {

    if (this._queue.getQueueLength() > this._config.maxQueueSize) {

      while (this._queue.getQueueLength() < this._config.safeQueueSize) {
        await promiseSetTimeout(TICK);
      }
    }


    let lazy = new Lazy(() => strategy.request(uri));

    return this._queue.add(() => lazy.value);
  }


  // async exec(lazy: Lazy<Promise<any>>, history: HistoryPool) {
  //   try {
  //     history.item = lazy;
  //     return await lazy.value.catch(x => {
  //       throw history.error = x;
  //     });
  //   }
  //   finally {
  //     history.failed = true;
  //     history.isActive = false;
  //   }
  // }


  private getNextId() {
    return this._currId++;
  }
}


export class IntervalLazy<T extends Promise<any>> extends Lazy<T> {
  resolved?: Date;
  started?: Date;
  created: Date;
  failed?: boolean;
  error?: any;


  async append(lazy: Lazy<T>): Promise<IntervalLazy<T>> {
    let pValue: Promise<T> = null;

    while (!this.resolved) {
      const w = (this.created.getMilliseconds() + this._requestInterval) - Date.now();

      if (w > 0) {
        await promiseSetTimeout(w);
      }
      else {
        pValue = this.value;
        await pValue;
      }
    }

    const w = (this.resolved.getMilliseconds() + this._requestInterval) - Date.now();

    if (w > 0) {
      await promiseSetTimeout(w);
    }

    return;
  }

  // appendNew(func : ()=>T){
  //   return new IntervalLazy(async ()=>{
  //
  //     while(thi)
  //     if(!this.started){
  //
  //     }
  //
  //
  //
  //
  //
  //   });
  // }


  constructor(_func: () => T, private _requestInterval: number) {
    super(() => {
      this.started = new Date();
      try {
        const result = _func();

        if (result instanceof Promise) {
          result.then(x => {
            this.resolved = new Date();
            return x;
          }).catch(x => {
            this.resolved = new Date();
            this.error = x;
            this.failed = true;
          });
        }
        else {
          this.resolved = new Date();
        }
        return result;
      }
      catch (e) {
        this.resolved = new Date();
        this.error = e;
        this.failed = true;
      }
    });
    this.created = new Date();
  }
}


export class IntervalPool implements QueuePool {
  currentLazy: IntervalLazy<Promise<any>>;

  // history: HistoryPool[]; //TODO remove


  constructor(private _config: GinPoolConfig) {

  }


  async queue(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any> {
    const prev = this.currentLazy;

    const current = new IntervalLazy(() => strategy.request(uri), this._config.requestInterval);
    this.currentLazy = current;

    if (prev) {
      // let wait the time we should at least
      const w = (prev.created.getTime() + this._config.requestInterval) - Date.now();
      if (w > 0) {
        await promiseSetTimeout(w);
      }

      // if the promise haven't start yet, we should wait
      while (!prev.started) {
        await promiseSetTimeout(TICK);
      }
      const p = prev.value;


      try {
        await p;
      } catch (e) {
        // ignore
      }

      // let wait the time we should at least
      const w2 = (prev.resolved.getTime() + this._config.requestInterval) - Date.now();
      if (w2 > 0) {
        await promiseSetTimeout(w2);
      }
    }

    return await current.value;
  }
}














