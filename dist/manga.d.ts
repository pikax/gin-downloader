import { IChapter, IChapterResolverDependency, IImageResolverDependency, IInfoResolverDependency, ImageCollection, IManga, IMangaObject, IReadOnlyManga, MangaInfo } from "./interface";
export declare type MangaObjectDependencies = IImageResolverDependency & IChapterResolverDependency & IInfoResolverDependency;
export declare class MangaObject implements IMangaObject, IReadOnlyManga {
    private _src;
    private _manga;
    private _chapters;
    private _info;
    private _chapterResolver;
    private _infoResolver;
    private _imageResolver;
    readonly name: string;
    readonly status: string;
    readonly mature: boolean;
    readonly image: string;
    manga(): {
        name: string;
        status?: string;
        mature?: boolean;
        image?: string;
    };
    constructor(dependencies: MangaObjectDependencies, _src: string, _manga: IManga);
    chapters(): Promise<IChapter[]>;
    images(chapter: IChapter | string | number): Promise<ImageCollection>;
    info(): Promise<MangaInfo>;
}
