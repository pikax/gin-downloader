# gin-downloader


[![Build Status](https://travis-ci.org/pikax/gin-downloader.svg?branch=master)][travis]
[![npm version](https://badge.fury.io/js/gin-downloader.svg)][package]
[![Coverage Status](https://coveralls.io/repos/github/pikax/gin-downloader/badge.svg?branch=master)][coverage]
[![dependencies Status](https://david-dm.org/pikax/gin-downloader/status.svg)][dependencies]
[![devDependencies Status](https://david-dm.org/pikax/gin-downloader/dev-status.svg)][devDependencies]
[![Known Vulnerabilities](https://snyk.io/test/npm/gin-downloader/badge.svg)][snyk]
[![Discord](https://img.shields.io/badge/discord-chat-blue.svg)][discord]


npm
``` bash
npm install gin-downloader --save
``` 


yarn
``` bash
yarn add gin-downloader
``` 



## **v1 is Currently deprecated, please use @beta version**


I'm currently changing and only maintaining the v2 of *gin-downloader*.


The focus on the v1 was to support as many manga sites as possible, but that caused a lot of websites to maintain with virtual no time for me to maintain it correctly.

The focus on this v2 is to support a small number of websites and implement an easy to use API and improve from there.



### Supported websites `not planing to support more than this`
- [ ] MangaFox
- [ ] MangaPanda
- [x] MangaHere
- [ ] KissManga
- [ ] BatoTo (`new`)



## Usage
- **import**
single site
```javascript
import {mangahere} from 'gin-downloader';
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



- **filter(filter: FilterSupport)** : returns [{name:string, src:string}]

```javascript
import {mangahere} from 'gin-downloader';

mangahere.filter()
	.then(console.log); // prints all mangas from mangafox
```

- **mangas()** : returns [{name:string, src:string}]
*note*: not every site will return all the mangas.
```javascript
import {mangahere} from 'gin-downloader';

mangahere.mangas()
	.then(console.log); // prints all mangas from mangafox
```

- **latest()** : returns [{number:number|string, src:string, volume?:string,name:string}]
```javascript
mangahere.latest() // latest chapters added to mangafox
    .then(console.log);
```

- **info(name)** : returns object with manga info {}
```javascript
mangahere.info("Gintama")
    .then(console.log);
```

- **chapters(name)** : returns [{number:number|string, name:string, src:string, volume?:string}]
```javascript
mangahere.chapters("Gintama")
	.then(console.log)
```

- **infoChapters(name)** : returns {info: MangaInfo, chapters: Chapter[]}
manga info and chapters with single call
```javascript
mangahere.info("Gintama")
    .then(console.log);
```

- **images(manga, chapter_number)** : return Promise<Promise<{value: {name:string,src:string}>[]>;
```javascript
mangahere.images("Gintama", 1)
      .then(x=>Promise.all(x.map(t=>t.value))) //resolve all promises
      .then(console.log)
```







## Disclaimer

The developer of this application does not have any affiliation with the content providers provide.


[discord]: https://discord.gg/Wg9tGXZ
[package]: https://www.npmjs.com/package/swgoh
[travis]: https://travis-ci.org/pikax/gin-downloader
[coverage]: https://coveralls.io/github/pikax/gin-downloader?branch=master
[dependencies]: https://david-dm.org/pikax/gin-downloader
[devDependencies]: https://david-dm.org/pikax/gin-downloader?type=dev
[snyk]: https://snyk.io/test/npm/gin-downloader
