/**
 * Created by rodriguesc on 06/03/2017.
 */


import site from './../../lib/mangafox';
import config from './_results';
import { find } from 'lodash';


import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

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
    let name = 'Gintama';
    let chapter = 41;

    site.resolve(name,chapter)
      .then(images=>{
        expect(images).to.exist;
        expect(images.length).to.be.eq(23);
        expect(images[0].src).to.contain('mangapanda.com/gintama/41/gintama');
        done();
      });
  });
});