import { IMangaParser, IMangaRequest } from "../interface";
import { MangaSource } from "../../filter";
import { ChapterSource, IChapter, IMangaConfigDependency, IMangaGenreDependency, IMangaLoggerDependency, MangaInfo } from "../../interface";
export declare type MangaHereParserDependencies = IMangaLoggerDependency & IMangaConfigDependency & IMangaGenreDependency;
export declare class MangaHereParser implements IMangaParser {
    private _logger;
    private _config;
    private _genreSite;
    constructor(dependencies: MangaHereParserDependencies);
    mangas(mangaRequest: IMangaRequest): IterableIterator<MangaSource>;
    latest(mangaRequest: IMangaRequest): IterableIterator<IChapter & {
        src: string;
        mangaSrc: string;
    }>;
    info(mangaRequest: IMangaRequest): MangaInfo;
    chapters(mangaRequest: IMangaRequest): IterableIterator<ChapterSource>;
    imagesPaths(mangaRequest: IMangaRequest): IterableIterator<{
        name: string;
        src: string;
    }>;
    image(mangaRequest: IMangaRequest): string;
    filterPage(mangaRequest: IMangaRequest): {
        page: number;
        total: number;
    };
}
