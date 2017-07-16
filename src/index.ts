/**
 * Created by pikax on 16/07/2017.
 */
// import {manga as mangafox} from "./sites/mangafox/index";
// import {manga as mangahere} from "./sites/mangahere/index";
// import {manga as mangapanda} from "./sites/mangapanda/index";
// import {manga as kissmanga} from "./sites/kissmanga/index";
// import {manga as batoto} from "./sites/batoto/";

//
// export {
//   mangafox,
//   mangahere,
//   mangapanda,
//   kissmanga,
//   batoto,
// };



export class GinDownloader {
  private _batoto: any;



  get batoto() {
    return this._batoto || (this._batoto = require("./sites/batoto/index"));
  }



}


const gin = new GinDownloader();
export default gin;
