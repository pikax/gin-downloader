/**
 * Created by pikax on 11/06/2017.
 */

const cloudscraper = require("cloudscraper");
const requestRetry = require("requestretry");

const util = require('util');// node 8
const fs = require('fs');
const path = require('path');


const cloudscraperPromise =  (opts)=>{
  return new Promise((res, rej) => {
    let callback = (err, response, body) => {
      if (err) {
        return rej(err);
      }
      return res(body);
    };

    if (opts.method === "POST") {
      cloudscraper.post(opts.url, opts.body, callback);
    }
    else {
      cloudscraper.request(opts, callback);
    }
  });
}


const byRequest = [
  { name : "batoto",
    pages : [
      {path:"batoto/html/mangas.html", uri:"https://bato.to/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/latest.html", uri:"https://bato.to/"},
      {path:"batoto/html/ch001.html", uri:"http://bato.to/areader?id=e37a90922a3aa108&p=1"},
      {path:"batoto/html/filter/byGenre.html", uri:" https://bato.to/search_ajax?name=&&artist_name=&&genres=i1;i2;i3;i8;i20;i33&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/filter/outGenre.html", uri:"https://bato.to/search_ajax?name=gin&name_cond=s&artist_name=Sora&artist_name_cond=c&genres=e6&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/filter/byAuthor.html", uri:"https://bato.to/search_ajax?name=&&artist_name=Sorachi&artist_name_cond=c&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/filter/byCompleted.html", uri:"https://bato.to/search_ajax?name=kenichi&name_cond=c&artist_name=&&genres=&genre_cond=and&status=c&type=null&mature=y&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/filter/byType.html", uri:"https://bato.to/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=kr&mature=y&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/filter/noMature.html", uri:"https://bato.to/search_ajax?name=ginta&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=n&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/filter/rating5~5.html", uri:"https://bato.to/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=5&rating_high=5&p=1"},
      {path:"batoto/html/filter/rating0~1.html", uri:"https://bato.to/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=1&rating_high=1&p=1"},
      {path:"batoto/html/filter/genreOr.html", uri:"https://bato.to/search_ajax?name=ginta&&artist_name=&&genres=i34;i35;i38&genre_cond=or&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1"},
    ]}

];

const byCFRequest = [
  {name: "kissmanga",
    pages : [
      {path:"kissmanga/html/mangas.html", uri: "http://kissmanga.com/AdvanceSearch", args: "mangaName=&authorArtist=&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status="},
      // {path:"kissmanga/html/latest.html", uri: "http://kissmanga.com/MangaList/LatestUpdate"},
      // {path:"kissmanga/html/Gintama.html", uri: "http://kissmanga.com/Manga/Gintama"},
      // {path:"kissmanga/html/Lesson-042.html", uri: "http://kissmanga.com/Manga/Gintama/Lesson-042?id=288316"},
      // {path:"kissmanga/html/ca.js", uri: "http://kissmanga.com/Scripts/ca.js"},
      // {path:"kissmanga/html/lo.js", uri: "http://kissmanga.com/Scripts/lo.js"},
      // {path:"kissmanga/html/filter/byName.html", uri: "http://kissmanga.com/AdvanceSearch", args: "mangaName=Gintama&authorArtist=&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status="},
      // {path:"kissmanga/html/filter/byGenre.html", uri: "http://kissmanga.com/AdvanceSearch", args: "mangaName=&authorArtist=&genres=0&genres=1&genres=0&genres=0&genres=1&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=1&genres=0&genres=0&genres=0&genres=0&genres=1&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status="},
      // {path:"kissmanga/html/filter/outGenre.html", uri: "http://kissmanga.com/AdvanceSearch", args: "mangaName=&authorArtist=&genres=2&genres=0&genres=2&genres=2&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=2&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status="},
      // {path:"kissmanga/html/filter/byAuthor.html", uri: "http://kissmanga.com/AdvanceSearch", args: "mangaName=&authorArtist=Sorachi&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status="},
      // {path:"kissmanga/html/filter/byCompleted.html", uri: "http://kissmanga.com/AdvanceSearch", args: "mangaName=&authorArtist=&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status=Complete"}
    ]
  }
];

function getRequest(opts){
  "use strict";
  return requestRetry(opts );
}


async function resolveRequests() {

  for (let obj of byRequest) {

    for (let page of obj.pages) {
      await getRequest({url:page.uri, fullResponse:false} ).then(x=> fs.writeFile(path.resolve(__dirname, '../test/sites', page.path), x));
    }
  }

}

async function resolveCFRequest(){
  for (let obj of byCFRequest) {

    for (let page of obj.pages) {

      let body = page.args;
      let method = body ? 'POST' : 'GET';

      await cloudscraperPromise({url:page.uri, method: method, body} ).then(x=> fs.writeFile(path.resolve(__dirname, '../test/sites', page.path), x));
    }
  }

}

Promise.all([
  resolveRequests(),
  resolveCFRequest()])
  .then(x=>console.log('finished'))






