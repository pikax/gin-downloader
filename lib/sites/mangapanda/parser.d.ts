import { Chapter, MangaInfo, MangaSource, MangaXDoc, SiteParser } from "../../declarations";
export declare class Parser implements SiteParser {
    mangas(doc: MangaXDoc): MangaSource[] | Promise<MangaSource[]>;
    latest(doc: MangaXDoc): Chapter[] | Promise<Chapter[]>;
    info(doc: MangaXDoc): MangaInfo | Promise<MangaInfo>;
    chapters(doc: MangaXDoc): Chapter[] | Promise<Chapter[]>;
    imagesPaths(doc: MangaXDoc): string[];
    image(html: string): string;
}
export declare const parser: Parser;
export default parser;
