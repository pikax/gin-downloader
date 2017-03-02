/**
 * Created by rodriguesc on 02/03/2017.
 */
/**
 * Created by rodriguesc on 02/03/2017.
 */

import htmlparser2 from '../../lib/speed/htmlparser2';
import result from '../common';

var expect = require('chai').expect;

describe('htmlparser2 mangafox ',()=> {
  const path = './test/common/mangafox.html';

  let doc;

  before(done=>{
    htmlparser2.parseFile(path)
      .then(x=>doc=x)
      .then(x=>done());
  });



  it('should get all mangas by name',()=>{
    doc.DomUtils()

    let selector = $('a.series_preview');
    expect(selector.length).to.be.eq(result.mangas_count);
  });

  it('should contain Gintama',()=>{
    let selector = $(`a.series_preview:contains("${result.manga_name}")`);
    // let selector = $('a.series_preview').filter((x,el)=>el.children[0].data==result.manga_name);

    console.log(selector.length)
    expect(selector.length).to.be.greaterThan(0);
  });

});
