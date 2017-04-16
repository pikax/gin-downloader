/// <reference types="node" />
/**
 * Created by rodriguesc on 24/03/2017.
 */
import "../../declarations";
import { Chapter, FilteredResults, MangaInfo, MangaSource, MangaXDoc, SiteParser } from "../../declarations";
import { Script } from "vm";
export declare class Parser implements SiteParser {
    private _vm;
    private static fixNames;
    private static resolveName;
    mangas(doc: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
    latest(doc: MangaXDoc): Promise<Chapter[]> | Chapter[];
    info(doc: MangaXDoc): Promise<MangaInfo> | MangaInfo;
    chapters(doc: MangaXDoc): Promise<Chapter[]> | Chapter[];
    imagesList(html: string, secret: string, vm: Script): string[];
    getSecret(html: string): string;
    imagesPaths(doc: MangaXDoc): string[];
    image(html: string): string;
    readonly VM: Script;
    buildVM(cajs: string, lojs: string): Script;
    filter(doc: MangaXDoc): Promise<FilteredResults> | FilteredResults;
}
export declare const parser: Parser;
export default parser;
