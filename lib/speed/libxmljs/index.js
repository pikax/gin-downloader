/**
 * Created by rodriguesc on 02/03/2017.
 */

import {Document} from 'libxmljs';

var rp  = require('request-promise');

var Promise = require("bluebird");
var readFile = Promise.promisify(require("fs").readFile);

const parseFile = (fp)=>{
  return readFile(fp)
    .then(parse);
};
const parse = (fp)=>{
  return new Promise((result,error)=>{
    result(Document.fromHtml(fp))
  });
};


const get = (uri)=>{
  return rp(uri)
    .then(Document.fromHtml);
};

export default {
  parse,
  parseFile,
  get
}
