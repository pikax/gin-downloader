/**
 * Created by rodriguesc on 02/03/2017.
 */

import libxmljs from 'libxmljs';
import htmlparser2 from 'htmlparser2';
import cheerio from 'cheerio';

var Promise = require("bluebird");

import fs from 'fs';


describe('parse mangafox ',()=>{
  const path = './test/common/mangas.html';

  let fp;

  before(done=>{

    fs.readFile(path, (err,data)=>{
      if(err)
        return done(err);
      fp = data;

      done();
    });
  });

  it('libxmljs',done=>{
    let doc = libxmljs.parseHtmlString(fp);

    done();
  });

  it('htmlparser2',done=>{
    let parser = new htmlparser2.Parser({
      onend: done,
      onerror: done
    });

    parser.end(fp);
  });

  it('cheerio',done=>{
    let $ = cheerio.load(fp);
    done();
  });

});
