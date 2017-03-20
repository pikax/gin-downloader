/**
 * Created by rodriguesc on 10/03/2017.
 */

import Promise from 'bluebird';


//resolve
export const resolveArray = (osm) => {
  return new Promise((resolve, reject) => {
    let arr = [];
    osm.data(x => arr.push(x))
      .error(reject)
      .done(() => {
        resolve(arr);
      });
  });
};

export const resolveObject = (osm) => {
  return new Promise((resolve, reject) => {
    osm.data(x=>resolve(x))
      .error(reject)
      .run();
  });
};

