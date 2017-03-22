/**
 * Created by rodriguesc on 03/03/2017.
 */

import url from 'url';


import results from './_results';


import manga from './../../src/mangapanda/parser';
import {toName} from './../../src/mangapanda/names';

import {parseDoc} from '../../src/common/helper';

const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

// Then either:
const expect = chai.expect;
// or:
chai.should();
// according to your preference of assertion style



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


  describe('info', () => {
    it('should parse and get all mangas', () => {
      let doc = parseDoc(fpMangas);

      manga.mangas(doc)
        .should.have.length.gte(results.mangas_count);
    });


    it('should resolve name to name',()=>{
      'use strict';

      let doc = parseDoc(fpMangas);
      let mangas = manga.mangas(doc);

      for(let i in mangas){
        let obj= mangas[i];
        let expected = obj.src;
        let origName = obj.name;
        let processedName = toName(origName);


        processedName.should.be.eq(processedName,expected);
      }
    });

    it('it should parse full manga info', () => {
      let doc = parseDoc(fpGintama);

      let info = manga.mangaInfo(doc);

      expect(info.title).to.be.eq(results.manga.title);
      expect(info.released).to.be.eq(results.manga.released);
      expect(info.csv_title).to.be.eq(results.manga.csv_title);
      expect(info.image).to.contain(results.manga.image);

      expect(info.artists).to.be.deep.eq(results.manga.artists);
      expect(info.authors).to.be.deep.eq(results.manga.authors);
      expect(info.genres).to.be.deep.eq(results.manga.genres);
    });


    it('should parse latest', () => {
      let doc = parseDoc(fpLatest);

      manga.latest(doc)
        .should.have.length.greaterThan(70);
    });


    it('it should resolve all images from chapter', () => {
      let doc = parseDoc(fpChapter);

      manga.imagesPaths(doc)
        .should.have.length.gte(58);
    });

    it('it should parse image from chapter', () => {

      manga.image(fpChapter.toString())
        .should.to.contain(results.image_url);
    });

    it('should parse chapters', () => {
      let doc = parseDoc(fpGintama);

      manga.chapters(doc)
        .should.have.length.gte(results.chapter_count);
    });
  });
});