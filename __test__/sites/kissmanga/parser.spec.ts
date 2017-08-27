/**
 * Created by rodriguesc on 03/03/2017.
 */

import * as _ from 'lodash';

import "__test__/common";
import results from "./_results";


import {parser} from "src/sites/kissmanga/parser";
import {helper} from "src/sites/kissmanga/names";
import {readFileSync} from "fs";
import {parseDoc} from "src/util";





describe("KissManga offline", () => {
  let mangas = "./__test__/sites/kissmanga/html/mangas.html";
  let gintama = "./__test__/sites/kissmanga/html/Gintama.html";
  let latest = "./__test__/sites/kissmanga/html/latest.html";
  let chapter = "./__test__/sites/kissmanga/html/Lesson-042.html";

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

  it("should parse and get all mangas", () => {
    let doc = parseDoc(fpMangas);

    parser.mangas(doc).should
      .have.length.gte(50);
  });

  it("should resolve name to name", async () => {
    let doc = parseDoc(fpMangas);

    let mangas = await parser.mangas(doc);

    for (let obj of mangas) {
      let expected = obj.src;
      let origName = obj.name;
      let finalUrl = helper.resolveUrl(origName);

      finalUrl.should.be.eq(expected, `with name "${origName}"`);

      // if (finalUrl !== expected) {
      //   console.log(`"${origName}" : "${_.last(expected.split("/"))}", // ${expected}`);
      // }
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
      .should.have.length.to.be.greaterThan(10);
  });


  it("should parse chapters", () => {
    let doc = parseDoc(fpGintama, {location: `${helper.resolveUrl("Gintama")}`});

    parser.chapters(doc)
      .should.have.length.gte(results.chapter_count);
  });

});
