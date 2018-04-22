import {IRequestStrategy} from "../interface";
import {IMangaRequest, IMangaRequestFactory} from "../interface";
import {OptionsWithUri} from "request";
import {MangaRequestResult} from "../util/mangaRequestResult";

export class RetryRequestFactory implements IMangaRequestFactory {

    constructor(private _requestStrategy: IRequestStrategy) {

    }

    request(options: OptionsWithUri): Promise<IMangaRequest> {
        return this._requestStrategy.request(options)
            .then(response => new MangaRequestResult(options.uri.toString(), response.body.toString()));
    }

}

