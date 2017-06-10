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
    let paths = parser.imagesPaths(doc);
    paths.should.have.have.lengthOf(58);
  });

  it("should parse image from chapter", () => {
    parser.image(fpChapter.toString())
      .should.contain(results.image_src);

  });

  it("should parse and get all mangas", () => {
    let doc = parseDoc(fpMangas);

    let mangas = parser.mangas(doc);
    mangas.should.have.length.gte(results.mangas_count);
    mangas.should.deep.include(  { name: "&",
      src: "http://bato.to/comic/_/--r4478",
      status: "Open",
      mature: false });
  });

  it("it should parse full manga info", async () => {
    let doc = parseDoc(fpGintama);

    let info = await parser.info(doc);


    info.should.exist;
    info.title.should.be.eq(results.manga.title);
    info.synopsis.should.contain(results.manga.synopsis);
    info.status.should.be.eq(results.manga.status);

    info.synonyms.should.be.deep.eq(results.manga.synonyms);
    info.authors.map(x => x.toLowerCase()).should.be.deep.eq(results.manga.authors); // the website keeps changing between lower and uppercase
    info.artists.map(x => x.toLowerCase()).should.be.deep.eq(results.manga.artists); // the website keeps changing between lower and uppercase

    for (let genre of results.manga.genres) { // batoto keeps adding/removing Drama from genres
      info.genres.should.be.contain(genre);
    }
    info.type.should.be.deep.eq(results.manga.type);
  });


  it("should parse latest", () => {
    let doc = parseDoc(fpLatest, {location: "http://bato.to"});

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
