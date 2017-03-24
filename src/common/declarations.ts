/**
 * Created by rodriguesc on 24/03/2017.
 */

import {HTMLDocument} from '@types/libxmljs'
import {URL} from "url";

export interface IMangaXDoc extends HTMLDocument{
    baseUrl : string,
    location : string,
}

export interface IRequest {
    getHtml(requestedPath : string | URL, params : any) : Promise<string>;
    getBytes(requestedPath : string | URL, params : any) : Promise<any>;
}

export interface IName{
    toName(name:string) : string,
    resolveUrl(name:string) : string,
}


export interface IConfig {
    site:string,
    name : string,
    mangas_url : string,
    latest_url: string,

}

export interface IMangas{
    name:string,
    src:string,
}

export interface IChapter{
    number: string,
    src : string,
    volume? :string,
    name? : string,
}


export interface IImage{
    src:string,
    name:string,
}

export interface IParser{
    mangas(doc: IMangaXDoc): Promise<IMangas[]>;
    latest(doc: IMangaXDoc):Promise<IChapter[]>;

    info(doc: IMangaXDoc): Promise<any>;
    chapters(doc: IMangaXDoc) : Promise<IChapter[]>;

    images(doc: IMangaXDoc) : Promise<Promise<IImage>>[];


    imagesPaths(doc: IMangaXDoc) : string[];
    image(html:string) : string;
}

export interface ISite{
    mangas(): Promise<IMangas[]>;
    latest():Promise<IChapter[]>;

    info(name:string): Promise<any>;
    chapters(name:string) : Promise<IChapter[]>;

    images(name:string,chapter:string) : Promise<Promise<IImage>>[];
}



