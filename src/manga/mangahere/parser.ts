import * as url from "url";
import {LicencedError, ImageNotFoundError} from "../../util/error";

import {lastDigit} from "../../util/string";
import {MangaSource} from "../../filter";
import {
    ChapterSource,
    IChapter,
    IMangaConfigDependency, IMangaGenreDependency,
    IGenreSite, IMangaConfig, IMangaParser, IMangaRequest,
    IMangaLoggerDependency,
    MangaInfo,
    Synonym
} from "../../interface";
import {sanitizeChildren} from "../../util/cheerio";
import {FilterStatus} from "../../enum";


import {ILogger} from "../../util/logger";


export type MangaHereParserDependencies = IMangaLoggerDependency & IMangaConfigDependency & IMangaGenreDependency;

export class MangaHereParser implements IMangaParser {
    private _logger: ILogger;
    private _config: IMangaConfig;
    private _genreSite: IGenreSite;

    constructor(dependencies: MangaHereParserDependencies) {
        this._logger = dependencies.logger;
        this._config = dependencies.config;
        this._genreSite = dependencies.genre;
    }


    * mangas(mangaRequest: IMangaRequest): IterableIterator<MangaSource> {
        const {$, uri, html} = mangaRequest;

        this._logger.debug("parsing mangas:\n\turl:%s", uri);
        this._logger.verbose("parsing mangas:\n\turl:%s\n\thtml:\n%s", uri, html);

        try {

            const elements = $(".manga_info").toArray();

            this._logger.debug("processing %d elements", elements.length);
            this._logger.verbose("processing elements:\n%j", elements);

            for (const item of elements) {
                this._logger.verbose("processing element: %j", item);
                const result = {
                    name: item.lastChild.nodeValue,
                    src: url.resolve(this._config.site, item.attribs["href"]),
                };

                this._logger.debug("processed with: %o", result);
                this._logger.verbose("element %j converted to %o", result);

                yield result;
            }
        } catch (e) {
            this._logger.error("Parsing mangas exception:\n%o\nurl:%s", e, uri);

            throw e;
        }
    }

    * latest(mangaRequest: IMangaRequest): IterableIterator<IChapter & { src: string, mangaSrc: string }> {
        const {$, uri, html} = mangaRequest;

        this._logger.debug("parsing latest:\n\turl:%s", uri);
        this._logger.verbose("parsing latest:\n\turl:%s\n\thtml:\n%s", uri, html);
        try {

            const elements = $(".manga_updates > dl").toArray();

            this._logger.debug("processing %d elements", elements.length);
            this._logger.verbose("processing elements:\n%j", elements);

            for (const item of elements) {
                this._logger.verbose("processing element: %j", item);

                const divChildren = sanitizeChildren(item.children);
                const aManga = divChildren[0].children.find(x => x.name === "a");

                const mangaSrc = url.resolve(this._config.site, aManga.attribs.href);
                const mangaName = aManga.lastChild.nodeValue;

                const date = divChildren[0].children.find(x => x.name === "span").lastChild.nodeValue;
                const dts = sanitizeChildren(divChildren.slice(1));

                this._logger.debug("found [%s] with [%d] chapters", mangaName, dts.length);
                this._logger.verbose("found [%s] with [%d] chapters", mangaName, dts.length);


                for (const dt of dts) {
                    this._logger.verbose("processing child element: %j", dt);

                    const a = dt.children.find(x => x.name === "a");

                    const src = url.resolve(this._config.site, a.attribs.href);
                    const title = a.lastChild.nodeValue;

                    const chapNumber = lastDigit(title);

                    const result = {
                        name: mangaName,
                        src: src,
                        chap_number: chapNumber.toString(),
                        dateAdded: date,
                        mangaSrc,
                    };

                    this._logger.debug("processed [%s] with: %o", mangaName, result);
                    this._logger.verbose("element %j converted to %o", dt, result);

                    yield result;
                }
            }
        } catch (e) {
            this._logger.error("Parsing latest exception:\n%o\nurl:%s", e, uri);

            throw e;
        }
    }


    info(mangaRequest: IMangaRequest): MangaInfo {
        const {$, uri, html} = mangaRequest;

        this._logger.debug("parsing manga:\n\turl:%s", uri);
        this._logger.verbose("parsing manga:\n\turl:%s\n\thtml:\n%s", uri, html);

        try {
            const image = $("img.img").attr("src");
            const title = sanitizeText($("div.title > h3").get()[0] as any).slice(5, -7);
            // const title = $("div.title > h3").text().slice(5, -7);

            const li: CheerioElement[] = $(".detail_topText > li").toArray();

            const synonymsChildren = li[2].children.slice(1);

            // const synonymCsv = synonymsChildren.map(x => x.nodeValue || (x.attribs["data-cfemail"] && decryptEmail(x.attribs["data-cfemail"])) || "").join("");
            const synonymCsv = synonymsChildren.map(sanitizeText).join("");
            const synonyms: Synonym[] = synonymCsv.split("; ").map(resolveSynonym);

            if (synonyms.length === 1 && synonyms[0].title === "None") {
                synonyms.splice(0);
            }


            const genres = li[3].lastChild.nodeValue.split(", ").map(x => this._genreSite.fromSiteGenre(x));

            const authors = li[4].children.filter(x => x.name === "a").filter(x => !!x.lastChild).map(x => x.lastChild.nodeValue);
            const artists = li[5].children.filter(x => x.name === "a").filter(x => !!x.lastChild).map(x => x.lastChild.nodeValue);

            const status = li[6].children[0].next.nodeValue.trim() === "Ongoing"
                ? FilterStatus.Ongoing
                : FilterStatus.Complete;

            const synopsis = li.reverse()[0].children.reverse().find(x => x.name === "p").children[0].nodeValue;

            const licensed = $("#main > article > div > div.manga_detail > div.detail_list > div > strong").length > 0;


            const result = {
                image,
                title,
                synonyms,
                authors,
                artists,
                genres,
                synopsis,
                status,

                licensed
            };

            this._logger.debug("processed with: %o", result);
            this._logger.verbose("element %j converted to %o", result);
            return result;
        } catch (e) {
            this._logger.error("Parsing info exception:\n%o\nurl:%s", e, uri);

            throw e;
        }
    }


    * chapters(mangaRequest: IMangaRequest): IterableIterator<ChapterSource> {
        const {$, uri, html} = mangaRequest;

        this._logger.debug("parsing chapter:\n\turl:%s", uri);
        this._logger.verbose("parsing chapter:\n\turl:%s\n\thtml:\n%s", uri, html);
        try {


            const elements = $("span.left > a.color_0077").toArray();
            this._logger.debug("processing %d elements", elements.length);
            this._logger.verbose("processing elements:\n%j", elements);


            for (const item of elements) {
                this._logger.verbose("processing element: %j", item);

                const span = item.parent;
                const li = span.parent;
                const liChildren = sanitizeChildren(li.children);
                const a = item;

                const date = liChildren[liChildren.length - 1].lastChild.nodeValue;
                const aText = a.lastChild.nodeValue.trim(); // chapter number
                const href = a.attribs.href;

                const volume = liChildren[0].children.filter(x => x.attribs && x.attribs.class === "mr6").map(x => x.lastChild && x.lastChild.nodeValue).filter(x => !!x)[0];
                const name = liChildren[0].children.slice(4).map(sanitizeText).join("") || aText;

                const chap_number = aText.lastDigit().toString();

                const result = {
                    chap_number,
                    name,
                    src: url.resolve(this._config.site, href),
                    dateAdded: date
                };

                if (volume) {
                    (result as IChapter).volume = volume;
                }

                this._logger.debug("processed with: %o", result);
                this._logger.verbose("element %j converted to %o", item, result);
                yield result;
            }
        } catch (e) {
            this._logger.error("Parsing chapters exception:\n%o\nurl:%s", e, uri);

            throw e;
        }
    }


    * imagesPaths(mangaRequest: IMangaRequest): IterableIterator<{ name: string; src: string }> {
        const {$, uri, html} = mangaRequest;

        this._logger.debug("parsing images paths:\n\turl:%s", uri);
        this._logger.verbose("parsing images paths:\n\turl:%s\n\thtml:\n%s", uri, html);
        try {

            const licensed = $("body > section > div.mangaread_error > div.mt10.color_ff00.mb10.center > strong").text();
            if (licensed) {
                this._logger.debug("Is licensed %s", licensed);
                this._logger.verbose("Is licensed %s", licensed);

                throw LicencedError(this._config.name, licensed);
            }
            const elements = $("body > section.readpage_top > div.go_page.clearfix > span > select > option").toArray();

            this._logger.debug("processing %d elements", elements.length);
            this._logger.verbose("processing elements:\n%j", elements);

            for (const item of elements) {
                this._logger.verbose("processing element: %j", item);

                const src = item.attribs.value;
                const name = item.lastChild.nodeValue;

                // NOTE mangahere inserts Feature image at the end with 'Ad'
                if (name === "Featured") {
                    this._logger.debug("skipping [Feature] because is an Ad");
                    this._logger.verbose("skipping [Feature] because is an Ad");

                    continue;
                }
                const result = {src, name};

                this._logger.debug("processed with: %o", result);
                this._logger.verbose("element %j converted to %o", item, result);

                yield result;
            }
        } catch (e) {
            this._logger.error("Parsing images exception:\n%o\nurl:%s", e, uri);

            throw e;
        }
    }

    image(mangaRequest: IMangaRequest) {
        const {uri, html} = mangaRequest;
        this._logger.debug("parsing image:\n\turl:%s", uri);
        this._logger.verbose("parsing image:\n\turl:%s\n\thtml:\n%s", uri, html);
        try {

            const match = html.match(/(?:src=")([^"]*)(?:.*id="image")/m);
            if (!match) {
                this._logger.debug("Image not found, please check if the url is correct and if it works on your browser.");
                this._logger.verbose("Image not found, please check if the url is correct and if it works on your browser.");
                throw ImageNotFoundError(this._config.name, uri, "ADB0");
            }

            const result = match[1];

            this._logger.debug("resolved with: %o", result);
            this._logger.verbose("resolved with: %o", result);
            return result;
        } catch (e) {
            this._logger.error("Parsing image exception:\n%o\nurl:%s", e, uri);

            throw e;
        }
    }


    filterPage(mangaRequest: IMangaRequest): { page: number; total: number } {
        const {$, uri, html} = mangaRequest;

        this._logger.debug("get filter current page:\n\turl:%s", uri);
        this._logger.verbose("get filter current page:\n\turl:%s\n\thtml:\n%s", uri, html);
        try {

            let page = 1;
            let query = url.parse(uri).query;
            if (query) {
                this._logger.verbose("using query to retrieve current page", uri, html);
                const m = query.toString().match(/(?:page=)(\d+)/);
                if (m) {
                    this._logger.verbose("page found in query with value %s", m[0]);
                    this._logger.verbose("setting page to [%s] with %d", m[1], m[1]);

                    page = +m[1];
                }

            } else {
                this._logger.verbose("query not found setting page to 1");
            }

            const lastPageElement = $("div.next-page > a").slice(-2, -1);
            this._logger.verbose("resolved last element %j", lastPageElement);

            const lastPage = lastPageElement && lastPageElement[0]
                ? +lastPageElement.text()
                : 1;


            const result = {
                page: page,
                total: lastPage
            };

            this._logger.debug("resolved with: %o", result);
            this._logger.verbose("resolved with: %o", result);

            return result;
        } catch (e) {
            this._logger.error("Parsing filter page exception:\n%o\nurl:%s", e, uri);

            throw e;
        }
    }
}


// const regexSynonymLang = /\((.*)\)$/;
const regexSynonymLang = /\s\((\w+)\)$/;
const defaultLang = "";
const resolveSynonym = (dirtyTitle: string): Synonym => {
    const match = dirtyTitle.match(regexSynonymLang);
    if (match) {
        const language = match[1];
        const title = dirtyTitle.replace(`${match[0]}`, "");

        return {
            title,
            language
        };
    }

    return {
        title: dirtyTitle,
        language: defaultLang,
    };
};


const sanitizeText = (element: CheerioElement) => {
    if (!element) {
        return null;
    }

    if (element.nodeValue) {
        return element.nodeValue;
    }

    const cfemail = element.attribs["data-cfemail"];
    if (cfemail) {
        return decryptEmail(cfemail);
    }

    if (!element.children) {
        return null;
    }

    return element.children.map(sanitizeText).join("");
};

const decryptEmail = (cfemail) => {
    // www.mangahere.cc/cdn-cgi/scripts/d07b1474/cloudflare-static/email-decode.min.js

    function r(e, t) {
        var r = e.substr(t, 2);
        return parseInt(r, 16)
    }

    function n(n, o) {
        for (var c = "", a = r(n, o), i = o + 2; i < n.length; i += 2) {
            var f = r(n, i) ^ a;
            c += String.fromCharCode(f);
        }
        try {
            c = decodeURIComponent(escape(c));
        } catch (l) {
            console.log(l);
        }
        return t(c)
    }

    function t(e) {
        return e;
    }

    const p = (cfemail: number) => {
        return n(cfemail, 0);
    };


    return p(cfemail);
};



