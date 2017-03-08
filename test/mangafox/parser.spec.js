/**
 * Created by rodriguesc on 03/03/2017.
 */

import results from './_results';


import osmosis from 'osmosis'
var url = require('url');


import _ from 'lodash';

import manga from './../../lib/mangafox/parser'

import { parser, resolver } from './../../lib/mangafox/parser';

const expect = require('chai').expect;

const Promise = require("bluebird");
const readFile = Promise.promisify(require("fs").readFile);




describe('MangaFox offline', () => {
  let mangas = './test/mangafox/html/mangas.html';
  let gintama = './test/mangafox/html/Gintama.html';
  let latest = './test/mangafox/html/latest.html';
  let chapter = './test/mangafox/html/ch001.html';

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
      .then(x => done());
  })


  describe('parse', () => {

  });


  describe('info', () => {
    it('should parse and get all mangas', done => {
      let osm = osmosis.parse(fpMangas);

      osm = manga.mangas(osm)
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

      let chaps = [];
      manga.latest(osm)
        .then(chaps => {
          expect(chaps.length).to.be.greaterThan(100);
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
    })

    it('it should parse image from chapter', done => {
      let osm = osmosis.parse(fpChapter);
      manga.image(osm)
        .then((img) => {
          expect(img).to.exist;
          expect(img.src).to.exist;
          expect(img.src).to.contain(results.image_src)
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

    it('it should parse images from chapter', done => {
      done();
      return;

      let uri = 'http://mangafox.me/manga/ansatsu_kyoushitsu/v01/c001/1.html';

      let osm = osmosis.get(uri);

      let imgs = [];
      ////osm = resolver.resolveImagesPaths(osm);

      ////osm = osm.follow('path')

      ////osm = resolver.resolveImage(osm);

      //osm = osm.find('#top_bar > div.r.m > div.l > select.m > option:not(:last-child)')
      //  .follow('@value');

      osm = resolver.resolveImage(osm);

       osm.data(x => imgs.push(x))
         .log(console.log)
         .debug(console.log)
        .error(console.log)
        .done(() => {

          expect(imgs.length).to.be.greaterThan(19);
          expect(imgs[0].img).to.contain(results.image_url);

          done();
        });
    });
  })





});