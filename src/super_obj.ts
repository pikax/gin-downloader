

import {gin, InfoChapter, Site, ImageCollection, Chapter, GinImage} from "src/interface";
import ChapterSource = gin.ChapterSource;
import {Lazy} from "src/util";


export class SuperObject {
  get chapters(): SuperChapter[] {
    return this._chapters;
  }
  private _chapters: SuperChapter[];

  get info(): InfoChapter {
    return {...this._info};
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

  get source(): Chapter{
    return this._source;
  }

  private _images: ImageCollection;
  constructor(readonly master: SuperObject, private readonly _source: ChapterSource) {
  }

  async fetch() {
    return this._images || (this._images = await this.master.site.imagesByUrl(this._source.src));
  }

}



