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


    // TODO mock with local html files
    // const requestFactory = new RetryRequestFactory(new RequestRetryStrategy());
    const resolverFactory = new DefaultResolverFactory();

    const mangaHere = new MangaHere({requestFactory: mockedRequestFactory(), resolverFactory});


    /*
    it("should get latest", async () => {
        const mangas = await mangaHere.latest();

        expect(mangas).toMatchSnapshot();
    });
*/

    it("should get all mangas", async () => {
        const mangas = await mangaHere.mangas();


        // NOTE we slice because otherwise Jest will take minutes to snapshot testing, dont know why
        expect(mangas).toMatchSnapshot();
    });


    it("should get super mangas", async () => {
        const mangas = await mangaHere.superMangas();


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


    });
});

