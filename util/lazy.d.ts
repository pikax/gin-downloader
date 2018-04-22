import { ILazy } from "../interface";
export declare class Lazy<T> implements ILazy<T> {
    private _func;
    private _value;
    readonly value: T;
    constructor(_func: () => T);
}
