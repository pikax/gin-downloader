import {IGenreSite} from "../../interface";
import {Genre} from "../../enum";


const supported: { [id: string]: Genre } = {
    [Genre.Action]: Genre.Action,
    [Genre.Adventure]: Genre.Adventure,
    [Genre.Comedy]: Genre.Comedy,
    [Genre.Doujinshi]: Genre.Doujinshi,
    [Genre.Drama]: Genre.Drama,
    [Genre.Ecchi]: Genre.Ecchi,
    [Genre.Fantasy]: Genre.Fantasy,
    [Genre.GenderBender]: Genre.GenderBender,
    [Genre.Harem]: Genre.Harem,
    [Genre.Historical]: Genre.Historical,
    [Genre.Horror]: Genre.Horror,
    [Genre.Josei]: Genre.Josei,
    [Genre.MartialArts]: Genre.MartialArts,
    [Genre.Mature]: Genre.Mature,
    [Genre.Mecha]: Genre.Mecha,
    [Genre.Mystery]: Genre.Mystery,
    [Genre.Oneshot]: Genre.Oneshot,
    [Genre.Psychological]: Genre.Psychological,
    [Genre.Romance]: Genre.Romance,
    [Genre.SchoolLife]: Genre.SchoolLife,
    [Genre.SciFi]: Genre.SciFi,
    [Genre.Seinen]: Genre.Seinen,
    [Genre.Shoujo]: Genre.Shoujo,
    [Genre.ShoujoAi]: Genre.ShoujoAi,
    [Genre.Shounen]: Genre.Shounen,
    [Genre.ShounenAi]: Genre.ShounenAi,
    [Genre.SliceOfLife]: Genre.SliceOfLife,
    [Genre.Sports]: Genre.Sports,
    [Genre.Supernatural]: Genre.Supernatural,
    [Genre.Tragedy]: Genre.Tragedy,
    [Genre.Yaoi]: Genre.Yaoi,
    [Genre.Yuri]: Genre.Yuri,
};

const ginGenres: { [id: string]: string } = {
    [Genre.Action]: Genre.Action,
    [Genre.Adventure]: Genre.Adventure,
    [Genre.Comedy]: Genre.Comedy,
    [Genre.Doujinshi]: Genre.Doujinshi,
    [Genre.Drama]: Genre.Drama,
    [Genre.Ecchi]: Genre.Ecchi,
    [Genre.Fantasy]: Genre.Fantasy,
    [Genre.GenderBender]: Genre.GenderBender,
    [Genre.Harem]: Genre.Harem,
    [Genre.Historical]: Genre.Historical,
    [Genre.Horror]: Genre.Horror,
    [Genre.Josei]: Genre.Josei,
    [Genre.MartialArts]: Genre.MartialArts,
    [Genre.Mature]: Genre.Mature,
    [Genre.Mecha]: Genre.Mecha,
    [Genre.Mystery]: Genre.Mystery,
    [Genre.Oneshot]: "One Shot",
    [Genre.Psychological]: Genre.Psychological,
    [Genre.Romance]: Genre.Romance,
    [Genre.SchoolLife]: Genre.SchoolLife,
    [Genre.SciFi]: Genre.SciFi,
    [Genre.Seinen]: Genre.Seinen,
    [Genre.Shoujo]: Genre.Shoujo,
    [Genre.ShoujoAi]: Genre.ShoujoAi,
    [Genre.Shounen]: Genre.Shounen,
    [Genre.ShounenAi]: Genre.ShounenAi,
    [Genre.SliceOfLife]: Genre.SliceOfLife,
    [Genre.Sports]: Genre.Sports,
    [Genre.Supernatural]: Genre.Supernatural,
    [Genre.Tragedy]: Genre.Tragedy,
    [Genre.Yaoi]: Genre.Yaoi,
    [Genre.Yuri]: Genre.Yuri,
};

const mangaHereGenres: { [id: string]: Genre } = Object.keys(ginGenres)
    .map(k => ({k, v: ginGenres[k]}))
    .reduce((c, v) => {
        c[v.v] = v.k;
        return c;
    }, {});


export class MangaHereGenre implements IGenreSite {
    private readonly _supported: { [id: string]: Genre };
    private readonly _gin: { [id: string]: string };
    private readonly _site: { [id: string]: Genre };

    constructor() {
        this._site = mangaHereGenres;
        this._gin = ginGenres;
        this._supported = supported;
    }

    fromSiteGenre(genre: string): Genre {
        return this._site[genre];
    }

    toSiteGenre(genre: Genre): string {
        return this._gin[genre];
    }

    isSupported(genre: Genre): boolean {
        return !!this._supported[genre];
    }

    supported(): Genre[] {
        return Object.keys(this._gin) as Genre[];
    }
}
