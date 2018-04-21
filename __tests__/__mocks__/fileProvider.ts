import {IMatchFileProvider} from "../../src/factories/__mocks__/mockMangaRequest";
import {resolve} from "url";
import {readFile} from "fs";

const htmlDir = resolve(__dirname, "__html__/");

export class MockFileProvider implements IMatchFileProvider {
    private _matchers: RegExp[];

    constructor(private _list: { [id: string]: RegExp }) {
        this._matchers = Object.keys(_list).map(x => _list[x]);
    }


    getHtml(uri: string): Promise<string> {
        const path = this.getMatch(uri);

        if (!path) {
            throw new Error(`'${uri}' no match found`);
        }

        const fp = resolve(htmlDir, path);

        return new Promise((res, rej) => {
            readFile(fp, ((err, data) => {
                if (err) {
                    return rej(err);
                }
                res(data);
            }));
        });
    }


    private getMatch(uri: string): string {
        const matches = this._matchers.filter(x => x.test(uri));

        if (matches.length === 0) {
            console.warn("No match found for '${uri}'");
            return null;
        }
        if (matches.length > 1) {
            console.warn(`Multiple match for the uri: '${uri}'\n${matches.join(" | ")}`);
        }

        const path = Object.keys(this._list).find(x => this._list[x] === matches[0]);

        if (!path) {
            console.error(`Invalid match from list '${matches[0].toString()}'`);
        }
        return path;
    }


}
