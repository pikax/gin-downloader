declare global  {
    interface String {
        lastDigit(): number;
        firstDigit(): number;
        leftTrim(): string;
        decodeEscapeSequence(): string;
        getMatches(regex: RegExp, index?: number): string[];
    }
}
export declare const lastDigit: (s: string) => number;
export declare const firstDigit: (s: string) => number;
export declare const leftTrim: (s: string) => string;
