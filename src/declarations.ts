/**
 * Created by rodriguesc on 24/03/2017.
 */

import {URL} from "url";
import getPrototypeOf = Reflect.getPrototypeOf;

import "cheerio";

// TODO refractor, move to distinct files



// export interface MangaXDocXml extends HTMLDocument {
//   baseUrl: string;
//   location: string;
// }

export interface MangaXDoc extends CheerioStatic {
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

  status?: string;
  mature?: boolean;
}

export interface Chapter {
  chap_number?: string | number; // TODO fix name
  src: string;
  volume?: string;
  name?: string;

  language?: string;
  scanlator?: string;
  dateAdded?: string;
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
  type?: string;
}


export interface ImageSource {
  src: string;
  name: string;
}

export interface SiteParser {
  mangas(doc: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
  filter(doc: MangaXDoc): Promise<FilteredResults> | FilteredResults;

  latest(doc: MangaXDoc): Promise<Chapter[]> | Chapter[];

  info(doc: MangaXDoc): Promise<MangaInfo> | MangaInfo;
  chapters(doc: MangaXDoc): Promise<Chapter[]> | Chapter[];

  imagesPaths(doc: MangaXDoc): string[];
  image(html: string): string;
}

export interface Site {
  mangas(filter?: FilterSupport): Promise<MangaSource[]>;
  filter(filter?: FilterSupport): Promise<FilteredResults>;

  latest(): Promise<Chapter[]>;

  info(name: string): Promise<MangaInfo>;
  chapters(name: string): Promise<Chapter[]>;

  infoChapters(name: string): Promise<{info: MangaInfo, chapters: Chapter[]}>;

  images(name: string, chapter: number): Promise<Promise<ImageSource>[]>;

  resolveMangaUrl(name: string): Promise<string>|string;
}



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



export enum Genre {
  Action = <any>"Action",
  Adult = <any>"Adult",
  Adventure = <any>"Adventure",
  AwardWinning = <any>"Award Winning",
  Comedy = <any>"Comedy",
  Comic = <any>"Comic",
  Cooking = <any>"Cooking",
  Demons = <any>"Demons",
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
  Magic = <any>"Magic",
  Manga = <any>"Manga",
  Manhua = <any>"Manhua",
  Manhwa = <any>"Manhwa",
  MartialArts = <any>"Martial Arts",
  Mature = <any>"Mature",
  Mecha = <any>"Mecha",
  Medical = <any>"Medical",
  Military = <any>"Military",
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
  SuperPower = <any>"SuperPower",
  Tragedy = <any>"Tragedy",
  Vampire = <any>"Vampire",
  Webtoon = <any>"Webtoon",
  Yaoi = <any>"Yaoi",
  Yuri = <any>"Yuri",

  NoChapters = <any>"[no chapters]"
}


export enum FilterCondition {
  Equal,
  Contains,
  NotContains,
  StartsWith,
  EndsWith,
  Less,
  Greater,
  LessThan,
  GreaterThan,
}


export enum GenreCondition {
  And = 0,
  Or = 1,
}

export enum FilterStatus {
  Ongoing = <any>"Ongoing",
  Complete = <any>"Complete",
  Cancelled = <any>"Cancelled"
}

export enum FilterMangaType {
  Manga,
  Manhwa,
  Manhua,
  Comic,
  Artbook, // An artbook is a title that contains purely art and has no story
  Other, // bato.to
}


export interface FilterSupport {
  name?: string;
  page?: number;
  search?: {
    name?: {
      name: string,
      condition?: FilterCondition,
    },
    author?: {
      name: string,
      condition?: FilterCondition,
    },
    artist?: {
      name: string,
      condition?: FilterCondition,
    },
    status?: FilterStatus,
    released?: {
      value: number,
      condition?: FilterCondition,
    },
    genre?: { // todo use this object instead of genres/outGenres
      inGenres?: Genre[];
      outGenres?: Genre[];
      condition?: GenreCondition;
    };
    rating?: {
      from?: number,
      to?: number,
    },
    mature?: boolean;


    type?: FilterMangaType,
  };

  sort?: {
  };

  genres?: Genre[]; // deprecated
  outGenres?: Genre[]; // deprecated
}


export interface FilteredResults {
  results: MangaSource[];
  page: number;
  total: number;
}
