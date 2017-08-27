/// <reference types="cheerio" />
import { filter, MangaFilter } from "src/filter";
import { gin } from "src/interface";
declare global  {
    interface String {
        lastDigit(): number;
        firstDigit(): number;
        leftTrim(): string;
        decodeEscapeSequence(): string;
        getMatches(regex: RegExp, index?: number): string[];
    }
}
export declare function promiseSetTimeout(ms: number): Promise<any>;
export declare function promiseSetTimeoutWithPromise<T>(ms: number, p: Promise<T>): Promise<T>;
export declare class Lazy<T> {
    private _func;
    private _value;
    readonly value: T;
    constructor(_func: () => T);
}
export declare const parseDoc: (source: string, params?: {
    location: string;
}) => gin.MangaXDoc;
export declare const sanitize: (children: CheerioElement[]) => CheerioElement[];
export declare const sanitizeName: (name: string) => string;
export declare const procFilter: (condition: string | MangaFilter, def?: MangaFilter) => filter.FilterSupport;
export declare function getLocationByCharacters(str: string): void;
export declare function containsChineseCharaters(x: string): void;
export declare function containsJaponeseCharacters(x: string): boolean;
