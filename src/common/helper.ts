/**
 * Created by rodriguesc on 10/03/2017.
 */

import * as cheerio from "cheerio";
import {FilterSupport, MangaXDoc} from "../declarations";


export const parseDoc = (source: string, params: {location: string} = undefined): MangaXDoc => {
  let doc: MangaXDoc = (<any>cheerio.load(source));
  doc.location = params && params.location;
  return doc;
};


export const sanitize = (children: CheerioElement[]) => children.filter(x => x.type !== "text");


export const procFilter = (condition: FilterSupport | string, def?: FilterSupport) => {
  let filter: FilterSupport = def || {};

  if (typeof condition === "string") {
    filter.name = condition;
  }
  else {
    filter = {...filter, ...condition};

    // @deprecated NOTE support old, will be removed
    // begin
    let {genres, outGenres} = filter;
    if (filter.search ) {
      if (!filter.search.genre) {
        filter.search.genre = {};
      }
    }
    else {
      filter.search = {genre: {}};
    }
    if (genres) {
      filter.search.genre.inGenres = genres;
    }
    if (outGenres) {
      filter.search.genre.outGenres = outGenres;
    }
    // end
    // @deprecated end
    if (filter.search) {
      let {genre} = filter.search;

      if (Array.isArray(genre)) { // is array of ['Comedy', 'Action'], as default sets as InGenre
        let defGenre = def && def.search && def.search.genre;
        filter.search.genre  = {...defGenre, inGenres: genre};
      }
    }
  }

  return filter;
};

