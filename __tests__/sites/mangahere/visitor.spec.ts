import {MangaHereVisitor} from "../../../src/manga/mangahere/visitor";
import {OfflineFileProvider} from "../../__html__";
import {MangaHereConfig} from "../../../src/manga/mangahere/config";


describe("MangaHere visitor", () => {
    const config = new MangaHereConfig()
    const visitor = new MangaHereVisitor({
        config
    });


    it("should get latest url", () => {
        const l = visitor.latest().next();
        expect(l).toMatchSnapshot();
    });


    it("should iterate through lastest pages", () => {
        expect(Array.from(visitor.latest())).toMatchSnapshot();
    });


    it("should iterate through all mangas", () => {
        expect(Array.from(visitor.mangas())).toMatchSnapshot();
    });

});

