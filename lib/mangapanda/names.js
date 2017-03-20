/**
 * Created by david on 19/03/2017.
 */
import noCase from 'no-case';

export const names = {
  'I\'m Kagome':'i039m-kagome',
  '009 Re:Cyborg':'009-recyborg',
  '17 Years Old, That Summer Day\'s Miracle':'17-years-old-that-summer-days-miracle',
  'Kapon (>_[Completed]':'kapon-_', //parser issue
  'Utopia\'s Avenger':'utopia039s-avenger',
};


export default (name)=>{
  'use strict';
  //
  if(names.hasOwnProperty(name))
    return names[name];

  //let n = name.replace(/[^\x00-\x7F]/g,'_')
  let n = name.replace(/[\/\.+':’×;&"]/g,'');

  return noCase(n.toLowerCase(),null,'-');
};
