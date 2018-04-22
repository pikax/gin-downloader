import {RetryRequestFactory} from "../../src/factories/retryRequest";

describe("retryRequestFactory", () => {

    const mockRequestStrategy: any = {
        request(options) {
            return Promise.resolve({
                body: "testHtml"
            });
        }
    };


    it("should get response", async () => {
        const expected = await mockRequestStrategy.request("");

        const retryRequest = new RetryRequestFactory(mockRequestStrategy);

        const src = "testSrc";
        const result = await retryRequest.request({uri: src});


        expect(result.html).toBe(expected.body);
        expect(result.uri).toBe(src);
    });


});
