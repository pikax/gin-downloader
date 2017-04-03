/// <reference types="node" />
/**
 * Created by rodriguesc on 27/03/2017.
 */
import { MangaXDoc, Request } from "../declarations";
export declare const getHtml: (requestedPath: string, params?: any) => Promise<string>;
export declare const getBytes: (requestedPath: string, params?: any) => Promise<Buffer>;
export declare const getDoc: (requestedPath: string) => Promise<MangaXDoc>;
export declare const postBytes: (requestedPath: string, params?: any) => Promise<Buffer>;
export declare const postHtml: (requestedPath: string, params?: any) => Promise<string>;
export declare const postDoc: (requestedPath: string, params?: any) => Promise<MangaXDoc>;
export declare const request: Request;
export default request;
