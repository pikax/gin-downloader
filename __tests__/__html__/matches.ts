export const FileMatches: { [id: string]: RegExp } = {
    "mangahere/mangas.html": /www\.mangahere\.cc\/mangalist\/$/,
    "mangahere/gintama.html" : /www\.mangahere\.cc\/manga\/gintama\/$/,

};

export const HtmlToFile: { [id: string]: string } = {
    "https://mangahere.cc/mangalist/": "mangahere/mangas.html",
    "https://www.mangahere.cc/manga/gintama/" : "mangahere/gintama.html"

};

