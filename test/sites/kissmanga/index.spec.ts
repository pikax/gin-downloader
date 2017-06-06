/**
 * Created by rodriguesc on 06/03/2017.
 */


import "./../../common";

import {manga} from "./../../../src/sites/kissmanga";
import results from "./_results";
import { FilterStatus, FilterSupport, Genre} from "../../../src/declarations";


describe("KissManga live", () => {

  it("should get all mangas", async () => {
    let mangas = await manga.mangas();
    mangas.should.have.length.gte(results.mangas_count);
  });

  it("should get latest chaps", async() => {
    let latest = await  manga.latest();
    latest.should.to.have.length.gte(40);
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


  it("should not find manga by name", async () => {
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
    let name = "Gintamass";

    try {
      let chapters = await manga.chapters(name);

      chapters.should.be.null;

    }catch (e){
      e.should.be.Throw;
    }
  });

  it("should not find chapter", async () => {
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
    let name = "Gintama";

    let chapters = await manga.chapters(name);
    chapters.should.have.length.gte(results.chapter_count);
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

  describe("Filter", () => {
    it("should filter by name", async () => {
      let filter: FilterSupport = {
        name: "Gintama"
      };


      let mangas = await manga.filter(filter);
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
  });



});
