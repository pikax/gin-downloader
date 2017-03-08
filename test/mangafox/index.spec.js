/**
 * Created by rodriguesc on 06/03/2017.
 */


import site from './../../lib/mangafox'
import config from "./_results";

const expect = require('chai').expect;


describe('MangaFox live',()=> {


    it('should get all mangas',done=>{
        site.mangas()
            .then(mangas=>{
                expect(mangas.length).to.be.gte(config.mangas_count);
            })
            .then(done)
            .catch(done);

    });


});