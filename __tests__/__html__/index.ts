import {resolve} from "path";
import {readFileSync, exists, existsSync} from "fs";


export function getFile(site: string, filename: string) {
    const fp = resolve(__dirname, site, filename);

    return readFileSync(fp);
}


export class OfflineFileProvider {

    private _dirPath: string;

    constructor(public readonly sitename: string) {
        this._dirPath = resolve(__dirname, sitename);

        if (!existsSync(this._dirPath)) {
            throw  new Error(`${sitename} doesn't exist`);
        }
    }


    getFile(filename: string): string {
        const fp = resolve(this._dirPath, filename);

        return readFileSync(fp).toString();
    }

}
