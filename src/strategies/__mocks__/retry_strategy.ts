import {IRequestStrategy} from "../../interface";
import {OptionsWithUri, Response} from "request";

export class RequestRetryStrategy implements IRequestStrategy {

    constructor(private _html: string) {
    }

    request(options: OptionsWithUri): Promise<Response> {
        return Promise.resolve({
            body: this._html
        });
    }

}

