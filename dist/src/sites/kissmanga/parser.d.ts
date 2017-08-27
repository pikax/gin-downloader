/// <reference types="node" />
import { Script } from "vm";
import { FilteredResults } from "src/filter";
import { gin, Info } from "src/interface";
import ChapterSource = gin.ChapterSource;
import MangaSource = gin.MangaSource;
import MangaXDoc = gin.MangaXDoc;
import SiteParser = gin.SiteParser;
export declare class Parser implements SiteParser {
    readonly secretAlgorithm: string;
    private _secretAlgorithm;
    private _vm;
    private static fixNames;
    private static resolveName;
    mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
    latest($: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[];
    info($: MangaXDoc): Promise<Info> | Info;
    chapters($: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[];
    imagesList(html: string, secret: string, vm: Script): string[];
    getSecret(html: string): string;
    imagesPaths(doc: MangaXDoc): string[];
    image(html: string): string;
    readonly VM: Script;
    buildVM(cajs: string, lojs: string, algorithm: string): Script;
    filter(doc: MangaXDoc): Promise<FilteredResults> | FilteredResults;
    static ResolveChapterVolume(title: string): string;
    static ResolveChapterNumber(title: string): number;
    static ResolveChapterName(title: string): string;
}
export declare const parser: Parser;
export default parser;
