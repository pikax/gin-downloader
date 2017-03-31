/**
 * Created by rodriguesc on 30/03/2017.
 */
import {Genre, FilterCondition, FilterSupport} from "../../declarations";
import {config} from "./config";
import {resolve} from "url";


const Supported = [];
Supported[Genre.FourKoma] = Genre.FourKoma;
Supported[Genre.Action] = Genre.Action;
Supported[Genre.Adult] = Genre.Adult;
Supported[Genre.Adventure] = Genre.Adventure;
Supported[Genre.Comedy] = Genre.Comedy;
Supported[Genre.Comic] = Genre.Comic;
Supported[Genre.Cooking] = Genre.Cooking;
Supported[Genre.Doujinshi] = Genre.Doujinshi;
Supported[Genre.Drama] = Genre.Drama;
Supported[Genre.Ecchi] = Genre.Ecchi;
Supported[Genre.Fantasy] = Genre.Fantasy;
Supported[Genre.GenderBender] = Genre.GenderBender;
Supported[Genre.Harem] = Genre.Harem;
Supported[Genre.Historical] = Genre.Historical;
Supported[Genre.Horror] = Genre.Horror;
Supported[Genre.Josei] = Genre.Josei;
Supported[Genre.Lolicon] = Genre.Lolicon;
Supported[Genre.Manga] = Genre.Manga;
Supported[Genre.Manhua] = Genre.Manhua;
Supported[Genre.Manhwa] = Genre.Manhwa;
Supported[Genre.MartialArts] = Genre.MartialArts;
Supported[Genre.Mature] = Genre.Mature;
Supported[Genre.Mecha] = Genre.Mecha;
Supported[Genre.Medical] = Genre.Medical;
Supported[Genre.Music] = Genre.Music;
Supported[Genre.Mystery] = Genre.Mystery;
Supported[Genre.Oneshot] = Genre.Oneshot;
Supported[Genre.Psychological] = Genre.Psychological;
Supported[Genre.Romance] = Genre.Romance;
Supported[Genre.SchoolLife] = Genre.SchoolLife;
Supported[Genre.SciFi] = Genre.SciFi;
Supported[Genre.Seinen] = Genre.Seinen;
Supported[Genre.Shotacon] = Genre.Shotacon;
Supported[Genre.Shoujo] = Genre.Shoujo;
Supported[Genre.ShoujoAi] = Genre.ShoujoAi;
Supported[Genre.Shounen] = Genre.Shounen;
Supported[Genre.ShounenAi] = Genre.ShounenAi;
Supported[Genre.SliceOfLife] = Genre.SliceOfLife;
Supported[Genre.Smut] = Genre.Smut;
Supported[Genre.Sports] = Genre.Sports;
Supported[Genre.Supernatural] = Genre.Supernatural;
Supported[Genre.Tragedy] = Genre.Tragedy;
Supported[Genre.Webtoon] = Genre.Webtoon;
Supported[Genre.Yaoi] = Genre.Yaoi;
Supported[Genre.Yuri] = Genre.Yuri;





export const processFilter = (filter: FilterSupport) : {src: string, params: any} => {
  let search = {
    src: resolve(config.site, "/AdvanceSearch"),
    params: {
      mangaName: filter.name
    }
  };

  return {src: search.src,
  params: "mangaName=gintama&authorArtist=&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status="};


  return search;
};


