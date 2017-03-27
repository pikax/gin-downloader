/**
 * Created by rodriguesc on 24/03/2017.
 */
"use strict";
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
//# sourceMappingURL=declarations.js.map