import {ChapterResolver} from "../../src/resolvers/chapterResolver";

describe("Chapter resolver", () => {
    it("Should resolve and parse chapters", async () => {
        const requestResult = "requestResult";
        const parseResult = [1, 2, 3, 4];

        const mockRequest = jest.fn(() => Promise.resolve(requestResult));
        const mockParser = jest.fn(() => parseResult);

        const requestFactory = {request: mockRequest};
        const parser = {chapters: mockParser} as any;

        const chapter = new ChapterResolver({requestFactory, parser});


        const src = "http://test.test";
        const i = await chapter.chapters(src);


        expect(i).toEqual(parseResult);

        expect(mockRequest.mock.calls.length).toBe(1);

        expect(mockRequest.mock.calls[0][0]).toBeDefined();
        expect(mockRequest.mock.calls[0][0].uri).toBe(src);

        expect(mockParser.mock.calls.length).toBe(1);
        expect(mockParser.mock.calls[0][0]).toBe(requestResult);

    });

});
