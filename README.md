# gin-downloader


[![Discord](https://img.shields.io/badge/discord-chat-blue.svg)][discord]




npm
``` bash
npm install gin-downloader --save
``` 


yarn
``` bash
yarn add gin-downloader
``` 



In v2 I'm planing a lot of breaking changes from v1


The goals are to make the api simple, easier and cleaner.
 
 
I don't recommend to use this branch, changes will happen without any notice.


```typescript

//this is only theoretical code, only my vision of the new API, I'm happy to discuss the API   
import {mangafox} from 'gin-downloader'

let name = 'Gintama';

let manga = await mangafox.manga(name); // GinObj that holds all information about the manga
let info = await manga.info(); // basically the same info

let chapters = await manga.chapters(); // get list of chapterObj


let firstChapter = chapters.get('1'); 
let omakes = chapters.getType(ChapterType.Omake);
let extras = chapters.getExtras();

let cimages = await firstChapter.images(); // list of lazyloaded mangaimages 


let images = await Promise.all(cimages.map(x=>x.image)); // lazyloading list, we can resolve by chunk or 1 by 1
//or 1 by 1

forof(let lz of cimages){
  let img = await lz.image; //only resolve when needed
  console.log(img); 
}



```












## Disclaimer

The developer of this application does not have any affiliation with the content providers provide.


[discord]: https://discord.gg/Wg9tGXZ