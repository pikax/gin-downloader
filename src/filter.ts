/**
 * Created by pikax on 08/07/2017.
 */


import {FilterCondition, FilterStatus, Genre, GenreCondition, Type} from "./enum";

export type GenreCollection = Array<Genre>;

export interface NameFilter {
  name: string;
  condition?: FilterCondition;
}

export interface ValueFilter {
  value: number;
  condition?: FilterCondition;
}

export interface GenreFilter {
  inGenres?: GenreCollection;
  outGenres?: GenreCollection;
  condition?: GenreCondition;
}
export interface RatingFilter { // from
  from?: number;
  to?: number;
}


export type AuthorFilter = NameFilter;
export type ArtistFilter = NameFilter;
export type ReleaseFilter = ValueFilter;


export interface MangaFilter {
  name?: string;
  search?: {
    name?: NameFilter | string,
    author?: AuthorFilter | string,
    artist?: ArtistFilter | string,
    status?: FilterStatus,
    released?: ReleaseFilter | number,
    genre?: GenreFilter | GenreCollection;
    rating?: RatingFilter | number,
    mature?: boolean;

    type?: Type,
  };

  sort?: {};

  page?: number;
}



export namespace filter {
  export interface FilterSupport {
    search?: {
      name?: NameFilter,
      author?: AuthorFilter,
      artist?: ArtistFilter,
      status?: FilterStatus,
      released?: ReleaseFilter,
      genre?: GenreFilter,
      rating?: RatingFilter,
      mature?: boolean;

      type?: Type,
    };

    sort?: {};

    page?: number;
  }
}

