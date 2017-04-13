# gin-downloader

[![Build Status](https://travis-ci.org/pikax/gin-downloader.svg?branch=master)](https://travis-ci.org/pikax/gin-downloader)
[![Coverage Status](https://coveralls.io/repos/github/pikax/gin-downloader/badge.svg?branch=master)](https://coveralls.io/github/pikax/gin-downloader?branch=master)
[![dependencies Status](https://david-dm.org/pikax/gin-downloader/status.svg)](https://david-dm.org/pikax/gin-downloader)
[![devDependencies Status](https://david-dm.org/pikax/gin-downloader/dev-status.svg)](https://david-dm.org/pikax/gin-downloader?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/npm/gin-downloader/badge.svg)](https://snyk.io/test/npm/gin-downloader)
[![Code Climate](https://lima.codeclimate.com/github/pikax/gin-downloader/badges/gpa.svg)](https://lima.codeclimate.com/github/pikax/gin-downloader)

``` bash
npm install gin-downloader --save
```

Simple manga scrapper for famous online manga websites, it uses [libxmljs](https://github.com/libxmljs/libxmljs) for parsing.


### Supported websites
- [x] MangaFox
- [x] MangaPanda
- [x] MangaHere
- [ ] BatoTo
- [ ] BatoToEs
- [ ] DeNineManga
- [ ] EsManga
- [ ] EsMangaHere
- [ ] EsNineManga
- [ ] FromFolder
- [ ] GoGoComic
- [ ] HeavenManga
- [ ] ItNineManga
- [ ] JapScan
- [ ] KissManga
- [ ] LectureEnLigne
- [ ] LeoManga
- [ ] Manga_Tube
- [ ] MangaEden
- [ ] MangaEdenIt
- [ ] MangaReader
- [ ] MyMangaIo
- [ ] NineManga
- [ ] PureManga
- [ ] RawSenManga
- [ ] ReadComicOnline
- [ ] ReadComicsTV
- [ ] ReadMangaToday
- [ ] RuNineManga
- [ ] ServerBase
- [ ] StarkanaCom
- [ ] SubManga
- [ ] TuMangaOnline
- [ ] TusMangasOnlineCom
- [ ] ViewComic
- [ ] MangaUpdates **only info**
- [ ] MyAnimeList **only info**

## Note
This project is under **development**.

## Usage
- **mangas()** : returns [{name:string, src:string}]
- **latest()** : returns [{chapter:string, src:string, volume?:string}]
- **info(name)** : returns object with site info {}
- **chapters(name)** : returns [{chapter:string, src:string, volume?:string}]
- **images(manga, chapter_number)** : return Promise<Promise<string>[]>


```javascript
import manga from 'gin-downloader';

let name = 'Gintama';
let chapter = 400;
let site = manga.mangahere; // choose your favorite website -- mangafox, mangahere, mangapanda

site.mangas()
    .tap(x=>console.log(x))
    .then(x=>site.latest())
    .tap(()=>console.log('info:'))
    .tap(x=>console.log(x))
    .then(()=>site.info(name))
    .tap(()=>console.log('info:'))
    .tap(console.log) //bluebird promises
    .then(()=>site.chapters(name))
    .tap(()=>console.log('chapters:'))
    .tap(x=>console.log(x))
    .then((x)=>site.images(x[0].url)) //first chapter
    .then(x=>Promise.all(x)) //images return an array of promises
    .tap(()=>console.log('Images:'))
    .tap(console.log)
    //or
    .tap(()=>console.log('using resolver'))
    .then(site.resolve(name,chapter))
    .tap(console.log)
;

````


## mangas()
Type: `function`

returns all mangas from the website


## latest()
Type: `function`

return latest added chapters  

##info(name)

### name
Type: `string`

Manga name in the chosen 






## Disclaimer

The developer of this application does not have any affiliation with the content providers available.
