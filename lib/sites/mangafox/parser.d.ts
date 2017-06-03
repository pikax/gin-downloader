/**
 * Created by rodriguesc on 24/03/2017.
 */
import { Chapter, FilteredResults, MangaInfo, MangaSource, MangaXDoc, SiteParser } from "../../declarations";
export declare class Parser implements SiteParser {
    mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
    latest($: MangaXDoc): Promise<Chapter[]> | Chapter[];
    info($: MangaXDoc): Promise<MangaInfo> | MangaInfo;
    chapters($: MangaXDoc): Promise<Chapter[]> | Chapter[];
    private static parseChapter(a, span, volume, date);
    imagesPaths($: MangaXDoc): string[];
    image(html: string): string;
    filter($: MangaXDoc): Promise<FilteredResults> | FilteredResults;
}
export declare const parser: Parser;
export default parser;
