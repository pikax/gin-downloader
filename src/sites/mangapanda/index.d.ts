/**
 * Created by rodriguesc on 05/03/2017.
 */
import { MangaSite } from "../../common/mangasite";
export declare class MangaPanda extends MangaSite {
    constructor();
    protected resolveChapterSource(name: string, chapter: number): Promise<string>;
}
export declare const manga: MangaPanda;
export default manga;
