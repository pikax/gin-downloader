import { gin, InfoChapter, Site, ImageCollection, Chapter, GinImage } from "src/interface";
import ChapterSource = gin.ChapterSource;
import { Lazy } from "src/util";
export declare class SuperObject {
    readonly name: string;
    readonly site: Site;
    readonly url: string;
    readonly chapters: SuperChapter[];
    private _chapters;
    readonly info: InfoChapter;
    private _info;
    constructor(name: string, site: Site, url?: string);
    update(): Promise<InfoChapter>;
    private toSuperChapter(chapter);
}
export declare class SuperChapter {
    readonly master: SuperObject;
    private readonly _source;
    readonly images: ImageCollection;
    readonly source: Chapter;
    private _images;
    constructor(master: SuperObject, _source: ChapterSource);
    fetch(): Promise<Lazy<Promise<GinImage>>[]>;
}
