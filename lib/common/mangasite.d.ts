/**
 * Created by rodriguesc on 24/03/2017.
 */
import { Chapter, SiteConfig, ImageSource, MangaInfo, MangaSource, NameHelper, SiteParser, Site } from "../declarations";
import { IDebugger } from "debug";
export declare class MangaSite implements Site {
    protected parser: SiteParser;
    protected verbose: IDebugger;
    protected debug: IDebugger;
    protected config: SiteConfig;
    protected nameHelper: NameHelper;
    protected constructor(config: SiteConfig, parser: SiteParser, nameHelper: NameHelper);
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
    private static processImagePath(src, parser);
}
export default Site;
