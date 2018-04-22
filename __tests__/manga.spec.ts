import {MangaObject, MangaObjectDependencies} from "../src/manga";
import {IChapterResolver, IManga} from "../src";


describe("Manga Object", () => {
    const chapterResolver: any = {
        chapters: (src) => Promise.resolve([{chap_number: "1", name: "test"}])
    };

    const imageResolver: any = {
        images: (src) => Promise.resolve([{value: Promise.resolve({src: "ImageSrc", name: "test"})}])
    };


    const infoResolver: any = {
        info: (src) => Promise.resolve([{image: "test", title: "test"}])
    };


    const dependencies: MangaObjectDependencies = {
        chapterResolver,
        imageResolver,
        infoResolver,
    };

    const mockedManga: IManga = {
        name: "testName",
        image: "testImage",
        mature: false,
        status: "O"
    };


    it("should get values from passed manga", () => {
        const src = "testSrc";

        const manga = new MangaObject(dependencies, src, mockedManga);

        expect(manga.name).toBe(mockedManga.name);
        expect(manga.image).toBe(mockedManga.image);
        expect(manga.mature).toBe(mockedManga.mature);
        expect(manga.status).toBe(mockedManga.status);

    });

    it("should get manga from passed manga", () => {
        const src = "testSrc";

        const manga = new MangaObject(dependencies, src, mockedManga);


        const result = manga.manga();

        expect(result).not.toBe(mockedManga); // it should return a different object
        expect(result).toEqual(mockedManga);
    });


    it("should get chapters", async () => {
        const src = "testSrc";

        const expected = await chapterResolver.chapters(src);

        const manga = new MangaObject(dependencies, src, mockedManga);

        const chapters = await manga.chapters();

        expect(chapters).toEqual(expected);
    });

    it("should get images from passed chapter", async () => {
        const src = "testSrc";

        const expected = await imageResolver.images(src).then(x => x[0].value);

        const manga = new MangaObject(dependencies, src, mockedManga);

        const chapters = await manga.chapters();
        const images = await manga.images(chapters[0]).then(x => x[0].value);


        expect(images).toEqual(expected);
    });

    it("should get images from chapter number", async () => {
        const src = "testSrc";

        const expected = await imageResolver.images(src).then(x => x[0].value);

        const manga = new MangaObject(dependencies, src, mockedManga);

        const images = await manga.images(1).then(x => x[0].value);


        expect(images).toEqual(expected);

    });

    it("should get images from chapter string", async () => {
        const src = "testSrc";

        const expected = await imageResolver.images(src).then(x => x[0].value);

        const manga = new MangaObject(dependencies, src, mockedManga);

        const images = await manga.images("1").then(x => x[0].value);


        expect(images).toEqual(expected);

    });

    it("should throw error if chapter not found", () => {
        const src = "testSrc";

        const manga = new MangaObject(dependencies, src, mockedManga);

        expect(manga.images(-1)).rejects.toThrowErrorMatchingSnapshot();
    });

    it("should throw error if invalid param on chapter", () => {
        const src = "testSrc";
        const manga = new MangaObject(dependencies, src, mockedManga);

        expect(manga.images({invalid: true} as any)).rejects.toThrowErrorMatchingSnapshot();
    });


    it("should get info", async () => {
        const src = "testSrc";

        const expected = await infoResolver.info(src);
        const manga = new MangaObject(dependencies, src, mockedManga);

        const result = await manga.info();

        expect(result).toEqual(expected);
    });


});

