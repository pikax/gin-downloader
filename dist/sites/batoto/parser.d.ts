import { FilteredResults } from "./../../filter";
import { gin, Info } from "./../../interface";
import ChapterSource = gin.ChapterSource;
import MangaSource = gin.MangaSource;
import MangaXDoc = gin.MangaXDoc;
import SiteParser = gin.SiteParser;
export declare class Parser implements SiteParser {
    mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
    latest($: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[];
    info($: MangaXDoc): Promise<Info> | Info;
    private static resolveSynonyms(title);
    private static resolveMangaType(tp);
    chapters($: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[];
    imagesPaths($: MangaXDoc): string[];
    static convertChapterReaderUrl(src: string): string;
    image(html: string): string;
    filter($: MangaXDoc): Promise<FilteredResults> | FilteredResults;
    static extractChapterNumber(text: string): number;
    static extractVolumeNumber(text: string): string;
    static extractChapterName(text: string): string;
}
export declare const parser: Parser;
export default parser;
