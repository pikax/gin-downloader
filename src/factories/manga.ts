import {
    ChapterSource,
    IChapter,
    IChapterExtended, IChapterResolver,
    ILazy, ImageCollection,
    IManga,
    IMangaExtended,
    IMangaFactory, IMangaInfoResolver, IMangaObject, Info,
    IReadOnlyManga,
    MangaInfo
} from "../interface";
import {IMangaConfig, IMangaParser, IMangaRequest, IMangaRequestFactory, MangaRequestResult} from "../manga/interface";
import {Lazy} from "../util/lazy";

export class ExtendedMangaFactory implements IMangaFactory {

    constructor(private _requestFactory: IMangaRequestFactory, private _parser: IMangaParser) {

    }


    create(src: string, manga: IManga): IMangaObject {
        const lazySrc = this.lazyRequest(src);

        const lazyChapters = new Lazy(() => this.resolveChaptersPromise(lazySrc));
        const lazyInfo = new Lazy(() => this.resolveInfoPromise(lazySrc));


    }


    private lazyRequest(src: string) {
        return new Lazy(() => this._requestFactory.request({uri: src}));
    }


    private async resolveChaptersPromise(lazy: ILazy<Promise<IMangaRequest>>) {
        const result = await lazy.value;

        return this._parser.chapters(result);
    }

    private async resolveInfoPromise(lazy: ILazy<Promise<IMangaRequest>>) {
        const result = await lazy.value;

        return this._parser.info(result);
    }


}


interface IImageResolver {
}

export class MangaObject implements IMangaObject, IReadOnlyManga {
    private _chapters: ChapterSource[];
    private _info: Promise<Info>;

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


    constructor(private _src: string, private _manga: IManga, private _chapterResolver: IChapterResolver, private _infoResolver: IMangaInfoResolver, private _imagesResolver: IImageResolver) {
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
        return this._imagesResolver.images(src);
    }

    info(): Promise<Info> {
        return this._info || (this._info = this._infoResolver.info(this._src));
    }
}



