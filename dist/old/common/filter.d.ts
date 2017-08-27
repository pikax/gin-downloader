/// <reference path="interface.d.ts" />
/**
 * Created by pikax on 26/06/2017.
 */
import { Type } from "./interface";
export declare enum Genre {
    Action,
    Adult,
    Adventure,
    AwardWinning,
    Comedy,
    Comic,
    Cooking,
    Demons,
    Doujinshi,
    Drama,
    Ecchi,
    Fantasy,
    FourKoma,
    GenderBender,
    Harem,
    Historical,
    Horror,
    Josei,
    Lolicon,
    Magic,
    Manga,
    Manhua,
    Manhwa,
    MartialArts,
    Mature,
    Mecha,
    Medical,
    Military,
    Music,
    Mystery,
    Oneshot,
    Psychological,
    Romance,
    SchoolLife,
    SciFi,
    Seinen,
    Shotacon,
    Shoujo,
    ShoujoAi,
    Shounen,
    ShounenAi,
    SliceOfLife,
    Smut,
    Sports,
    Supernatural,
    SuperPower,
    Tragedy,
    Vampire,
    Webtoon,
    Yaoi,
    Yuri,
    NoChapters,
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
export declare enum GenreCondition {
    And = 0,
    Or = 1,
}
export declare enum FilterStatus {
    Ongoing,
    Complete,
    Cancelled,
}
export interface NameFilter {
    name: string;
    condition?: FilterCondition;
}
export interface ValueFilter {
    value: number;
    condition?: FilterCondition;
}
export interface GenreFilter {
    inGenres?: Genre[];
    outGenres?: Genre[];
    condition?: GenreCondition;
}
export interface RatingFilter {
    from?: number;
    to?: number;
}
export interface AuthorFilter extends NameFilter {
}
export interface ArtistFilter extends NameFilter {
}
export interface ReleaseFilter extends ValueFilter {
}
export interface MangaFilter {
    name?: string;
    page?: number;
    search?: {
        name?: NameFilter | string;
        author?: AuthorFilter | string;
        artist?: ArtistFilter | string;
        status?: FilterStatus;
        released?: ReleaseFilter | number;
        genre?: GenreFilter | Genre[];
        rating?: RatingFilter | number;
        mature?: boolean;
        type?: Type;
    };
    sort?: {};
    genres?: Genre[];
    outGenres?: Genre[];
}
export interface FilterSupport {
    name?: string;
    page?: number;
    search?: {
        name?: NameFilter;
        author?: AuthorFilter;
        artist?: ArtistFilter;
        status?: FilterStatus;
        released?: ReleaseFilter;
        genre?: GenreFilter;
        rating?: RatingFilter;
        mature?: boolean;
        type?: Type;
    };
    sort?: {};
}
