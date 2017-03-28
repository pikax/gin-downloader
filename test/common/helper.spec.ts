/**
 * Created by rodriguesc on 10/03/2017.
 */


import "./../common";


import {getBytes, getHtml} from "../../src/common/request";
import {getDoc, parseDoc} from "../../src/common/helper";
import cfRequest from "../../src/common/cfRequest";

import {HTMLDocument} from "libxmljs";



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


  it("should not get html", done => {
    let uri = "ht222tps://github.com/";
    getDoc(uri)
      .should.eventually.be.rejectedWith(Error)
      .notify(done);
  });

  it("should get html", done => {
    let uri = "https://github.com/";
    getDoc(uri)
      .then(doc => doc.find(`//a[@class='header-logo-invertocat']`))
      .then(x => {
        x.should.exist;
        x.length.should.be.eq(1);
      })
      .should.eventually.notify(done);
  });

  it("should parse doc", () => {
    parseDoc(manga).should.exist;
  });

  it("should get doc", done => {
    let uri = "https://github.com/";
    getDoc(uri)
      .tap(x => {
        x.find(`//a[@class='header-logo-invertocat']`).length.should.be.eq(1);
      })
      .should.eventually.exist
      .and.property("location", uri)
      .notify(done);
  });

  it("should get bytes", done => {
    let uri = "https://github.com/";

    getHtml(uri, {})
      .should.eventually.exist.and.notify(done);
  });

  it("should get kissmanga by bypassing cloudfare protection", done => {
    let uri = "http://kissmanga.com/";

    cfRequest.getHtml(uri, {})
      .should.eventually.not.contain("Checking your browser before accessing").notify(done);
  });
});


