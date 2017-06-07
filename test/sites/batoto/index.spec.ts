/**
 * Created by rodriguesc on 06/03/2017.
 */


import "./../../common";

import {manga} from "./../../../src/sites/batoto";
import results from "./_results";
import auth from "./auth";
import {
  FilterCondition, FilterMangaType, FilterStatus, FilterSupport, Genre,
  GenreCondition
} from "../../../src/declarations";


describe("Batoto live", () => {

  it("should get all mangas", async () => {
    let mangas = await manga.mangas();
    mangas.should.have.length.gte(results.mangas_count);
  });

  it("should get latest chaps", async () => {
    let mangas = await manga.latest();

    mangas.should.have.length.gte(90);
  });

  it("should get info", async () => {
    let name = "Gintama";
    let info = await manga.info(name);

        info.should.exist;

        info.title.should.be.eq(results.manga.title);
        // info.released.should.be.eq(results.manga.released);
        info.synopsis.should.contain(results.manga.synopsis);
        info.status.should.be.eq(results.manga.status);

        info.synonyms.should.be.deep.eq(results.manga.synonyms);
        info.authors.map(x => x.toLowerCase()).should.be.deep.eq(results.manga.authors); // the website keeps changing between lower and uppercase
        info.artists.map(x => x.toLowerCase()).should.be.deep.eq(results.manga.artists); // the website keeps changing between lower and uppercase

        for (let genre of results.manga.genres) { // batoto keeps adding/removing Drama from genres
          info.genres.should.be.contain(genre);
        }
  });

  it("should resolve name to name", async () => {
    let mangas = await manga.mangas();

    for (let obj of mangas){
      let expected = obj.src;
      let origName = obj.name;
      let finalUrl = await manga.resolveMangaUrl(origName);

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

    }catch (e) {
      e.should.be.Throw;
    }
  });

  it("should not find chapter", async () => {
    let name = "Gintama";
    let chapter = -354564;


    try {
      let images = await manga.images(name, chapter);
      images.should.be.null;

    }catch (e) {
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

  it("should get Gintama : chapter 635", async () => {
    let name = "Gintama";
    let chapter = 635;

    let images = await manga.images(name, chapter);
    images.should.to.exist;
    images.should.have.length.gte(17);

    let img = await images[0];
    img.src.should.contain("http://img.bato.to/comics/2017/05/20/g/read591fb1e5ad4d4/img000001.png");
  });



  describe("filter", () => {

    it("should filter by name", async () => {
      let filter: FilterSupport = {
        name: "Gintama"
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(4);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://bato.to/comic/_/gintama-r94",
        status: "Open",
        mature: false
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
        src : "http://bato.to/comic/_/gintama-r94",
        status: "Open",
        mature: false
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
      mangas.results.should.length.gte(4);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://bato.to/comic/_/gintama-r94",
        status: "Open",
        mature: false
      });
    });

    it("should filter by in genre", async () => {
      let filter: FilterSupport = {
        search: {
          genre : {
            inGenres: [Genre.Action, Genre.Adventure, Genre.Comedy, Genre.Historical, Genre.SciFi, Genre.Shounen]
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://bato.to/comic/_/gintama-r94",
        status: "Open",
        mature: false
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
            outGenres : [Genre.Romance]
          }
        }

      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src : "http://bato.to/comic/_/gintama-r94",
        status: "Open",
        mature: false
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
        src : "http://bato.to/comic/_/gintama-r94",
        status: "Open",
        mature: false
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
        src : "http://bato.to/comic/_/historys-strongest-disciple-kenichi-r6",
        status: "Open",
        mature: false

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
        src : "http://bato.to/comic/_/10-20-and-30-r16192",
        status: "Closed",
        mature: false,
      });
    });

    it("should get by order", async () => {

      throw new Error("not implemented");
    });

    it("should not include mature", async () => {

      let filter: FilterSupport = {
        name: "ginta",
        search: {
          mature: false,
          }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.not.deep.include({
        name: "Gintama - Iroha Uta (Doujinshi)",
        src : "http://bato.to/comic/_/gintama-iroha-uta-doujinshi-r11951"
      });
    });

    it("should have rating between 5~5", async () => {
      let filter: FilterSupport = {
        search: {
          rating: {
            from: 5,
            to: 5
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "A Girl In The Clouds",
        src : "http://bato.to/comic/_/a-girl-in-the-clouds-r21070"
      });
    });

    it("should have rating between 0~1", async () => {

      let filter: FilterSupport = {
        search: {
          rating: {
            from: 1,
            to: 1
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "A Bittersweet Life",
        src : "http://bato.to/comic/_/a-bittersweet-life-r6684"
      });
    });

    it("should have genre inclusion OR", async () => {

      let filter: FilterSupport = {
        name: "ginta",
        search: {
          genre: {
            condition: GenreCondition.Or,
            inGenres: [Genre.Josei, Genre.Oneshot, Genre.Shoujo]
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "Gintama - Iroha Uta (Doujinshi)",
        src : "http://bato.to/comic/_/gintama-iroha-uta-doujinshi-r11951"
      });
    });
  });

  describe("Loggin", () => {

    it("should be not logged in", async() => {

      let loggedIn = await manga.isLoggedIn();

      loggedIn.should.be.false;
    });

    it("should login", async() => {
      if (!auth.username) {
        console.warn("no credential founds, not running login");
      }

      let loggedIn = await manga.logIn(auth.username, auth.password);
      loggedIn.should.be.true;
    });

  });
});
