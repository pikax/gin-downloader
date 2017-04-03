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
  getHtml(requestedPath: string | URL, params?: any): Promise<string>;
  getBytes(requestedPath: string | URL, params?: any): Promise<any>;
  getDoc(requestedPath: string): Promise<MangaXDoc>;

  postHtml(requestedPath: string | URL, params?: any): Promise<string>;
  postBytes(requestedPath: string | URL, params?: any): Promise<any>;
  postDoc(requestedPath: string| URL, params?: any): Promise<MangaXDoc>;
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

  views?: string;
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
  mangas(filter?: FilterSupport): Promise<MangaSource[]>;
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
    decodeEscapeSequence(): string;
    getMatches(regex: RegExp, index: number): string[];
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

String.prototype.decodeEscapeSequence = function() {
  return this.replace(/\\x([0-9A-Fa-f]{2})/g, function() {
    return String.fromCharCode(parseInt(arguments[1], 16));
  });
};


String.prototype.getMatches = function(regex: RegExp, index: number) {
  index || (index = 1); // default to the first capturing group
  let matches = [];
  let match;
  while (match = regex.exec(this)) {
    matches.push(match[index]);
  }
  return matches;
};





export enum Genre {
  Action = <any>"Action",
  Adult = <any>"Adult",
  Adventure = <any>"Adventure",
  AwardWinning = <any>"Award Winning",
  Comedy = <any>"Comedy",
  Comic = <any>"Comic",
  Cooking = <any>"Cooking",
  Doujinshi = <any>"Doujinshi",
  Drama = <any>"Drama",
  Ecchi = <any>"Ecchi",
  Fantasy = <any>"Fantasy",
  FourKoma = <any>"4-Koma",
  GenderBender = <any>"Gender Bender",
  Harem = <any>"Harem",
  Historical = <any>"Historical",
  Horror = <any>"Horror",
  Josei = <any>"Josei",
  Lolicon = <any>"Lolicon",
  Manga = <any>"Manga",
  Manhua = <any>"Manhua",
  Manhwa = <any>"Manhwa",
  MartialArts = <any>"Martial Arts",
  Mature = <any>"Mature",
  Mecha = <any>"Mecha",
  Medical = <any>"Medical",
  Music = <any>"Music",
  Mystery = <any>"Mystery",
  Oneshot = <any>"Oneshot",
  Psychological = <any>"Psychological",
  Romance = <any>"Romance",
  SchoolLife = <any>"School Life",
  SciFi = <any>"Sci-fi",
  Seinen = <any>"Seinen",
  Shotacon = <any>"Shotacon",
  Shoujo = <any>"Shoujo",
  ShoujoAi = <any>"Shoujo Ai",
  Shounen = <any>"Shounen",
  ShounenAi = <any>"Shounen Ai",
  SliceOfLife = <any>"Slice of Life",
  Smut = <any>"Smut",
  Sports = <any>"Sports",
  Supernatural = <any>"Supernatural",
  Tragedy = <any>"Tragedy",
  Webtoon = <any>"Webtoon",
  Yaoi = <any>"Yaoi",
  Yuri = <any>"Yuri",

  NoChapters = <any>"[no chapters]"
}


export enum FilterCondition {
  Contains,
  NotContains,
  StartsWith,
  EndsWith,
  Less,
  Greater,
  LessThan,
  GreaterThan
}


export interface FilterSupport {
  name?: string;
  page?: number;
  search?: {
    name: {name: string, condition: FilterCondition}
  };
  genres?: Genre[];
  outGenres?: Genre[];
}

