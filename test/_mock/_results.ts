/**
 * Created by pikax on 13/04/2017.
 */

import {Chapter, MangaInfo, MangaSource, MangaXDoc, SiteParser} from "../../src/declarations";

export const mangas: MangaSource[] = [
  {name: "Gintama", src: "gintama"},
  {name: "OnePiece", src: "onepiece"},
  {name: "Berserk", src: "berserk"},
  {name: "Vagabond", src: "vagabond"},
];

export const chapters: Chapter[] = [
  {name: "My Test 1", src: "chap/test1", chap_number: "1", volume: "v01"},
  {name: "My Test 2", src: "chap/test2", chap_number: "2", volume: "v01"},
  {name: "My Test 3", src: "chap/test3", chap_number: "3", volume: "v01"},
  {name: "My Test 4", src: "chap/test4", chap_number: "4", volume: "v01"},
];

export const latest: Chapter[] = chapters;

export const info: MangaInfo = {
  image: "http://h.mfcdn.net/store/manga/551/cover.jpg",
  title: "Gintama",
  released: "2003",
  synopsis: "Sakata Gintoki is a samurai living in an era when samurai are no longer needed",
  status: "Ongoing",
  ranked: "\r\n        95th, it has 221,700 monthly views.\r\n        ",
  rating: "Average 4.91 / 5 out of 1050 total votes.",
  synonyms:
    [ "กินทามะ",
      "銀魂",
      "银魂",
      "긴타마",
      "은혼",
      "Gin Tama",
      "Silver Soul",
      "غينتاما - الروح الفضيه",
      "Сребърна душа (Bulgarian)",
      "Gümüş Ruh (Turkish)",
      "Jiwa Perak",
      "Серебряная душа (Russian)" ],
  authors: [ "Sorachi Hideaki" ],
  artists: [ "Sorachi Hideaki" ],
  genres:
    [ "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Historical",
      "Sci-fi",
      "Shounen",
      "Supernatural" ],
  scanlators: [ "BakanaHaven" ]
};


export const imagesPaths: string[] = ["im1", "im2", "im3"];
export const image: string = "im1";

