/**
 * Created by david on 25/03/2017.
 */


import './common/declarations';

import {manga} from './sites/mangafox'


let name = 'Gintama';
let chapter = 41;




async function ff(){
  let result =await manga.images(name,chapter);

  await Promise.all(result.map(x=>x.then(console.log)));

}



ff();