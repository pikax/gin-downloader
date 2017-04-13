/**
 * Created by rodriguesc on 24/03/2017.
 */
import { Chapter, SiteConfig, ImageSource, MangaInfo, MangaSource, NameHelper, SiteParser, Site, Request } from "../declarations";
import { IDebugger } from "debug";
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
    readonly request: Request;
    protected constructor(config: C, parser: P, nameHelper: N, request: Request);
    mangas(): Promise<MangaSource[]>;
    latest(): Promise<Chapter[]>;
    info(name: string): Promise<MangaInfo>;
    chapters(name: string): Promise<Chapter[]>;
    infoChapters(name: string): Promise<{
        info: MangaInfo;
        chapters: Chapter[];
    }>;
    images(name: string, chapter: number): Promise<Promise<ImageSource>[]>;
    protected resolveChapterSource(name: string, chapter: number): Promise<string>;
    private static processImagePath(src, parser, request);
}
export default Site;
