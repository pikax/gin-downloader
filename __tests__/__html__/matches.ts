export const FileMatches: { [id: string]: RegExp } = {
    "mangahere/mangas.html": /www\.mangahere\.cc\/mangalist\/$/,
    "mangahere/gintama.html": /www\.mangahere\.cc\/manga\/gintama\/$/,
    "mangahere/gintama_chapter.html": /www\.mangahere\.cc\/manga\/gintama\/c001\//,
    "mangahere/latest.html": /www\.mangahere\.cc\/latest\//,
    "mangahere/gintama_search.html" : /www\.mangahere\.cc\/search\.php\?.*name=gintama/,

    "mangahere/wild_damon.html" : /www\.mangahere\.cc\/manga\/wild_damon\//,
    "mangahere/dgray_man_dj.html" : /www\.mangahere\.cc\/manga\/d_gray_man_dj_phantom_gray\//,


    "mangahere/days_of_jupiter_the_idolmaster.html" : /www\.mangahere\.cc\/manga\/d_ys_of_jupiter_the_idolm_ster\//,

    "mangahere/konbini_dmz" : /www\.mangahere\.cc\/manga\/konbini_dmz\//,

    "mangahere/love_blog.html": /www\.mangahere\.cc\/manga\/love_blog\//,

     "mangahere/rec_mizu_asato.html": /www\.mangahere\.cc\/manga\/rec_mizu_asato\//,



};

export const HtmlToFile: { [id: string]: string } = {
    "https://mangahere.cc/mangalist/": "mangahere/mangas.html",
    "https://www.mangahere.cc/manga/gintama/": "mangahere/gintama.html",
    "https://www.mangahere.cc/manga/gintama/c001/": "mangahere/gintama_chapter.html",
    "https://www.mangahere.cc/latest/": "mangahere/latest.html",
    "https://www.mangahere.cc/search.php?direction=&name_method=cw&name=gintama&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1": "mangahere/gintama_search.html",


    "https://www.mangahere.cc/manga/wild_damon/": "mangahere/wild_damon.html",
    "https://www.mangahere.cc/manga/d_gray_man_dj_phantom_gray/" : "mangahere/dgray_man_dj.html",

    "https://www.mangahere.cc/manga/d_ys_of_jupiter_the_idolm_ster/" : "mangahere/days_of_jupiter_the_idolmaster.html"

    "https://www.mangahere.cc/manga/konbini_dmz/" : "mangahere/konbini_dmz.html",

    "https://www.mangahere.cc/manga/love_blog/" : "mangahere/love_blog.html",

    "https://www.mangahere.cc/manga/rec_mizu_asato/" : "mangahere/rec_mizu_asato.html"

};

