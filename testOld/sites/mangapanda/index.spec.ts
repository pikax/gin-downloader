/**
 * Created by rodriguesc on 07/03/2017.
 */

import "./../../common";

import * as nock from "nock";


import {manga} from "./../../../src/sites/mangapanda";
import results from "./_results";
import {FilterCondition, FilterMangaType, FilterStatus, MangaFilter, Genre} from "../../../src/declarations";

import {config} from "../../../src/sites/mangapanda/config";
import {_MOCK_} from "../../common";


describe("MangaPanda live", () => {

  it("should get all mangas", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/alphabetical")
        .replyWithFile(200, __dirname + "/html/mangas.html");
    }

    let mangas = await manga.mangas();
    mangas.should.have.length.gte(results.mangas_count);
  });

  it("should get latest chaps", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/latest")
        .replyWithFile(200, __dirname + "/html/latest.html");
    }

    let latest = await manga.latest();
    latest.should.to.have.length.gte(50);
  });

  it("should get info", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/gintama")
        .replyWithFile(200, __dirname + "/html/Gintama.html");
    }

    let name = "Gintama";
    let info = await manga.info(name);

    info.should.exist;

    info.title.should.be.eq(results.manga.title);
    info.synopsis.should.contain(results.manga.synopsis);
    info.status.should.be.eq(results.manga.status);

    info.synonyms.should.be.deep.eq(results.manga.synonyms);
    info.authors.should.be.deep.eq(results.manga.authors);
    info.artists.should.be.deep.eq(results.manga.artists);
    info.genres.should.be.deep.eq(results.manga.genres);
  });

  it("should resolve name to name", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/alphabetical")
        .replyWithFile(200, __dirname + "/html/mangas.html")
      ;
    }

    let mangas = await manga.mangas();

    for (let obj of mangas){
      let expected = obj.src;
      let origName = obj.name;
      let finalUrl = manga.resolveMangaUrl(origName);

      finalUrl.should.be.eq(expected, `with name "${origName}"`);
    }
  });


  it("should not find manga by name", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/my-stupid-name")
        .reply(404);
    }

    let name = "my stupid name";
    let chapter = 1;

    try {
      let images = await manga.images(name, chapter);

      images.should.be.null;

    } catch (e) {
      e.should.be.Throw;
    }
  });



  it("should not find get chapters", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/Gintamass")
        .reply(404);
    }


    let name = "Gintamass";

    try {
      let images = await manga.chapters(name);

      images.should.be.empty;

    } catch (e) {
      e.should.be.Throw;
    }

  });

  it("should not find chapter", async () => {
    // chapters
    if (_MOCK_) {
      nock(config.site)
        .get("/gintama")
        .replyWithFile(200, __dirname + "/html/Gintama.html");
    }


    let name = "Gintama";
    let chapter = -354564;

    try {
      let images = await manga.images(name, chapter);

      images.should.be.null;

    } catch (e) {
      e.should.be.Throw;
    }
  });

  it("should not find images chapter ", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/gintama")
        .replyWithFile(200, __dirname + "/html/Gintama.html");
    }

    let name = "Gintama";
    let chapter = -5151;

    try {
      let images = await manga.images(name, chapter);

      images.should.be.null;

    } catch (e) {
      e.should.be.Throw;
    }
  });


  it("should get chapters", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/gintama")
        .replyWithFile(200, __dirname + "/html/Gintama.html");
    }


    let name = "Gintama";

    let chapters = await manga.chapters(name);
    chapters.should.have.length.gte(results.chapter_count);
  });

  it("should get Gintama : chapter 41", async () => {
    /*start*/
    if (_MOCK_) {
      nock(config.site)
        .get("/gintama/")
        .replyWithFile(200, __dirname + "/html/Gintama.html");

      nock(config.site)
        .get(/gintama\/41/)
        .replyWithFile(200, __dirname + "/html/41.html")
        .persist();

    }
    /*end*/
    let name = "Gintama";
    let chapter = 41;

    let images = await manga.images(name, chapter);
    images.should.to.exist;
    images.should.have.length.gte(17);

    let img = await images[0];
    img.src.should.contain("mangapanda.com/gintama/41/gintama-503216.jpg");
  });

  describe("filter", () => {

    it("should filter by name", async () => {
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search/?w=Gintama&rd=0&status=&genre=0000000000000000000000000000000000000&p=0")
          .replyWithFile(200, __dirname + "/html/filter/byName.html");
      }


      let filter: MangaFilter = {
        name: "Gintama"
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://www.mangapanda.com/gintama"
      });
    });

    it("should filter by in genre", async () => {
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search/?w=&rd=0&status=&genre=1010000000000000000000100010000000000&p=0")
          .replyWithFile(200, __dirname + "/html/filter/byGenre.html");
      }


      let filter: MangaFilter = {
        search: {
          genre: [Genre.Action, Genre.Comedy,  Genre.SciFi, Genre.Shounen]
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://www.mangapanda.com/gintama"
      });
    });

    it("should filter by out genre", async () => {
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search/?w=Sora&rd=0&status=&genre=0000000000000000000020000000000000000&p=0")
          .replyWithFile(200, __dirname + "/html/filter/outGenre.html");
      }


      let filter: MangaFilter = {
        search: {
          name: {
            name: "gin",
            condition: FilterCondition.StartsWith
          },
          author: {
            name: "Sora",
          },
          genre: {
            outGenres: [Genre.Romance]
          }
        }

      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://www.mangapanda.com/gintama"
      });
    });

    it("should filter by Author", async () => {
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search/?w=Sorachi&rd=0&status=&genre=0000000000000000000000000000000000000&p=0")
          .replyWithFile(200, __dirname + "/html/filter/byAuthor.html");
      }


      let filter: MangaFilter = {
        search: {
          author: {
            name: "Sorachi",
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.length.lte(10);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://www.mangapanda.com/gintama"
      });
    });

    it("should filter by Status", async () => {
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search/?w=&rd=0&status=2&genre=0000000000000000000000000000000000000&p=0")
          .replyWithFile(200, __dirname + "/html/filter/byCompleted.html");
      }


      let filter: MangaFilter = {
        search: {
          status: FilterStatus.Complete,
          name: {
            name: "Kenshin"
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "Rurouni Kenshin",
        src : "http://www.mangapanda.com/rurouni-kenshin"
      });
    });

    it("should filter by Type", async () => {
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search/?w=&rd=1&status=&genre=0000000000000000000000000000000000000&p=0")
          .replyWithFile(200, __dirname + "/html/filter/byType.html");
      }


      let filter: MangaFilter = {
        search: {
          type: FilterMangaType.Manhwa,
          name: {
            name: "Breaker"
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "The Breaker",
        src : "http://www.mangapanda.com/the-breaker"
      });
    });
  });

});
