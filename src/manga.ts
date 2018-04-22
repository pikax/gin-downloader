import {
    ChapterSource, IChapter,
    IChapterResolver, IChapterResolverDependency, IImageResolver, IImageResolverDependency, IInfoResolverDependency,
    ImageCollection,
    IManga,
    IMangaInfoResolver,
    IMangaObject, IReadOnlyManga,
    MangaInfo
} from "./interface";


export type MangaObjectDependencies = IImageResolverDependency & IChapterResolverDependency & IInfoResolverDependency;

export class MangaObject implements IMangaObject, IReadOnlyManga {
    private _chapters: ChapterSource[];
    private _info: Promise<MangaInfo>;


    private _chapterResolver: IChapterResolver;
    private _infoResolver: IMangaInfoResolver;
    private _imageResolver: IImageResolver;

    get name() {
        return this._manga.name;
    }

    get status() {
        return this._manga.status;
    }

    get mature() {
        return this._manga.mature;
    }

    get image() {
        return this._manga.image;
    }


    constructor(dependencies: MangaObjectDependencies, private _src: string, private _manga: IManga) {
        this._chapterResolver = dependencies.chapterResolver;
        this._infoResolver = dependencies.infoResolver;
        this._imageResolver = dependencies.imageResolver;
    }

    async chapters(): Promise<IChapter[]> {
        const chapters = await this._chapterResolver.chapters(this._src);
        this._chapters = chapters;

        return chapters.map(x => ({...x, src: undefined}));
    }

    async images(chapter: IChapter): Promise<ImageCollection> {
        const {chap_number} = chapter;

        // resolve chapters if not resolved yet
        if (!this._chapters) {
            await this.chapters();
        }

        const chapters = this._chapters;

        const chap = chapters.find(x => x.chap_number === chap_number);
        if (!chap) {
            throw new Error("Chapter not found");
        }

        const src = chap.src;
        return this._imageResolver.images(src);
    }

    info(): Promise<MangaInfo> {
        return this._info || (this._info = this._infoResolver.info(this._src));
    }
}
