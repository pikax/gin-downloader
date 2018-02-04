import {capitalize, deburr} from "lodash";
import {OptionsWithUrl} from "request";
import {FilterCondition} from "./../../enum";
import {FilteredResults, MangaFilter} from "./../../filter";
import {gin, LoginSite, Site} from "./../../interface";
import {MangaSite} from "./../../mangasite";
import {config} from "./config";

import {processFilter} from "./filter";
import {Helper} from "./names";
import {Parser} from "./parser";
import MangaSource = gin.MangaSource;
import SiteConfig = gin.SiteConfig;
import * as querystring from "querystring";



export class Batoto extends MangaSite<SiteConfig, Parser, Helper> implements LoginSite {
    sitename = "batoto";

    private _urlCache: { [id: string]: string } = {}; // provide a cache for resolved urls

    public constructor() {
        super(config, new Parser(), new Helper());
    }

    async resolveMangaUrl(name: string) {
        if (this._urlCache[name]) {
            return this._urlCache[name];
        }
        let filter: MangaFilter = {search: {name: {name: name, condition: FilterCondition.Contains}}};

        let filterResults: FilteredResults;
        do {
            let page = 0;
            if (filterResults) {
                page = filterResults.page + 1;
            }
            filter.page = page;

            filterResults = await this.filter(filter);

            let {results} = filterResults;

            this.debug("filtered results: %o", results);

            let result: string;

            // console.log(results);
            for (let obj of results) {
                if (obj.name === name) {
                    result = obj.src;
                }
                else if (obj.name.startsWith(name) && obj.name === `${name} (${capitalize(deburr(name.replace("ә", "a")))})`) {
                    result = obj.src;
                }
                else if (obj.name.endsWith(`(${deburr(name.replace("ә", "a"))})`)) { // Ansatsu Kyoushitsu
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

    mangas(filter?: MangaFilter): Promise<MangaSource[]> {
        return this.filter(filter).then(x => x.results);
    }

    async filter(filter?: MangaFilter): Promise<FilteredResults> {
        this.debug("filter mangas with: %o", filter);


        // if (typeof filter === "string") {
        //
        //   filter.replace('+','%2B');
        //
        //   let i = filter.indexOf("+ ");
        //   if (i > -1) {
        //     filter = filter.slice(0, i);
        //   }
        // }
        // else {
        //   let i;
        //   if (filter.name && (i = filter.name.indexOf("+ ")) > -1) {
        //     filter.name = filter.name.slice(0, i);
        //   }
        //   if (filter.search &&   (i = (<FilterSupport>filter.search.name).name.indexOf("+ ")) > -1) {
        //     (<FilterSupport>filter.search.name).name =  (<FilterSupport>filter.search.name).name.slice(0, i);
        //   }
        //
        //   if(filter.name){
        //     filter.name = filter.name.replace('+','%2B');
        //   }
        // }


        let search = processFilter(filter);


        let doc = await this.getDoc({url: search.src, qs: search.qs});
        let mangas = await this.parser.filter(doc);

        this.debug(`mangas: ${mangas.results.length}`);

        return mangas;
    }


    protected async resolveChapterSource(name: string, chapter: number): Promise<string> {
        let src = await super.resolveChapterSource(name, chapter);
        if (!src) {
            return src;
        }
        return Parser.convertChapterReaderUrl(src);
    }

    protected buildChapterRequest(url: string): OptionsWithUrl {
        let opts = super.buildRequest(url);
        opts.headers = {...opts.headers, Referer: "http://bato.to/reader"};
        return opts;
    }

    // buildLoginRequest(url: )


    async isLoggedIn(): Promise<boolean> {
        let html = await this.getHtml("http://bato.to/search");
        let match = html.match(/>Sign Out<\/a>/m);
        return !!match;
    }

    async login(user: string, pw: string, rememberMe: boolean = true) {
        const url = "https://bato.to/forums/index.php?app=core&module=global&section=login&do=process";

        const request = this.buildRequest(url);

        const htmlL = await  this.getHtml(request);

        const $ = await this.getDoc(request);

        const authKey = $("#login > input[name='auth_key']").attr("value");

        const body = {
            auth_key: authKey,
            ips_username: user,
            ips_password: pw,
            rememberMe: rememberMe ? 1 : 0,
            referer: "http://batoto.to/search"

        };

        request.headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        };
        const html = await this.postHtml(request, querystring.stringify(body));
        return !!html.match(new RegExp(`(Welcome, ${user})|(You are now signed in)`, "g"));
    }
}

export const manga = new Batoto();
export default manga;
