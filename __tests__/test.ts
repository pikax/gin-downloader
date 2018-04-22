import {MangaHere} from "../src/manga/mangahere";
import {DefaultResolverFactory} from "../src/factories/resolvers";
import {MockFileRequestFactory} from "./__mocks__/requestProvider";


const mockFileRequest = new MockFileRequestFactory();

const mockRequest = (options => {
    return Promise.resolve(mockFileRequest.request(options));
});


describe("beta test", () => {


    const mockedRequestFactory: any = jest.fn().mockImplementation(() => ({
        request: mockRequest
    }));

    beforeAll(() => {
        // mockedRequestFactory.mockClear();
    });


    const resolverFactory = new DefaultResolverFactory();

    const mangaHere = new MangaHere({requestFactory: mockedRequestFactory(), resolverFactory});


    /*
    it("should get latest", async () => {
        const mangas = await mangaHere.latest();

        expect(mangas).toMatchSnapshot();
    });
*/

    it("should get all mangas", async () => {
        const mangas = (await mangaHere.mangas()).map(x => x.manga());

        // NOTE we slice because otherwise Jest will take minutes to snapshot testing, dont know why
        expect(mangas).toMatchSnapshot();
    });


    it("should get super mangas", async () => {
        const mangas = await mangaHere.mangas();

        const m = mangas.find(x => x.name === "Gintama");


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


        const chapter = chapters.find(x => x.chap_number === "1");
        const images = await m.images(chapter);

        expect(images.length).toBe(58);

        const i = await images[0].value;
        expect(i.src).toMatch("https://mangatown.secure.footprint.net/store/manga/551/001.0/compressed/Gintama_v01_ch01_p01.jpg");
        expect(i.name).toBe("Gintama_v01_ch01_p01.jpg");
    });
});

