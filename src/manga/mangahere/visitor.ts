import {resolve} from "url";

import {IMangaConfig, IMangaRequestFactory, IMangaVisitor} from "../interface";
import {IMangaConfigDependency, IMangaRequestFactoryDependency} from "../../interface";


type di = IMangaConfigDependency;

export class MangaHereVisitor implements IMangaVisitor {

    private _config: IMangaConfig;

    constructor(dependencies: di) {
        this._config = dependencies.config;
    }

    * latest(): Iterable<{ href: string, page: number; total: number }> {
        const total = 100;
        const latest = this._config.latestUrl;

        yield {
            href: latest,
            page: 1,
            total
        };

        for (let i = 2; i <= total; ++i) {
            yield {
                href: resolve(this._config.latestUrl, i.toString()),
                page: i,
                total
            };
        }
    }

    * mangas(): Iterable<{ href: string; page: number; total: number }> {
        yield {
            href: this._config.mangasUrl,
            page: 1,
            total: 1
        };
    }


}
