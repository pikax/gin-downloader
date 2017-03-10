/**
 * Created by rodriguesc on 06/03/2017.
 */


import site from './../../lib/mangafox';
import config from './_results';
import { find } from 'lodash';

const expect = require('chai').expect;


describe('MangaFox live', () => {


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
    let manga = 'http://mangafox.me/manga/gintama';

    site.chapters(manga)
      .then(x => {
        expect(x).to.exist;
        expect(x.length).to.be.eq(629);
        //TODO add chapter verification

      })
      .then(done)
      .catch(done);

  });


  it('should get images paths', done => {
    let chapter ='http://mangafox.me/manga/gintama/v01/c004/4.html';

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

    done();
    //done('not implemented');
  });

});