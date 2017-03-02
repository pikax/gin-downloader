/**
 * Created by rodriguesc on 02/03/2017.
 */
import htmlparser2 from 'htmlparser2';

var Promise = require("bluebird");
var readFile = Promise.promisify(require("fs").readFile);


const parseFile = (fp)=>{
  return readFile(fp)
    .then(parse);
};
const parse = (fp)=>{
  return new Promise((result,error)=>{
    new htmlparser2.Parser({
      onend: result,
      onerror: error
    }).end(fp);
  });
};

export default {
  parse,
  parseFile
}
