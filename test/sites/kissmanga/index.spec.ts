/**
 * Created by rodriguesc on 06/03/2017.
 */


import "./../../common";

import {manga} from "./../../../src/sites/kissmanga";
import results from "./_results";
import {helper} from "../../../src/sites/kissmanga/names";


describe("KissManga live", () => {

  it("should get all mangas", done => {
    manga.mangas({name: "Gintama"})
      .should.eventually.have.length.gte(results.mangas_count)
      .notify(done);
  });

  it("should get latest chaps", done => {
    manga.latest()
      .should.eventually
      .to.have.length.gte(90)
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
    info.views.should.be.deep.eq(results.manga.views);

  });

  it("should resolve name to name", async () => {
    let mangas = await manga.mangas();

    for (let obj of mangas){
      let expected = obj.src;
      let origName = obj.name;
      let finalUrl = helper.resolveUrl(origName);

      finalUrl.should.be.eq(expected, `with name "${origName}"`);
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
});
