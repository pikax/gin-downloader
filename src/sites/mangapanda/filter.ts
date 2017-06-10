/**
 * Created by rodriguesc on 30/03/2017.
 */
import {Genre, FilterCondition, FilterSupport, FilterStatus, FilterMangaType} from "../../declarations";
import {config} from "./config";
import {resolve} from "url";
import {find} from "lodash";

const Supported = [];
Supported[Genre.Action] = Genre.Action;
Supported[Genre.Adventure] = Genre.Adventure;
Supported[Genre.Comedy] = Genre.Comedy;
Supported[Genre.Demons] = Genre.Demons;
Supported[Genre.Drama] = Genre.Drama;
Supported[Genre.Ecchi] = Genre.Ecchi;
Supported[Genre.Fantasy] = Genre.Fantasy;
Supported[Genre.GenderBender] = Genre.GenderBender;
Supported[Genre.Harem] = Genre.Harem;
Supported[Genre.Historical] = Genre.Historical;
Supported[Genre.Horror] = Genre.Horror;
Supported[Genre.Josei] = Genre.Josei;
Supported[Genre.Magic] = Genre.Magic;
Supported[Genre.MartialArts] = Genre.MartialArts;
Supported[Genre.Mature] = Genre.Mature;
Supported[Genre.Mecha] = Genre.Mecha;
Supported[Genre.Military] = Genre.Military;
Supported[Genre.Mystery] = Genre.Mystery;
Supported[Genre.Oneshot] = Genre.Oneshot;
Supported[Genre.Psychological] = Genre.Psychological;
Supported[Genre.Romance] = Genre.Romance;
Supported[Genre.SchoolLife] = Genre.SchoolLife;
Supported[Genre.SciFi] = Genre.SciFi;
Supported[Genre.Seinen] = Genre.Seinen;
Supported[Genre.Shoujo] = Genre.Shoujo;
Supported[Genre.ShoujoAi] = Genre.ShoujoAi;
Supported[Genre.Shounen] = Genre.Shounen;
Supported[Genre.ShounenAi] = Genre.ShounenAi;
Supported[Genre.SliceOfLife] = Genre.SliceOfLife;
Supported[Genre.Smut] = Genre.Smut;
Supported[Genre.Sports] = Genre.Sports;
Supported[Genre.SuperPower] = Genre.SuperPower;
Supported[Genre.Supernatural] = Genre.Supernatural;
Supported[Genre.Tragedy] = Genre.Tragedy;
Supported[Genre.Vampire] = Genre.Vampire;
Supported[Genre.Yaoi] = Genre.Yaoi;
Supported[Genre.Yuri] = Genre.Yuri;

const ordered = [
  Genre.Action,
  Genre.Adventure,
  Genre.Comedy,
  Genre.Demons,
  Genre.Drama,
  Genre.Ecchi,
  Genre.Fantasy,
  Genre.GenderBender,
  Genre.Harem,
  Genre.Historical,
  Genre.Horror,
  Genre.Josei,
  Genre.Magic,
  Genre.MartialArts,
  Genre.Mature,
  Genre.Mecha,
  Genre.Military,
  Genre.Mystery,
  Genre.Oneshot,
  Genre.Psychological,
  Genre.Romance,
  Genre.SchoolLife,
  Genre.SciFi,
  Genre.Seinen,
  Genre.Shoujo,
  Genre.ShoujoAi,
  Genre.Shounen,
  Genre.ShounenAi,
  Genre.SliceOfLife,
  Genre.Smut,
  Genre.Sports,
  Genre.SuperPower,
  Genre.Supernatural,
  Genre.Tragedy,
  Genre.Vampire,
  Genre.Yaoi,
  Genre.Yuri,
];



export const processFilter = (filter: FilterSupport) : {src: string, params: any} => {
  filter = filter || {};
  let {search, name, page} = filter;

  let mainsearch = name;
  let fstatus = null;
  let ftype = null;

  let inGenres: Genre[] = filter.genres || [];
  let outGenres: Genre[] = filter.outGenres || [];

  if (search) {

    if (!mainsearch) {
      let authorFilter = search.author || search.artist;
      if (authorFilter) {
        mainsearch = authorFilter.name;
      }
    }

    let statusFilter = search.status;
    if (statusFilter) {
      fstatus = resolveStatus(statusFilter);
    }

    ftype = resolveType(search.type) || ftype;


    let {genre} = search;

    if (genre) {
      inGenres = genre.inGenres || inGenres;
      outGenres = genre.outGenres || outGenres;

    }
  }


  const msearch = `w=${mainsearch || ""}`;
  const genreFilter = `genre=${ordered.map(x => inOutGenre(x, inGenres, outGenres)).join("")}`;
  const status = `status=${(fstatus || "")}`;
  const pg = `p=${page * 30 || 0}`;
  const type = `rd=${ftype || 0}`;

  return {src: resolve(config.site, "/search/"),
    params: [msearch, type, status, genreFilter, pg].join("&")
  };
};



function resolveType(type: FilterMangaType) {
  switch (type) {
    case FilterMangaType.Manga:
      return 2;
    case FilterMangaType.Manhwa:
      return 1;
    default:
      return null;
  }
}

function resolveStatus(status: FilterStatus) {
  switch (status) {
    case FilterStatus.Ongoing:
      return 1;
    case FilterStatus.Complete:
      return 2;
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


