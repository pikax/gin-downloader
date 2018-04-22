import {GinBuilder} from "../src";



describe("Builder", () => {



    it("should build mangahere", () => {
        const builder = new GinBuilder();


        expect(builder.mangahere).toBeDefined();

        expect(builder.mangahere.mangas).toBeDefined();
        expect(builder.mangahere.filter).toBeDefined();
        expect(builder.mangahere.latest).toBeDefined();
    });
});
