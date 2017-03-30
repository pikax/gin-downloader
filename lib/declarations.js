/**
 * Created by rodriguesc on 24/03/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Promise.prototype.tap = function (func) {
    return this.then(function (x) {
        func(x);
        return x;
    });
};
var regexLastDigit = /\d+(\.\d{1,2})?$/g;
var regexFirstDigit = /\d+(\.\d{1,2})?/g;
String.prototype.lastDigit = function () {
    var match = this.match(regexLastDigit);
    return (match && +match[0]) || null;
};
String.prototype.firstDigit = function () {
    var match = this.match(regexFirstDigit);
    return (match && +match[0]) || null;
};
String.prototype.leftTrim = function () {
    return this.replace(/^\s+/, "");
};
String.prototype.decodeEscapeSequence = function () {
    return this.replace(/\\x([0-9A-Fa-f]{2})/g, function () {
        return String.fromCharCode(parseInt(arguments[1], 16));
    });
};
String.prototype.getMatches = function (regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(this)) {
        matches.push(match[index]);
    }
    return matches;
};
//# sourceMappingURL=declarations.js.map