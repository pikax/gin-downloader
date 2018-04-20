import {MangaHere} from "../src/manga/mangahere";
import {RetryRequestFactory} from "../src/factories/retryRequest";
import {RequestRetryStrategy} from "../src/strategies/retry_strategy";
import {DefaultResolverFactory} from "../src/factories/resolvers";


describe("beta test", () => {
    // TODO mock with local html files
    const requestFactory = new RetryRequestFactory(new RequestRetryStrategy());
    const resolverFactory = new DefaultResolverFactory();

    const mangaHere = new MangaHere({requestFactory, resolverFactory});


    /*
    it("should get latest", async () => {
        const mangas = await mangaHere.latest();

        expect(mangas).toMatchSnapshot();
    });
*/

    it("should get all mangas", async () => {
        const mangas = await mangaHere.mangas();

        expect(mangas).toMatchSnapshot();
    });


    it("should get super mangas", async () => {
        const mangas = await mangaHere.superMangas();


        const m = mangas[0];


        const manga = {
            name: m.name,
            image: m.image,
            status: m.status,
            mature: m.mature,
        };


        expect(manga).toMatchSnapshot();


        const info = await m.info();

        expect(info).toMatchSnapshot();

        const chapters = await m.chapters();
        expect(chapters).toMatchSnapshot();


    });
})

