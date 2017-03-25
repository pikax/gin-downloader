import { Chapter, MangaInfo, MangaSource, MangaXDoc, SiteParser } from "../../declarations";
export declare class Parser implements SiteParser {
    mangas(doc: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
    latest(doc: MangaXDoc): Promise<Chapter[]> | Chapter[];
    info(doc: MangaXDoc): Promise<MangaInfo> | MangaInfo;
    chapters(doc: MangaXDoc): Promise<Chapter[]> | Chapter[];
    imagesPaths(doc: MangaXDoc): string[];
    image(html: string): string;
}
export declare const parser: Parser;
export default parser;
