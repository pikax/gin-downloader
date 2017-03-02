/**
 * Created by rodriguesc on 02/03/2017.
 */

import {Document} from 'libxmljs';

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
// Document.prototype.

export default {
  parse,
  parseFile
}
