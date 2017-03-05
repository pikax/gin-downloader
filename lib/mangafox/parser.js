/**
 * Created by rodriguesc on 03/03/2017.
 */

// import osmosis from 'osmosis'


const parseMangas = (osm) => osm.find('a.series_preview').set('title');

const parseManga = (osm)=> osm;

const parseChapters = osm => osm;

const parseInfo = osm => osm.select('#series_info')
	.set({
		image : '.cover img@src',
		title : '.cover img@alt',
		licensed : `//div[@class='warning']` //is it licensed?
	})
	.find('#title > h3')
	.set('csv_title')
	.find('table > tr[2]')
	.set({
		released  : 'td > a',
		authors : ['td[2] > a'],
		artists : ['td[3] > a'],
		genres : ['td[4] > a'],
	});


const parseLatest = osm=>osm.find('a.chapter')
	.set({
		chapter : 'text()',
		uri : '@href',

		volume : 'following-sibling::text()',
	});

const parseImages = osm=>osm;

export default {
    parseMangas,
    parseChapters,

  parseInfo,
	parseImages,
	parseLatest,
}
