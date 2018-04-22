import {MockFileRequestFactory} from "./__mocks__/requestProvider";

const gin = require("../src/index");

const requestRetry: any = require("requestretry");

const fileRequest = new MockFileRequestFactory();

jest.mock("requestretry");

requestRetry.mockImplementation((opts) => fileRequest.request(opts).then(x => ({body: x.html})));


describe("Test public API", () => {

    it("should export 'gin'", () => {
        expect(gin).toHaveProperty("gin");
    });

    it("should have mangahere", () => {
        expect(gin.gin.mangahere).toBeDefined();
    });


    describe("mangahere", () => {
        const ginDownloader = gin.gin;

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

            const filterResults = await ginDownloader.mangahere.filter(filter)
            const mangas = filterResults.results.map(m => m.manga());


            expect(filterResults.page).toBe(1);
            expect(filterResults.total).toBe(1);
            expect(mangas).toMatchSnapshot();
        });

    });


});
