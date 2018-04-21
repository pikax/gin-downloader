import {IMangaRequest, IMangaRequestFactory, MangaRequestResult} from "../../manga/interface";
import {OptionsWithUri} from "request";


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