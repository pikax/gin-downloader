import {RequestRetryStrategy} from "../../src/strategies/retry_strategy";

const requestRetry: any = require("requestretry");

jest.mock("requestretry");

describe("retry strategy", () => {


    beforeEach(() => {
        requestRetry.mockClear();
    });

    it("should call requestretry", async () => {
        const strategy = new RequestRetryStrategy();


        const uri = "test";
        const response = await strategy.request({uri});

        expect(requestRetry.mock.calls.length).toBe(1);
        expect(requestRetry.mock.calls[0][0].uri).toBe(uri);
    });


    it("should class requestretry with the params", async () => {
        const maxAttempts = 50;
        const retryDelay = 200;

        const strategy = new RequestRetryStrategy(maxAttempts, retryDelay);

        const uri = "test";

        const response = await strategy.request({uri});

        expect(requestRetry.mock.calls.length).toBe(1);
        expect(requestRetry.mock.calls[0][0].uri).toBe(uri);
        expect(requestRetry.mock.calls[0][0].maxAttempts).toBe(maxAttempts);
        expect(requestRetry.mock.calls[0][0].retryDelay).toBe(retryDelay);
    });

});
