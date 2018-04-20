import {resolve} from 'url';
import {ImageResolver} from "../../src/resolvers/imageResolver";

describe("Info resolver", () => {
    it("Should resolve and parse info", async () => {

        const site = "http://test.test";

        const paths = [1, 2, 3, 4, 5];

        const imageResult = site + "/1/1";

        const gen = (function* () {
            yield* paths.map(x => ({src: resolve(imageResult, x.toString())}));
        })();

        const mockConfig = jest.fn();
        const mockRequest = jest.fn(({uri}: { uri: string }) => {
            return uri.toString().split("/").reverse()[0];
        });
        const mockImage = jest.fn((re) => resolve(imageResult, re));

        const mockImagePaths = jest.fn(() => {
            return gen;
        });


        const config = {name: mockConfig, latestUrl: mockConfig, mangasUrl: mockConfig, site: site} as any;
        const requestFactory = {request: mockRequest};
        const parser = {

            image: mockImage,

            imagesPaths: mockImagePaths,

        } as any;

        const info = new ImageResolver({config, requestFactory, parser});


        const src = "http://test.test/1";
        const i = await info.images(src);


        // expect(i).toBe(parseResult);

        expect(mockRequest.mock.calls.length).toBe(1);

        expect(mockRequest.mock.calls[0][0]).toBeDefined();
        expect(mockRequest.mock.calls[0][0].uri).toBe(src);

        expect(mockImage.mock.calls.length).toBe(1);
        expect(mockImage.mock.calls[0][0]).toBe("1");

        expect(mockConfig.mock.calls.length).toBe(0);


        const results = await Promise.all(i.map(x => x.value));


        expect(results).toMatchSnapshot();

    });

});
