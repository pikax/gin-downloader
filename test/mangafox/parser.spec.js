/**
 * Created by rodriguesc on 03/03/2017.
 */

import results  from './_results';

import osmosis from 'osmosis'

import parser from './../../lib/mangafox/parser'

const expect = require('chai').expect;

const Promise = require("bluebird");
const readFile = Promise.promisify(require("fs").readFile);




describe('MangaFox',()=> {
    let mangas = './test/mangafox/html/mangas.html';
    let gintama = './test/mangafox/html/Gintama.html';


    let fpMangas;
    let fpGintama;

    before(done=>{
        let pm =  readFile(mangas)
            .then(x=>fpMangas = x);

        let gm = readFile(gintama)
            .then(x=>fpGintama =x);

        Promise.all(pm,gm)
            .then(x=>done());
    })


    it('should parse and get all mangas',done=>{
        let osm = osmosis.parse(fpMangas);

        // let osm = osmosis.get('http://mangafox.me/manga');
        let count = 0;
        parser.parseMangas(osm)
            .data(x=>{
                ++count;
            })
            .error(done)
            .done(()=>{
                expect(count).eq(results.mangas_count);
                done();
            });
    });

    it('should parse chapters',done=>{
        let osm = osmosis.parse(fpGintama);
        // let osm = osmosis.get("http://mangafox.me/manga/gintama")

        let count = 0;

        let resul = {};
        osm.find('div#chapters')
            .find('div.slide')
            .set({
                'volume' : 'h3.volume'
            })
            .find('ul.chlist li div')
            .set({
                'chapter' :{
                    'date' : '.date',
                    'url' : 'a.tips@href',
                    'name' : 'span.title',
                    'number' : 'a.tips',
                }
            })
            .data(res=>{
                // console.log(res)

                if(!resul[res.chapter.url])
                    resul[res.chapter.url ] =res;
                else
                    ++count;



            })

            .log(console.log)
            .error(console.log)
            .debug(console.log)
            .done(()=>{
                expect(count).eq(results.chapter_count);
                done()
            });


        // parser.parseChapters(osm)
        //     .data(x=>{
        //     ++count;
        //     })
        //     .error(done)
        //     .done(()=>{
        //         expect(count).eq(results.chapter_count);
        //         done();
        //     });
    })



});