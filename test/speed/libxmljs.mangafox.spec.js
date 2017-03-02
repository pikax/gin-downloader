/**
 * Created by rodriguesc on 02/03/2017.
 */
/**
 * Created by rodriguesc on 02/03/2017.
 */

import mangafox from '../../lib/speed/libxmljs';
import result from '../common';

import {find} from  'lodash';


var expect = require('chai').expect;

describe('htmlparser2 mangafox ',()=> {
  const path = './test/common/mangafox.html';

  let doc;

  before(done=>{
    mangafox.parseFile(path)
      .then(x=>doc=x)
      .then(x=>done());
  });



  it('should get all mangas by name',()=>{
    let selector = doc.find(`//a[contains(@class, 'series_preview')]`);
    expect(selector.length).to.be.eq(result.mangas_count);
  });

  it('should contain Gintama',()=>{
    let selector = doc.find(`//a[contains(@class, 'series_preview')][text()='${result.manga_name}']`);

    console.log(selector.length)
    expect(selector.length).to.be.greaterThan(0);
  });

  it('should contain Gintama v2',()=>{
    let elements = doc.find(`//a[contains(@class, 'series_preview')]`);

    elements = find(elements, x=>x.text() == result.manga_name);

    expect(elements).to.be.not.null;
  });

  it('should parse and get Gintama',(done)=>{
    mangafox.parseFile(path)
      .then(doc=>{
        return doc.find(`//a[contains(@class, 'series_preview')][text()='${result.manga_name}']`)[0];
      })
      .then(x=>{
        expect(x.text()).to.be.eq(result.manga_name);
      })
      .then(done);
  })
});
