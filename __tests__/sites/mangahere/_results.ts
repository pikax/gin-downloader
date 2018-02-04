/**
 * Created by rodriguesc on 02/03/2017.
 */

let manga = {
    image: "mhcdn.net/store/manga/551/cover.jpg",
    title: "Gintama",
    synonyms: [
        {title: "กินทามะ", language: 'en'},
        {title: "銀魂", language: 'en'},
        {title: "银魂", language: 'en'},
        {title: "긴타마", language: 'en'},
        {title: "은혼", language: 'en'},
        {title: "Gin Tama", language: 'en'},
        {title: "Silver Soul", language: 'en'},
        {title: "غينتاما - الروح الفضيه", language: 'en'},
        {title: "Сребърна душа (Bulgarian)", language: 'en'},
        {title: "Gümüş Ruh (Turkish)", language: 'en'},
        {title: "Jiwa Perak", language: 'en'},
        {title: "Серебряная душа (Russian)", language: 'en'}],
    authors: ["Sorachi Hideaki"],
    artists: ["Sorachi Hideaki"],
    genres:
        ["Action",
            "Adventure",
            "Comedy",
            "Drama",
            "Historical",
            "Sci-fi",
            "Shounen",
            "Supernatural"],
    synopsis: "Sakata Gintoki is a samurai living in an era when samurai are no longer needed.",
    status: "Ongoing",
    similarmanga:
        ["13",
            "Bankara",
            "4 Panel Theater!",
            "Steins;Gate - Heni Kuukan no Octet",
            "Iincho Is Otokonoko"]
};


export default {
    mangas_count: 18586,
    manga_name: manga.title,

    chapter_count: 629,

    manga,
    image_src: "mhcdn.net/store/manga/551/041.0/compressed/M7_Gintama_ch041_00.jpg"

};
