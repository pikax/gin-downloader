/**
 * Created by rodriguesc on 03/03/2017.
 */

import results from './_results';


import manga from './../../src/mangafox/parser';
import {toName} from './../../src/mangafox/names';
import {parseDoc} from '../../src/common/helper';

const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.should();


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
  });


  describe('info', () => {
    it('should resolve image path chapter',()=>{
      let doc = parseDoc(fpChapter);
      manga.imagesPaths(doc)
        .should.have.have.lengthOf(58);
    });

    it('should parse image from chapter', ()=>{
      manga.image(fpChapter.toString())
        .should.contain(results.image_src);

    });

    it('should parse and get all mangas', () => {
      let doc = parseDoc(fpMangas);

      manga.mangas(doc).should
        .have.length.gte(results.mangas_count);
    });

    it('should resolve name to name',()=>{
      'use strict';

      let doc = parseDoc(fpMangas);

      let mangas = manga.mangas(doc);

      for(let i in mangas) {
        let obj = mangas[i];
        let name = obj.src.slice(25, -1);
        let origName = obj.name;
        let processedName = toName(origName);

        processedName.should.be.eq(name, obj.name);
      }
    });
    it('it should parse full manga info', () => {
      let doc = parseDoc(fpGintama);

      let info = manga.mangaInfo(doc);

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
    });


    it('should parse latest', () => {
      let doc = parseDoc(fpLatest);

      manga.latest(doc)
        .should.have.length.to.be.greaterThan(98);
    });


    it('it should resolve all images from chapter', () => {
      let doc = parseDoc(fpChapter);

      manga.imagesPaths(doc)
        .should.have.length.gte(58);

    });

    it('should parse chapters', () => {
      let doc = parseDoc(fpGintama);

      manga.chapters(doc)
        .should.have.length.gte(results.chapter_count);
    });
  });
});