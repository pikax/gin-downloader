/**
 * Created by rodriguesc on 02/03/2017.
 */

import libxmljs from './../../lib/speed/libxmljs';
import htmlparser2 from './../../lib/speed/htmlparser2';
import cheerio from './../../lib/speed/cheerio';

const expect = require("chai").expect;

var Promise = require("bluebird");

import fs from 'fs';


describe('parse & extract mangafox ',()=>{
  const path = './test/common/mangafox.html';

  let fp;

  let lib_doc;
  let lib_html2;
  let lib_cheerio;



  before(done=>{
    fs.readFile(path, (err,data)=>{
      if(err)
        return done(err);
      fp = data;

      // lib_doc = libxmljs.parseFile(fp);
      lib_html2 =htmlparser2.parseFile(fp);
      lib_cheerio = cheerio.parseFile(fp);

      // Promise.all(lib_doc,lib_cheerio,lib_html2)
      //   .then((res)=>{
      //   done();
      // }, function (err) {
      //   done(err);
      // });
      lib_cheerio.then(()=>done())
        ;

      Promise.all(lib_html2,lib_cheerio)
        .then(()=>done())
        .error(done);
    });
  });

  it('libxmljs',done=>{
    let doc = libxmljs.parseHtmlString(fp);

    done();
  });

  it('htmlparser2',done=>{
   expect(lib_html2).not.be.null;



   done();
  });

  it('cheerio',done=>{
    expect(lib_cheerio).not.be.null;

    done();
  });

});
