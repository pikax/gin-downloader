/**
 * Created by rodriguesc on 30/03/2017.
 */
import {Genre, FilterCondition, FilterSupport, FilterStatus, GenreCondition} from "../../declarations";
import {config} from "./config";
import {resolve} from "url";
import {find} from "lodash";

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


const ordered = [
  Genre.FourKoma,
  Genre.Action,
  Genre.Adult,
  Genre.Adventure,
  Genre.Comedy,
  Genre.Comic,
  Genre.Cooking,
  Genre.Doujinshi,
  Genre.Drama,
  Genre.Ecchi,
  Genre.Fantasy,
  Genre.GenderBender,
  Genre.Harem,
  Genre.Historical,
  Genre.Horror,
  Genre.Josei,
  Genre.Lolicon,
  Genre.Manga,
  Genre.Manhua,
  Genre.Manhwa,
  Genre.MartialArts,
  Genre.Mature,
  Genre.Mecha,
  Genre.Medical,
  Genre.Music,
  Genre.Mystery,
  Genre.Oneshot,
  Genre.Psychological,
  Genre.Romance,
  Genre.SchoolLife,
  Genre.SciFi,
  Genre.Seinen,
  Genre.Shotacon,
  Genre.Shoujo,
  Genre.ShoujoAi,
  Genre.Shounen,
  Genre.ShounenAi,
  Genre.SliceOfLife,
  Genre.Smut,
  Genre.Sports,
  Genre.Supernatural,
  Genre.Tragedy,
  Genre.Webtoon,
  Genre.Yaoi,
  Genre.Yuri,
];

let dic: { [id: string]: string; } = {};
dic[Genre.FourKoma] = "40";
dic[Genre.Action] = "1";
dic[Genre.Adventure] = "2";
dic[Genre.AwardWinning] = "39";
dic[Genre.Comedy] = "3";
dic[Genre.Cooking] = "41";
dic[Genre.Doujinshi] = "9";
dic[Genre.Drama] = "10";
dic[Genre.Ecchi] = "12";
dic[Genre.Fantasy] = "13";
dic[Genre.GenderBender] = "15";
dic[Genre.Harem] = "17";
dic[Genre.Historical] = "20";
dic[Genre.Horror] = "22";
dic[Genre.Josei] = "34";
dic[Genre.MartialArts] = "27";
dic[Genre.Mecha] = "30";
dic[Genre.Medical] = "42";
dic[Genre.Music] = "37";
dic[Genre.Mystery] = "4";
dic[Genre.Oneshot] = "38";
dic[Genre.Psychological] = "5";
dic[Genre.Romance] = "6";
dic[Genre.SchoolLife] = "7";
dic[Genre.SciFi] = "8";
dic[Genre.Seinen] = "32";
dic[Genre.Shoujo] = "35";
dic[Genre.ShoujoAi] = "16";
dic[Genre.Shounen] = "33";
dic[Genre.ShounenAi] = "19";
dic[Genre.SliceOfLife] = "21";
dic[Genre.Smut] = "23";
dic[Genre.Sports] = "25";
dic[Genre.Supernatural] = "26";
dic[Genre.Tragedy] = "28";
dic[Genre.Webtoon] = "36";
dic[Genre.Yaoi] = "29";
dic[Genre.Yuri] = "31";
dic[Genre.NoChapters] = "44";


export const processFilter = (filter: FilterSupport) : {src: string, params: any} => {
  filter = filter || {};
  let {genres, outGenres, search} = filter;


  let fauthor = null;
  let fstatus = null;
  let fname = filter.name;
  let nameCondition = null;
  let authorCondition = null;
  let genreCondition = null;

  if (search) {
    let nameFilter = search.name;
    if (nameFilter) {
      fauthor = nameFilter.name;
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
    if(genreFilter) {
      genres = genreFilter.inGenres;
      outGenres = genreFilter.outGenres;
      genreCondition = resolveGenreCondition(genreFilter.condition);
    }
  }

  const mangaName = `name=${fname || ""}`;
  const nameCond = nameCondition && `name_cond=${nameCondition}`;
  const authorArtist =  `authorArtist=${(fauthor || "")}`;
  const authorCond = authorCondition && `name_cond=${authorCondition}`;

  const genreFilter = ordered.map(x => inOutGenre(x, genres, outGenres)).map(x => `genres=${x}`).join(";");
  const genreCon =( genreCondition && `genre_cond=${genreCondition}` ) || "genre_cond=and"; // todo change me
  const status = `status=${(fstatus || "")}`;

  return {src: resolve(config.site, "/search"),
    params: [mangaName, nameCond, authorArtist, authorCond, genreFilter, genreCon, status].join("&")
  };
};


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
  return 0;
}


