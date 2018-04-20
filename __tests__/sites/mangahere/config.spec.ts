import {MangaHereConfig} from "../../../src/manga/mangahere/config";

describe("MangaHere config", () => {

    it("should have correct values", () => {
        const config = new MangaHereConfig();

        expect(config).toMatchSnapshot();


        // NOTE config is only readOnly, Jest doesn't resolve readOnly props
        const e = {
            name: config.name,
            latestUrl: config.latestUrl,
            mangasUrl: config.mangasUrl,
            site: config.site,
        };

        expect(e).toMatchSnapshot();
    });

});


