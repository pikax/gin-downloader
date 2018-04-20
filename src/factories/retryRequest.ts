import {IRequestStrategy} from "../interface";
import {IMangaRequest, IMangaRequestFactory, MangaRequestResult} from "../manga/interface";
import {OptionsWithUri} from "request";

export class RetryRequestFactory implements IMangaRequestFactory {

    constructor(private _requestStrategy: IRequestStrategy) {

    }

    request(options: OptionsWithUri): Promise<IMangaRequest> {
        return this._requestStrategy.request(options)
            .then(response => new MangaRequestResult(options.uri.toString(), response.body.toString()));
    }

}

