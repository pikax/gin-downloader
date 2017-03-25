/**
 * Created by rodriguesc on 24/03/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Promise.prototype.tap = function (func) {
    return this.then((x) => {
        func(x);
        return x;
    });
};
const regexLastDigit = /\d+(\.\d{1,2})?$/g;
const regexFirstDigit = /\d+(\.\d{1,2})?/g;
String.prototype.lastDigit = function () {
    let match = this.match(regexLastDigit);
    return (match && +match[0]) || null;
};
String.prototype.firstDigit = function () {
    let match = this.match(regexFirstDigit);
    return (match && +match[0]) || null;
};
//# sourceMappingURL=declarations.js.map