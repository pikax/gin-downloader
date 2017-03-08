/**
 * Created by rodriguesc on 07/03/2017.
 */


import { getAllMangas } from './../../lib/mangapanda'
import config from "./_results";

const expect = require('chai').expect;



describe('MangaPanda live', () => {


    it('should get all mangas', done => {
        getAllMangas()
            .then(mangas => {
                expect(mangas.length).to.be.greaterThan(config.mangas_count);
            })
            .then(x => done())
            .catch(done);

    });

});

