/**
 * Created by david on 25/03/2017.
 */
import "./declarations";
import { MangaFox } from "./sites/mangafox";
import { MangaHere } from "./sites/mangahere";
import { MangaPanda } from "./sites/mangapanda";
export declare const gin: {
    MangaFox: typeof MangaFox;
    MangaHere: typeof MangaHere;
    MangaPanda: typeof MangaPanda;
};
export default gin;
