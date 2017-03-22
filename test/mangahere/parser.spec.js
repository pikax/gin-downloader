/**
 * Created by rodriguesc on 03/03/2017.
 */

import results from './_results';


import {parseDoc} from '../../src/common/helper';

import manga from './../../src/mangahere/parser';
import {toName} from './../../src/mangahere/names';

const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

// Then either:
const expect = chai.expect;
// or:
chai.should();


describe('MangaHere offline', () => {
  let mangas = './test/mangahere/html/mangas.html';
  let gintama = './test/mangahere/html/Gintama.html';
  let latest = './test/mangahere/html/latest.html';
  let chapter = './test/mangahere/html/ch001.html';

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


  describe('resolver', () => {
    it('should resolve image path chapter',()=>{
      let doc = parseDoc(fpChapter);

      manga.imagesPaths(doc)
        .should.have.have.lengthOf(58);
    });

    it('should parse image from chapter', ()=>{
      manga.image(fpChapter.toString())
        .should.contain(results.image_src);
    });


    it('should resolve name to name',()=>{
      'use strict';

      let doc = parseDoc(fpMangas);
      let mangas = manga.mangas(doc);

      for(let i in mangas){
        let obj= mangas[i];
        let name = obj.src.slice(30,-1);
        let origName = obj.name;
        let processedName = toName(origName);

        processedName.should.be.eq(name,obj.name);
      }


    });
  });


  describe('info', () => {
    it('should parse and get all mangas', ()=> {
      let doc = parseDoc(fpMangas);

      manga.mangas(doc)
        .length.should.be.gte(results.mangas_count);
    });

    it('it should parse full manga info', () => {
      let doc = parseDoc(fpGintama);

      let info = manga.mangaInfo(doc);


      info.image.should.contain(results.manga.image);

      expect(info.genres).to.be.deep.eq(results.manga.genres);

      expect(info.artists).to.be.deep.eq(results.manga.artists);
      expect(info.authors).to.be.deep.eq(results.manga.authors);

    });


    it('should parse latest', () => {
      let doc = parseDoc(fpLatest);

      manga.latest(doc)
        .should.have.length.gte(100);
    });


    it('it should resolve all images from chapter', () => {
      let doc = parseDoc(fpChapter);

      manga.imagesPaths(doc)
        .should.have.length.gte(58);
    });

    it('it should parse image from chapter', () => {
      let img = manga.image(fpChapter.toString());

      img.should.to.exist;
      img.should.to.contain(results.image_src);
    });

    it('should parse chapters', () => {
      let doc = parseDoc(fpGintama);

      manga.chapters(doc)
        .should.have.length.gte(results.chapter_count);
    });
  });
});