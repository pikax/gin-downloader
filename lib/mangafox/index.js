/**
 * Created by rodriguesc on 03/03/2017.
 */

import osmosis from 'osmosis';

import parser from './parser';
import config from './config';


const mangas = () => {
  let osm = osmosis.get(config.mangas_url);
  return parser.mangas(osm);
};

const chapters = (url) =>{
  let osm = osmosis.get(url);
  return parser.chapters(osm);
};

const imagesPaths = (url)=>{
  let osm = osmosis.get(url);
  return parser.imagesPaths(osm);
};


const images = (url) => {
  let osm = osmosis.get(url);
  return parser.imagesPaths(osm)
    .then(paths => {
      //TODO resolve all html and then spread as promises and resolve the image for each one
      return paths;
    });
};


export default {
  mangas,
  chapters,
  images,
  imagesPaths,
};
