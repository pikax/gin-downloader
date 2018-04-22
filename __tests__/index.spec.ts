import {MockFileRequestFactory} from "./__mocks__/requestProvider";

const gin = require("../index");
import ginDownloader from "../index";


const requestRetry: any = require("requestretry");
const fileRequest = new MockFileRequestFactory();

jest.mock("requestretry");

requestRetry.mockImplementation((opts) => fileRequest.request(opts).then(x => ({body: x.html})));


describe("Test public API", () => {

    it("should export 'ginDownloader'", () => {
        expect(gin).toHaveProperty("gindownloader");
    });

    it("should have mangahere", () => {
        expect(ginDownloader.mangahere).toBeDefined();
    });


    describe("mangahere", () => {
        beforeEach(() => {
            requestRetry.mockClear();

        });


        it("expect to be defined", () => {
            expect(ginDownloader).toHaveProperty("mangahere");
        });


        it("Should get mangas", async () => {
            const mangas = await ginDownloader.mangahere.mangas().then(x => x.map(m => m.manga()));

            expect(mangas).toMatchSnapshot();
        });

        it("Should get latest chapters", async () => {
            const chapters = await ginDownloader.mangahere.latest();

            expect(chapters).toMatchSnapshot();
        });


        it("Should filter", async () => {
            const filter = "gintama";

            const filterResults = await ginDownloader.mangahere.filter(filter);
            const mangas = filterResults.results.map(m => m.manga());


            expect(filterResults.page).toBe(1);
            expect(filterResults.total).toBe(1);
            expect(mangas).toMatchSnapshot();
        });

    });


});
