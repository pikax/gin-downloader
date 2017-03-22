/**
 * Created by rodriguesc on 10/03/2017.
 */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {getHtml} from '../../src/common/request';
import {getDoc, parseDoc} from '../../src/common/helper';
var libxmljs = require('libxmljs');

chai.use(chaiAsPromised);

// Then either:
const expect = chai.expect;
// or:
chai.should();
// according to your preference of assertion style



describe('Helper.js',()=>{

  let manga = `<html>
	<div>
		<div name="1" id="chap" src="1"/>
		<div name="2"/>
		<div name="3"/>
		<div name="4"/>
	</div>
</html>`;


  it('should not get html',done=>{
    let uri = 'ht222tps://github.com/';
    getDoc(uri)
      .should.eventually.be.rejectedWith(Error)
      .notify(done);
  });

  it('should get html',done=>{
    let uri = 'https://github.com/';
    getDoc(uri)
      .then(doc=>doc.find(`//a[@class='header-logo-invertocat']`))
      .then(x=>{
        x.should.exist;
        x.length.should.be.eq(1);
      })
      .should.eventually.notify(done);
  });

  it('should parse doc',()=>{
    parseDoc(manga).should.exist
      .and.be.an.instanceOf(libxmljs.Document);
  });

  it('should get doc',done=>{
    let uri = 'https://github.com/';
    getDoc(uri)
      .tap(x=>{
        x.find(`//a[@class='header-logo-invertocat']`).length.should.be.eq(1);
      })
      .should.eventually.exist
      .and.be.an.instanceOf(libxmljs.Document)
      .notify(done);
  })


});


