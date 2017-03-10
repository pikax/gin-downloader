/**
 * Created by rodriguesc on 05/03/2017.
 */

// import osmosis from 'osmosis'

import config from './config';
import osmosis from 'osmosis';
import manga from './parser';

//TODO export with manga extensions


const mangas = () => {
  let osm = osmosis.get(config.mangas_url);
  return manga.mangas(osm);
};

const chapters = (url) =>{
  let osm = osmosis.get(url);
  return manga.chapters(osm);
};

const imagesPaths = (url)=>{
  let osm = osmosis.get(url);
  return manga.imagesPaths(osm);
};

const images = (url) => {
  let osm = osmosis.get(url);
  return manga.imagesPaths(osm)
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
