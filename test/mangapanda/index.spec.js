/**
 * Created by rodriguesc on 07/03/2017.
 */

import site from './../../src/mangapanda';
import {toName} from './../../src/mangapanda/names';
import config from './_results';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';


import results from './_results';
import {getDoc} from '../../src/common/helper';

chai.use(chaiAsPromised);

// Then either:
const expect = chai.expect;
// or:
chai.should();
// according to your preference of assertion style


describe('MangaPanda live', () => {


  it('should get all mangas', done => {
    site.mangas()
      .then(mangas => {
        expect(mangas.length).to.be.gte(config.mangas_count);
        //TODO add manga verification
      })
      .then(done)
      .catch(done);

  });


  it('should not find images chapter ',done=>{
    let name = 'Gintama';
    let chapter = 'oooraklhsdaosdjnalmshd';

    site.images(name,chapter)
      .should.eventually.be.rejectedWith(Error)
      .notify(done);
  });

  it('should get latest chaps', done => {
    site.latest()
      .should.eventually
      .to.have.length.gte(50)
      .notify(done);
  });

  it('should not find get chapters',done=>{
    let name = 'Gintamass';

    site.chapters(name)
      .should.eventually.be.rejectedWith(Error)
      .notify(done);
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


  it('should get info', done => {
    let manga = 'Gintama';
    site.info(manga)
      .then(x => {
        expect(x).to.exist;



        expect(x.title).to.be.eq(results.manga.title);
        expect(x.released).to.be.eq(results.manga.released);
        expect(x.csv_title).to.be.eq(results.manga.csv_title);
        expect(x.status).to.be.eq(results.manga.status);

        expect(x.artist).to.be.eq(results.manga.artist);
        expect(x.author).to.be.deep.eq(results.manga.author);
        expect(x.genres).to.be.deep.eq(results.manga.genres);

      })
      .should.eventually.notify(done);

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
    let chapter = 'http://www.mangapanda.com/gintama/1';

    site.imagesPaths(chapter)
      .then(x => {
        expect(x).to.exist;
        expect(x.length).to.be.gte(20);
        //TODO add chapter verification

      })
      .then(done)
      .catch(done);
  });

  it('should parse all images', done =>{
    site.images('Gintama',41)
      .then(images=>{
        expect(images).to.exist;
        expect(images.length).to.be.eq(23);
        return images[0];
      })
      .then(img=>{
        expect(img).to.contain('mangapanda.com/gintama/41/gintama');
      })
      .then(done)
      .catch(done);
  });


  it('should not find manga by name',done=>{
    let name = 'my stupid name';
    let chapter = 1;

    site.resolve(name,chapter)
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


  it('should get Gintama : chapter 41', done => {
    let name = 'Gintama';
    let chapter = 41;

    site.resolve(name,chapter)
      .then(images=>{
        expect(images).to.exist;
        expect(images.length).to.be.eq(23);
        return images[0];
      })
      .then(img=>{
        expect(img).to.contain('mangapanda.com/gintama/41/gintama');
      })
      .should.eventually.notify(done);
  });
});
