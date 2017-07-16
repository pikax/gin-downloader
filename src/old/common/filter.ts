/**
 * Created by pikax on 26/06/2017.
 */
/// <reference path="interface.ts" />


import {Manga, Type} from "./interface";
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

    // export type FilterMangaType = Type;
    // export enum FilterMangaType {
    //   Manga = <any>"Manga",
    //   Manhwa = <any>"Manhwa",
    //   Manhua = <any>"Manhua",
    //   Comic = <any>"Comic",
    //   Artbook = <any>"Artbook", // An artbook is a title that contains purely art and has no story
    //   Other = <any>"Other", // bato.to
    // }

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
    export interface RatingFilter { // from
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
        name?: NameFilter | string,
        author?: AuthorFilter | string,
        artist?: ArtistFilter | string,
        status?: FilterStatus,
        released?: ReleaseFilter | number,
        genre?: GenreFilter | Genre[];
        rating?: RatingFilter | number,
        mature?: boolean;

        type?: Type,
      };

      sort?: {};

      genres?: Genre[]; // @deprecated
      outGenres?: Genre[]; // @deprecated
    }

    export interface FilterSupport {
      name?: string;
      page?: number;
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
    }
