/**
 * Created by rodriguesc on 10/03/2017.
 */


import "./../common";


import {GinRequest} from "../../src/request";
import {parseDoc} from "../../src/common/helper";
import {strategy} from "../../src/request/requestRetryStrategy";
import {strategy as cfStrategy} from "../../src/request/requestCloudFareStrategy";
import {_MOCK_} from "../common";
import nock = require("nock");

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


  it("should not be able to create request without strategy", ()=>{
    try{
      let doc = new GinRequest(null);
      doc.should.be.null;
    }catch(e){
      e.should.be.throw;
    }
  });

  it("should not get html", async () => {
    let url = "ht222tps://github.com/";
    try{
      let doc = await request.getDoc({url});
      doc.should.be.null;
    }catch(e){
      e.should.be.throw;
    }
  });

  it("should request with params", async ()=>{
    let bytes = await request.request('http://github.com','POST', 'testbody');
    bytes.should.not.be.empty;
  });

  it("should post Doc", async ()=>{
    let doc = await request.postDoc('http://github.com');
    doc.should.not.be.undefined;
    doc.location.should.eq('http://github.com');
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

    let html = await strategy.request(uri);
    html.should.exist;
  });

  // NOTE cloudfare blocks travis ci ip
  it("should get kissmanga by bypassing cloudfare protection", async() => {
    if (_MOCK_) {
        nock( "http://kissmanga.com/")
          .get("/")
          .reply(200, 'ccapsldjas');
    }

    let uri = "http://kissmanga.com/";

    let html = await cfRequest.getHtml(uri);
    html.should.not.contain("Checking your browser before accessing");
  });


  it('should fail bypassing cloudfare', async()=>{
    try {
      nock("http://kissmanga.com/")
        .get("/")
        .reply(200, 'why_captcha');

      await cfStrategy.request("http://kissmanga.com/");
    }
    catch(e){
      e.should.be.throw;
    }

  })






});


