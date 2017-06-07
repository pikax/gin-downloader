/**
 * Created by david on 24/03/2017.
 */

import {MangaSite} from "../../common/mangasite";
import {Parser} from "./parser";
import {config} from "./config";
import {Helper} from "./names";
import {
  FilterCondition, FilteredResults, FilterSupport, ImageSource, MangaSource, Site,
  SiteConfig
} from "../../declarations";

import {processFilter} from "./filter";
import {strategy} from "../../request/requestRetryStrategy";
import {OptionsWithUrl} from "request";



export class Batoto extends MangaSite<SiteConfig, Parser, Helper> implements Site {

  private _urlCache: {[id: string]: string} = {}; // provide a cache for resolved urls

  public constructor() {
    super(config, new Parser(), new Helper(), strategy);
  }

  async resolveMangaUrl(name: string)  {
    if (this._urlCache[name]) {
      return this._urlCache[name];
    }

    let filter: FilterSupport = {search: {name: {name, condition: FilterCondition.EndsWith}}};
    let filterResults: FilteredResults;
    do {
      let page = 0;
      if (filterResults) {
        page = filterResults.page + 1;
      }
      filter.page = page;

      filterResults = await this.filter(filter);

      let {results} = filterResults;

      let result: string;

      for (let obj of results) {
        if (obj.name === name) {
          result = obj.src;
        }

        this._urlCache[obj.name] = obj.src; // add to cache
      }

      if (result) {
        return result;
      }
    } while (filterResults.page < filterResults.total && filterResults.results.length > 0);

    return "";
  }

  mangas(filter?: FilterSupport): Promise<MangaSource[]> {
    return this.filter(filter).then(x => x.results);
  }

  async filter(filter?: FilterSupport): Promise<FilteredResults> {
    this.debug("filter mangas with: %o", filter);

    let search = processFilter(filter);

    let doc = await this.getDoc(search.src);
    let mangas = await this.parser.filter(doc);

    this.debug(`mangas: ${mangas.results.length}`);

    return mangas;
  }


  async resolveChapterSource(name: string, chapter: number): Promise<string> {
    let src = await super.resolveChapterSource(name, chapter);
    if (!src) {
      return src;
    }
    return Parser.convertChapterReaderUrl(src);
  }

  buildChapterRequest(url: string) : OptionsWithUrl {
    let opts = super.buildRequest(url);
    opts.headers = {...opts.headers, Referer: "http://bato.to/reader" };
    return opts;
  }

  // buildLoginRequest(url: )


  async isLoggedIn() : Promise<boolean> {
    let html = await this.getHtml("http://bato.to/search");
    let match = html.match(/>Sign Out<\/a\>/m);
    return !!match;
  }

  async logIn(user: string, pw: string, rememberMe: boolean = true) {
      let url =  "http://bato.to/forums/index.php?app=core&module=global&section=login&do=process";

      let request = this.buildRequest(url);
      let $ = await this.getDoc(request);
      let authKey = $("#login > input[name='auth_key']").attr("value");

      let body = {
        ips_username : user,
        ips_password : pw,
        referer : "https://bato.to/forums",
        rememberMe: rememberMe ? 1 : 0,
        auth_key : authKey,
      };


      request = {...request, formData: body,
        // proxy: "http://127.0.0.1:8888"
      };

    let html = await this.request.postHtml(request);


    return !!html.match(/<strong>You are now signed in<\/strong>/m);
  }
}

export const manga = new Batoto();
export default manga;
