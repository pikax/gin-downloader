import {IRequestStrategy} from "../interface";
import {IMangaRequest, IMangaRequestFactory} from "../interface";
import {OptionsWithUri} from "request";
import {MangaRequestResult} from "../util/mangaRequestResult";



export class ConcurrentQueueRequestFactory implements IMangaRequestFactory {
    constructor(private _requestStrategy: IRequestStrategy, private _queue: { add: (f) => any }) {

    }

    request(options: OptionsWithUri): Promise<IMangaRequest> {
        return this._queue.add(() => this._requestStrategy.request(options)
            .then(response => new MangaRequestResult(options.uri.toString(), response.body.toString())));
    }


}
