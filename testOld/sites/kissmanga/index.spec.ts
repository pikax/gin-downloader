/**
 * Created by rodriguesc on 06/03/2017.
 */



import nock = require("nock");

import {manga} from "./../../../src/sites/kissmanga/index";
import {config} from "../../../src/sites/kissmanga/config";

import results from "./_results";
import { FilterStatus, MangaFilter, Genre} from "../../../src/declarations";
import {_MOCK_} from "../../common";




describe("KissManga live", () => {

  beforeEach(()=>{
    console.log("should it mock? - > "+ _MOCK_)
  })

  it("should get all mangas", async () => {
    // should get all mangas
    if (_MOCK_) {
      nock(config.site)
        .post("/AdvanceSearch")
        .replyWithFile(200, __dirname + "/html/mangas.html");
    }

    let mangas = await manga.mangas();
    mangas.should.have.length.gte(results.mangas_count);
  });

  it("should get latest chaps", async() => {
    // latest
    if (_MOCK_) {
      nock(config.site)
        .get("/MangaList/LatestUpdate")
        .replyWithFile(200, __dirname + "/html/latest.html");
    }

    let latest = await  manga.latest();
    latest.should.to.have.length.gte(40);
  });

  it("should get info", async () => {
    // info
    if (_MOCK_) {
      nock(config.site)
        .get("/IManga/Gintama")
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

    // name to name [deprecated?]
    if (_MOCK_) {
      nock(config.site)
        .post("/AdvanceSearch")
        .replyWithFile(200, __dirname + "/html/mangas.html");
    }

    let mangas = await manga.mangas();

    for (let obj of mangas){
      let expected = obj.src;
      let origName = obj.name;
      let finalUrl = manga.resolveMangaUrl(origName);

      finalUrl.should.be.eq(expected, `with name "${origName}"`);

      // if(expected !== finalUrl)
      //   console.log(`"${origName}": "${expected}"; // ${finalUrl}`);

    }
  });


  it("should not find manga by name", async () => {

    // not find my stupid name
    if (_MOCK_) {
      nock(config.site)
        .get("/IManga/my-stupid-name")
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
    // not find Gintamass
    if (_MOCK_) {
      nock(config.site)
        .get("/IManga/Gintamass")
        .reply(404);
    }

    let name = "Gintamass";

    try {
      let chapters = await manga.chapters(name);

      chapters.should.be.null;

    }catch (e){
      e.should.be.Throw;
    }
  });

  it("should not find chapter", async () => {
    // chapters
    if (_MOCK_) {
      nock(config.site)
        .get("/IManga/Gintama")
        .replyWithFile(200, __dirname + "/html/Gintama.html");
    }
    let name = "Gintama";
    let chapter = -354564;


    try {
      let images = await manga.images(name, chapter);

      images.should.be.null;

    }catch (e){
      e.should.be.Throw;
    }
  });

  it("should not find images chapter ", async () => {
    // chapters
    if (_MOCK_) {
      nock(config.site)
        .get("/IManga/Gintama")
        .replyWithFile(200, __dirname + "/html/Gintama.html");
    }

    let name = "Gintama";
    let chapter = -5151;

    try {
      let images = await manga.images(name, chapter);

      images.should.be.null;

    }catch (e) {
      e.should.be.Throw;
    }
  });


  it("should get chapters", async () => {
    // chapters
    if (_MOCK_) {
      nock(config.site)
        .get("/IManga/Gintama")
        .replyWithFile(200, __dirname + "/html/Gintama.html");
    }

    let name = "Gintama";

    let chapters = await manga.chapters(name);
    chapters.should.have.length.gte(results.chapter_count);
  });


  it("should get Gintama : chapter 42", async () => {
    // get gintama chapter 42?
    /*start*/
    if (_MOCK_) {
      nock(config.site)
        .get("/IManga/Gintama")
        .replyWithFile(200, __dirname + "/html/Gintama.html");

      nock(config.site)
        .get("/IManga/Gintama/Lesson-042?id=288316")
        .replyWithFile(200, __dirname + "/html/Lesson-042.html");
      nock(config.site)
        .get("/Scripts/ca.js")
        .replyWithFile(200, __dirname + "/html/ca.js");
      nock(config.site)
        .get("/Scripts/lo.js")
        .replyWithFile(200, __dirname + "/html/lo.js");
    }
    /*end*/
    let name = "Gintama";
    let chapter = 42;

    let images = await manga.images(name, chapter);
    images.should.to.exist;
    images.should.have.length.gte(17);

    let img = await images[0];
    img.src.should.contain(results.image_src);
  });

  describe("Filter", () => {
    it("should filter by name", async () => {
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .post("/AdvanceSearch", "mangaName=Gintama&authorArtist=&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status=")
          .replyWithFile(200, __dirname + "/html/filter/byName.html");
      }

      let filter: MangaFilter = {
        name: "Gintama"
      };


      let mangas = await manga.filter(filter);
      mangas.results.should.length(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://kissmanga.com/IManga/Gintama",
        status : "Open"
      });
    });

    it("should filter by in genre", async () => {

      if (_MOCK_) {
        // filter by Genre
        nock(config.site)
          .post("/AdvanceSearch", "mangaName=&authorArtist=&genres=0&genres=1&genres=0&genres=0&genres=1&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=1&genres=0&genres=0&genres=0&genres=0&genres=1&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status=")
          .replyWithFile(200, __dirname + "/html/filter/byGenre.html");
      }
      let filter: MangaFilter = {
        search: {
          genre:  [Genre.Comedy, Genre.Action, Genre.SciFi, Genre.Shounen]
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(50);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://kissmanga.com/IManga/Gintama",
        status : "Open"
      });
    });
    it("should filter by out genre", async () => {
      if (_MOCK_) {
        // filter by outGenre
        nock(config.site)
          .post("/AdvanceSearch", "mangaName=&authorArtist=&genres=2&genres=0&genres=2&genres=2&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=2&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status=")
          .replyWithFile(200, __dirname + "/html/filter/outGenre.html");
      }

      let filter: MangaFilter = {
        search: {
          genre: {
            outGenres: [Genre.FourKoma, Genre.Adult, Genre.Adventure, Genre.Manhwa, Genre.AwardWinning]
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(50);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://kissmanga.com/IManga/Gintama",
        status : "Open"
      });
    });

    it("should filter by Author", async () => {
      if (_MOCK_) {
        // filter by Author
        nock(config.site)
          .post("/AdvanceSearch", "mangaName=&authorArtist=Sorachi&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status=")
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
        src : "http://kissmanga.com/IManga/Gintama",
        status : "Open"
      });
    });

    it("should filter by Status", async () => {

      if (_MOCK_) {// filter by Status
        nock(config.site)
          .post("/AdvanceSearch", "mangaName=&authorArtist=&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status=Complete")
          .replyWithFile(200, __dirname + "/html/filter/byCompleted.html");
      }

      let filter: MangaFilter = {
        search: {
          status: FilterStatus.Complete
        }
      };



      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "History's Strongest Disciple Kenichi",
        src : "http://kissmanga.com/IManga/History-s-Strongest-Disciple-Kenichi",
        status : "Open"
      });
    });
  });

});
