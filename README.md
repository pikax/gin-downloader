# gin-downloader

[![Build Status](https://travis-ci.org/pikax/gin-downloader.svg?branch=master)](https://travis-ci.org/pikax/gin-downloader)
[![Coverage Status](https://coveralls.io/repos/github/pikax/gin-downloader/badge.svg?branch=master)](https://coveralls.io/github/pikax/gin-downloader?branch=master)
[![dependencies Status](https://david-dm.org/pikax/gin-downloader/status.svg)](https://david-dm.org/pikax/gin-downloader)
[![devDependencies Status](https://david-dm.org/pikax/gin-downloader/dev-status.svg)](https://david-dm.org/pikax/gin-downloader?type=dev)
[![Code Climate](https://lima.codeclimate.com/github/pikax/gin-downloader/badges/gpa.svg)](https://lima.codeclimate.com/github/pikax/gin-downloader)



Simple manga scrapper for famous online manga websites, it uses [libxmljs](https://github.com/libxmljs/libxmljs) for parsing.
Still in early stages, I started using [osmosis](https://github.com/rchipka/node-osmosis) as a scrapper helper, but I will remove that dependency in mean time.


### Supported websites
- [x] MangaFox
- [x] MangaPanda
- [x] MangaHere
- [ ] Bato.to
- [ ] MangaUpdates **only info**
- [ ] MyAnimeList **only info**

## Note
This project is under **development**.

## Usage
- **mangas()** : returns [{name:string, src:string}]
- **latest()** : returns [{chapter:string, src:string, volume?:string}]
- **info(name)** : returns object with site info {}
- **chapters(name)** : returns [{chapter:string, src:string, volume?:string}]
- **images(url)** : return [string]
- **resolve(name,chapter)** : returns [Promise<string>]

## Disclaimer

The developer of this application does not have any affiliation with the content providers available.
