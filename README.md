# gin-downloader


[![Build Status](https://travis-ci.org/pikax/gin-downloader.svg?branch=master)][travis]
[![npm version](https://badge.fury.io/js/gin-downloader.svg)][package]
[![Coverage Status](https://coveralls.io/repos/github/pikax/gin-downloader/badge.svg?branch=master)][coverage]
[![dependencies Status](https://david-dm.org/pikax/gin-downloader/status.svg)][dependencies]
[![devDependencies Status](https://david-dm.org/pikax/gin-downloader/dev-status.svg)][devDependencies]
[![Known Vulnerabilities](https://snyk.io/test/npm/gin-downloader/badge.svg)][snyk]
[![Discord](https://img.shields.io/badge/discord-chat-blue.svg)][discord]


[changelog](#changelog)

npm
``` bash
npm install gin-downloader --save
``` 


yarn
``` bash
yarn add gin-downloader
``` 



# v2@beta-5

The difference between v2@beta-4 and v2@beta-5 is just too much, I basically rewrote most of the code.

I introduced MangaObject to enable to resolve chapters and images easily.

Hopefully this big change will allow me improve the library easily in the future.



### NOTE
This is not the final revision, I'm open to recomendations on how the API should be accessible.



## **v1 is Currently deprecated, please use @beta version**

I'm currently changing and only maintaining the v2 of *gin-downloader*.

The focus on the v1 was to support as many manga sites as possible, but that caused a lot of websites to maintain with virtual no time for me to maintain it correctly.

The focus on this v2 is to support a small number of websites and implement an easy to use API and improve from there.



### Supported websites
- [x] MangaHere
- [ ] MangaFox
- [ ] MangaPanda
- [ ] KissManga
- [ ] BatoTo



## Usage
- **import**
single site
```javascript
import ginDownloader from 'gin-downloader';
```

or

```javascript
import gin from 'gin-downloader'; // as default
//or
import * as gin from 'gin-downloader'; //typescript


gin.mangahere.mangas(); //get mangas
```




- **filter(filter: FilterSupport)** : returns {results:[{src:string,name:string}], page:number, total:number}
```javascript
gin.mangahere.filter({name:"gintama"})
  .then(console.log);
/* returns
{ results: [ { name: 'Gintama', src: '//www.mangahere.cc/manga/gintama' } ],
  page: 0,
  total: 0 }
*/
```

*FilterSupport* : **note** not every site supports all the filters/genres.
```typescript

interface NameFilter {
  name: string;
  condition?: FilterCondition;
}

interface ValueFilter {
  value: number;
  condition?: FilterCondition;
}

interface GenreFilter {
  inGenres?: Genre[];
  outGenres?: Genre[];
  condition?: GenreCondition;
}
interface RatingFilter  { // from
  from?: number;
  to?: number;
}

interface AuthorFilter extends NameFilter { }
interface ArtistFilter extends NameFilter { }
interface ReleaseFilter extends ValueFilter { }

interface MangaFilter {
  name?: string;
  page?: number;
  search?: {
    name?: NameFilter | string,
    author?: AuthorFilter | string,
    artist?: ArtistFilter | string,
    status?: FilterStatus,
    released?: ReleaseFilter | number,
    genre?: GenreFilter | Genre[];
    rating?: RatingFilter | number, // number sets the from
    mature?: boolean;

    type?: FilterMangaType,
  };

  sort?: {
  };

  genres?: Genre[]; // @deprecated
  outGenres?: Genre[]; // @deprecated
}

// you can use the string directly in the filter
enum Genre {
  Action = "Action",
  Adult = "Adult",
  Adventure = "Adventure",
  AwardWinning = "Award Winning",
  Comedy = "Comedy",
  Comic = "Comic",
  Cooking = "Cooking",
  Demons = "Demons",
  Doujinshi = "Doujinshi",
  Drama = "Drama",
  Ecchi = "Ecchi",
  Fantasy = "Fantasy",
  FourKoma = "4-Koma",
  GenderBender = "Gender Bender",
  Harem = "Harem",
  Historical = "Historical",
  Horror = "Horror",
  Josei = "Josei",
  Lolicon = "Lolicon",
  Magic = "Magic",
  Manga = "Manga",
  Manhua = "Manhua",
  Manhwa = "Manhwa",
  MartialArts = "Martial Arts",
  Mature = "Mature",
  Mecha = "Mecha",
  Medical = "Medical",
  Military = "Military",
  Music = "Music",
  Mystery = "Mystery",
  Oneshot = "Oneshot",
  Psychological = "Psychological",
  Romance = "Romance",
  SchoolLife = "School Life",
  SciFi = "Sci-fi",
  Seinen = "Seinen",
  Shotacon = "Shotacon",
  Shoujo = "Shoujo",
  ShoujoAi = "Shoujo Ai",
  Shounen = "Shounen",
  ShounenAi = "Shounen Ai",
  SliceOfLife = "Slice of Life",
  Smut = "Smut",
  Sports = "Sports",
  Supernatural = "Supernatural",
  SuperPower = "SuperPower",
  Tragedy = "Tragedy",
  Vampire = "Vampire",
  Webtoon = "Webtoon",
  Yaoi = "Yaoi",
  Yuri = "Yuri",

  NoChapters = "[no chapters]"
}


enum FilterCondition {
  Equal,
  Contains,
  NotContains,
  StartsWith,
  EndsWith,
  Less,
  Greater,
  LessThan,
  GreaterThan,
}


enum GenreCondition {
  And = 0,
  Or = 1,
}

enum FilterStatus {
  Ongoing,
  Complete,
  Cancelled
}

enum FilterMangaType {
  Manga,
  Manhwa,
  Manhua,
  Comic,
  Artbook, //An artbook is a title that contains purely art and has no story
  Other, // bato.to
}

```



- **filter(filter: FilterSupport | string)** : returns [{name:string, src:string}]

```javascript
import ginDownloader from 'gin-downloader';

ginDownloader.mangahere.filter()
	.then(console.log); // prints all mangas from mangahere
```

- **mangas()** : returns MangaObject[]
*note*: not every site will return all the mangas.
```javascript
import ginDownloader from 'gin-downloader';

ginDownloader.mangahere.mangas()
	.then(console.log); // prints all mangas from mangahere
```

- **latest()** : returns [{number:number|string, src:string, volume?:string,name:string}]
```javascript
mangahere.latest() // latest chapters added to mangahere
    .then(console.log);
```





# Examples


### Get `Gintama` info

We can use the powerful filter functionallity to search for it, the search functionality uses the website search to present the results.



``` javascript
const ginDownloader = require("gin-downloader").default;
const FilterCondition = require("../dist/index").FilterCondition;


const name= "gintama"


// let promise=  ginDownloader.mangahere.filter(name);
// or
const filter = {
    search: {
        name: {
            name: name,
            condition: FilterCondition.EndsWith // we use EndsWith to get only one manga
        }
    }
};
let promise = ginDownloader.mangahere.filter(filter);





promise
    .then(x=>x.results[0]) // get the first
    .then(x=>x.info()) // request info

    .then(console.log)

```

returns:
```
{ image: 'https://mangatown.secure.footprint.net/store/manga/551/cover.jpg?token=c54f3882d8459038b67c190a204ede7e774ba696&ttl=1524484800&v=1523778541',
  title: 'Gintama',
  synonyms:
   [ { title: 'กินทามะ', language: '' },
     { title: '銀魂', language: '' },
     { title: '银魂', language: '' },
     { title: '긴타마', language: '' },
     { title: '은혼', language: '' },
     { title: 'Gin Tama', language: '' },
     { title: 'Silver Soul', language: '' },
     { title: 'غينتاما - الروح الفضيه', language: '' },
     { title: 'Сребърна душа', language: 'Bulgarian' },
     { title: 'Gümüş Ruh', language: 'Turkish' },
     { title: 'Jiwa Perak', language: '' },
     { title: 'Серебряная душа', language: 'Russian' } ],
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
  synopsis: 'Sakata Gintoki is a samurai living in an era when samurai are no longer needed.\nTo add to his troubles, oppressive aliens have moved in to invade.\nGintoki lives with Kagura and Shinpachi, taking on odd jobs to make the world a better place... and to pay their rent. ',
  status: 'Ongoing',
  licensed: false }
```



### Get `Gintama` chapters


``` javascript
const ginDownloader = require("gin-downloader").default;

const name= "gintama"



ginDownloader.mangahere.filter("gintama")
    .then(x => x.results[0])
    .then(x=>x.chapters())
    .then(console.log)

```


### get `Gintama` chapter 1 images
`images(1)` return a Promise of a list of Lazy promises, the goal is only resolve image when requesting.

This is probably the method that will taking the longest

``` javascript

ginDownloader.mangahere.filter("gintama")
    .then(x => x.results[0])
    .then(x => x.images(1))
    .then(x => Promise.all(x.map(i => i.value)))
    .then(console.log)

```




# Changelog
All notable changes to this project will be documented in this file.

## [2.0.0-beta.6] 2018-04-24
- Fixes on mangahere parser
- Added 'invalid' list of mangas for mangahere and filter them automatically (ex: [Dragon Ball Super][mangahereDBS])


## [2.0.0-beta.5] 2018-04-22
- Major code restruct
- Add support to mangahere

## Disclaimer

The developer of this application does not have any affiliation with the content providers provide.


[discord]: https://discord.gg/Wg9tGXZ
[package]: https://www.npmjs.com/package/gin-downloader
[travis]: https://travis-ci.org/pikax/gin-downloader
[coverage]: https://coveralls.io/github/pikax/gin-downloader?branch=master
[dependencies]: https://david-dm.org/pikax/gin-downloader
[devDependencies]: https://david-dm.org/pikax/gin-downloader?type=dev
[snyk]: https://snyk.io/test/npm/gin-downloader





[mangahereDBS]: https://www.mangahere.cc/manga/dragon_ball_super/

