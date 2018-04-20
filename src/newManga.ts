import {filter, FilteredResults, MangaFilter} from "./filter";
import FilterSupport = filter.FilterSupport;
import {ChapterCollection, MangaCollection} from "./interface";

enum MangaSites {
    MangaHere = "MangaHere",
    MangaPanda = "MangaPanda",
}

interface MangaInfo {

}


const getSiteInfo = async (site: MangaSites) => ({});

class MangaObject {
    private _cachedInfo: { [id: string], MangaInfo } = {};

    get name() {
        return this._name;
    }


    constructor(private _name: string, private _defaultSite? = MangaSites) {

    }


    info(site: MangaSites = this._defaultSite) {
        if (!site) {
            throw new Error("Invalid site");
        }

        const cached = this._cachedInfo[site];
        if (cached) {
            return cached;
        }

        return getSiteInfo(site)
            .then((r) => {
                this._cachedInfo[site] = r;
                return r;
            });
    }


}





class MangaHereObject {

}




