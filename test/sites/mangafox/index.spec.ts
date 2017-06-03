/**
 * Created by rodriguesc on 06/03/2017.
 */


import "./../../common";

import {mangafox as manga} from "./../../../src";
import results from "./_results";
import {FilterCondition, FilterMangaType, FilterStatus, FilterSupport, Genre} from "../../../src/declarations";


describe("MangaFox live", () => {

  it("should get all mangas", async () => {
    let mangas =await  manga.mangas({name: "Gintama"});
    mangas.should.have.length.gte(results.mangas_count);
  });

  it("should get latest chaps", async () => {
    let latest = await manga.latest();
    latest.should.to.have.length.gte(90);
  });

  it("should get info", async () => {
    let name = "Gintama";
    let info = await manga.info(name);
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

  it("should resolve name to name", async () => {
    let mangas = await manga.mangas();

    for (let obj of mangas){
      let expected = obj.src;
      let origName = obj.name;
      let finalUrl = manga.resolveMangaUrl(origName);

      finalUrl.should.be.eq(expected, `with name "${origName}"`);
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

    }catch (e){
      e.should.be.Throw;
    }
  });

  it("should get chapters", async () => {
    let name = "Gintama";

    try {
      let chapters = await manga.chapters(name);

      chapters.should.be.null;

    }catch (e){
      e.should.be.Throw;
    }
  });

  it("should get Zui Wu Dao : chapter 42", async () => {
    let name = "Zui Wu Dao";
    let chapter = 42;

    let images = await manga.images(name, chapter);
    images.should.to.exist;
    images.should.have.length.gte(17);

    let img = await images[0];
    img.src.should.contain(".net/store/manga/15973/042.0/compressed/k001.jpg");
  });



  describe("filter", () => {

    it("should filter by name", async () => {
      let filter: FilterSupport = {
        name: "Gintama"
      };

      let mangas = await manga.filter(filter);

      mangas.results.should.length.gte(14);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://mangafox.me/manga/gintama/",
        mature: false,
        status: "Ongoing"
      });
    });


    it("should filter by name endWith", async () => {
      let filter: FilterSupport = {
        search: {
          name : {
            name: "Gintama",
            condition : FilterCondition.EndsWith
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://mangafox.me/manga/gintama/",
        mature: false,
        status: "Ongoing"
      });
    });

    it("should filter by name startsWith", async () => {
      let filter: FilterSupport = {
        search: {
          name : {
            name: "Gintama",
            condition : FilterCondition.StartsWith
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(14);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://mangafox.me/manga/gintama/",
        mature: false,
        status: "Ongoing"
      });
    });

    it("should filter by in genre", async () => {
      let filter: FilterSupport = {
        genres: [Genre.Action, Genre.Adventure, Genre.Comedy, Genre.Drama, Genre.Historical, Genre.SciFi, Genre.Shounen, Genre.Supernatural]
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://mangafox.me/manga/gintama/",
        mature: false,
        status: "Ongoing"
      });
    });

    it("should filter by out genre", async () => {
      let filter: FilterSupport = {
        outGenres: [Genre.Romance],
        search: {
          name: {
            name: "gin",
            condition: FilterCondition.StartsWith
          },
          author: {
            name: "Sora",
          }
        }

      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://mangafox.me/manga/gintama/",
        mature: false,
        status: "Ongoing"
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
        src : "http://mangafox.me/manga/gintama/",
        mature: false,
        status: "Ongoing"
      });
    });

    it("should filter by Status", async () => {
      let filter: FilterSupport = {
        search: {
          status: FilterStatus.Complete,
          name: {
            name: "kenichi"
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "History's Strongest Disciple Kenichi",
        src : "http://mangafox.me/manga/history_s_strongest_disciple_kenichi/",
        mature: false,
        status: FilterStatus.Complete.toString()
      });
    });

    it("should filter by Type", async () => {
      let filter: FilterSupport = {
        search: {
          type: FilterMangaType.Manhwa
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "10, 20, and 30",
        src : "http://mangafox.me/manga/10_20_and_30/",
        mature: false,
        status: "Complete"
      });
    });
  });

});
