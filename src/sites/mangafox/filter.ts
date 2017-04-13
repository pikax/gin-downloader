/**
 * Created by rodriguesc on 30/03/2017.
 */
import {Genre, FilterCondition, FilterSupport} from "../../declarations";
import {config} from "./config";
import {resolve} from "url";
import {map} from "lodash";

const Supported: { [id: string]: Genre } = {};
Supported[Genre.Action] = Genre.Action;
Supported[Genre.Adult] = Genre.Adult;
Supported[Genre.Adventure] = Genre.Adventure;
Supported[Genre.Comedy] = Genre.Comedy;
Supported[Genre.Doujinshi] = Genre.Doujinshi;
Supported[Genre.Drama] = Genre.Drama;
Supported[Genre.Ecchi] = Genre.Ecchi;
Supported[Genre.Fantasy] = Genre.Fantasy;
Supported[Genre.GenderBender] = Genre.GenderBender;
Supported[Genre.Harem] = Genre.Harem;
Supported[Genre.Historical] = Genre.Historical;
Supported[Genre.Horror] = Genre.Horror;
Supported[Genre.Josei] = Genre.Josei;
Supported[Genre.MartialArts] = Genre.MartialArts;
Supported[Genre.Mature] = Genre.Mature;
Supported[Genre.Mecha] = Genre.Mecha;
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
Supported[Genre.Supernatural] = Genre.Supernatural;
Supported[Genre.Tragedy] = Genre.Tragedy;
Supported[Genre.Webtoon] = Genre.Webtoon;
Supported[Genre.Yaoi] = Genre.Yaoi;
Supported[Genre.Yuri] = Genre.Yuri;



const correctName: { [id: string]: string } = {};
correctName[Genre.Adult] = Genre.Adult.toString();
correctName[Genre.Action] = Genre.Action.toString();
correctName[Genre.Adventure] = Genre.Adventure.toString();
correctName[Genre.Comedy] = Genre.Comedy.toString();
correctName[Genre.Doujinshi] = Genre.Doujinshi.toString();
correctName[Genre.Drama] = Genre.Drama.toString();
correctName[Genre.Ecchi] = Genre.Ecchi.toString();
correctName[Genre.Fantasy] = Genre.Fantasy.toString();
correctName[Genre.GenderBender] = "Gender Bender";
correctName[Genre.Harem] = Genre.Harem.toString();
correctName[Genre.Historical] = Genre.Historical.toString();
correctName[Genre.Horror] = Genre.Horror.toString();
correctName[Genre.Josei] = Genre.Josei.toString();
correctName[Genre.MartialArts] = "Martial Arts";
correctName[Genre.Mature] = Genre.Mature.toString();
correctName[Genre.Mecha] = Genre.Mecha.toString();
correctName[Genre.Mystery] = Genre.Mystery.toString();
correctName[Genre.Oneshot] = "One Shot";
correctName[Genre.Psychological] = Genre.Psychological.toString();
correctName[Genre.Romance] = Genre.Romance.toString();
correctName[Genre.SchoolLife] = Genre.SchoolLife.toString();
correctName[Genre.SciFi] = "Sci-fi";
correctName[Genre.Seinen] = Genre.Seinen.toString();
correctName[Genre.Shoujo] = Genre.Shoujo.toString();
correctName[Genre.ShoujoAi] = "Shoujo Ai";
correctName[Genre.Shounen] = Genre.Shounen.toString();
correctName[Genre.ShounenAi] = "Shounen Ai";
correctName[Genre.SliceOfLife] = "Slice of Life";
correctName[Genre.Smut] = Genre.Smut.toString();
correctName[Genre.Sports] = Genre.Sports.toString();
correctName[Genre.Supernatural] = Genre.Supernatural.toString();
correctName[Genre.Tragedy] = Genre.Tragedy.toString();
correctName[Genre.Webtoon] = "Webtoons";
correctName[Genre.Yaoi] = Genre.Yaoi.toString();
correctName[Genre.Yuri] = Genre.Yuri.toString();






export const processFilter = (filter: FilterSupport) : {src: string, params: any} => {
  filter = filter || {};
  let {genres, outGenres} = filter;

  const nameMethod = "name_method=cw"; // NOTE name search set to contains
  const mangaName = `name=${filter.name || ""}`;
  const type = `type=`;
  const authorMethod = `author_method=`;
  const author = `author=`;
  const artistMethod = `artist_method=`;
  const artist = `artist=`;
  const genreFilter = map(Supported, x => `genre[${x}]=${inOutGenre(x, genres, outGenres)}`).join("&");
  const releaseMethod = "release_method=eq";
  const release = "released=";
  const rating_method = "rating_method=eq";
  const rating = "rating=";
  const completed = "is_completed=";
  const advopts = "advopts=1"; // NOTE not sure what is this


  const status = `status=`;

  return {src: resolve(config.site, "/search.php"),
    params: [nameMethod, mangaName,
      authorMethod, author,
      artistMethod, artist,
      genreFilter,
      releaseMethod, release,
      rating_method, rating,
      completed].join("&")
  };
};


function inOutGenre(genre: Genre, inGenre: Genre[], outGenre: Genre[]): number {
  if (inGenre && inGenre.indexOf(genre) > -1) {
    return 1;
  }
  if (outGenre && outGenre.indexOf(genre) > -1) {
    return 2;
  }
  return 0;
}


