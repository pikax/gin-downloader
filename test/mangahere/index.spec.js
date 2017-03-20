/**
 * Created by rodriguesc on 06/03/2017.
 */


import site from './../../lib/mangahere';
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


describe('MangaHere live', () => {

  it('should get all mangas', done => {
    site.mangas().should.eventually
      .be.an('array')
      .with.property('length')
      .gte(config.mangas_count)
      .notify(done);
  });

  it('should get latest chaps', done => {
    site.latest()
      .should.eventually
      .to.have.length.gte(100)
      .notify(done);
  });

  it('should get info', done => {
    let manga = 'Gintama';
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
    let manga = 'Gintama';

    site.chapters(manga)
      .then(x => {
        expect(x).to.exist;
        expect(x.length).to.be.gte(629);
        //TODO add chapter verification

      })
      .then(done)
      .catch(done);

  });


  it('should get images paths', done => {
    let chapter ='http://www.mangahere.co/manga/school_rumble/c262/';

    site.imagesPaths(chapter)
      .then(x => {
        expect(x).to.exist;
        expect(x.length).to.be.gte(9);
        //TODO add chapter verification
      })
      .then(done)
      .catch(done);
  });

  it('should get Gintama: chapter 41', done => {
    let name = 'Gintama';
    let chapter = 41;

    site.resolve(name,chapter)
      .then(images=>{
        expect(images).to.exist;
        expect(images.length).to.be.eq(24);

        images[0].then(img=>{
          expect(img).to.contain('mhcdn.net/store/manga/551/041.0/compressed/M7_Gintama_ch041_00.jpg');
        });
      })
      .should.eventually.notify(done);
  });
});