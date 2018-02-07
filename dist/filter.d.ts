import { FilterStatus, Genre, GenreCondition, Type } from "./enum";
import { gin } from "./interface";
import MangaSource = gin.MangaSource;
export declare type GenreCollection = Array<Genre>;
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
export interface RatingFilter {
    from?: number;
    to?: number;
}
export declare type NameFilter = NameFilterCondition;
export declare type AuthorFilter = NameFilter;
export declare type ArtistFilter = NameFilter;
export declare type ReleaseFilter = ValueFilter;
export interface Search {
    name?: NameFilter;
    author?: AuthorFilter | string;
    artist?: ArtistFilter | string;
    status?: FilterStatus | string;
    released?: ReleaseFilter | number;
    genre?: GenreFilter | GenreCollection;
    rating?: RatingFilter;
    mature?: boolean;
    type?: Type;
}
export interface MangaFilter {
    name?: string;
    search?: Search;
    sort?: {};
    page?: number;
}
export declare type MangaSource = gin.MangaSource;
export interface FilteredResults {
    results: MangaSource[];
    page: number;
    total: number;
}
export declare namespace filter {
    interface Search {
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
    interface FilterSupport {
        search?: Search;
        sort?: {};
        page?: number;
    }
}
export declare enum FilterCondition {
    Equal = 0,
    Contains = 1,
    NotContains = 2,
    StartsWith = 3,
    EndsWith = 4,
    Less = 5,
    Greater = 6,
    LessThan = 7,
    GreaterThan = 8,
}
