/**
 * Created by rodriguesc on 06/03/2017.
 */


import "./../../common";

import * as nock from "nock";

import {mangafox as manga} from "./../../../src";
import results from "./_results";
import {FilterCondition, FilterMangaType, FilterStatus, MangaFilter, Genre} from "../../../src/declarations";

import {config} from "../../../src/sites/mangafox/config";
import {_MOCK_} from "../../common";



describe("MangaFox live", () => {

  it("should get all mangas", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/manga/")
        .replyWithFile(200, __dirname + "/html/mangas.html");
    }

    let mangas = await  manga.mangas({name: "Gintama"});
    mangas.should.have.length.gte(results.mangas_count);
  });

  it("should get latest chaps", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/releases/")
        .replyWithFile(200, __dirname + "/html/latest.html");
    }

    let latest = await manga.latest();
    latest.should.to.have.length.gte(90);
  });

  it("should get info", async () => {
    if (_MOCK_) {
      nock(config.site)
        .get("/manga/gintama/")
        .replyWithFile(200, __dirname + "/html/Gintama.html");
    }

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
    if (_MOCK_) {
      nock(config.site)
        .get("/manga/")
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
        .get("/Manga/my-stupid-name")
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
        .get("/Manga/Gintamass")
        .reply(404);
    }


    let name = "Gintamass";

    try {
      let chapters = await manga.chapters(name);

      chapters.should.be.null;

    }catch (e) {
      e.should.be.Throw;
    }
  });

  it("should not find chapter", async () => {
    // chapters
    if (_MOCK_) {
      nock(config.site)
        .get("/manga/gintama")
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
    if (_MOCK_) {
      nock(config.site)
        .get("/manga/gintama")
        .replyWithFile(200, __dirname + "/html/Gintama.html");
    }

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
    if (_MOCK_) {
      nock(config.site)
        .get("/manga/gintama")
        .replyWithFile(200, __dirname + "/html/Gintama.html");
    }

    let name = "Gintama";

    try {
      let chapters = await manga.chapters(name);

      chapters.should.be.null;

    }catch (e){
      e.should.be.Throw;
    }
  });

  it("should get Zui Wu Dao : chapter 42", async () => {
    /*start*/
    if (_MOCK_) {
      nock(config.site)
        .get("/manga/zui_wu_dao/")
        .replyWithFile(200, __dirname + "/html/ZuiWuDao.html");

      nock(config.site)
        .get(/manga\/zui_wu_dao\/c042/)
        .replyWithFile(200, __dirname + "/html/c042.html")
        .persist();

    }
    /*end*/

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
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search.php?name_method=cw&name=Gintama&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
          .replyWithFile(200, __dirname + "/html/filter/byName.html");
      }


      let filter: MangaFilter = {
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
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search.php?name_method=ew&name=Gintama&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
          .replyWithFile(200, __dirname + "/html/filter/byName.html");
      }

      let filter: MangaFilter = {
        search: {
          name : {
            name: "Gintama",
            condition : FilterCondition.EndsWith
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

    it("should filter by name startsWith", async () => {
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search.php?name_method=bw&name=Gintama&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
          .replyWithFile(200, __dirname + "/html/filter/byName.html");
      }

      let filter: MangaFilter = {
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
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search.php?name_method=cw&name=&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=1&genres%5BAdult%5D=0&genres%5BAdventure%5D=1&genres%5BComedy%5D=1&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=1&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=1&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=1&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=1&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=1&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
          .replyWithFile(200, __dirname + "/html/filter/byGenre.html");
      }

      let filter: MangaFilter = {
        search: {
          genre: [Genre.Action, Genre.Adventure, Genre.Comedy, Genre.Drama, Genre.Historical, Genre.SciFi, Genre.Shounen, Genre.Supernatural]
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

    it("should filter by out genre", async () => {
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search.php?name_method=bw&name=gin&type=&author_method=cw&author=Sora&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=2&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
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
        src : "http://mangafox.me/manga/gintama/",
        mature: false,
        status: "Ongoing"
      });
    });

    it("should filter by Author", async () => {
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search.php?name_method=cw&name=&type=&author_method=cw&author=Sorachi&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
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
        src : "http://mangafox.me/manga/gintama/",
        mature: false,
        status: "Ongoing"
      });
    });

    it("should filter by Status", async () => {
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search.php?name_method=cw&name=kenichi&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
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
        src : "http://mangafox.me/manga/history_s_strongest_disciple_kenichi/",
        mature: false,
        status: FilterStatus.Complete.toString()
      });
    });

    it("should filter by Type", async () => {
      if (_MOCK_) {
        // filter by Name
        nock(config.site)
          .get("/search.php?name_method=cw&name=&type=2&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
          .replyWithFile(200, __dirname + "/html/filter/byType.html");
      }

      let filter: MangaFilter = {
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
