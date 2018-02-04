/**
 * Created by pikax on 13/04/2017.
 */

import {Chapter, FilteredResults, MangaInfo, MangaSource, MangaXDoc, SiteParser} from "../../src/declarations";

import * as results from "./_results";

export class Parser implements SiteParser {
  filter(doc: MangaXDoc): Promise<FilteredResults> | FilteredResults {
    return <FilteredResults>{
      results: results.mangas,
      page: 1,
      total: 1
    } ;
  }
  mangas(doc: MangaXDoc): MangaSource[] | Promise<MangaSource[]> {
    return results.mangas;
  }

  latest(doc: MangaXDoc): Chapter[] | Promise<Chapter[]> {
    return results.latest;
  }

  info(doc: MangaXDoc): MangaInfo | Promise<MangaInfo> {
    return results.info;
  }

  chapters(doc: MangaXDoc): Chapter[] | Promise<Chapter[]> {
    return results.chapters;
  }

  imagesPaths(doc: MangaXDoc): string[] {
    return results.imagesPaths;
  }

  image(html: string): string {
    return results.image;
  }
}

