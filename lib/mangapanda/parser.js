/**
 * Created by rodriguesc on 05/03/2017.
 */

// import osmosis from 'osmosis'


const parseMangas = (osm) => osm.find('ul.series_alpha > li > a').set('title');

const parseManga = (osm)=> osm;

const parseChapters = osm => osm
		.find('table#listing tr[position()> 1]')
		.set({
			chapter : 'a',
			uri  : 'a@href',
			name : 'td/a/following-sibling::text()',
			date : 'td[2]'
		})
	;

const parseInfo = osm => osm.select('#bodyust')
	.set({
		image : 'div#mangaimg img@src',
	})
	.select('div#mangaproperties > table')
	.set({
		title  : 'tr > td[2] > h2.aname',

		csv_title : 'tr[2] td[2]',

		released : 'tr[3] td[2]',
		status  :'tr[4] td[2]',

		author : 'tr[5] td[2]',
		artist : 'tr[6] td[2]',

		genres : ['span.genretags'],
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
