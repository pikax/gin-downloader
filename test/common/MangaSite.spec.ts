/**
 * Created by pikax on 13/04/2017.
 */
import "./../common";


import * as results from "../_mock/_results";
import {MockSite} from "../_mock/Site";



describe("MangaSite logic", () => {

  let site = new MockSite();

  it("Should get all mangas", async () => {
      let mangas = await site.mangas();

      mangas.should.be.eq(results.mangas);
  });

  it("Should fail getting info : no name", async () => {

    try {
      let info =await (<any>site).info();
      info.should.be.null;
    }catch (e){
      e.should.be.throw;
    }
  });

  it("Should fail getting info", async() => {
    try {
      let info = await site.info("fail");
      info.should.be.null;
    }catch (e){
      e.should.be.throw;
    }

  });

  it("Should get latest", async () => {
    let latest = await site.latest();

    latest.should.be.eq(results.latest);

  });

  it("should get info", async () => {
    let info = await site.info("Gintama");

    info.should.be.eq(results.info);

  });

  it("should get chapters", async () => {
    let chapters = await site.chapters("Gintama");

    chapters.should.be.eq(results.chapters);

  });


  it("Should fail getting chapters : no name", async () => {
    try {
      let info = (<any>site).chapters();
      info.should.be.null;
    }catch (e){
      e.should.be.throw;
    }
  });

  it("Should fail getting chapters", async () => {
    try {
      let info = site.chapters("fail");
      info.should.be.null;
    }catch (e){
      e.should.be.throw;
    }
  });


  it("should get Info & Chapters", async () => {
    let infoChapters = await site.infoChapters("Gintama");
    let infoChapter = {info: results.info, chapters: results.chapters};

    infoChapters.should.be.deep.eq(infoChapter);
  });


  it("Should fail getting info&chapters : no name", async () => {
    try {
      let info =  ((<any>site).infoChapters());
      info.should.be.null;
    }catch (e){
      e.should.be.throw;
    }
  });

  it("Should fail getting info&chapters", async () => {
    try {
      let info = site.infoChapters("fail");
      info.should.be.null;
    }catch (e){
      e.should.be.throw;
    }
  });

  it("should get images", async () => {
    let tkImages = await site.images("Gintama", 1);

    let images = await Promise.all(tkImages);

    images.should.be.length(results.image.length);
  });

  it("Should fail getting images : no name", async () => {
    try {
      let images = ((<any>site).images());
      images.should.be.null;
    }catch (e){
      e.should.be.throw;
    }
  });


  it("Should fail getting images : no chapter", async () => {
    try {
      let images = ((<any>site).images("Gintama"));
      images.should.be.null;
    }catch (e){
      e.should.be.throw;
    }
  });


});








