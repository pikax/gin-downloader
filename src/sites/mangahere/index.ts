import {MangaSite} from "../../mangasite";
import {Parser} from "./parser";
import {Helper} from "./names";
import {processFilter} from "./filter";
import {gin} from "../../interface";
import {config} from "./config";

import {FilteredResults, MangaFilter} from "../../filter";
import SiteConfig = gin.SiteConfig;


export class MangaHere extends MangaSite<SiteConfig, Parser, Helper> {

    public constructor() {
        super("MangaHere", config, new Parser(), new Helper());
    }


    async filter(filter?: MangaFilter): Promise<FilteredResults> {
        this.debug("filter mangas with: %o", filter);

        let search = processFilter(filter);

        let doc = await this.getDoc(search.src);
        let mangas = await this.parser.filter(doc);

        this.debug(`mangas: ${mangas.results.length}`);

        return mangas;
    }

}


export const manga = new MangaHere();
export default manga;
