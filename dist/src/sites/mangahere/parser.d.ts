import { gin, Info } from "../../interface";
import { FilteredResults } from "../../filter";
import SiteParser = gin.SiteParser;
import MangaXDoc = gin.MangaXDoc;
import MangaSource = gin.MangaSource;
import ChapterSource = gin.ChapterSource;
export declare class Parser implements SiteParser {
    mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
    latest($: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[];
    info($: MangaXDoc): Promise<Info> | Info;
    chapters($: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[];
    private static parseChapter(a, span, date);
    imagesPaths($: MangaXDoc): string[];
    image(html: string): string;
    filter($: MangaXDoc): Promise<FilteredResults> | FilteredResults;
}
export declare const parser: Parser;
export default parser;
