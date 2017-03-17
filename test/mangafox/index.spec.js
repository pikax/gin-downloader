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

  it('should get info', done => {
    let manga = 'http://mangafox.me/manga/gintama';
    site.info(manga)
      .then(x => {
        expect(x).to.exist;

        expect(x.released).to.be.eq(config.manga.released);

        expect(x.artists).to.be.deep.eq(config.manga.artists);
        expect(x.authors).to.be.deep.eq(config.manga.authors);
        expect(x.genres).to.be.deep.eq(config.manga.genres);
      })
      .should.eventually.notify(done);
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
    let chapter ='http://mangafox.me/manga/school_rumble/v14/c172/1.html';

    site.imagesPaths(chapter)
      .then(x => {
        expect(x).to.exist;
        expect(x.length).to.be.gte(8);
        //TODO add chapter verification
      })
      .then(done)
      .catch(done);
  });

  it('should get School : chapter 172', done => {
    let name = 'School Rumble';
    let chapter = 172;

    site.resolve(name,chapter)
      .then(images=>{
        expect(images).to.exist;
        expect(images.length).to.be.eq(8);

        images[0].then(img=>{
          expect(img).to.contain('mfcdn.net/store/manga/90/14-172.0/compressed/Townsocks_School_Rumble_172_1.jpg');
        });
      })
      .should.eventually.notify(done);
  });
});