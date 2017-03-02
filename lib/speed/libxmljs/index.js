/**
 * Created by rodriguesc on 02/03/2017.
 */

import {Document} from 'libxmljs';


const parseFile = (file)=>{
  return new Promise((resolve)=>resolve(Document.fromHtml(file)));
};


// Document.prototype.

export default {
  parseFile
}
