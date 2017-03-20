/**
 * Created by david on 19/03/2017.
 */
import noCase from 'no-case';



export const names = {
  'Renai Tsuu -Akka-':'renaitsuu_akka',
  'Tarepanda Goes on an Adventure':'tarepanda_goes_on_adventure',
};


export default (name)=>{
  'use strict';

  if(names.hasOwnProperty(name))
    return names[name];

  return noCase(name.toLowerCase(), null,'_');
};
