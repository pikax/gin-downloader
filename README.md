# gin-downloader

[![Join the chat at https://gitter.im/pikax/gin-downloader](https://badges.gitter.im/pikax/gin-downloader.svg)](https://gitter.im/pikax/gin-downloader?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/pikax/gin-downloader.svg?branch=master)](https://travis-ci.org/pikax/gin-downloader)
[![Coverage Status](https://coveralls.io/repos/github/pikax/gin-downloader/badge.svg?branch=master)](https://coveralls.io/github/pikax/gin-downloader?branch=master)
[![dependencies Status](https://david-dm.org/pikax/gin-downloader/status.svg)](https://david-dm.org/pikax/gin-downloader)
[![devDependencies Status](https://david-dm.org/pikax/gin-downloader/dev-status.svg)](https://david-dm.org/pikax/gin-downloader?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/npm/gin-downloader/badge.svg)](https://snyk.io/test/npm/gin-downloader)



``` bash
npm install gin-downloader --save
``` 


Promise based manga scrapper for node, which supports multiple sites.   



### Supported websites
- [x] MangaFox
- [x] MangaPanda
- [x] MangaHere
- [x] KissManga
- [x] BatoTo


## Usage
- **import**
single site
```javascript
import {mangafox} from 'gin-downloader';
```

or

```javascript
import gin from 'gin-downloader'; // as default
//or
import * as gin from 'gin-downloader'; //typescript


gin.mangafox.mangas(); //get mangas
```


- **filter(filter: FilterSupport)** : returns {results:[{src:string,name:string}], page:number, total:number}
```javascript
gin.mangapanda.filter({name:"gintama"})
  .then(console.log);
/* returns
{ results: [ { name: 'Gintama', src: 'http://www.mangapanda.com/gintama' } ],
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
import {mangafox} from 'gin-downloader';

mangafox.filter()
	.then(console.log); // prints all mangas from mangafox 
```

- **mangas()** : returns [{name:string, src:string}]
*note*: not every site will return all the mangas. 
```javascript
import {mangafox} from 'gin-downloader';

mangafox.mangas()
	.then(console.log); // prints all mangas from mangafox 
```

- **latest()** : returns [{number:number|string, src:string, volume?:string,name:string}]
```javascript
mangafox.latest() // latest chapters added to mangafox
    .then(console.log); 
```

- **info(name)** : returns object with manga info {}
```javascript
mangafox.info("Gintama")
    .then(console.log);
```

- **chapters(name)** : returns [{number:number|string, name:string, src:string, volume?:string}]
```javascript
mangafox.chapters("Gintama")
	.then(console.log)
```

- **infoChapters(name)** : returns {info: MangaInfo, chapters: Chapter[]} 
manga info and chapters with single call
```javascript
mangafox.info("Gintama")
    .then(console.log);
```

- **images(manga, chapter_number)** : return Promise<Promise<{name:string,src:string>[]>
```javascript
mangafox.images("Gintama", 1)
      .then(x=>Promise.all(x)) //resolve all promises
      .then(console.log)
```

- **login(user, pw, remember?)**: return Promise<boolean>
```javascript
let user = ""; //username
let pw = ""; //pw

//simple version
batoto.logIn(user, pw)
  .then(x=>{
    if(!x) 
      throw new Error('invalid user or password')
    return x;
  })
  .then(x=>batoto.chapters('Gintama'))
  .then(console.log)
```





## Disclaimer

The developer of this application does not have any affiliation with the content providers available.


