/**
 * Created by rodriguesc on 06/03/2017.
 */


import site from './../../src/mangafox';
import results from './_results';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {toName} from '../../src/mangafox/names';

chai.use(chaiAsPromised);

// Then either:
const expect = chai.expect;
// or:
chai.should();
// according to your preference of assertion style

//TODO change to should assertion


describe('MangaFox live', () => {

  it('should get all mangas', done => {
    site.mangas()
      .then(mangas => {
        expect(mangas.length).to.be.gte(results.mangas_count);
        //TODO add manga verification
      })
      .then(done)
      .catch(done);

  });

  it('should get latest chaps', done => {
    site.latest()
      .should.eventually
      .to.have.length.gte(98)
      .notify(done);
  });

  it('should get info', done => {
    let manga = 'Gintama';
    site.info(manga)
      .tap(console.log)
      .then(x => {
        expect(x).to.exist;

        expect(x.released).to.be.eq(results.manga.released);

        expect(x.artists).to.be.deep.eq(results.manga.artists);
        expect(x.authors).to.be.deep.eq(results.manga.authors);
        expect(x.genres).to.be.deep.eq(results.manga.genres);
      })
      .should.eventually.notify(done);
  });

  it('should resolve name to name',(done)=>{
    'use strict';

    site.mangas()
      .then(mangas=>{
        for(let i in mangas){
          let obj= mangas[i];
          let expected = obj.src;
          let origName = obj.name;
          let processedName = toName(origName);

          processedName.should.be.eq(processedName,expected);
        }
      }).should.eventually.notify(done);
  });


  it('should not find manga by name',done=>{
    let name = 'my stupid name';
    let chapter = 1;

    site.resolve(name,chapter)
      .should.eventually.be.rejectedWith(Error)
      .notify(done);
  });



  it('should not find get chapters',done=>{
    let name = 'Gintamass';

    site.chapters(name)
      .should.eventually.be.rejectedWith(Error)
      .notify(done);
  });

  it('should not find chapter ',done=>{
    let name = 'Gintama';
    let chapter = 'oooraklhsdaosdjnalmshd';

    site.resolve(name,chapter)
      .should.eventually.be.rejectedWith(Error)
      .notify(done);
  });

  it('should not find images chapter ',done=>{
    let name = 'Gintama';
    let chapter = 'oooraklhsdaosdjnalmshd';

    site.images(name,chapter)
      .should.eventually.be.rejectedWith(Error)
      .notify(done);
  });


  it('should get chapters', done => {
    let manga = 'Gintama';

    site.chapters(manga)
      .then(x => {
        expect(x).to.exist;
        expect(x.length).to.be.gte(results.chapter_count);
        //TODO add chapter verification

      })
      .then(done)
      .catch(done);

  });


  it('should get images paths', done => {
    let chapter ='http://mangafox.me/manga/zui_wu_dao/c042/1.html';

    site.imagesPaths(chapter)
      .then(x => {
        expect(x).to.exist;
        expect(x.length).to.be.gte(8);
        //TODO add chapter verification
      })
      .then(done)
      .catch(done);
  });

  it('should get Zui Wu Dao : chapter 42', done => {
    let name = 'Zui Wu Dao';
    let chapter = 42;

    site.resolve(name,chapter)
      .then(images=>{
        expect(images).to.exist;
        expect(images.length).to.be.eq(17);

        images[0].then(img=>{
          expect(img).to.contain('mfcdn.net/store/manga/15973/042.0/compressed/k001.jpg');
        });
      })
      .should.eventually.notify(done);
  });
});