/// <reference types="request" />
/**
 * Created by pikax on 23/05/2017.
 */
import { Options } from "request";
export declare const Headers: {
    "Accept-Charset": string;
    "Accept-Language": string;
    "Connection": string;
    "Accept": string;
    "User-Agent": string;
    "Accept-Encoding": string;
};
export interface RequestStrategy {
    request(options: string | Options): Promise<any>;
}
