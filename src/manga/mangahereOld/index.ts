import {IMangaSite} from "../interface";
import {ChapterCollection, MangaCollection, MangaInfo} from "../../interface";


export class MangaHere implements IMangaSite {


    chapters(): Promise<ChapterCollection> {
        return undefined;
    }

    info(): Promise<MangaInfo> {
        return undefined;
    }

    mangas(): Promise<MangaCollection> {
        return undefined;
    }

/*
    private getCheerio = () => {

        return
    }*/

}


export const mangahere = new MangaHere();
export default mangahere;
