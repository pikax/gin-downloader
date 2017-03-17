/**
 * Created by rodriguesc on 02/03/2017.
 */


import manga,{NAME} from './mangahere';
import {getBytes} from './common/request';

const url = require('url');
const path = require('path');

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs-extra'));

//const http = Promise.promisifyAll(require('http'));


let name = 'Gintama';
let chap = 61;

let dt = Date();
console.log('started : '+dt);

let promises = manga.resolve(name, chap)
  .then(x=>
    x.map(t=>t.then(processImageUri))
  );


Promise.all(promises)
  .then(x=> console.info('Execution time: %dms', Date()-dt));



function processImageUri(mangaImage) {
  let uri = url.parse(mangaImage);
  let fileName = path.basename(uri.pathname);
  let fp = `E:/${NAME}/${name}/${chap}/${fileName}`;


  return download(uri)
    .then(im=>fs.outputFileAsync(fp,im))
    .then(()=>console.log(`image saved: ${fp}`));
}


function download(uri) {
  return getBytes(uri);
}
