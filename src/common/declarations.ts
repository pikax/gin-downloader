/**
 * Created by rodriguesc on 24/03/2017.
 */

import {HTMLDocument} from "libxmljs";
import {URL} from "url";

export interface IMangaXDoc extends HTMLDocument {
  baseUrl: string;
  location: string;
}

export interface IRequest {
  getHtml(requestedPath: string | URL, params: any): Promise<string>;
  getBytes(requestedPath: string | URL, params: any): Promise<any>;
}

export interface IName {
  toName(name: string): string;
  resolveUrl(name: string): string;
}


export interface IConfig {
  site: string;
  name: string;
  mangas_url: string;
  latest_url: string;

}

export interface IMangas {
  name: string;
  src: string;
}

export interface IChapter {
  number?: number;
  src: string;
  volume?: string;
  name?: string;
}


export interface IMangaInfo {
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


export interface IImage {
  src: string;
  name: string;
}

export interface IParser {
  mangas(doc: IMangaXDoc): Promise<IMangas[]> | IMangas[];
  latest(doc: IMangaXDoc): Promise<IChapter[]> | IChapter[];

  info(doc: IMangaXDoc): Promise<IMangaInfo> | IMangaInfo;
  chapters(doc: IMangaXDoc): Promise<IChapter[]> | IChapter[];

  imagesPaths(doc: IMangaXDoc): string[];
  image(html: string): string;
}

export interface ISite {
  mangas(): Promise<IMangas[]>;
  latest(): Promise<IChapter[]>;

  info(name: string): Promise<IMangaInfo>;
  chapters(name: string): Promise<IChapter[]>;

  infoChapters(name: string): Promise<{info: IMangaInfo, chapters: IChapter[]}>;

  images(name: string, chapter: number): Promise<Promise<IImage>[]>;
}



declare global {
  interface Promise<T>{
    tap<U>(result?: (result: any) => U | Thenable<U>): Promise<T>;
  }

  interface String {
    lastDigit(): number;
    firstDigit(): number;
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





