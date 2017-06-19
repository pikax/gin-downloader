import { Chapter, FilteredResults, MangaInfo, MangaSource, MangaXDoc, SiteParser } from "../../declarations";
export declare class Parser implements SiteParser {
    private static fixNames;
    private static resolveName;
    mangas($: MangaXDoc): MangaSource[] | Promise<MangaSource[]>;
    latest($: MangaXDoc): Chapter[] | Promise<Chapter[]>;
    info($: MangaXDoc): MangaInfo | Promise<MangaInfo>;
    chapters($: MangaXDoc): Chapter[] | Promise<Chapter[]>;
    private static parseChapter(a, text, date);
    imagesPaths($: MangaXDoc): string[];
    image(html: string): string;
    filter($: MangaXDoc): Promise<FilteredResults> | FilteredResults;
}
export declare const parser: Parser;
export default parser;
