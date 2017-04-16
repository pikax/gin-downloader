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


Promise based manga scrapper for node, which supports multiple sites.   



### Supported websites
- [x] MangaFox
- [x] MangaPanda
- [x] MangaHere
- [x] KissManga
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



- **mangas()** : returns [{name:string, src:string}]
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

- **images(manga, chapter_number)** : return Promise<Promise<string>[]>
```javascript
mangafox.chapters("Gintama", 1)
    .then(Promise.all) //resolve all promises
    .then(console.log)
```









## Disclaimer

The developer of this application does not have any affiliation with the content providers available.
