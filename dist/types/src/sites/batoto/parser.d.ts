/**
 * Created by rodriguesc on 19/04/2017.
 */
import "../../declarations";
import { Chapter, FilteredResults, MangaInfo, MangaSource, MangaXDoc, SiteParser } from "../../declarations";
export declare class Parser implements SiteParser {
    mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
    latest($: MangaXDoc): Promise<Chapter[]> | Chapter[];
    info($: MangaXDoc): Promise<MangaInfo> | MangaInfo;
    chapters($: MangaXDoc): Promise<Chapter[]> | Chapter[];
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
