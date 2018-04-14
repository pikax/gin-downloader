// import {manga as mangafox} from "./sites/mangafox/index";
// import {manga as mangahere} from "./sites/mangahere/index";
// import {manga as mangapanda} from "./sites/mangapanda/index";
// import {manga as kissmanga} from "./sites/kissmanga/index";
// export {manga as batoto} from "./sites/batoto/index";


export * from "./interface";

export {mangahere} from "./sites/mangahere";


export * from "./enum";


// export {SuperChapter, SuperObject} from "./super_obj";
// export {ginConfig} from "./config";
// export {parseDoc} from "./util";

//
// export {RequestCloudFlareStrategy, RequestRetryStrategy} from "./request/index";
// export {request} from "./request/pool";

// export const gin = {
//   // mangafox,
//   // mangahere,
//   // mangapanda,
//   // kissmanga,
//   batoto,
// };
//
// import {LoginSite, Site} from "src/interface";
//
// const enum sites {
//   mangafox = "mangafox",
//   mangapanga = "mangapanga",
//   mangahere = "mangahere",
//   kissmanga = "kissmanga",
//   batoto = "batoto",
// }
//
// export class GinDownloader {
//   private _mangafox: Site;
//   private _mangapanga: Site;
//   private _mangahere: Site;
//   private _kissmanga: Site;
//   private _batoto: Site;
//
//   private static resolveSite(site: sites)  {
//     return require(`./sites/${site}/index`).default;
//   }
//
//   get mangafox(): Site{
//     return this._mangafox || (this._mangafox = GinDownloader.resolveSite(sites.mangafox));
//   }
//   get mangapanga(): Site{
//     return this._mangapanga || (this._mangapanga = GinDownloader.resolveSite(sites.mangapanga));
//   }
//   get mangahere(): Site{
//     return this._mangahere || (this._mangahere = GinDownloader.resolveSite(sites.mangahere));
//   }
//   get kissmanga(): Site{
//     return this._kissmanga || (this._kissmanga = GinDownloader.resolveSite(sites.kissmanga));
//   }
//   get batoto(): LoginSite {
//     return this._batoto || (this._batoto = GinDownloader.resolveSite(sites.batoto));
//   }
//
// }
//
//
// const gin = new GinDownloader();
// export default gin;

