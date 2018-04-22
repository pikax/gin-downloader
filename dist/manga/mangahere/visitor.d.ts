import { IMangaVisitor } from "../interface";
import { IMangaConfigDependency } from "../../interface";
export declare type MangaHereVisitorDependencies = IMangaConfigDependency;
export declare class MangaHereVisitor implements IMangaVisitor {
    private _config;
    constructor(dependencies: MangaHereVisitorDependencies);
    latest(): IterableIterator<{
        href: string;
        page: number;
        total: number;
    }>;
    mangas(): IterableIterator<{
        href: string;
        page: number;
        total: number;
    }>;
}
