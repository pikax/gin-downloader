/**
 * Created by pikax on 26/06/2017.
 */
import {MangaFilter} from "./filter";


export enum Type {
  Manga = "Manga",
  Manhwa = "Manhwa",
  Manhua = "Manhua",
  Comic = "Comic",
  Artbook = "Artbook", // An artbook is a title that contains purely art and has no story
  Other = "Other", // bato.to
}



export interface Source {
  src: string;
}

export interface Manga {
  name: string;
  status?: string;
  mature?: boolean;

  image?: string;
}

export interface Chapter {
  chap_number?: string;
  volume?: string;
  name?: string;

  language?: string;
  scanlator?: string;
  dateAdded?: string;

  licensed?: boolean;
}

export interface Synonym {
  title: string;
  language: string;
}

export interface Info {
  image: string;
  title: string;

  synonyms?: Synonym[];
  released?: string;
  authors?: string[];
  artists?: string[];
  genres?: string[];
  synopsis?: string;
  status?: string;

  type?: Type;
  licensed?: boolean;


  // site specific
  ranked?: string;
  rating?: string;
  scanlators?: string[];
  similar?: string[];
  views?: string;
}

export interface GinImage extends Source {
  name: string;
}


// TODO move me
export class GinImagePromise {
  get image(): Promise<GinImage> {
    return this._func();
  }

  constructor(private _func: () => Promise<GinImage>) {}
}

export interface MangaResults {
  results: Manga[];
  page: number;
  total: number;
}

export type ChapterCollection = Chapter[];
export type MangaCollection = Manga[];
export type ImageCollection = GinImagePromise[];
export type InfoChapter = Info & {chapters: ChapterCollection};


export interface Site {
  mangas(filter?: MangaFilter): Promise<MangaCollection>;
  filter(filter?: MangaFilter): Promise<MangaResults>;

  latest(): Promise<ChapterCollection>;

  info(name: string): Promise<Info>;
  chapters(name: string): Promise<ChapterCollection>;

  infoChapters(name: string): Promise<InfoChapter>;
  images(name: string, chapter: string): Promise<ImageCollection>;
}


export namespace gin {

  export interface Request {
    getHtml(requestedPath: string | URL, params?: any): Promise<string>;
    getBytes(requestedPath: string | URL, params?: any): Promise<any>;
    getDoc(requestedPath: string): Promise<MangaXDoc>;

    postHtml(requestedPath: string | URL, params?: any): Promise<string>;
    postBytes(requestedPath: string | URL, params?: any): Promise<any>;
    postDoc(requestedPath: string| URL, params?: any): Promise<MangaXDoc>;
  }


  export interface MangaXDoc extends CheerioStatic {
    location: string;
  }

  export interface SiteConfig {
    site: string;
    name: string;
    mangas_url: string;
    latest_url: string;
  }


  export interface GinSite extends Site {

    resolveMangaUrl(name: string): Promise<string>|string;
  }


  export type MangaSource = Manga & Source;
  export type ChapterSource = Chapter & Source;
  export type MangaInfoSource = Info & Source;


  export interface SiteParser {
    mangas(doc: MangaXDoc): Promise<MangaSource[]>;
    filter(doc: MangaXDoc): Promise<MangaResults>;

    latest(doc: MangaXDoc): Promise<ChapterSource[]> ;

    info(doc: MangaXDoc): Promise<MangaInfoSource>;
    chapters(doc: MangaXDoc): Promise<ChapterSource[]>;

    imagesPaths(doc: MangaXDoc): string[];
    image(html: string): string;
  }


  export interface NameHelper {
    toName(name: string): string;
    resolveUrl(name: string): string;
  }

}

