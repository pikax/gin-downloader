import { NameHelper } from "../../declarations";
export declare class Helper implements NameHelper {
    toName(name: string): string;
    resolveUrl(name: string): string;
}
export declare const helper: Helper;
export default helper;
