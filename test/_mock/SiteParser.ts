/**
 * Created by pikax on 13/04/2017.
 */

import {Chapter, MangaInfo, MangaSource, MangaXDoc, SiteParser} from "../../src/declarations";

import {chapters, latest, info, mangas, image, imagesPaths} from "./_results";

export class Parser implements SiteParser {
  mangas(doc: MangaXDoc): MangaSource[] | Promise<MangaSource[]> {
    return mangas;
  }

  latest(doc: MangaXDoc): Chapter[] | Promise<Chapter[]> {
    return latest;
  }

  info(doc: MangaXDoc): MangaInfo | Promise<MangaInfo> {
    return info;
  }

  chapters(doc: MangaXDoc): Chapter[] | Promise<Chapter[]> {
    return chapters;
  }

  imagesPaths(doc: MangaXDoc): string[] {
    return imagesPaths;
  }

  image(html: string): string {
    return image;
  }
}

