/**
 * Created by rodriguesc on 02/03/2017.
 */

import cheerio from '../../lib/speed/cheerio';
import result from '../common';

var expect = require('chai').expect;



describe('htmlparser2 mangafox ',()=> {
  const path = './test/common/mangas.html';

  let $;

  before(done=>{
    cheerio.parseFile(path)
      .then(x=>$=x)
      .then(x=>done());
  });



  it('should get all mangas by name',()=>{
    let selector = $('a.series_preview');
    expect(selector.length).to.be.eq(result.mangas_count);
  });

  it('should contain Gintama',()=>{
    let selector = $(`a.series_preview:contains("${result.manga_name}")`);
    // let selector = $('a.series_preview').filter((x,el)=>el.children[0].data==result.manga_name);

    expect(selector.length).to.be.greaterThan(0);
  });

  it('should parse and get Gintama',(done)=>{
    cheerio.parseFile(path)
      .then($=>$('a.series_preview:first-child').filter((x,el)=>el.text() == result.manga_name))
      .then(x=>{
        expect(x.text()).to.be.eq(result.manga_name);
      })
      .then(done);
  })

});
