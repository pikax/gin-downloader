import {FilterCondition, FilterStatus, Genre, GenreCondition, Type} from "./enum";
import {IManga, IMangaObject, Source} from "./interface";

export type GenreCollection = Array<Genre>;

export interface NameFilterCondition {
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

export type NameFilter = NameFilterCondition;

export type AuthorFilter = NameFilter;
export type ArtistFilter = NameFilter;
export type ReleaseFilter = ValueFilter;

export interface Search {
    name?: NameFilter | string;
    author?: AuthorFilter | string;
    artist?: ArtistFilter | string;
    status?: FilterStatus | string;
    released?: ReleaseFilter | number;
    genre?: GenreFilter | GenreCollection;
    rating?: RatingFilter| number;
    mature?: boolean;

    type?: Type;
}

export interface MangaFilter {
    name?: string;

    search?: Search;
    sort?: {};

    page?: number;
}

export type MangaSource = IManga & Source;

export interface FilteredResults {
    results: IMangaObject[];
    page: number;
    total: number;
}

export namespace filter {


    export interface Search {
        name?: NameFilter;
        author?: AuthorFilter;
        artist?: ArtistFilter;
        status?: FilterStatus;
        released?: ReleaseFilter;
        genre?: GenreFilter;
        rating?: RatingFilter;
        mature?: boolean;

        type?: Type;
    }

    export interface FilterSupport {
        search?: Search;
        sort?: {};

        page?: number;
    }
}
