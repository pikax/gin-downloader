import { IGenreSite } from "../../interface";
import { Genre } from "../../enum";
export declare class MangaHereGenre implements IGenreSite {
    private readonly _supported;
    private readonly _gin;
    private readonly _site;
    constructor();
    fromSiteGenre(genre: string): Genre;
    toSiteGenre(genre: Genre): string;
    isSupported(genre: Genre): boolean;
    supported(): Genre[];
}
