/**
 * Created by rodriguesc on 24/03/2017.
 */

import {URL} from "url";
import getPrototypeOf = Reflect.getPrototypeOf;

import "cheerio";

// TODO refactor, move to distinct files



// export interface MangaXDocXml extends HTMLDocument {
//   baseUrl: string;
//   location: string;
// }



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

String.prototype.lastDigit = function(){
  let match = this.match(regexLastDigit);
  if (!match) { // can't be to smart if the last digit is 0
    return null;
  }
  return +match[0];
};

String.prototype.firstDigit = function(){
  let match = this.match(regexFirstDigit);
  if (!match) { // can't be to smart if the first digit is 0
    return null;
  }
  return +match[0];
};

String.prototype.leftTrim = function() {
  return this.replace(/^\s+/, "");
};

String.prototype.decodeEscapeSequence = function() {
  return this.replace(/\\x([0-9A-Fa-f]{2})/g, function() {
    return String.fromCharCode(parseInt(arguments[1], 16));
  });
};


String.prototype.getMatches = function(regex: RegExp, index?: number) {
  index || (index = 1); // default to the first capturing group
  let matches = [];
  let match;
  while (match = regex.exec(this)) {
    matches.push(match[index]);
  }
  return matches;
};





export class LicencedError {
  get inner(): Error {
    return this._inner;
  }
  get error(): string{
    return this._error;
  }


  private _error: any;
  private _inner: Error;

  constructor(error: string, inner?: Error) {
    this._error = error;
    this._inner = inner;
  }
}