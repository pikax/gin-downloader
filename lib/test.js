/**
 * Created by rodriguesc on 02/03/2017.
 */


import manga,{NAME} from './mangafox';
import {getBytes} from './common/request';

const url = require('url');
const path = require('path');

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs-extra'));

//const http = Promise.promisifyAll(require('http'));

import http from 'http';
var Stream = require('stream').Transform;

let name = 'Gintama';
let chap = 60;

let dt = Date();
console.log('started : '+dt)

let promises = manga.resolve(name, chap)
  .then(x=>
    x.map(t=>t.then(processImageUri))
  );


Promise.all(promises)
  .then(x=> console.info("Execution time: %dms", Date()-dt));



function processImageUri(mangaImage) {
  let xx = mangaImage;
  //console.log({src:xx,loc:'processImageUri'});

  let uri = url.parse(xx);
  let fileName = path.basename(uri.pathname);
  let fp = `E:/${NAME}/${name}/${chap}/${fileName}`;

  //console.log({href:uri.href,fileName,fp});

  return download(uri)
    .then(im=>fs.outputFileAsync(fp,im))
    .then(()=>console.log(`image saved: ${fp}`));
}


function download(uri) {
  return getBytes(uri);
}
