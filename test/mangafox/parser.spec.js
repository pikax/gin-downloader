/**
 * Created by rodriguesc on 03/03/2017.
 */

import results  from './_results';


import osmosis from 'osmosis'
var url = require('url');


import _ from 'lodash';

import parser from './../../lib/mangafox/parser'

const expect = require('chai').expect;

const Promise = require("bluebird");
const readFile = Promise.promisify(require("fs").readFile);




describe('MangaFox',()=> {
    let mangas = './test/mangafox/html/mangas.html';
		let gintama = './test/mangafox/html/Gintama.html';
		let latest = './test/mangafox/html/latest.html';


    let fpMangas;
		let fpGintama;
		let fpLatest;

    before(done=>{
        let pm =  readFile(mangas)
            .then(x=>fpMangas = x);

        let gm = readFile(gintama)
            .then(x=>fpGintama =x);

        let gl = readFile(latest)
	        .then(x=>fpLatest =x);

	    Promise.all(pm,gm,gl)
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


    it('it should parse manga info',done=>{
	    let osm = osmosis.parse(fpGintama);
	    // let osm = osmosis.get('http://mangafox.me/manga/gintama');

	    let manga = {};
	    parser.parseInfo(osm)
		    .data(x=>manga=x)
		    .log(console.log)
		    .error(console.log)
		    .debug(console.log)
		    .done(()=>{

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


    it('should parse latest',done=>{
	    let osm = osmosis.parse(fpLatest);


	    parser.parseLatest(osm)

		    .data(x=>console.log(x))
		    .log(console.log)
		    .error(console.log)
		    .debug(console.log)
		    .done(()=>{

			    done()
		    });


    });


	it('it should parse images from chapter',done=>{
		// let uri = 'http://mangafox.me/manga/the_journey_of_flower/v01/c004/6.html';

		done("mangafox return unavailable page after to many requests");

		return;
		//wont work because
		let osm = osmosis.get(uri);

		osm
			.find('#top_bar > div.r.m > div.l > select.m > option@value')
			.set('path')
			.delay(900)

			.get((x,data)=> url.resolve(uri,`${data.path}.html`))

			//
			// .find('div.read_img')
			// .follow('a')


			.find('div#viewer > div.read_img')
			.set({
				img: 'img@src'
			})


			.data(x=>console.log(x))
			.log(console.log)
			.error(console.log)
			.debug(console.log)
			.done(()=>{

				done()
			});
	});

	  it('should parse chapters',done=>{
	        let osm = osmosis.parse(fpGintama);
        // let osm = osmosis.get("http://mangafox.me/manga/gintama")

  
        let result = [];
        parser.parseChapters(osm)
            .data(x=>result.push(x))
            .error(done)
            .done(()=>{
                expect(result.length).eq(results.chapter_count);
                done()
            });
    })



});