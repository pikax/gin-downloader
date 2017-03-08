/**
 * Created by rodriguesc on 03/03/2017.
 */

import osmosis from 'osmosis'

import parser from './parser';
import config from './config';


// export default class {

const mangas = () => {
    let osm = osmosis.get(config.mangas_url);
    return parser.mangas(osm);
};


const images = (url) => {
  
  let osm = osmosis.get(config.mangas_url, { tries: 10, concurrency: 2 });

  return parser.mangas(osm);
}


// }


export default {
    mangas 
}
