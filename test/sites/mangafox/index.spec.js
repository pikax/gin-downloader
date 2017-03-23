/**
 * Created by rodriguesc on 06/03/2017.
 */


import site from './../../../src/sites/mangafox';
import results from './_results';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {toName} from '../../../src/sites/mangafox/names';

chai.use(chaiAsPromised);
chai.should();

describe('MangaFox live', () => {

  it('should get all mangas', done => {
    site.mangas()
      .should.eventually.have.length.gte(results.mangas_count)
      .notify(done);
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
      .then(info => {
        info.should.exist;

        info.title.should.be.eq(results.manga.title);
        info.released.should.be.eq(results.manga.released);
        info.synopsis.should.contain(results.manga.synopsis);
        info.status.should.be.eq(results.manga.status);

        info.synonyms.should.be.deep.eq(results.manga.synonyms);
        info.authors.should.be.deep.eq(results.manga.authors);
        info.artists.should.be.deep.eq(results.manga.artists);
        info.genres.should.be.deep.eq(results.manga.genres);
        info.scanlators.should.be.deep.eq(results.manga.scanlators);
      }).should.eventually.notify(done);
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
      .should.eventually.have.length.gte(results.chapter_count)
      .notify(done);
  });


  it('should get images paths', done => {
    let chapter ='http://mangafox.me/manga/zui_wu_dao/c042/1.html';

    site.imagesPaths(chapter)
      .should.eventually.have.length.gte(8)
      .notify(done);
  });

  it('should get Zui Wu Dao : chapter 42', done => {
    let name = 'Zui Wu Dao';
    let chapter = 42;

    site.resolve(name,chapter)
      .then(images=>{
        images.should.to.exist;
        images.should.have.length.gte(17);

        return images[0].then(img=>{
          img.should.contain('mfcdn.net/store/manga/15973/042.0/compressed/k001.jpg');
        });
      })
      .should.eventually.notify(done);
  });
});