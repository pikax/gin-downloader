import {gin, InfoChapter, Site, ImageCollection, IChapter, GinImage} from "./interface";

import ChapterSource = gin.ChapterSource;
import {Lazy} from "./util";


export class SuperObject {
  get chapters(): SuperChapter[] {
    return this._chapters;
  }

  private _chapters: SuperChapter[];

  get info(): InfoChapter {
    return {...this._info} as InfoChapter;
  }

  private _info: InfoChapter;


  constructor(readonly name: string, readonly site: Site, readonly url?: string) {

  }

  async update(): Promise<InfoChapter> {
    const p = this.url
      ? this.site.infoChaptersByUrl(this.url)
      : this.site.infoChapters(this.name);

    const info = await p;

    const chapters = info.chapters.map((x: ChapterSource) => this.toSuperChapter(x));
    this._chapters = chapters;

    return this._info = info;
  }

  private toSuperChapter(chapter: ChapterSource): SuperChapter {
    let c = new SuperChapter(this, chapter);
    return c;
  }


}


export class SuperChapter {
  get images(): ImageCollection {
    return this._images;
  }

  get source(): IChapter {
    return this._source;
  }

  private _images: ImageCollection;

  constructor(readonly master: SuperObject, private readonly _source: ChapterSource) {
  }

  async fetch(): Promise<ImageCollection> {
    return this._images || (this._images = await this.master.site.imagesByUrl(this._source.src));
  }

}



