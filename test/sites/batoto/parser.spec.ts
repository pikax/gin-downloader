/**
 * Created by rodriguesc on 03/03/2017.
 */

import "./../../common";
import results from "./_results";


import {parser} from "../../../src/sites/batoto/parser";
import {parseDoc} from "../../../src/common/helper";
import {readFileSync} from "fs";


describe("Batoto offline", () => {
  let mangas = "./test/sites/batoto/html/mangas.html";
  let gintama = "./test/sites/batoto/html/Gintama.html";
  let latest = "./test/sites/batoto/html/latest.html";
  let chapter = "./test/sites/batoto/html/ch001.html";

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

  it("should resolve image path chapter", () => {
    let doc = parseDoc(fpChapter, {location: `http://bato.to/comic/_/comics/gintama-r94`});
    parser.imagesPaths(doc)
      .should.have.have.lengthOf(58);
  });

  it("should parse image from chapter", () => {
    parser.image(fpChapter.toString())
      .should.contain(results.image_src);

  });

  it("should parse and get all mangas", () => {
    let doc = parseDoc(fpMangas);

    let mangas = parser.mangas(doc);
    mangas.should.have.length.gte(results.mangas_count);
  });

  it("it should parse full manga info", async () => {
    let doc = parseDoc(fpGintama);

    let info = await parser.info(doc);

    info.should.exist;
    info.title.should.be.eq(results.manga.title);
    info.released.should.be.eq(results.manga.released);
    info.synopsis.should.contain(results.manga.synopsis);
    info.status.should.be.eq(results.manga.status);

    info.synonyms.should.be.deep.eq(results.manga.synonyms);
    info.authors.should.be.deep.eq(results.manga.authors);
    info.artists.should.be.deep.eq(results.manga.artists);
    info.genres.should.be.deep.eq(results.manga.genres);
    info.scanlators.should.be.deep.eq(results.manga.scanlators);
  });


  it("should parse latest", () => {
    let doc = parseDoc(fpLatest, {location: "http://bato.to/comic/_/comics/gintama-r94"});

    parser.latest(doc)
      .should.have.length.to.be.greaterThan(98);
  });


  it("it should resolve all images from chapter", () => {
    let doc = parseDoc(fpChapter, {location: "http://bato.to/comic/_/comics/gintama-r94"});

    parser.imagesPaths(doc)
      .should.have.length.gte(58);

  });

  it("should parse chapters", () => {
    let doc = parseDoc(fpGintama, {location: "http://bato.to/comic/_/comics/gintama-r94"});

    parser.chapters(doc)
      .should.have.length.gte(results.chapter_count);
  });
});
