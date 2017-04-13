/**
 * Created by pikax on 13/04/2017.
 */
import "./../common";


import {chapters, latest, info, mangas, image, imagesPaths} from "../_mock/_results";
import {MockSite} from "../_mock/Site";



describe("MangaSite logic", () => {

  let site = new MockSite();

  it("Should get all mangas", () => {
      site.mangas().should.be.eq(mangas);
  });

  it("Should get latest", () => {
    site.latest().should.be.eq(latest);

  });

  it("should get info", () => {
    site.info("Gintama").should.be.eq(info);

  });

  it("should get chapters", () => {
    site.chapters("Gintama").should.be.eq(chapters);

  });

  it("should get Info & Chapters", () => {
    site.infoChapters("Gintama").should.be.eq(info);

  });

  it("should get images", () => {
    site.images("Gintama", 1).should.be.eq(imagesPaths);
  });
});








