import {MockMangaRequestFactory} from "../../src/factories/__mocks__/mockMangaRequest";
import {FileMatches} from "../__html__/matches";
import {MockFileProvider} from "./fileProvider";
import {IMangaRequestFactory} from "../../src/manga/interface";

export class MockFileRequestFactory implements IMangaRequestFactory {
    private _requestFactory: MockMangaRequestFactory;

    constructor() {
        const provider = new MockFileProvider(FileMatches);

        this._requestFactory = new MockMangaRequestFactory(provider);
    }

    request(options) {
        return this._requestFactory.request(options);
    }
}
