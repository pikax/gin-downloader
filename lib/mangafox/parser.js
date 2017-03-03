/**
 * Created by rodriguesc on 03/03/2017.
 */

import osmosis from 'osmosis'


const parseMangas = (osm) => osm.find('a.series_preview').set('title');

const parseManga = (osm)=> osm;


const parseChapters = osm => osm;

export default {
    parseMangas,
    parseChapters,
}