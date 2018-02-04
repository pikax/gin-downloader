import {FilterCondition, FilterStatus, Genre, GenreCondition, Type} from "../../../src/enum";
import {MangaFilter} from "../../../src/filter";

import {manga} from "src/sites/batoto";
import {config} from "src/sites/batoto/config";
import results from "./_results";
import auth from "./auth";
import nock = require("nock");


// TODO change me
const _MOCK_ = false;


describe("Batoto live", () => {

  it("should get all mangas", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/search_ajax?name=&name_cond=&artist_name=&artist_name_cond=&genres=&genre_cond=genre_cond%3Dand&status=&type=&mature=y&rating_low=0&rating_high=5&p=1")
        .replyWithFile(200, __dirname + "/html/mangas.html");
    }


    let mangas = await manga.mangas();
    mangas.should.have.length.gte(results.mangas_count);
  });

  it("should get latest chaps", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/")
        .replyWithFile(200, __dirname + "/html/latest.html");
    }

    let mangas = await manga.latest();

    mangas.should.have.length.gte(90);
  });

  it("should get info", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/search_ajax?name=Gintama&name_cond=c&artist_name=&artist_name_cond=&genres=&genre_cond=genre_cond%3Dand&status=&type=&mature=y&rating_low=0&rating_high=5&p=1")
        .replyWithFile(200, __dirname + "/html/searchGintama.html");

      nock(config.site)
        .get("/comic/_/comics/gintama-r94")
        .replyWithFile(200, __dirname + "/html/Gintama.html");
    }

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
    if (_MOCK_) {
      return; // do not resolve, just complete
    }

    let mangas = await manga.mangas();

    for (let obj of mangas) {
      let expected = obj.src;
      let origName = obj.name;
      let finalUrl = await manga.resolveMangaUrl(origName);

      finalUrl.should.be.eq(expected, `with name "${origName}"`);
    }
  });


  it("should not find manga by name", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/AdvanceSearch")
        .replyWithFile(200, __dirname + "/html/mangas.html");
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
    let name = "Gintamass";

    try {
      let chapters = await manga.chapters(name);
      chapters.should.be.null;

    } catch (e) {
      e.should.be.Throw;
    }
  });

  it("should not find chapter", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/search_ajax?name=Gintama&name_cond=e&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
        .replyWithFile(200, __dirname + "/html/searchGintama.html");

      nock(config.site)
        .get("/comic/_/comics/gintama-r94")
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
        .get("/search_ajax?name=Gintama&name_cond=e&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
        .replyWithFile(200, __dirname + "/html/searchGintama.html");

      nock(config.site)
        .get("/comic/_/comics/gintama-r94")
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
        .get("/search_ajax?name=Gintama&name_cond=c&artist_name=&artist_name_cond=&genres=&genre_cond=genre_cond%3Dand&status=&type=&mature=y&rating_low=0&rating_high=5&p=1")
        .replyWithFile(200, __dirname + "/html/searchGintama.html");

      nock(config.site)
        .get("/comic/_/comics/gintama-r94")
        .replyWithFile(200, __dirname + "/html/Gintama.html");
    }

    let name = "Gintama";

    let chapters = await manga.chapters(name);

    chapters.should.have.length.gte(results.chapter_count);
  });

  it("should get Gintama : chapter 653", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/search_ajax?name=Gintama&name_cond=c&artist_name=&artist_name_cond=&genres=&genre_cond=genre_cond%3Dand&status=&type=&mature=y&rating_low=0&rating_high=5&p=1")
        .replyWithFile(200, __dirname + "/html/searchGintama.html");

      nock(config.site)
        .get("/comic/_/comics/gintama-r94")
        .replyWithFile(200, __dirname + "/html/Gintama.html");

      // nock(config.site)
      //   .get("/areader?id=e37a90922a3aa108&p=1")
      //   .replyWithFile(200, __dirname + "/html/ch001.html");

      nock(config.site)
        .get(/areader/)
        .replyWithFile(200, __dirname + "/html/ch001.html")
        .persist();

    }


    let name = "Gintama";
    let chapter = 653;

    let images = await manga.images(name, chapter);
    images.should.to.exist;
    images.should.have.length.gte(17);

    let img = await images[0];
    (await img.value).src.should.contain("https://img.bato.to/comics/2017/10/");
  });


  describe("filter", () => {

    it("should filter by name", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/search_ajax?name=Gintama&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
          .replyWithFile(200, __dirname + "/html/searchGintama.html");
      }


      let filter: MangaFilter = {
        name: "Gintama"
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(4);
      mangas.results.should.deep.include({
        name: "Gintama",
        src: "https://bato.to/comic/_/gintama-r94",
        status: "Open",
        mature: false
      });
    });


    it("should filter by name endWith", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/search_ajax?name=Gintama&name_cond=e&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
          .replyWithFile(200, __dirname + "/html/searchGintama.html");
      }


      let filter: MangaFilter = {
        search: {
          name: {
            name: "Gintama",
            condition: FilterCondition.EndsWith
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src: "https://bato.to/comic/_/gintama-r94",
        status: "Open",
        mature: false
      });
    });

    it("should filter by name startsWith", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/search_ajax?name=Gintama&name_cond=s&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
          .replyWithFile(200, __dirname + "/html/searchGintama.html");
      }

      let filter: MangaFilter = {
        search: {
          name: {
            name: "Gintama",
            condition: FilterCondition.StartsWith
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(4);
      mangas.results.should.deep.include({
        name: "Gintama",
        src: "https://bato.to/comic/_/gintama-r94",
        status: "Open",
        mature: false
      });
    });

    it("should filter by in genre", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/search_ajax?name=&&artist_name=&&genres=i1;i2;i3;i8;i20;i33&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
          .replyWithFile(200, __dirname + "/html/filter/byGenre.html");
      }


      let filter: MangaFilter = {
        search: {
          genre: {
            inGenres: [Genre.Action, Genre.Adventure, Genre.Comedy, Genre.Historical, Genre.SciFi, Genre.Shounen]
          }
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "Gintama",
        src: "https://bato.to/comic/_/gintama-r94",
        status: "Open",
        mature: false
      });
    });

    it("should filter by out genre", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/search_ajax?name=gin&name_cond=s&artist_name=Sora&artist_name_cond=c&genres=e6&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
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
        src: "https://bato.to/comic/_/gintama-r94",
        status: "Open",
        mature: false
      });
    });

    it("should filter by Author", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/search_ajax?name=&&artist_name=Sorachi&artist_name_cond=c&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
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
        src: "https://bato.to/comic/_/gintama-r94",
        status: "Open",
        mature: false
      });
    });

    it("should filter by Status", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/search_ajax?name=kenichi&name_cond=c&artist_name=&&genres=&genre_cond=and&status=c&type=null&mature=y&rating_low=0&rating_high=5&p=1")
          .replyWithFile(200, __dirname + "/html/filter/byCompleted.html");
      }

      let filter: MangaFilter = {
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
        src: "https://bato.to/comic/_/historys-strongest-disciple-kenichi-r6",
        status: "Open",
        mature: false

      });
    });

    it("should filter by Type", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=kr&mature=y&rating_low=0&rating_high=5&p=1")
          .replyWithFile(200, __dirname + "/html/filter/byType.html");
      }


      let filter: MangaFilter = {
        search: {
          type: Type.Manhwa
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.deep.include({
        name: "10, 20, and 30",
        src: "https://bato.to/comic/_/10-20-and-30-r16192",
        status: "Closed",
        mature: false,
      });
    });

    it("should get by order", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/AdvanceSearch")
          .replyWithFile(200, __dirname + "/html/mangas.html");
      }


      throw new Error("not implemented");
    });

    it("should not include mature", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/search_ajax?name=ginta&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=n&rating_low=0&rating_high=5&p=1")
          .replyWithFile(200, __dirname + "/html/filter/noMature.html");
      }


      let filter: MangaFilter = {
        name: "ginta",
        search: {
          mature: false,
        }
      };

      let mangas = await manga.filter(filter);
      mangas.results.should.length.gte(1);
      mangas.results.should.not.deep.include({
        name: "Gintama - Iroha Uta (Doujinshi)",
        src: "https://bato.to/comic/_/gintama-iroha-uta-doujinshi-r11951",
        status: "Open",
        mature: true
      });
    });

    it("should have rating between 5~5", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=5&rating_high=5&p=1")
          .replyWithFile(200, __dirname + "/html/filter/rating5~5.html");
      }

      let filter: MangaFilter = {
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
        src: "https://bato.to/comic/_/a-girl-in-the-clouds-r21070",
        status: "Open",
        mature: false,
      });
    });

    it("should have rating between 0~1", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=1&rating_high=1&p=1")
          .replyWithFile(200, __dirname + "/html/filter/rating0~1.html");
      }

      let filter: MangaFilter = {
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
        src: "https://bato.to/comic/_/a-bittersweet-life-r6684",
        status: "Open",
        mature: false,
      });
    });

    it("should have genre inclusion OR", async () => {
      if (_MOCK_) {
        nock(config.site)
          .get("/search_ajax?name=ginta&&artist_name=&&genres=i34;i35;i38&genre_cond=or&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
          .replyWithFile(200, __dirname + "/html/filter/genreOr.html");
      }


      let filter: MangaFilter = {
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
        src: "https://bato.to/comic/_/gintama-iroha-uta-doujinshi-r11951",
        status: "Open",
        mature: true
      });
    });
  });

  describe("Loggin", () => {

    it("should be not logged in", async () => {
      let loggedIn = await manga.isLoggedIn();

      loggedIn.should.be.false;
    });

    it("should login", async () => {
      if (_MOCK_) {
        return;
      }

      if (!auth.username) {
        console.warn("no credential founds, not running login");
      }

      let loggedIn = await manga.login(auth.username, auth.password);
      loggedIn.should.be.true;
    });

  });
});
