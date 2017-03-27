/**
 * Created by rodriguesc on 10/03/2017.
 */
import "../declarations";
import { MangaXDoc } from "../declarations";
export declare const parseDoc: (source: string, params?: {
    location: string;
}) => MangaXDoc;
export declare const getDoc: (uri: string) => Promise<MangaXDoc>;
