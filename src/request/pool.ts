import {OptionsWithUrl} from "request";
import {ginConfig, GinPoolConfig} from "src/config";
import {Lazy, promiseSetTimeout} from "src/util";
import {GinUrlOptions, RequestStrategy} from "./index";


type GinPoolQueue = GinPoolConfig & {queue: QueuePool};

let pools: Array<GinPoolQueue>;

export interface ActivePool {
  id: number;

  uri: GinUrlOptions;
  item?: Lazy<Promise<any>>;
  isActive: boolean;
}
export type HistoryPool = ActivePool & {resolved?: Date, started?: Date, created: Date};

const activePools: {[poolId: string]: ActivePool} = {};

const historyPools: {[poolId: string]: HistoryPool[]} = {};



export interface QueuePool {
  queue(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any>;

  history: HistoryPool[];
}


function request(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any> {
  let pool: GinPoolConfig;

  if (!ginConfig.config.pooling || !(pool = getPool(uri))) {
    return strategy.request(uri);
  }

  if (pool.requestInterval) {
    // return processPoolByInterval(pool, uri);
  }


}

//
// function processPoolByInterval(pool: GinPoolConfig, uri: GinUrlOptions): Promise<any> {
//
//
// }


function getPool(uri: GinUrlOptions) {
  pools = pools || buildPool();

  const url = isOptionsWithUrl(uri)
    ? uri.baseUrl
    : uri;



  const m = pools.find(x => !!url.match(x.match));
  return m;
}


function isOptionsWithUrl(uri: GinUrlOptions): uri is OptionsWithUrl {
  return (<OptionsWithUrl>uri).url !== undefined;
}



function buildPool(): Array<GinPoolQueue> {
  const {pooling } = ginConfig.config;

  const pools: Array<GinPoolQueue> = [];

  for (let p in pooling) {
    const pool = pooling[p];

    let queue: QueuePool;

    if (pool.requestInterval){
      queue = new IntervalPool(pool);
    }
    else {
      if (pool.simultaneousRequests) {
        throw new Error("not implemented pool");
      }
      else {
        throw new Error("unknown pool type");
      }
    }

    pools.push({...pool, queue});
  }

  return pools;
}





class PoolQueue {

  private _queue: ActivePool[] = [];
  private _history: HistoryPool[] = [];

  constructor(private _config: GinPoolConfig) {
  }

  queue(uri: GinUrlOptions, strategy: RequestStrategy) {

    if (!!this._config.requestInterval) {
      return this.processInterval(uri, strategy);
    }


  }


  private processInterval(uri: GinUrlOptions, strategy: RequestStrategy) {
    if (this._queue.length > 0) {


    }



  }


}


export class IntervalPool implements QueuePool {


  private _currId: number = 0;

  private _active: ActivePool;
  // private _history: {[id: string]: HistoryPool} = {};
  private _history = new Map<number, HistoryPool>();

  get history(): HistoryPool[] {return Array.from(this._history.values()); } // copy list


  get isActive(): boolean {return !!this._active; }


  private set active(value: ActivePool) {
    // const h = this._history[this._active.id];
    // h.resolved = true;
    this._active = value;
  }


  constructor(private _config: GinPoolConfig) {
  }


  queue(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any> {
    let id = this.getNextId();
    const last = this._history.get(id - 1);
    const history: HistoryPool = {
      id,
      uri,
      isActive: true,
      created: new Date(),
    };
    this._history.set(id, history);

    let lazy = new Lazy(async () =>{
      history.started = new Date();

      const x = await strategy.request(uri)
      history.resolved = new Date();

      return x;
    } );

    if (last) {
      lazy = history.item = this.waitForLast(last, lazy);
    }

    return this.execItem(id, lazy);
  }

  private async execItem(id: number, lazy: Lazy<Promise<any>>){
    const h = this._history.get(id);

    this.active = {
      id,
      uri: h.uri,
      isActive: true,
    };
    h.item = lazy;
    const v = await lazy.value;
    h.isActive = false;

    this.active = null;
    return v;
  }

  private waitForLast(last: HistoryPool, lazy: Lazy<Promise<any>>): Lazy<Promise<any>>{
    const {requestInterval} = this._config;

    const item = new Lazy(async () => {
      while (last.isActive){
        await last.item.value; // just wait until the last finish
      }

      const dt = last.resolved;
      const passedTime = Date.now() - dt.getTime();

      const missing = requestInterval - passedTime;

      if (missing > 0) {
        await promiseSetTimeout(missing);
      }
      return await lazy.value;
    });

    // await last.item.value; // just wait
    return item;
  }



  private getNextId() {
    return this._currId++;
  }
}



