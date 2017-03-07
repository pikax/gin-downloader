/**
 * Created by rodriguesc on 03/03/2017.
 */

import osmosis from 'osmosis'

import parser from './parser';
import config from './config';


// export default class {

    const getAllMangas= ()=>{
        return new Promise(function(resolve, reject) {

            let mangas = [];
            let osm = osmosis.get(config.mangas_url);
            parser.parseMangas(osm)
                .data(x=>mangas.push(x))
                .error(reject)
                .done(()=>{
                    resolve(mangas);
                });

        });

    };



// }


export default {
    getAllMangas
}
