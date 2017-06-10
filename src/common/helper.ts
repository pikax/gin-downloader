/**
 * Created by rodriguesc on 10/03/2017.
 */

import * as cheerio from "cheerio";
import {FilterSupport, MangaFilter, MangaXDoc} from "../declarations";


export const parseDoc = (source: string, params: {location: string} = undefined): MangaXDoc => {
  let doc: MangaXDoc = (<any>cheerio.load(source));
  doc.location = params && params.location;
  return doc;
};


export const sanitize = (children: CheerioElement[]) => children.filter(x => x.type !== "text");


export const procFilter = (condition: MangaFilter | string, def?: MangaFilter): FilterSupport => {
  let filter: MangaFilter = def || {};

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
      console.warn("filter.genres is deprecated, please use filter.search.genre.inGenres instead.");
    }
    if (outGenres) {
      console.warn("filter.outGenres is deprecated, please use filter.search.genre.outGenres instead.");
    }
    if (genres || outGenres) {
      filter.search.genre = {
        inGenres: genres,
        outGenres
      };
    }
    // end
    // @deprecated end
    if (filter.search) {
      let {genre, name, author, artist, released, rating} = filter.search;

      if (Array.isArray(genre)) { // is array of ['Comedy', 'Action'], as default sets as InGenre
        let defGenre = def && def.search && def.search.genre;
        filter.search.genre  = {...defGenre, inGenres: genre};
      }

      if (typeof name === "string") {
        filter.search.name = {
          name
        };
      }
      if (typeof author === "string") {
        filter.search.author = {
          name: author
        };
      }
      if (typeof artist === "string") {
        filter.search.artist = {
          name: artist
        };
      }

      if (typeof released === "number") {
        filter.search.released = {
          value: released
        };
      }

      if (typeof rating === "number") {
        filter.search.rating = {
          from: rating
        };
      }
    }
  }

  return <FilterSupport>filter;
};

