/**
 * Created by rodriguesc on 10/03/2017.
 */

import {resolveArray,resolveObject} from './../../lib/common/helper';
import osmosis from 'osmosis';

const expect = require('chai').expect;


describe('Helper.js',()=>{

  let manga = `<html>
	<chapters>
		<chapter name="1" id="chap" src="1"/>
		<chapter name="2"/>
		<chapter name="3"/>
		<chapter name="4"/>
	</chapters>
</html>`;


  it('should resolve array',done=>{
    let osm = osmosis.parse(manga)
      .find('chapters > chapter')
      .set({src : '@src'});

    resolveArray(osm)
        .then(x=>{
          expect(x.length).to.be.eq(4);
          expect(x[0].src).to.be.eq('1');
        })
      .then(done)
      .catch(done);
  });

  it('should resolve object',done=>{
    let osm = osmosis.parse(manga)
      .find('#chap')
      .set({src : '@src'});

    resolveObject(osm)
      .then(x=>{
        expect(x).to.exist;
        expect(x.src).to.be.eq('1');
      })
      .then(done)
      .catch(done);
  });

});


