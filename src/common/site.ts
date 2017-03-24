/**
 * Created by rodriguesc on 24/03/2017.
 */

import {IChapter, IConfig, IImage, IMangas, IName, IParser, ISite} from "./declarations";
import * as debug from "debug";
import {IDebugger} from "debug";


export default  class Site implements ISite{
    protected parser: IParser;
    protected verbose: IDebugger;
    protected debug : IDebugger;
    protected config: IConfig;
    protected nameHelper: IName;


    constructor(config : IConfig, parser : IParser, nameHelper : IName){
        this.debug  = debug(`gin-downloader:${config.name}`);
        this.verbose = debug(`gin-downloader:${config.name}:verbose`);

        this.config = config;
        this.parser = parser;
        this.nameHelper = nameHelper;
    }

    mangas(): Promise<IMangas> {
        this.debug('getting mangas');

        return getDoc(this.config.mangas_url)
            .then(this.mangas)
            .tap(x=>this.debug(`mangas: ${x.length}`));
    }

    latest(): Promise<IChapter[]> {
        return undefined;
    }

    info(name: string): Promise<any> {
        return undefined;
    }

    chapters(name: string): Promise<IChapter[]> {
        return undefined;
    }

    images(name: string, chapter: string): Promise<Promise<IImage>>[] {
        return undefined;
    }




}