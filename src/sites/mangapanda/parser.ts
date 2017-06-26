/**
 * Created by rodriguesc on 05/03/2017.
 */

import {resolve} from "url";
import config, {error} from "./config";
import {
  Chapter, FilteredResults, FilterStatus, MangaInfo, MangaSource, MangaXDoc,
  SiteParser,
  LicencedError,
} from "../../declarations";
import * as url from "url";

import {uniqBy} from "lodash";
import {sanitize} from "../../common/helper";


export class Parser implements SiteParser {
  private static fixNames: { [id: string]: string; } = {
    "/kapon-_": "Kapon (>_<)!",
    "http://www.mangapanda.com/kapon-_": "Kapon (>_<)!",
  };


  private static resolveName = (src: string) => Parser.fixNames[src];
  mangas($: MangaXDoc): MangaSource[] | Promise<MangaSource[]> {
    let mangas: MangaSource[] = [];
    $("ul.series_alpha > li > a").each((i, el) => {
      mangas[i] = {
        name: Parser.resolveName(el.attribs.href) || el.lastChild.nodeValue.leftTrim(),
        src:  resolve(config.site, el.attribs.href),
        status: el.parent.children.find(x => x.name === "span" && x.attribs.class === "mangacompleted")
          ? FilterStatus.Complete.toString()
          : FilterStatus.Ongoing.toString(),
      };
    });
    return mangas;
  }

  latest($: MangaXDoc): Chapter[] | Promise<Chapter[]> {
    let chapters: Chapter[] = [];
    $("tr.c2").each((i, el) => {
      let divChildren = sanitize(el.children);


      let aManga = divChildren[1].children.find(x => x.name === "a");
      // console.log(aManga)
      // let mangaUrl = aManga.attribs.href;
      let mangaName = aManga.children.find(x => x.name === "strong").lastChild.nodeValue;

      let date = divChildren[2].lastChild.nodeValue;


      let dts = sanitize(divChildren[1].children.slice(1).filter(x => x.name === "a" && x.attribs.class == "chaptersrec"));


      for (let a of dts) {
        // let a = dt.children.find(x => x.name === "a");

        let src = resolve($.location , a.attribs.href);
        let title = a.lastChild.nodeValue;


        let chapNumber = title.lastDigit();

        chapters.push({
          name: Parser.resolveName(src) || title,
          src: src,
          chap_number: chapNumber,
          dateAdded: date
        });
      }
    });

    return chapters;
  }

  info($: MangaXDoc): MangaInfo | Promise<MangaInfo> {
    let selector = "#mangaproperties > table > tbody > tr > td";

    let $tds = $(selector);

    let image = $("#mangaimg > img").attr("src");

    let title = Parser.resolveName($.location) || $("h2.aname").text();

    let synonyms = $tds.eq(3).text().split(", ");
    let released = $tds.eq(5).text();
    let status = $tds.eq(7).text();
    let authors = [$tds.eq(9).text()];
    let artists = [$tds.eq(11).text()];
    let direction = $tds.eq(13).text();



    let genres = $("span.genretags").map((x, el) => el.lastChild.nodeValue).get();
    let synopsis = $("#readmangasum > p").text();

    return {
      image,
      title,
      synonyms,
      released,
      status,
      authors,
      artists,
      genres,
      synopsis,
      direction,

    };
  }

  chapters($: MangaXDoc): Chapter[] | Promise<Chapter[]> {
    let chapters: Chapter[] = [];

    $("#listing > tbody > tr ").slice(1).each((i, el) => {
      let tr = el;
      let children = sanitize(tr.children);
      let a = children[0].children.find(x => x.name === "a");


      let date = children.reverse()[0].lastChild.nodeValue;

      let text = a.next.nodeValue.slice(3);

      chapters.push(Parser.parseChapter(a, text , date));
    });

    return chapters;
  }

  private static parseChapter(a: CheerioElement, text: string, date: string) : Chapter {
    let aText = a.lastChild.nodeValue.trim();
    let name = text || aText;
    let href = a.attribs.href;

    return {
      chap_number : aText.lastDigit(),
      name,
      src: resolve(config.site, href),
      dateAdded: date
    };
  }

  imagesPaths($: MangaXDoc): string[] {

    let paths: string[] = [];



    $("#pageMenu > option").each((i, el) => {
      paths[i] = resolve($.location, `${el.attribs.value}`);
    });

    return paths;
  }

  image(html: string): string {
    const __img__ = /src="[^"]*" alt/gmi;

    let m = html.match(__img__);
    if (!m || m.length === 0) {
      error("second image regex failed using\nhtml:%s", html);

      throw new Error("Image not found");
    }

    return m[0].slice(5, -5).replace(/.v=\d+/, "");
  }

  filter($: MangaXDoc): Promise<FilteredResults> | FilteredResults {
    let mangas: MangaSource[] = [];

    // mangas
    $(".manga_name > div > h3 > a").each((i, el) => {
      mangas[i] = {
        name: el.lastChild.nodeValue,
        src: resolve(config.site, el.attribs.href)
      };
    });

    // author
    $(".authorinfo > div > a").each((i, el) => {

      mangas.push({
        name: el.lastChild.nodeValue,
        src: resolve(config.site, el.attribs.href)
      });
    });


    mangas = uniqBy(mangas, "src");

    let page = 1;
    let query = url.parse($.location).query;
    if (query) {
      let m = query.toString().getMatches(/p=(\d+)/g, 1);
      if (m) {
        page = +m[0] / 30;
      }
    }


    let lastPage = 0;

    let selectedPageElement = $("#sp > strong").slice(-1);
    let lastPageElement = $("#sp > a").slice(-1);


    if (lastPageElement) {
      let href = lastPageElement.attr("href");
      if (href) {
        let m = href.match(/p=(\d+)/);
        if (m) {
          lastPage = (+m[1]) / 30;
        }
      }
    }
    if (selectedPageElement) {
      let selPage = (+selectedPageElement.text()) - 1;
      if (selPage > lastPage) {
        lastPage = selPage;
      }
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
