import "cheerio";
declare global  {
    interface String {
        lastDigit(): number;
        firstDigit(): number;
        leftTrim(): string;
        decodeEscapeSequence(): string;
        getMatches(regex: RegExp, index?: number): string[];
    }
}
export declare class LicencedError {
    readonly inner: Error;
    readonly error: string;
    private _error;
    private _inner;
    constructor(error: string, inner?: Error);
}
