import "../declarations";
import { MangaXDoc, Request } from "../declarations";
export declare const getHtml: (requestedPath: string, params?: any) => Promise<string>;
export declare const getBytes: (requestedPath: string, params: any) => Promise<any>;
export declare const getDoc: (requestedPath: string) => Promise<MangaXDoc>;
export declare const request: Request;
export default request;
