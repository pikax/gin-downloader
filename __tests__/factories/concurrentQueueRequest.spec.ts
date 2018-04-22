import {ConcurrentQueueRequestFactory} from "../../src/factories/concurrentQueueRequest";

describe("concurrentQueueRequest", () => {

    const mockRequestStrategy: any = {
        request(options) {
            return Promise.resolve({
                body: "testHtml"
            });
        }
    };
    const queue = {
        add: jest.fn(f => f()),
    };


    beforeEach(() => {
        queue.add.mockClear();
    });

    it("should get response", async () => {
        const expected = await mockRequestStrategy.request("");
        const concurrent = new ConcurrentQueueRequestFactory(mockRequestStrategy, queue);

        const src = "testSrc";
        const result = await concurrent.request({uri: src});


        expect(result.html).toBe(expected.body);
        expect(result.uri).toBe(src);


        expect(queue.add.mock.calls.length).toBe(1);
    });

    it("should add to the queue", async () => {
        const concurrent = new ConcurrentQueueRequestFactory(mockRequestStrategy, queue);

        const src = "testSrc";

        const requests = 10;
        for (let i = 0; i < requests; i++) {
            concurrent.request({uri: src});
        }

        expect(queue.add.mock.calls.length).toBe(requests);
    });


});

