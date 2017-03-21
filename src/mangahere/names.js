/**
 * Created by david on 19/03/2017.
 */
import url from 'url';

import noCase from 'no-case';
import config from './config';


export const toName = (name)=>{
  'use strict';

  let n = name.replace(/[^\x00-\x7F]/g,'_');

  return noCase(n.toLowerCase(),null,'_');
};

export const resolveUrl = (name)=>{
  'use strict';

  return url.resolve(config.site + '/manga/',toName(name));
};