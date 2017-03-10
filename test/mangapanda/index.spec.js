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

  it('should get Gintama : chapter 1', done => {
    let title = 'Gintama';
    let chapter = 1;


    //site.mangas()
    //  .then(x => {
    //    let gintama = find(x, { title });

    //    expect(gintama).to.exist;
    //    return gintama;
    //  })
    //  .then(x => {

    //  })


    done('not implemented');
  });

});


