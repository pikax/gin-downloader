/**
 * Created by rodriguesc on 10/03/2017.
 */


import "./../common";


import {GinRequest} from "../../src/request";
import {parseDoc} from "../../src/common/helper";
import {strategy} from "../../src/request/requestRetryStrategy";
import {strategy as cfStrategy} from "../../src/request/requestCloudFareStrategy";

const request = new GinRequest(strategy);
const cfRequest = new GinRequest(cfStrategy);

describe("Helper.js", () => {
  let manga: string = `
      <html>
      <div>
          <a id="chap" href="1"/>
          <div />
          <div />
          <div />
      </div>
      </html>`;


  it("should not get html", async () => {
    let uri = "ht222tps://github.com/";
    try{
      let doc = await request.getDoc(uri);
      doc.should.be.null;
    }catch(e){
      e.should.be.throw;
    }
  });

  it("should get html", async()  => {
    let uri = "https://github.com/";
    let $ = await request.getDoc(uri);

    let xx = $(`a.header-logo-invertocat`).length.should.exist.and.be.eq(1);
  });

  it("should parse doc", () => {
    parseDoc(manga).should.exist;
  });

  it("should get doc", async () => {
    let uri = "https://github.com/";
    let $ = await request.getDoc(uri);

    $(`a.header-logo-invertocat`).length.should.be.eq(1);

    $.should.have.property("location", uri);

  });

  it("should get bytes", async() => {
    let uri = "https://github.com/";

    let html = await request.getHtml(uri);
    html.should.exist;
  });

  it("should get kissmanga by bypassing cloudfare protection", async() => {
    let uri = "http://kissmanga.com/";

    let html = await cfRequest.getHtml(uri);
    html.should.not.contain("Checking your browser before accessing");
  });
});


