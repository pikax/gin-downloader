import {resolve} from "url";
import * as url from "url";


import {config, error} from "./config";
import {FilterStatus, Type} from "../../enum";



import {FilteredResults, MangaSource} from "../../filter";
import {MangaXDoc} from "../interface";



export class Parser  {
    mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[] {
        let mangas: MangaSource[] = [];
        $(".manga_info").each((i, el) => {
            mangas[i] = {
                name: el.lastChild.nodeValue,
                src: el.attribs["href"],
            };
        });
        return mangas;
    }


    latest($: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[] {
        let chapters: ChapterSource[] = [];
        $(".manga_updates > dl").each((i, el) => {
            let divChildren = sanitize(el.children);


            let aManga = divChildren[0].children.find(x => x.name === "a");
            // console.log(aManga)
            // let mangaUrl = aManga.attribs.href;
            let mangaName = aManga.lastChild.nodeValue;

            let date = divChildren[0].children.find(x => x.name === "span").lastChild.nodeValue;

            let dts = sanitize(divChildren.slice(1));


            for (let dt of dts) {
                let a = dt.children.find(x => x.name === "a");

                let src = a.attribs.href;
                let title = a.lastChild.nodeValue;

                let chapNumber = title.lastDigit();


                chapters.push({
                    name: mangaName,
                    src: src,
                    chap_number: chapNumber.toString(),
                    dateAdded: date
                });
            }

        });

        return chapters;
    }

    info($: MangaXDoc): Promise<Info> | Info {

        let image = $("img.img").attr("src");
        let title = $("div.title > h3").text().slice(5, -7);


        let li: CheerioElement[] = [];
        $(".detail_topText > li").each((i, el) => {
            li[i] = el;
        });

        //todo fix synonyms
        let synonyms: Synonym[] = li[2].lastChild.nodeValue.split("; ").map(title=>({
            title:title,
            language: 'en'
        }));
        let genres = li[3].lastChild.nodeValue.split(", ");


        let authors = li[4].children.filter(x => x.name === "a").map(x => x.lastChild.nodeValue);
        let artists = li[5].children.filter(x => x.name === "a").map(x => x.lastChild.nodeValue);

        let status = li[6].children[0].next.nodeValue.trim() === "Ongoing"
            ? FilterStatus.Ongoing
            : FilterStatus.Complete;

        let synopsis = li.reverse()[0].children.reverse().find(x => x.name == "p").children[0].nodeValue;

        let licensed = false;

        if ($("#main > article > div > div.manga_detail > div.detail_list > div > strong").length > 0) {
            licensed = true;
        }


        return {
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
    }


    chapters($: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[] {
        let chapters: ChapterSource[] = [];
        let licensed = false;

        if ($("#main > article > div > div.manga_detail > div.detail_list > div > strong").length > 0) {
            licensed = true;
        }

        $("span.left > a").each((i, el) => {
            let span = el.parent;
            let li = span.parent;

            let date = sanitize(li.children).reverse()[0].lastChild.nodeValue;
            let a = el;

            chapters.push({... Parser.parseChapter(a, span, date), licensed});

        });

        return chapters;
    }

    private static parseChapter(a: CheerioElement, span: CheerioElement, date: string): ChapterSource {
        let aText = a.lastChild.nodeValue.trim();
        let name = (span && span.lastChild.nodeValue) || aText;
        let href = a.attribs.href;

        return {
            chap_number: aText.lastDigit().toString(),
            name,
            src: resolve(config.site, href),
            dateAdded: date
        };
    }

    imagesPaths($: MangaXDoc): string[] {

        let paths: string[] = [];

        let licensed = $("body > section > div.mangaread_error > div.mt10.color_ff00.mb10.center").text();
        if (licensed && licensed.indexOf("It's not available in MangaHere.") >= 0) {
            // throw new LicencedError(licensed);
            throw new Error("Not licenced");//TODO change to a better error
        }

        $("body > section.readpage_top > div.go_page.clearfix > span > select > option").each((i, el) => {
            paths[i] = resolve($.location, `${el.attribs.value}`);
        });

        return paths;
    }

    image(html: string): string {
        const __imgID__ = /src=".*\?token[^"]*".*id=/gmi;
        const __img__ = /src=".*\?token[^"]*/gmi;

        let m = html.match(__imgID__);
        if (!m || m.length === 0) {
            error("first image regex failed using\nhtml:%s", html);
            throw new Error("Image not found");
        }
        m = m[0].match(__img__);
        if (!m || m.length === 0) {
            error("second image regex failed using\nhtml:%s", html);
            throw new Error("Image not found");
        }

        return m[0].slice(5);
    }


    filter($: MangaXDoc): Promise<FilteredResults> | FilteredResults {
        let mangas: MangaSource[] = [];

        $("a.manga_info").each((i, el) => {
            mangas[i] = {
                name: el.lastChild.nodeValue,
                src: el.attribs.href
            };
        });


        let page = 1;
        let query = url.parse($.location).query;
        if (query) {
            let m = query.toString().match(/page=(\d+)/g);
            if (m) {
                page = +m[1];
            }
        }

        let lastPageElement = $("div.next-page > a").slice(-2, -1);
        let lastPage = 1;

        if (lastPageElement && lastPageElement[0]) {
            lastPage = +lastPageElement.text();
        }

        return <FilteredResults>{
            results: mangas,
            page: page,
            total: lastPage
        };
    }

}





export const parser = new Parser();
export default parser;
