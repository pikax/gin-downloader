import {InfoResolver} from "../../src/resolvers/infoResolver";


describe("Info resolver", () => {
    it("Should resolve and parse info", async () => {
        const requestResult = "requestResult";
        const parseResult = {name: "test"};

        const mockConfig = jest.fn();
        const mockRequest = jest.fn(() => Promise.resolve(requestResult));
        const mockParser = jest.fn(() => parseResult);


        const config = {name: mockConfig, latestUrl: mockConfig, mangasUrl: mockConfig, site: mockConfig} as any;
        const requestFactory = {request: mockRequest};
        const parser = {info: mockParser} as any;

        const info = new InfoResolver({config, requestFactory, parser});


        const src = "http://test.test";
        const i = await info.info(src);


        expect(i).toBe(parseResult);

        expect(mockRequest.mock.calls.length).toBe(1);

        expect(mockRequest.mock.calls[0][0]).toBeDefined();
        expect(mockRequest.mock.calls[0][0].uri).toBe(src);

        expect(mockParser.mock.calls.length).toBe(1);
        expect(mockParser.mock.calls[0][0]).toBe(requestResult);

        expect(mockConfig.mock.calls.length).toBe(0);
    });

});

