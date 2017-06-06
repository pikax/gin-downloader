/**
 * Created by rodriguesc on 24/03/2017.
 */
import { Chapter, SiteConfig, ImageSource, MangaInfo, MangaSource, NameHelper, SiteParser, Site, FilterSupport, FilteredResults, MangaXDoc } from "../declarations";
import { IDebugger } from "debug";
import { RequestStrategy } from "../request/headers";
import { GinRequest } from "../request";
import { OptionsWithUrl } from "request";
export declare class MangaSite<C extends SiteConfig, P extends SiteParser, N extends NameHelper> implements Site {
    private _parser;
    protected verbose: IDebugger;
    protected debug: IDebugger;
    private _config;
    private _nameHelper;
    private _request;
    readonly parser: P;
    readonly config: C;
    readonly nameHelper: N;
    readonly request: GinRequest;
    protected constructor(config: C, parser: P, nameHelper: N, strategy: RequestStrategy);
    mangas(): Promise<MangaSource[]>;
    filter(filter?: FilterSupport): Promise<FilteredResults>;
    latest(): Promise<Chapter[]>;
    info(name: string): Promise<MangaInfo>;
    chapters(name: string): Promise<Chapter[]>;
    infoChapters(name: string): Promise<{
        info: MangaInfo;
        chapters: Chapter[];
    }>;
    images(name: string, chapter: any): Promise<Promise<ImageSource>[]>;
    resolveMangaUrl(name: string): Promise<string> | string;
    protected buildRequest(url: string): OptionsWithUrl;
    protected buildMangasRequest(url: string): OptionsWithUrl;
    protected buildLatestRequest(url: string): OptionsWithUrl;
    protected buildInfoRequest(url: string): OptionsWithUrl;
    protected buildChapterRequest(url: string): OptionsWithUrl;
    protected buildImagePathsRequest(url: string): OptionsWithUrl;
    protected getHtml(url: string | OptionsWithUrl): Promise<string>;
    protected getDoc(url: string | OptionsWithUrl): Promise<MangaXDoc>;
    protected postDoc(url: string | OptionsWithUrl, params?: any): Promise<MangaXDoc>;
    protected resolveChapterSource(name: string, chapter: number): Promise<string>;
    private processImagePath(opts);
}
export default Site;
