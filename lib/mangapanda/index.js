/**
 * Created by rodriguesc on 05/03/2017.
 */

// import osmosis from 'osmosis'

import {get} from './parser';
import config from "./config";
import osmosis from "osmosis";

import parser from './parser';

//TODO export with parser extensions


export const getAllMangas= ()=>{
    return new Promise(function(resolve, reject) {
        let mangas = [];

        let osm =osmosis.get(config.mangas_url);

        osm = parser.findMangas(osm);
        osm = parser.parseMangas(osm);
        osm.data(x=>mangas.push(x))
            .error(reject)
            .done(()=>{
                resolve(mangas);
            });
    });

};


export default {
    getAllMangas
}