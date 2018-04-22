import {resolve} from "path";
import {existsSync, readFileSync} from "fs";


const htmlDir = resolve(__dirname, "../__html__");

export class OfflineFileProvider {
    private _dirPath: string;

    constructor(public readonly sitename: string) {
        this._dirPath = resolve(htmlDir, sitename);

        if (!existsSync(this._dirPath)) {
            throw  new Error(`${sitename} doesn't exist`);
        }
    }


    getFile(filename: string): string {
        const fp = resolve(this._dirPath, filename);

        return readFileSync(fp).toString();
    }
}
