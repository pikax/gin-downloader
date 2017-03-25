/**
 * Created by rodriguesc on 24/03/2017.
 */

import {HTMLDocument} from "libxmljs";
import {URL} from "url";

export interface MangaXDoc extends HTMLDocument {
  baseUrl: string;
  location: string;
}

export interface Request {
  getHtml(requestedPath: string | URL, params: any): Promise<string>;
  getBytes(requestedPath: string | URL, params: any): Promise<any>;
}

export interface NameHelper {
  toName(name: string): string;
  resolveUrl(name: string): string;
}


export interface SiteConfig {
  site: string;
  name: string;
  mangas_url: string;
  latest_url: string;

}

export interface MangaSource {
  name: string;
  src: string;
}

export interface Chapter {
  number?: number;
  src: string;
  volume?: string;
  name?: string;
}


export interface MangaInfo {
  image: string;
  title: string;

  synonyms?: string[];
  released?: string;
  authors?: string[];
  artists?: string[];
  genres?: string[];
  synopsis?: string;

  status?: string;
  ranked?: string;
  rating?: string;
  scanlators?: string[];
  similarmanga?: string[];
  direction?: string;
}


export interface ImageSource {
  src: string;
  name: string;
}

export interface SiteParser {
  mangas(doc: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
  latest(doc: MangaXDoc): Promise<Chapter[]> | Chapter[];

  info(doc: MangaXDoc): Promise<MangaInfo> | MangaInfo;
  chapters(doc: MangaXDoc): Promise<Chapter[]> | Chapter[];

  imagesPaths(doc: MangaXDoc): string[];
  image(html: string): string;
}

export interface Site {
  mangas(): Promise<MangaSource[]>;
  latest(): Promise<Chapter[]>;

  info(name: string): Promise<MangaInfo>;
  chapters(name: string): Promise<Chapter[]>;

  infoChapters(name: string): Promise<{info: MangaInfo, chapters: Chapter[]}>;

  images(name: string, chapter: number): Promise<Promise<ImageSource>[]>;
}



declare global {
  interface Promise<T>{
    tap<U>(result?: (result: any) => U): Promise<T>;
  }

  interface String {
    lastDigit(): number;
    firstDigit(): number;
    leftTrim(): string;
  }
}



Promise.prototype.tap = function <T>(func: (arg: T) => void) {
  return this.then((x: T) => {
    func(x);
    return x;
  });
};



const regexLastDigit = /\d+(\.\d{1,2})?$/g;
const regexFirstDigit = /\d+(\.\d{1,2})?/g;

String.prototype.lastDigit = function(){
  let match = this.match(regexLastDigit);
  return (match && +match[0]) || null;
};

String.prototype.firstDigit = function(){
  let match = this.match(regexFirstDigit);
  return (match && +match[0]) || null;
};

String.prototype.leftTrim = function() {
  return this.replace(/^\s+/, "");
};





