import {ILazy} from "../interface";

export class Lazy<T> implements ILazy<T> {
    private _value: T;

    get value(): T {
        return this._value || (this._value = this._func());
    }

    constructor(private _func: () => T) {
    }
}
