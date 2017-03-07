/**
 * Created by rodriguesc on 03/03/2017.
 */

import results  from './_results';


import osmosis from 'osmosis'
var url = require('url');


import parser from './../../lib/mangapanda/parser'

const expect = require('chai').expect;

const Promise = require("bluebird");
const readFile = Promise.promisify(require("fs").readFile);




describe('MangaPanda',()=> {
    let mangas = './test/mangapanda/html/mangas.html';
		let gintama = './test/mangapanda/html/Gintama.html';
		let latest = './test/mangapanda/html/latest.html';


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
		    .data(x=>{
			    // console.log(x)
			    manga=x;
		    })
            // .log(console.log)
            // .debug(console.log)
            .error(console.log)
		    .done(()=>{

			    expect(manga.title).to.be.eq(results.manga.title);
			    expect(manga.released).to.be.eq(results.manga.released);
					expect(manga.csv_title).to.be.eq(results.manga.csv_title);
			    expect(manga.image).to.contain(results.manga.image);

			    expect(manga.artist).to.be.eq(results.manga.artist);
			    expect(manga.author).to.be.eq(results.manga.author);
			    expect(manga.genres).to.be.deep.eq(results.manga.genres);
			    done()
		    });
    });


    it('should parse latest',done=>{
	    let osm = osmosis.parse(fpLatest);

	    let count = 0;
	    parser.parseLatest(osm)
		    .data(x=>++count)
		    // .log(console.log)
		    // .debug(console.log)
            .error(console.log)
			.done(()=>{
			    expect(count).to.be.greaterThan(10);

			    done()
		    });


    });


    it('should parse chapters',done=>{

	    let osm = osmosis.parse(fpGintama);

	    let count = 0
	    parser.parseChapters(osm)
		    .data(x=>{
		    	// console.log(x);
		    	++count
		    })
            // .log(console.log)
            // .debug(console.log)
            .error(console.log)
		    .done(()=>{
			    expect(count).to.be.greaterThan(10);

			    done()
		    });


    });

	it('it should parse images from chapter',done=>{
		let uri = 'http://www.mangapanda.com/gintama/626';


		//wont work because
		let osm = osmosis.get(uri);

		parser.parseImages(osm)
			// .data(x=>console.log(x))
            // .log(console.log)
            // .debug(console.log)
            .error(console.log)
			.done(()=>{

				done('implement test')
			});
	});



});