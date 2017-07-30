



export function promiseSetTimeout(ms: number): Promise<any> {
  return new Promise((resolve => setTimeout(resolve, ms)));
}


export function promiseSetTimeoutWithPromise<T>(ms: number, p: Promise<T>): Promise<T> {
  return promiseSetTimeout(ms)
    .then(x => p);
}


export class Lazy<T> {
  private _value: T;
  get value(): T {return this._value || (this._value = this._func()); }

  constructor(private _func: () => T) {}
}

