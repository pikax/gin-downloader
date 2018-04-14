declare global {

    interface String {
        lastDigit(): number;

        firstDigit(): number;

        leftTrim(): string;

        decodeEscapeSequence(): string;

        getMatches(regex: RegExp, index?: number): string[];
    }
}


const regexLastDigit = /\d+(\.\d{1,3})?$/;
const regexFirstDigit = /\d+(\.\d{1,3})?/;


export const lastDigit = (s: string) => {
    const match = s.match(regexLastDigit);
    if (!match) { // can't be to smart if the last digit is 0
        return null;
    }
    return +match[0];
};


export const firstDigit = (s: string) => {
    const match = s.match(regexFirstDigit);
    if (!match) { // can't be to smart if the last digit is 0
        return null;
    }
    return +match[0];
};


export const leftTrim = (s: string) => {
    return s.replace(/^\s+/, "");
};

String.prototype.lastDigit = function () {
    return lastDigit(this);
};

String.prototype.firstDigit = function () {
    return firstDigit(this);
};

String.prototype.leftTrim = function () {
    return leftTrim(this);
};

String.prototype.decodeEscapeSequence = function () {
    return this.replace(/\\x([0-9A-Fa-f]{2})/g, function () {
        return String.fromCharCode(parseInt(arguments[1], 16));
    });
};


String.prototype.getMatches = function (regex: RegExp, index?: number) {
    index || (index = 1); // default to the first capturing group
    let matches = [];
    let match;
    while (match = regex.exec(this)) {
        matches.push(match[index]);
    }
    return matches;
};


