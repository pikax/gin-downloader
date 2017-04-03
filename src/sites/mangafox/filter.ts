/**
 * Created by rodriguesc on 30/03/2017.
 */
import {Genre, FilterCondition, FilterSupport} from "../../declarations";
import {config} from "./config";
import {resolve} from "url";
import {find} from "lodash";

const Supported: { [id: string]: string } = [];
Supported[Genre.Action.toString()] = Genre.Action;
Supported[Genre.Adult.toString()] = Genre.Adult;
Supported[Genre.Adventure.toString()] = Genre.Adventure;
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
correctName[Genre.Action] = Genre.Action;
correctName[Genre.Adult] = Genre.Adult;
correctName[Genre.Adventure] = Genre.Adventure;
correctName[Genre.Comedy] = Genre.Comedy;
correctName[Genre.Doujinshi] = Genre.Doujinshi;
correctName[Genre.Drama] = Genre.Drama;
correctName[Genre.Ecchi] = Genre.Ecchi;
correctName[Genre.Fantasy] = Genre.Fantasy;
correctName[Genre.GenderBender] = "Gender Bender";
correctName[Genre.Harem] = Genre.Harem;
correctName[Genre.Historical] = Genre.Historical;
correctName[Genre.Horror] = Genre.Horror;
correctName[Genre.Josei] = Genre.Josei;
correctName[Genre.MartialArts] = "Martial Arts";
correctName[Genre.Mature] = Genre.Mature;
correctName[Genre.Mecha] = Genre.Mecha;
correctName[Genre.Mystery] = Genre.Mystery;
correctName[Genre.Oneshot] = "One Shot";
correctName[Genre.Psychological] = Genre.Psychological;
correctName[Genre.Romance] = Genre.Romance;
correctName[Genre.SchoolLife] = Genre.SchoolLife;
correctName[Genre.SciFi] = "Sci-fi";
correctName[Genre.Seinen] = Genre.Seinen;
correctName[Genre.Shoujo] = Genre.Shoujo;
correctName[Genre.ShoujoAi] = "Shoujo Ai";
correctName[Genre.Shounen] = Genre.Shounen;
correctName[Genre.ShounenAi] = "Shounen Ai";
correctName[Genre.SliceOfLife] = "Slice of Life";
correctName[Genre.Smut] = Genre.Smut;
correctName[Genre.Sports] = Genre.Sports;
correctName[Genre.Supernatural] = Genre.Supernatural;
correctName[Genre.Tragedy] = Genre.Tragedy;
correctName[Genre.Webtoon] = "Webtoons";
correctName[Genre.Yaoi] = Genre.Yaoi;
correctName[Genre.Yuri] = Genre.Yuri;






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
  const genreFilter = Supported.map(x => `genre[${x}]=${inOutGenre(x, genres, outGenres)}`).join("&");
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


function inOutGenre(genre: Genre, inGenre: Genre[], outGenre: Genre[]){
  if (inGenre && inGenre.indexOf(genre) > -1) {
    return 1;
  }
  if (outGenre && outGenre.indexOf(genre) > -1) {
    return 2;
  }
  return 0;
}


