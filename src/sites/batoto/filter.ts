/**
 * Created by rodriguesc on 30/03/2017.
 */
import {Genre, FilterCondition, FilterSupport, FilterStatus, GenreCondition, FilterMangaType} from "../../declarations";
import {config} from "./config";
import {resolve} from "url";
import {find} from "lodash";

const Supported = [];
Supported[Genre.Action] = Genre.Action;
Supported[Genre.Adventure] = Genre.Adventure;
Supported[Genre.Comedy] = Genre.Comedy;
Supported[Genre.Mystery] = Genre.Mystery;
Supported[Genre.Psychological] = Genre.Psychological;
Supported[Genre.Romance] = Genre.Romance;
Supported[Genre.SchoolLife] = Genre.SchoolLife;
Supported[Genre.SciFi] = Genre.SciFi;
Supported[Genre.Doujinshi] = Genre.Doujinshi;
Supported[Genre.Drama] = Genre.Drama;
Supported[Genre.Ecchi] = Genre.Ecchi;
Supported[Genre.Fantasy] = Genre.Fantasy;
Supported[Genre.GenderBender] = Genre.GenderBender;
Supported[Genre.ShoujoAi] = Genre.ShoujoAi;
Supported[Genre.Harem] = Genre.Harem;
Supported[Genre.ShounenAi] = Genre.ShounenAi;
Supported[Genre.Historical] = Genre.Historical;
Supported[Genre.SliceOfLife] = Genre.SliceOfLife;
Supported[Genre.Horror] = Genre.Horror;
Supported[Genre.Smut] = Genre.Smut;
Supported[Genre.Sports] = Genre.Sports;
Supported[Genre.Supernatural] = Genre.Supernatural;
Supported[Genre.MartialArts] = Genre.MartialArts;
Supported[Genre.Tragedy] = Genre.Tragedy;
Supported[Genre.Yaoi] = Genre.Yaoi;
Supported[Genre.Mecha] = Genre.Mecha;
Supported[Genre.Yuri] = Genre.Yuri;
Supported[Genre.Seinen] = Genre.Seinen;
Supported[Genre.Shounen] = Genre.Shounen;
Supported[Genre.Josei] = Genre.Josei;
Supported[Genre.Shoujo] = Genre.Shoujo;
Supported[Genre.Webtoon] = Genre.Webtoon;
Supported[Genre.Music] = Genre.Music;
Supported[Genre.Oneshot] = Genre.Oneshot;
Supported[Genre.AwardWinning] = Genre.AwardWinning;
Supported[Genre.FourKoma] = Genre.FourKoma;
Supported[Genre.Cooking] = Genre.Cooking;
Supported[Genre.Medical] = Genre.Medical;
Supported[Genre.NoChapters] = Genre.NoChapters;


const ordered = [
  Genre.Action,
  Genre.Adventure,
  Genre.Comedy,
  Genre.Mystery,
  Genre.Psychological,
  Genre.Romance,
  Genre.SchoolLife,
  Genre.SciFi,
  Genre.Doujinshi,
  Genre.Drama,
  Genre.Ecchi,
  Genre.Fantasy,
  Genre.GenderBender,
  Genre.ShoujoAi,
  Genre.Harem,
  Genre.ShounenAi,
  Genre.Historical,
  Genre.SliceOfLife,
  Genre.Horror,
  Genre.Smut,
  Genre.Sports,
  Genre.Supernatural,
  Genre.MartialArts,
  Genre.Tragedy,
  Genre.Yaoi,
  Genre.Mecha,
  Genre.Yuri,
  Genre.Seinen,
  Genre.Shounen,
  Genre.Josei,
  Genre.Shoujo,
  Genre.Webtoon,
  Genre.Music,
  Genre.Oneshot,
  Genre.AwardWinning,
  Genre.FourKoma,
  Genre.Cooking,
  Genre.Medical,
  Genre.NoChapters,
];

let dic: { [id: string]: string; } = {};
dic[Genre.Action] = "1";
dic[Genre.Adventure] = "2";
dic[Genre.Comedy] = "3";
dic[Genre.Mystery] = "4";
dic[Genre.Psychological] = "5";
dic[Genre.Romance] = "6";
dic[Genre.SchoolLife] = "7";
dic[Genre.SciFi] = "8";
dic[Genre.Doujinshi] = "9";
dic[Genre.Drama] = "10";
dic[Genre.Ecchi] = "12";
dic[Genre.Fantasy] = "13";
dic[Genre.GenderBender] = "15";
dic[Genre.ShoujoAi] = "16";
dic[Genre.Harem] = "17";
dic[Genre.ShounenAi] = "19";
dic[Genre.Historical] = "20";
dic[Genre.SliceOfLife] = "21";
dic[Genre.Horror] = "22";
dic[Genre.Smut] = "23";
dic[Genre.Sports] = "25";
dic[Genre.Supernatural] = "26";
dic[Genre.MartialArts] = "27";
dic[Genre.Tragedy] = "28";
dic[Genre.Yaoi] = "29";
dic[Genre.Mecha] = "30";
dic[Genre.Yuri] = "31";
dic[Genre.Seinen] = "32";
dic[Genre.Shounen] = "33";
dic[Genre.Josei] = "34";
dic[Genre.Shoujo] = "35";
dic[Genre.Webtoon] = "36";
dic[Genre.Music] = "37";
dic[Genre.Oneshot] = "38";
dic[Genre.AwardWinning] = "39";
dic[Genre.FourKoma] = "40";
dic[Genre.Cooking] = "41";
dic[Genre.Medical] = "42";
dic[Genre.NoChapters] = "44";


export const processFilter = (filter: FilterSupport) : {src: string} => {
  filter = filter || {};
  let {genres, outGenres, search} = filter;


  let fauthor = null;
  let fstatus = null;
  let ftype= null;
  let fname = filter.name;
  let nameCondition = null;
  let authorCondition = null;
  let genreCondition = null;

  if (search) {

    let nameFilter = search.name;
    if (nameFilter) {
      fname = nameFilter.name;
      nameCondition = resolveCondition(nameFilter.condition); // not support equals just Starts|Ends|Contains
    }

    let authorFilter = search.author || search.artist;
    if (authorFilter) {
      fauthor = authorFilter.name;
      authorCondition = resolveCondition(authorFilter.condition);
    }

    let statusFilter = search.status;
    if (statusFilter) {
      fstatus = resolveStatus(statusFilter);
    }

    let genreFilter = search.genre;
    if (genreFilter) {
      genres = genreFilter.inGenres;
      outGenres = genreFilter.outGenres;
      genreCondition = resolveGenreCondition(genreFilter.condition);
    }


    let {type} = search;
    if(type) {
      ftype = resolveType(type);
    }
  }

  const mangaName = `name=${fname || ""}`;
  const nameCond = nameCondition && `name_cond=${nameCondition}`;
  const authorArtist =  `artist_name=${(fauthor || "")}`;
  const authorCond = authorCondition && `artist_name_cond=${authorCondition}`;

  const genreFilter = "genres=" + ordered.map(x => inOutGenre(x, genres, outGenres)).filter(x => x !== "").join(";");
  const genreCon = ( genreCondition && `genre_cond=${genreCondition}` ) || "genre_cond=and"; // todo change me
  const status = `status=${(fstatus || "")}`;
  const type = `type=${ftype}`;
  const page = `p=${(filter.page || 1)}`;

  // TODO implement me
  const rating_high= 0; // 0~5
  const rating_low = 0; // 0~5
  const mature = false; // n == false

  return {src: config.mangas_url + "?" + [mangaName, nameCond, authorArtist, authorCond, genreFilter, genreCon, status, type, page].join("&")
  };
};


function  resolveType(type: FilterMangaType) {

  switch (type) {
    case FilterMangaType.Manga:
      return "jp";

    case FilterMangaType.Manhwa:
      return "kr";
    case FilterMangaType.Manhua:
      return "cn";
    case FilterMangaType.Artbook:
      return "ar";
    case FilterMangaType.Other:
      return "ot";
    default:
      throw new Error("Unknown type");
  }
}


function resolveCondition(condition: FilterCondition) {
  switch (condition) {
    case FilterCondition.Contains:
      return "c";
    case FilterCondition.EndsWith:
      return "e";
    case FilterCondition.StartsWith:
      return "s";
    case FilterCondition.Equal: // not supported for name
      return "is";

    default:
      return "c";
  }
}

function resolveGenreCondition(condition: GenreCondition) {
  switch (condition) {
    case GenreCondition.And:
      return "and";
    case GenreCondition.Or:
      return "or";

    default:
      return "and";
  }
}

function resolveStatus(status: FilterStatus) {
  switch (status) {
    case FilterStatus.Ongoing:
      return "i";
    case FilterStatus.Complete:
      return "c";
    default:
      return null;
  }
}

function inOutGenre(genre: Genre, inGenre: Genre[], outGenre: Genre[]) {
  if (inGenre && inGenre.indexOf(genre) > -1) {
    return `i${dic[genre]}`;
  }
  if (outGenre && outGenre.indexOf(genre) > -1) {
    return `e${dic[genre]}`;
  }
  return "";
}


