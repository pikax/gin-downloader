/**
 * Created by rodriguesc on 06/03/2017.
 */


import "./../../common";

import {manga} from "./../../../src/sites/kissmanga";
import results from "./_results";
import {helper} from "../../../src/sites/kissmanga/names";
import {FilterCondition, FilterStatus, FilterSupport, Genre} from "../../../src/declarations";


describe("KissManga live", () => {

  // TODO add filter tests
  it("should get all mangas", done => {
    manga.mangas()
      .should.eventually.have.length.gte(results.mangas_count)
      .notify(done);
  });

  it("should get latest chaps", done => {
    manga.latest()
      .should.eventually
      .to.have.length.gte(40)
      .notify(done);
  });

  it("should get info", async () => {
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


  it("should not find manga by name", done => {
    let name = "my stupid name";
    let chapter = 1;

    manga.images(name, chapter)
      .should.eventually.be.rejectedWith(Error)
      .notify(done);
  });



  it("should not find get chapters", done => {
    let name = "Gintamass";

    manga.chapters(name)
      .should.eventually.be.empty
      .notify(done);
  });

  it("should not find chapter", done => {
    let name = "Gintama";
    let chapter = -354564;

    manga.images(name, chapter)
      .should.eventually.be.rejectedWith(Error)
      .notify(done);
  });

  it("should not find images chapter ", done => {
    let name = "Gintama";
    let chapter = -5151;

    manga.images(name, chapter)
      .should.eventually.be.rejectedWith(Error)
      .notify(done);
  });


  it("should get chapters", done => {
    let name = "Gintama";

    manga.chapters(name)
      .should.eventually.have.length.gte(results.chapter_count)
      .notify(done);
  });

  it("should get Gintama : chapter 42", async () => {
    let name = "Gintama";
    let chapter = 42;

    let images = await manga.images(name, chapter);
    images.should.to.exist;
    images.should.have.length.gte(17);

    let img = await images[0];
    img.src.should.contain(results.image_src);
  });

  describe("Filter", ()=>{
    it("should filter by name", async () => {
      let filter: FilterSupport = {
        name: "Gintama"
      };


      let mangas = await manga.filter(filter);
      console.log(mangas)
      mangas.results.should.length(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://kissmanga.com/Manga/Gintama",
        status : "Open"
      });
    });

    it("should filter by in genre", async () => {
      let filter: FilterSupport = {
        genres: [Genre.Comedy, Genre.Action, Genre.SciFi, Genre.Shounen]
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(50);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://kissmanga.com/Manga/Gintama",
        status : "Open"
      });
    });
    it("should filter by out genre", async () => {
      let filter: FilterSupport = {
        outGenres: [Genre.FourKoma, Genre.Adult, Genre.Adventure, Genre.Manhwa, Genre.AwardWinning]
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(50);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://kissmanga.com/Manga/Gintama",
        status : "Open"
      });
    });

    it("should filter by Author", async () => {
      let filter: FilterSupport = {
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
        src : "http://kissmanga.com/Manga/Gintama",
        status : "Open"
      });
    });

    it("should filter by Status", async () => {
      let filter: FilterSupport = {
        search: {
          status: FilterStatus.Complete
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(50);
      mangas.results.should.deep.include({
        name: "History's Strongest Disciple Kenichi",
        src : "http://kissmanga.com/Manga/History-s-Strongest-Disciple-Kenichi",
        status : "Open"
      });
    });
  })



});
