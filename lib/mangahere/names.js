/**
 * Created by david on 19/03/2017.
 */
import noCase from 'no-case';


export default (name)=>{
  'use strict';

  let n = name.replace(/[^\x00-\x7F]/g,'_')

  return noCase(n.toLowerCase(),null,'_');
};
