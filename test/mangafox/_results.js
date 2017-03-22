/**
 * Created by rodriguesc on 02/03/2017.
 */

let manga = {
  image: 'http://h.mfcdn.net/store/manga/551/cover.jpg',
  title: 'Gintama',
  synonyms:
  [ 'กินทามะ',
    '銀魂',
    '银魂',
    '긴타마',
    '은혼',
    'Gin Tama',
    'Silver Soul',
    'غينتاما - الروح الفضيه',
    'Сребърна душа (Bulgarian)',
    'Gümüş Ruh (Turkish)',
    'Jiwa Perak',
    'Серебряная душа (Russian)' ],
  released: '2003',
  authors: [ 'Sorachi Hideaki' ],
  artists: [ 'Sorachi Hideaki' ],
  genres:
  [ 'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Historical',
    'Sci-fi',
    'Shounen',
    'Supernatural' ],
  synopsis: 'Sakata Gintoki is a samurai living in an era when samurai are no longer needed.\r\n            To add to his troubles, oppressive aliens have moved in to invade.\r\n            Gintoki lives with Kagura and Shinpachi, taking on odd jobs to make the world a better place... and to pay their rent.',
  status: 'Ongoing',
  ranked: '\r\n        95th, it has 221,700 monthly views.\r\n        ',
  rating: 'Average 4.91 / 5 out of 1050 total votes.',
  scanlators: [ 'BakanaHaven' ]
};

export default {
  mangas_count: 18715,
  manga_name : manga.title,

  chapter_count : 628,

  manga,
  image_src : 'http://h.mfcdn.net/store/manga/551/01-001.0/compressed/Gintama_v01_ch01_p01.jpg'

};
