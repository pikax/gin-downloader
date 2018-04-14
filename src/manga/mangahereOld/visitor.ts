import {MangaXDoc} from "../interface";
import {MangaXDocFromRequest, MangaXDocFromUrl} from "../util/MangaXDoc";
import config  from './config';


export function Mangas(): MangaXDoc {
    const doc = MangaXDocFromUrl(config.mangas_url);
    return doc;
}


