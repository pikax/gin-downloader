import {MangaHereBuilder} from "../../../src/manga/mangahere/builder";
import {
    RetryRequestFactory
} from "../../../src/manga/interface";
import {RequestRetryStrategy} from "../../../src/strategies/retry_strategy";
import {RequestFactoryMangaDependencies} from "../../../src/interface";

describe("MangaHere builder", function () {
    const requestFactory = new RetryRequestFactory(new RequestRetryStrategy());

    it("should fail if no requestFactory", () => {
        const func = () => new MangaHereBuilder().build({requestFactory: null});

        expect(func).toThrowErrorMatchingSnapshot();
    });


    it("should resolve dependencies", () => {
        const di = new MangaHereBuilder().build({requestFactory});

        expect(di.requestFactory).toBeDefined();
        expect(di.visitor).toBeDefined();
        expect(di.parser).toBeDefined();
        expect(di.filter).toBeDefined();
        expect(di.config).toBeDefined();
        expect(di.genre).toBeDefined();
        expect(di.logger).toBeDefined();
    });

    it("should keep passed dependencies", () => {
        const config = {} as any;
        const logger = {} as any;
        const genre = {} as any;
        const filter = {} as any;
        const parser = {} as any;
        const visitor = {} as any;

        const expectedDi: RequestFactoryMangaDependencies = {
            requestFactory,
            logger,
            config,
            genre,
            filter,
            parser,
            visitor
        };

        const di = new MangaHereBuilder().build(expectedDi);

        expect(di).toEqual(expectedDi);
    });

    it("should keep partial passed dependencies", () => {
        const logger = {} as any;
        const parser = {} as any;
        const visitor = {} as any;

        const expectedDi: RequestFactoryMangaDependencies = {
            requestFactory,
            logger,
            parser,
            visitor
        };

        const di = new MangaHereBuilder().build(expectedDi);

        expect(di).not.toEqual(expectedDi);


        expect(di.requestFactory);
        expect(di.requestFactory).toBe(expectedDi.requestFactory);
        expect(di.logger).toBe(expectedDi.logger);
        expect(di.parser).toBe(expectedDi.parser);
        expect(di.visitor).toBe(expectedDi.visitor);


        expect(di.config).toBeDefined();
        expect(di.config).not.toEqual(expectedDi.config);
    });


});

