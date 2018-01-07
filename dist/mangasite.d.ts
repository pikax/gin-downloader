/// <reference types="debug" />
/// <reference types="request" />
import { IDebugger } from "debug";
import { FilteredResults, MangaFilter } from "./filter";
import { Chapter, gin, ImageCollection, Info, Site, InfoChapter } from "./interface";
import { RequestStrategy, OptionsWithUrl } from "./request/index";
import MangaSource = gin.MangaSource;
import MangaXDoc = gin.MangaXDoc;
import NameHelper = gin.NameHelper;
import SiteConfig = gin.SiteConfig;
import SiteParser = gin.SiteParser;
export declare abstract class MangaSite<C extends SiteConfig, P extends SiteParser, N extends NameHelper> implements Site {
    abstract sitename: string;
    private _parser;
    protected verbose: IDebugger;
    protected debug: IDebugger;
    protected error: IDebugger;
    private _config;
    private _nameHelper;
    readonly parser: P;
    readonly config: C;
    readonly nameHelper: N;
    protected constructor(config: C, parser: P, nameHelper: N);
    mangas(): Promise<MangaSource[]>;
    filter(filter?: MangaFilter): Promise<FilteredResults>;
    latest(): Promise<Chapter[]>;
    info(name: string): Promise<Info>;
    chapters(name: string): Promise<Chapter[]>;
    infoChapters(name: string): Promise<InfoChapter>;
    infoChaptersByUrl(src: string): Promise<InfoChapter>;
    images(name: string, chapter: any): Promise<ImageCollection>;
    imagesByUrl(url: string): Promise<ImageCollection>;
    resolveMangaUrl(name: string): Promise<string> | string;
    protected buildRequest(url: string): OptionsWithUrl;
    protected buildMangasRequest(url: string): OptionsWithUrl;
    protected buildLatestRequest(url: string): OptionsWithUrl;
    protected buildInfoRequest(url: string): OptionsWithUrl;
    protected buildChapterRequest(url: string): OptionsWithUrl;
    protected buildImagePathsRequest(url: string): OptionsWithUrl;
    protected getStrategy(): RequestStrategy;
    protected getHtml(url: string | OptionsWithUrl): Promise<string>;
    protected getDoc(url: string | OptionsWithUrl): Promise<MangaXDoc>;
    protected postHtml(url: string | OptionsWithUrl, params?: any): Promise<string>;
    protected postDoc(url: string | OptionsWithUrl, params?: any): Promise<MangaXDoc>;
    protected resolveChapterSource(name: string, chapter: number | string): Promise<string>;
    private processImagePath(opts);
}
export default Site;
