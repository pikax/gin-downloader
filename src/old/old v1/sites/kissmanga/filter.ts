/**
 * Created by rodriguesc on 30/03/2017.
 */
import {Genre, FilterCondition, MangaFilter, FilterStatus} from "../../declarations";
import {config} from "./config";
import {resolve} from "url";
import {find} from "lodash";
import {procFilter} from "../../common/helper";

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



export const processFilter = (mangafilter: MangaFilter): {src: string, params: any} => {
  let filter = procFilter(mangafilter);
  let {search} = filter;


  let fauthor = null;
  let fstatus = null;
  let fname = filter.name;
  let genres: Genre[] = null;
  let outGenres: Genre[] = null;

  if (search) {
    let nameFilter = search.name;
    if (nameFilter) {
      fauthor = nameFilter.name;
    }

    let authorFilter = search.author || search.artist;
    if (authorFilter) {
      fauthor = authorFilter.name;
    }

    let statusFilter = search.status;
    if (statusFilter) {
      fstatus = resolveStatus(statusFilter);
    }

    let genreFilter = search.genre;
    if (genreFilter) {
      genres = genreFilter.inGenres;
      outGenres = genreFilter.outGenres;
    }
  }

  const mangaName = `mangaName=${fname || ""}`;
  const authorArtist =  `authorArtist=${(fauthor || "")}`;
  const genreFilter = ordered.map(x => inOutGenre(x, genres, outGenres)).map(x => `genres=${x}`).join("&");
  const status = `status=${(fstatus || "")}`;

  return {src: resolve(config.site, "/AdvanceSearch"),
    params: [mangaName, authorArtist, genreFilter, status].join("&")
  };
};

function resolveStatus(status: FilterStatus) {
  switch (status) {
    case FilterStatus.Ongoing:
      return "Ongoing";
    case FilterStatus.Complete:
      return "Complete";
    default:
      return null;
  }
}

function inOutGenre(genre: Genre, inGenre: Genre[], outGenre: Genre[]) {
  if (inGenre && inGenre.indexOf(genre) > -1) {
    return 1;
  }
  if (outGenre && outGenre.indexOf(genre) > -1) {
    return 2;
  }
  return 0;
}


