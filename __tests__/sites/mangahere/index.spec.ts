import {MangaHere} from "../../../src/manga/mangahere";
import {DefaultResolverFactory} from "../../../src/factories/resolvers";
import {MockFileRequestFactory} from "../../__mocks__/requestProvider";


describe("MangaHere", () => {

    const requestFactory = new MockFileRequestFactory();
    const resolverFactory = new DefaultResolverFactory();


    const mangahere = new MangaHere({requestFactory, resolverFactory});


    it("Should get mangas", async () => {
        const mangas = await mangahere.mangas().then(x => x.map(m => m.manga()));

        expect(mangas).toMatchSnapshot();
    });


    it("Should get latest chapters", async () => {
        const chapters = await mangahere.latest();

        expect(chapters).toMatchSnapshot();
    });


    it("Should filter", async () => {
        const filter = "gintama";

        const filterResults = await mangahere.filter(filter)
        const mangas = filterResults.results.map(m => m.manga());


        expect(filterResults.page).toBe(1);
        expect(filterResults.total).toBe(1);
        expect(mangas).toMatchSnapshot();
    });


});

