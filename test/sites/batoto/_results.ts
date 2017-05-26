/**
 * Created by rodriguesc on 02/03/2017.
 */

let manga = { image: "http://img.bato.to/forums/uploads/501378b77edcdef486ef2260d1ad0b0e.jpg",
  title: "Gintama",
  synonyms: [ "ぎんたま", "銀魂", "Gintama", "은혼" ],
  authors: [ "sorachi hideaki" ],
  artists: [ "sorachi hideaki" ],
  genres:
    [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Historical",
      "Sci-fi",
      "Shounen",
    ],
  synopsis: "The story focuses on an eccentric samurai, Gintoki Sakata, his (partial) apprentice Shinpachi Shimura, and a teenage alien girl who's from one of the strongest races in existence: Kagura. All three are \"free-lancers\" search for work in order to pay the monthly rent, which usually goes unpaid anyway. The story takes place in the Edo Period, but instead of the Europeans invading in the late 1860s they are invaded by aliens, which they call Amanto.",
  status: "Ongoing",
  type: "Manga (Japanese)" };



export default {
  mangas_count: 30,
  manga_name : manga.title,

  chapter_count : 10, // unregistered users are only allow to read the last chapters

  manga,
  image_src : "http://img.bato.to/comics/g/gintama/1/yanime/English/read4d76e94677ad0/Gintama_v01_ch01%5BYanime%5D_Gintama_v01_ch01_p014d76e94716071.png"

};
