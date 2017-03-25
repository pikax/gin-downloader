/**
 * Created by rodriguesc on 03/03/2017.
 */

import "./../../common";
import results from "./_results";


import {parser} from "../../../src/sites/mangapanda/parser";
import {name as nameHelper} from "../../../src/sites/mangapanda/names";
import {parseDoc} from "../../../src/common/helper";
import {readFileSync} from "fs";

describe("MangaHere offline", () => {
  let mangas = "./test/sites/mangapanda/html/mangas.html";
  let gintama = "./test/sites/mangapanda/html/Gintama.html";
  let latest = "./test/sites/mangapanda/html/latest.html";
  let chapter = "./test/sites/mangapanda/html/ch001.html";

  let fpMangas: string;
  let fpGintama: string;
  let fpLatest: string;
  let fpChapter: string;

  before(() => {
    fpMangas = readFileSync(mangas).toString();
    fpGintama = readFileSync(gintama).toString();
    fpLatest = readFileSync(latest).toString();
    fpChapter = readFileSync(chapter).toString();
  });


  describe("info", () => {
    it("should resolve image path chapter", () => {
      let doc = parseDoc(fpChapter, {location: `${nameHelper.resolveUrl("Gintama")}`});
      parser.imagesPaths(doc)
        .should.have.have.lengthOf(58);
    });

    it("should parse image from chapter", () => {
      parser.image(fpChapter.toString())
        .should.contain(results.image_src);

    });

    it("should parse and get all mangas", () => {
      let doc = parseDoc(fpMangas);

      parser.mangas(doc).should
        .have.length.gte(results.mangas_count);
    });

    it("should resolve name to name", async () => {
      let doc = parseDoc(fpMangas);

      let mangas = await parser.mangas(doc);

      for (let obj of mangas) {
        let expected = obj.src;
        let origName = obj.name;
        let finalUrl = nameHelper.resolveUrl(origName);

        finalUrl.should.be.eq(expected, `with name "${origName}"`);
      }
    });

    it("it should parse full manga info", async () => {
      let doc = parseDoc(fpGintama);

      let info = await parser.info(doc);

      info.should.exist;
      info.title.should.be.eq(results.manga.title);
      info.synopsis.should.contain(results.manga.synopsis);
      info.status.should.be.eq(results.manga.status);

      info.synonyms.should.be.deep.eq(results.manga.synonyms);
      info.authors.should.be.deep.eq(results.manga.authors);
      info.artists.should.be.deep.eq(results.manga.artists);
      info.genres.should.be.deep.eq(results.manga.genres);

    });


    it("should parse latest", () => {
      let doc = parseDoc(fpLatest, {location: `${nameHelper.resolveUrl("Gintama")}`});

      parser.latest(doc)
        .should.have.length.to.be.greaterThan(98);
    });


    it("it should resolve all images from chapter", () => {
      let doc = parseDoc(fpChapter, {location: `${nameHelper.resolveUrl("Gintama")}`});

      parser.imagesPaths(doc)
        .should.have.length.gte(58);

    });

    it("should parse chapters", () => {
      let doc = parseDoc(fpGintama, {location: `${nameHelper.resolveUrl("Gintama")}`});

      parser.chapters(doc)
        .should.have.length.gte(results.chapter_count);
    });
  });
});
