/**
 * Created by rodriguesc on 10/03/2017.
 */

import {resolveArray,resolveObject,resolveOsmosis} from './../../lib/common/helper';
import osmosis from 'osmosis';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

// Then either:
const expect = chai.expect;
// or:
chai.should();
// according to your preference of assertion style



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
  //
  //it('should create osmosis',done=>{
  //  let uri = 'https://github.com/';
  //  //
  //  //osmosis.get(uri)
  //  //  .find('a.header-logo-invertocat')
  //  //  .set('href','@href')
  //  //  .data(x=>{
  //  //    x.should.exist;
  //  //    x.href.should.be.eq(uri);
  //  //    done();
  //  //  })
  //  //  .end();
  //
  //  resolveOsmosis(uri)
  //    .then(osm=>{
  //      return osm.find('a.header-logo-invertocat').set('href','@href');
  //    })
  //    .then(resolveObject)
  //    .then(x=>{
  //      x.should.exist;
  //      x.href.should.be.eq(uri);
  //    })
  //    .should.eventually.notify(done);
  //
  //});

});


