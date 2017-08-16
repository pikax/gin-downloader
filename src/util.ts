import * as cheerio from "cheerio";
import {filter, MangaFilter, NameFilterCondition, Search} from "src/filter";
import {gin} from "src/interface";
import FilterSupport = filter.FilterSupport;
import MangaXDoc = gin.MangaXDoc;


export function promiseSetTimeout(ms: number): Promise<any> {
  return new Promise((resolve => setTimeout(resolve, ms)));
}


export function promiseSetTimeoutWithPromise<T>(ms: number, p: Promise<T>): Promise<T> {
  return promiseSetTimeout(ms)
    .then(x => p);
}


export class Lazy<T> {
  private _value: T;
  get value(): T {
    return this._value || (this._value = this._func());
  }

  constructor(private _func: () => T) {
  }
}


export const parseDoc = (source: string, params: { location: string } = undefined): MangaXDoc => {
  let doc: MangaXDoc = (<any>cheerio.load(source));
  doc.location = params && params.location;
  return doc;
};


export const sanitize = (children: CheerioElement[]) => children.filter(x => x.type !== "text");


export const sanitizeName = (name: string) => {
  return name; // not sure if we should use this
  // const regex = /(?:’|–|Ζ|∞|[\u00b0-\u00bf]|[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  //
  // return name.replace(regex, encodeURIComponent);
};


export const procFilter = (condition: MangaFilter | string, def?: MangaFilter): FilterSupport => {
  let search: filter.Search = (def && def.search) || {};


  if (typeof condition === "string") {
    search.name = {
      name: condition
    };
    return {search};
  }
  else {
    let nc: NameFilterCondition = (condition && condition.name && {name: condition.name}) || undefined;
    let ns: filter.Search = (condition && condition.search) || undefined;

    search = {name: nc, ...search, ...ns};

    if (search) {
      let {genre, name, author, artist, released, rating} = search;

      if (Array.isArray(genre)) { // is array of ['Comedy', 'Action'], as default sets as InGenre
        let defGenre = def && def.search && def.search.genre;
        search.genre = {...defGenre, inGenres: genre};
      }

      if (typeof name === "string") {
        search.name = {
          name
        };
      }
      if (typeof author === "string") {
        search.author = {
          name: author
        };
      }
      if (typeof artist === "string") {
        search.artist = {
          name: artist
        };
      }

      if (typeof released === "number") {
        search.released = {
          value: released
        };
      }

      if (typeof rating === "number") {
        search.rating = {
          from: rating
        };
      }
    }
  }
  //
  // if (filter.name) {
  //   filter.name = sanitizeName(filter.name);
  // }
  // if (filter.search && filter.search.name) {
  //   const name = filter.search.name;
  //
  //   if (typeof name !== "string") {
  //     name.name = sanitizeName(name.name);
  //   }
  // }

  return {...(condition as FilterSupport), search};
};


/*NOTE not sure*/
export function getLocationByCharacters(str: string) {
}


export function containsChineseCharaters(x: string): void {

}

export function containsJaponeseCharacters(x: string): boolean {
  return !!x.match(jpRegex);
}

const jpRegex = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;


/*ending*/














