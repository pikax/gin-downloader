/**
 * Created by rodriguesc on 03/03/2017.
 */

import results from './_results';


import osmosis from 'osmosis'
var url = require('url');


import _ from 'lodash';

import parser from './../../lib/mangafox/parser'

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

            let count = 0;
            parser.mangas(osm)
                .data(x => {
                    ++count;
                })
                .error(done)
                .done(() => {
                    expect(count).eq(results.mangas_count);
                    done();
                });
        });


        it('it should parse full manga info', done => {
            let osm = osmosis.parse(fpGintama);

            let manga = {};
            parser.mangaInfo(osm)
                .data(x => manga = x)
                // .log(console.log)
                // .debug(console.log)
                .error(console.log)
                .done(() => {

                    expect(manga.title).to.be.eq(results.manga.title);
                    expect(manga.released).to.be.eq(results.manga.released);
                    expect(manga.csv_title).to.be.eq(results.manga.csv_title);
                    expect(manga.image).to.contain(results.manga.image);

                    expect(manga.artists).to.be.deep.eq(results.manga.artists);
                    expect(manga.authors).to.be.deep.eq(results.manga.authors);
                    expect(manga.genres).to.be.deep.eq(results.manga.genres);
                    done()
                });
        });


        it('should parse latest', done => {
            let osm = osmosis.parse(fpLatest);

            //todo implement test

            let chaps = [];

            parser.latest(osm)
                .data(x => chaps.push(x))


                // .log(console.log)
                // .debug(console.log)
                .error(console.log)
                .done(() => {

                    expect(chaps.length).to.be.greaterThan(100);
                    done()
                });


        });


        it('it should resolve all images from chapter', done => {
            let osm = osmosis.parse(fpChapter);
            let paths = [];

            parser.imagesPath(osm)
                .data(x => paths.push(x))
                .error(console.log)
                .done(() => {
                    expect(paths.length).to.be.eq(58);
                    done()
                });
        })

        it('it should parse image from chapter', done => {
            let osm = osmosis.parse(fpChapter);
            let img = {};
            parser.image(osm)
                .data(x => img = x)
                .error(console.log)
                .done(() => {
                    expect(img).to.exist;
                    expect(img.src).to.exist;
                    expect(img.src).to.contain(results.image_src)
                    done();
                });
        });


        it('should parse chapters', done => {
            let osm = osmosis.parse(fpGintama);

            let result = [];
            parser.chapters(osm)
                .data(x => result.push(x))
                .error(done)
                .done(() => {
                    expect(result.length).eq(results.chapter_count);
                    done()
                });
        })
    })



  

});