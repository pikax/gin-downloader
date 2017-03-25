/**
 * Created by rodriguesc on 03/03/2017.
 */

import "./../../common";
import results from "./_results";


import {parser} from "../../../src/sites/mangahere/parser";
import {helper} from "../../../src/sites/mangahere/names";
import {parseDoc} from "../../../src/common/helper";
import {readFileSync} from "fs";

describe("MangaHere offline", () => {
  let mangas = "./test/sites/mangahere/html/mangas.html";
  let gintama = "./test/sites/mangahere/html/Gintama.html";
  let latest = "./test/sites/mangahere/html/latest.html";
  let chapter = "./test/sites/mangahere/html/ch001.html";

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
    let doc = parseDoc(fpChapter, {location: `${helper.resolveUrl("Gintama")}`});
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
      let finalUrl = helper.resolveUrl(origName);

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
    let doc = parseDoc(fpLatest, {location: `${helper.resolveUrl("Gintama")}`});

    parser.latest(doc)
      .should.have.length.to.be.greaterThan(98);
  });


  it("it should resolve all images from chapter", () => {
    let doc = parseDoc(fpChapter, {location: `${helper.resolveUrl("Gintama")}`});

    parser.imagesPaths(doc)
      .should.have.length.gte(58);

  });

  it("should parse chapters", () => {
    let doc = parseDoc(fpGintama, {location: `${helper.resolveUrl("Gintama")}`});

    parser.chapters(doc)
      .should.have.length.gte(results.chapter_count);
  });
});
