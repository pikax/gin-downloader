/**
 * Created by david on 19/03/2017.
 */
import url from 'url';

import noCase from 'no-case';
import config from './config';


export const names = {
  'Renai Tsuu -Akka-':'renaitsuu_akka',
  'Tarepanda Goes on an Adventure':'tarepanda_goes_on_adventure',
};


export const toName =  (name)=>{
  'use strict';

  if(names.hasOwnProperty(name))
    return names[name];

  return noCase(name.toLowerCase(), null,'_');
};

export const resolveUrl = (name)=>{
  'use strict';

  return url.resolve(config.mangas_url,toName(name));
};