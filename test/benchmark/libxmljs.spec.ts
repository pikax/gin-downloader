/**
 * Created by rodriguesc on 26/05/2017.
 */


import Parser from "../../src/sites/mangafox/parser";
import {readFileSync} from "fs";

import * as cheerio from "cheerio";

import "../common";
import {parseDoc} from "../../src/common/helper";

import results from "../sites/mangafox/_results";


describe("MangaFox benchmarking, libxmljs x cheerio ", () => {
  let mangas = "./test/sites/mangafox/html/mangas.html";
  let gintama = "./test/sites/mangafox/html/Gintama.html";
  let latest = "./test/sites/mangafox/html/latest.html";
  let chapter = "./test/sites/mangafox/html/ch001.html";

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


  describe("Mangas", () => {
    let libXmlResults: any[] = [];


    it("should parse all mangas", () => {
      let mangas = Parser.mangas(parseDoc(fpMangas));

      mangas.should.have.length.gte(1000);
      libXmlResults = <any>mangas;
    });

    describe("cherio", () => {
      let cheerioResults: any[] = [];
      const selector = ".series_preview";

      it("map with get", () => {
        let $ = cheerio.load(fpMangas);

        let mangas = $(selector).map((x, el) => ({
          name: $(el).text(),
          src: $(el).attr("href")
        })).get();

        mangas.should.have.length.gte(1000);
      });

      it("map using cheerio element", () => {
        let $ = cheerio.load(fpMangas);

        let mangas = $(selector).map((x, el) => ({
          name: (<any>el.children[0]).data,
          src: el.attribs["href"]
        })).get();

        mangas.should.have.length.gte(1000);
      });

      it("each", () => {
        let $ = cheerio.load(fpMangas);

        let mangas : any[] = [];
        $(selector).each((i, el) => {
          mangas[i] = {
            name: $(el).text(),
            src: $(el).attr("href")
          };
        });

        mangas.should.have.length.gte(1000);
      });

      it("each with cheerio element", async() => {
        let $ = cheerio.load(fpMangas);

        let mangas : any[] = [];
        $(selector).each((i, el) => {
          mangas[i] = {
            name: (<any>el.children[0]).data,
            src: el.attribs["href"]
          };
        });
        mangas.should.have.length.gte(1000);
        cheerioResults = mangas;
      });

      it("integrity check", () => {
        libXmlResults.should.deep.equals(cheerioResults);
      });
    });


  });

  describe("Info Gintama", () => {
    let libXmlResult: any = {};
    it("libxmljs ", async () => {
      let info = await Parser.info(parseDoc(fpGintama));


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

      console.log(info);
      libXmlResult = info;
    });

    describe("cherio", () => {
      let cheerioResult: any = {};

      it("with selector", () => {
        let $ = cheerio.load(fpGintama);

        let image = $("div .cover img").attr("src");
        let title = $("div  .cover img").attr("alt");
        let synonyms = $("div #title h3").text().split("; ");
        let released = $("div #title table tr:nth-child(2) td:first-child a").text();
        let authors = [$("div #title table tr:nth-child(2) td:nth-child(2) a").text()];
        let artists = [$("div #title table tr:nth-child(2) td:nth-child(3) a").text()];
        let genres = $("div #title table tr:nth-child(2) td:nth-child(4) a").map((i, el) => el.children[0].nodeValue).get();
        let synopsis = $("div #title p").text();
        // let status = $("div #series_info div .data [1] span text()[1]").text().trim().slice(0, -1);
        // let ranked = $("div #series_info div .data:nth-child(2) span").text();
        // let rating = $("div #series_info div .data:nth-child(3) span").text();
        // let scanlators = $("div #series_info div.data:nth-child(4) span a").get();


        title.should.be.eq(results.manga.title);
        released.should.be.eq(results.manga.released);
        synopsis.should.contain(results.manga.synopsis);
        // status.should.be.eq(results.manga.status);

        synonyms.should.be.deep.eq(results.manga.synonyms);
        authors.should.be.deep.eq(results.manga.authors);
        artists.should.be.deep.eq(results.manga.artists);
        genres.should.be.deep.eq(results.manga.genres);
        // scanlators.should.be.deep.eq(results.manga.scanlators);

      });
      it("with selector v2", () => {
          let $ = cheerio.load(fpGintama);

          let imgElem = $("div .cover img");
          let titleElem = $("#title");
          let seriesInfo = $("#series_info");

          let image = imgElem.attr("src");
          let title = imgElem.attr("alt");

          let synonyms = titleElem.find("h3").text().split("; ");


          let released = titleElem.find("table tr td a").first().text();
          let authors = [titleElem.find("table tr td a").eq(1).text()];
          let artists = [titleElem.find("table tr td a").eq(2).text()];
          let genres = titleElem.find("table tr td a").slice(3).map((i, el) => el.children[0].nodeValue).get();

          let sSstatus = seriesInfo.find("div .data span").eq(0).html().trim();
          let status = sSstatus.slice(0, sSstatus.indexOf(","));
          let ranked = seriesInfo.find("div .data span").eq(2).text();
          let rating = seriesInfo.find("div .data span").eq(3).text();
          let scanlators = seriesInfo.find("div.data span a").slice(1).map((i, el) => el.children[0].nodeValue).get();;

          let synopsis = titleElem.find("p").text();


          title.should.be.eq(results.manga.title);
          released.should.be.eq(results.manga.released);
          synopsis.should.contain(results.manga.synopsis);
          status.should.be.eq(results.manga.status);

          synonyms.should.be.deep.eq(results.manga.synonyms);
          authors.should.be.deep.eq(results.manga.authors);
          artists.should.be.deep.eq(results.manga.artists);
          genres.should.be.deep.eq(results.manga.genres);
          scanlators.should.be.deep.eq(results.manga.scanlators);

        cheerioResult = {
          image,
          title,
          synonyms,
          released,
          authors,
          artists,
          genres,
          status,
          ranked,
          rating,
          scanlators,
          synopsis,
        }
      });
      it("optimized? selector", () => {
        let $ = cheerio.load(fpGintama);

        let imgElem = $("div .cover img");
        let titleElem = $("#title");
        let tableElem = titleElem.find("table tr").eq(1).find("td");


        let image = imgElem.attr("src");
        let title = imgElem.attr("alt");

        let synonyms = titleElem.find("h3").text().split("; ");


        let released = tableElem.eq(0).text().trim();
        let authors = [tableElem.eq(1).text().trim()];
        let artists = [tableElem.eq(2).text().trim()];
        let genres = titleElem.find("table tr").eq(1).find("td").eq(3).find("a").map((i, el) => el.children[0].nodeValue).get();

        let synopsis = titleElem.find("p").text();


        title.should.be.eq(results.manga.title);
        released.should.be.eq(results.manga.released);
        synopsis.should.contain(results.manga.synopsis);
        // status.should.be.eq(results.manga.status);

        synonyms.should.be.deep.eq(results.manga.synonyms);
        authors.should.be.deep.eq(results.manga.authors);
        artists.should.be.deep.eq(results.manga.artists);
        genres.should.be.deep.eq(results.manga.genres);
        // scanlators.should.be.deep.eq(results.manga.scanlators);

      });
      it("integrity check", () => {
        libXmlResult.should.deep.equals(cheerioResult);
      });


    });
  });
});
