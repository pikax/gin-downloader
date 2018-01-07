import {MangaFilter} from "./filter";
import {Lazy} from "./util";
import {Type} from "./enum";

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
  mature?: boolean;


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

export interface MangaResults {
  results: Manga[];
  page: number;
  total: number;
}


export type GinImagePromise = Lazy<Promise<GinImage>>;
export type ChapterCollection = Chapter[];
export type MangaCollection = Manga[];
export type ImageCollection = GinImagePromise[];
export type InfoChapter = Info & { chapters: ChapterCollection };


export interface Site {
  mangas(filter?: MangaFilter): Promise<MangaCollection>;

  filter(filter?: MangaFilter): Promise<MangaResults>;

  latest(): Promise<ChapterCollection>;

  info(name: string): Promise<Info>;

  chapters(name: string): Promise<ChapterCollection>;

  infoChapters(name: string): Promise<InfoChapter>;

  images(name: string, chapter: string| number): Promise<ImageCollection>;


  infoChaptersByUrl(url: string): Promise<InfoChapter>; // todo not sure, probably hide this behind symbol
  imagesByUrl(url: string): Promise<ImageCollection>; // todo not sure, probably hide this behind symbol
}

export interface LoginSite extends Site {
  login(user: string, pw: string, rememberMe?: boolean): Promise<boolean>;
}

export namespace gin {

  export interface Request {
    getHtml(requestedPath: string | URL, params?: any): Promise<string>;

    getBytes(requestedPath: string | URL, params?: any): Promise<any>;

    getDoc(requestedPath: string): Promise<MangaXDoc>;

    postHtml(requestedPath: string | URL, params?: any): Promise<string>;

    postBytes(requestedPath: string | URL, params?: any): Promise<any>;

    postDoc(requestedPath: string | URL, params?: any): Promise<MangaXDoc>;
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
    resolveMangaUrl(name: string): Promise<string> | string;
  }


  export type MangaSource = Manga & Source;
  export type ChapterSource = Chapter & Source;
  export type MangaInfoSource = Info & Source;


  export interface SiteParser {
    mangas(doc: MangaXDoc): Promise<MangaSource[]> | MangaSource[];

    filter(doc: MangaXDoc): Promise<MangaResults> | MangaResults;

    latest(doc: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[];

    info(doc: MangaXDoc): Promise<Info> | Info;

    chapters(doc: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[];

    imagesPaths(doc: MangaXDoc): string[];

    image(html: string): string;
  }

  export interface NameHelper {
    toName(name: string): string;

    resolveUrl(name: string): string;
  }
}

