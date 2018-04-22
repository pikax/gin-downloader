import {OptionsWithUri} from "request";
import {IMangaRequest, IMangaRequestFactory} from "../../interface";
import {MangaRequestResult} from "../../util/mangaRequestResult";


export interface IMatchFileProvider {
    getHtml(uri: string): Promise<string>;
}


export class MockMangaRequestFactory implements IMangaRequestFactory {

    constructor(private _provider: IMatchFileProvider) {

    }


    async request(options: OptionsWithUri): Promise<IMangaRequest> {
        const uri = options.uri.toString();
        const html = await this._provider.getHtml(uri);

        const result = new MangaRequestResult(uri, html);
        return result;
    }
}
