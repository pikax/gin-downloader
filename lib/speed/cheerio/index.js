/**
 * Created by rodriguesc on 02/03/2017.
 */

import cheerio from 'cheerio';

var Promise = require("bluebird");
var readFile = Promise.promisify(require("fs").readFile);


const parseFile = (fp)=>{
  return readFile(fp)
    .then(parse);
};

const parse= (fp)=>{
  return new Promise((resolve)=>resolve(cheerio.load(fp)));
};

export default {
  parseFile,
  parse
}
