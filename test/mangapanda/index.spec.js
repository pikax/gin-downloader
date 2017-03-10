/**
 * Created by rodriguesc on 07/03/2017.
 */


import site from './../../lib/mangapanda';
import config from './_results';

const expect = require('chai').expect;



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

  it('should get chapters', done => {
    let manga = 'http://www.mangapanda.com/gintama';

    site.chapters(manga)
      .then(x => {
        expect(x).to.exist;
        expect(x.length).to.be.eq(570);
        //TODO add chapter verification

      })
      .then(done)
      .catch(done);

  });


  it('should get images paths', done => {
    let chapter = 'www.mangapanda.com/gintama/1';

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
    site.images('http://www.mangapanda.com/gintama/41')
      .then(images=>{
        expect(images).to.exist;
        expect(images.length).to.be.eq(23);
        expect(images[0].src).to.contain('mangapanda.com/gintama/41/gintama');
      })
      .then(done)
      .catch(done);
  });

  it('should get Gintama : chapter 1', done => {
    let title = 'Gintama';
    let chapter = 41;

    try{
      site.resolve(title,chapter)
      .then(images=>{
        expect(images).to.exist;
        expect(images.length).to.be.eq(23);
        expect(images[0].src).to.contain('mangapanda.com/gintama/41/gintama');
      })
      .then(done)
      .catch(done);

    }catch (e){
      done(e);
    }
  });

});


