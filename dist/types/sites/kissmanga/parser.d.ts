/// <reference types="node" />
/**
 * Created by rodriguesc on 24/03/2017.
 */
import "../../declarations";
import { Chapter, FilteredResults, MangaInfo, MangaSource, MangaXDoc, SiteParser } from "../../declarations";
import { Script } from "vm";
export declare class Parser implements SiteParser {
    readonly secretAlgorithm: string;
    private _secretAlgorithm;
    private _vm;
    private static fixNames;
    private static resolveName;
    mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
    latest($: MangaXDoc): Promise<Chapter[]> | Chapter[];
    info($: MangaXDoc): Promise<MangaInfo> | MangaInfo;
    chapters($: MangaXDoc): Promise<Chapter[]> | Chapter[];
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
