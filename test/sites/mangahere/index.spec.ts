/**
 * Created by rodriguesc on 06/03/2017.
 */
import "./../../common";

import {manga} from "./../../../src/sites/mangahere";
import results from "./_results";
import {helper} from "../../../src/sites/mangahere/names";
import {FilterCondition, FilterMangaType, FilterStatus, FilterSupport, Genre} from "../../../src/declarations";


describe("MangaHere live", () => {

  it("should get all mangas", async () => {
    let mangas = await await manga.mangas();
    mangas.should.have.length.gte(results.mangas_count);
  });

  it("should get latest chaps", async () => {
    let latest = await manga.latest();
    latest.should.to.have.length.gte(98);
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
    }
  });


  it("should not find manga by name", async () => {
    let name = "my stupid name";
    let chapter = 1;

    try {
      let images = await manga.images(name, chapter);

      images.should.be.null;

    }catch (e){
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

    let chapters = await manga.chapters(name);
    chapters.should.have.length.gte(results.chapter_count);
  });

  it("should get Gintama : chapter 41", async () => {
    let name = "Gintama";
    let chapter = 41;

    let images = await manga.images(name, chapter);
    images.should.to.exist;
    images.should.have.length.gte(17);

    let img = await images[0];
    img.src.should.contain("mhcdn.net/store/manga/551/041.0/compressed/M7_Gintama_ch041_00.jpg");
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
        src : "http://www.mangahere.co/manga/gintama/"
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
        src : "http://www.mangahere.co/manga/gintama/"
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
        src : "http://www.mangahere.co/manga/gintama/"
      });
    });

    it("should filter by in genre", async () => {
      let filter: FilterSupport = {
        search: {
          genre: {
            inGenres: [Genre.Action, Genre.Adventure, Genre.Comedy, Genre.Drama, Genre.Historical, Genre.SciFi, Genre.Shounen, Genre.Supernatural]
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://www.mangahere.co/manga/gintama/"
      });
    });

    it("should filter by out genre", async () => {
      let filter: FilterSupport = {

        search: {
          name: {
            name: "gin",
            condition: FilterCondition.StartsWith
          },
          author: {
            name: "Sora",
          },
          genre: {
            outGenres: [Genre.Romance],
          }
        }

      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://www.mangahere.co/manga/gintama/"
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
        src : "http://www.mangahere.co/manga/gintama/"
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
        name: "Historys Strongest Disciple Kenichi",
        src : "http://www.mangahere.co/manga/historys_strongest_disciple_kenichi/"
      });
    });

    it("should filter by Type", async () => {
      let filter: FilterSupport = {
        search: {
          name: {
            name: "10"
          },
          type: FilterMangaType.Manhwa
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "100 Ways to Kill A Seal",
        src : "http://www.mangahere.co/manga/100_ways_to_kill_a_seal/"
      });
    });
  });
});
