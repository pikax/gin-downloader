/**
 * Created by rodriguesc on 03/03/2017.
 */

import results from './_results';


import osmosis from 'osmosis';

import manga from './../../lib/mangapanda/parser';
import {resolver} from './../../lib/mangapanda/parser';
import {resolveArray, resolveObject} from '../../lib/common/helper';

const expect = require('chai').expect;

const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);





describe('MangaPanda offline', () => {
  let mangas = './test/mangapanda/html/mangas.html';
  let gintama = './test/mangapanda/html/Gintama.html';
  let latest = './test/mangapanda/html/latest.html';
  let chapter = './test/mangapanda/html/ch001.html';

  let fpMangas;
  let fpGintama;
  let fpLatest;
  let fpChapter;

  before(done => {
    let pm = readFile(mangas)
      .then(x => fpMangas = x);

    let gm = readFile(gintama)
      .then(x => fpGintama = x);

    let gl = readFile(latest)
      .then(x => fpLatest = x);

    let ch = readFile(chapter)
      .then(x => fpChapter = x);

    Promise.all(pm, gm, gl, ch)
      .then(() => done());
  });


  describe('resolver', () => {
    //TODO add parser tests

    it('should resolve image path chapter', done=>{
      let osm = osmosis.parse(fpChapter);

      osm = resolver.resolveImagesPaths(osm);

      resolveArray(osm)
        .then(x=>{
          expect(x.length).to.be.eq(58);
        })
        .then(done)
        .catch(done);
    });

    it('should parse image from chapter', done=>{
      let osm = osmosis.parse(fpChapter);

      osm = resolver.resolveImage(osm);

      resolveObject(osm)
        .then(x=>{
          expect(x.src).to.contain(results.image_url);
        })
        .then(done)
        .catch(done);
    });
  });


  describe('info', () => {
    it('should parse and get all mangas', done => {
      let osm = osmosis.parse(fpMangas);

      manga.mangas(osm)
        .then(x => {
          expect(x.length).eq(results.mangas_count);
        })
        .then(done)
        .catch(done);
    });


    it('it should parse full manga info', done => {
      let osm = osmosis.parse(fpGintama);

      manga.mangaInfo(osm)
        .then(manga => {

          expect(manga.title).to.be.eq(results.manga.title);
          expect(manga.released).to.be.eq(results.manga.released);
          expect(manga.csv_title).to.be.eq(results.manga.csv_title);
          expect(manga.image).to.contain(results.manga.image);

          expect(manga.artists).to.be.deep.eq(results.manga.artists);
          expect(manga.authors).to.be.deep.eq(results.manga.authors);
          expect(manga.genres).to.be.deep.eq(results.manga.genres);
        })
        .then(done)
        .catch(done);
    });


    it('should parse latest', done => {
      let osm = osmosis.parse(fpLatest);

      manga.latest(osm)
        .then(chaps => {
          expect(chaps.length).to.be.greaterThan(70);
        })
        .then(done)
        .catch(done);


    });


    it('it should resolve all images from chapter', done => {
      let osm = osmosis.parse(fpChapter);

      manga.imagesPaths(osm)
        .then((paths) => {
          expect(paths.length).to.be.eq(58);
        })
        .then(done)
        .catch(done);
    });

    it('it should parse image from chapter', done => {
      let osm = osmosis.parse(fpChapter);
      manga.image(osm)
        .then((img) => {
          expect(img).to.exist;
          expect(img.src).to.exist;
          expect(img.src).to.contain(results.image_url);
        })
        .then(done)
        .catch(done);
    });

    it('should parse chapters', done => {
      let osm = osmosis.parse(fpGintama);

      manga.chapters(osm)
        .then((chaps) => {
          expect(chaps.length).eq(results.chapter_count);
        })
        .then(done)
        .catch(done);
    });
  });
});