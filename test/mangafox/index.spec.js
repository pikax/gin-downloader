/**
 * Created by rodriguesc on 06/03/2017.
 */


import site from './../../lib/mangafox'
import config from "./_results";

const expect = require('chai').expect;


describe('MangaFox',()=> {


    it('should get all mangas',done=>{

        site.getAllMangas()
            .then(mangas=>{
                expect(mangas.length).to.be.greaterThan(config.mangas_count);
            })
            .then(x=>done())
            .catch(done);

    })

});