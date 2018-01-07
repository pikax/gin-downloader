import { gin, InfoChapter, Site, ImageCollection, Chapter } from "./interface";
import ChapterSource = gin.ChapterSource;
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
    fetch(): Promise<ImageCollection>;
}
