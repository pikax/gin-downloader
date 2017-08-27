import { gin } from "src/interface";
import NameHelper = gin.NameHelper;
export declare class Helper implements NameHelper {
    toName(name: string): string;
    resolveUrl(name: string): string;
}
export declare const helper: Helper;
export default helper;
