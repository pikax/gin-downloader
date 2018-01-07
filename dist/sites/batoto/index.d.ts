/// <reference types="request" />
import { OptionsWithUrl } from "request";
import { FilteredResults, MangaFilter } from "./../../filter";
import { gin, LoginSite } from "./../../interface";
import { MangaSite } from "./../../mangasite";
import { Helper } from "./names";
import { Parser } from "./parser";
import MangaSource = gin.MangaSource;
import SiteConfig = gin.SiteConfig;
export declare class Batoto extends MangaSite<SiteConfig, Parser, Helper> implements LoginSite {
    sitename: string;
    private _urlCache;
    constructor();
    resolveMangaUrl(name: string): Promise<string>;
    mangas(filter?: MangaFilter): Promise<MangaSource[]>;
    filter(filter?: MangaFilter): Promise<FilteredResults>;
    protected resolveChapterSource(name: string, chapter: number): Promise<string>;
    protected buildChapterRequest(url: string): OptionsWithUrl;
    isLoggedIn(): Promise<boolean>;
    login(user: string, pw: string, rememberMe?: boolean): Promise<boolean>;
}
export declare const manga: Batoto;
export default manga;
