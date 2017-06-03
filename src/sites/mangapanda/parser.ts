/**
 * Created by rodriguesc on 05/03/2017.
 */

import {resolve} from "url";
import config from "./config";
import {
  Chapter, FilteredResults, FilterStatus, MangaInfo, MangaSource, MangaXDoc,
  SiteParser
} from "../../declarations";
import * as url from "url";

import {uniqBy} from "lodash";
import {sanitize} from "../../common/helper";
import {findConfiguration} from "tslint/lib/configuration";


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
        status: el.parent.children.find(x=>x.name === "span" && x.attribs.class === "mangacompleted")
          ? FilterStatus.Complete.toString()
          : FilterStatus.Ongoing.toString(),
      };
    });
    return mangas;
    //
    // const xpath = "//ul[@class='series_alpha']/li/a";
    // return doc.find(xpath)
    //   .map(x => {
    //     return {
    //       name : x.text().leftTrim(),
    //       src :  resolve(config.site,  x.attr("href").value())
    //     };
    //   });
  }

  latest(doc: MangaXDoc): Chapter[] | Promise<Chapter[]> {
    const xpath = "//a[@class='chaptersrec']";
    return doc.find(xpath).map(x => {
      return {
        name: x.text(),
        src: resolve(config.site, x.attr("href").value())
      };
    });
  }

  info($: MangaXDoc): MangaInfo | Promise<MangaInfo> {
    // let image = doc.get("//div[@id='mangaimg']/img").attr("src").value();
    // let title = doc.get("//h2[@class='aname']").text();
    // let synonyms = doc.get("//div[@id='mangaproperties']/table/tr[2]/td[2]").text().split(", ");
    // let released = doc.get("//div[@id='mangaproperties']/table/tr[3]/td[2]").text();
    // let status = doc.get("//div[@id='mangaproperties']/table/tr[4]/td[2]").text();
    // let authors = [doc.get("//div[@id='mangaproperties']/table/tr[5]/td[2]").text()];
    // let artists = [doc.get("//div[@id='mangaproperties']/table/tr[6]/td[2]").text()];
    // let genres = doc.find("//span[@class='genretags']").map(x => x.text());
    // let synopsis = doc.get("//div[@id='readmangasum']/p").text();
    //
    // let direction = doc.get("//div[@id='mangaproperties']/table/tr[7]/td[2]").text();


    let selector = '#mangaproperties > table > tr > td';

    if($.location === "http://www.mangapanda.com/kapon-_") //Kapon is special -- bad parser
      selector = '#mangaproperties > h1 > table > tr > td';


    let $tds = $(selector);

    console.log($tds.length)


    let image = $("#mangaimg > img").attr("src");

    let title = Parser.resolveName($.location) || $("h2.aname").text();

    let synonyms = $tds.eq(3).text().split(", ");
    let released = $tds.eq(5).text();
    let status = $tds.eq(7).text();
    let authors = [$tds.eq(9).text()];
    let artists = [$tds.eq(11).text()];
    let direction = $tds.eq(13).text()


    let genres = $("span.genretags").map((x,el) => el.lastChild.nodeValue).get();
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
      direction
    };
  }

  chapters($: MangaXDoc): Chapter[] | Promise<Chapter[]> {
    let chapters: Chapter[] = [];

    $("#listing > tr ").slice(1).each((i, el) => {
      let tr = el;
      let children = sanitize(tr.children);
      let a = children[0].children.find(x=>x.name === "a");


      let date = children.reverse()[0].lastChild.nodeValue;

      let text = a.next.nodeValue.slice(3);

      chapters.push(Parser.parseChapter(a,text ,date));
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
    // const xpath = "//select[@id='pageMenu']/option/@value";
    // return doc.find(xpath)
    //   .map(x => resolve(config.site, (<any>x).value()));
  }

  image(html: string): string {
    const __img__ = /src="[^"]*" alt/gmi;

    return html.match(__img__)[0].slice(5, -5).replace(/.v=\d+/, "");
  }

  filter(doc: MangaXDoc): Promise<FilteredResults> | FilteredResults {
    const xpath = "//div[@class='manga_name']/div/h3/a";
    const authorXpath = "//div[@class='authorinfo']/div[1]/a";

    let mangas = doc.find(xpath).map(x => {
      return {
        name: x.text(),
        src: resolve(config.site, x.attr("href").value())
      };
    });

    mangas = mangas.concat(doc.find(authorXpath).map(x => {
      return {
        name: x.text(),
        src: resolve(config.site, x.attr("href").value())
      };
    }));

    mangas = uniqBy(mangas, "src");

    let page = 1;
    let query = url.parse(doc.location).query;
    if (query) {
      let m = query.toString().getMatches(/p=(\d+)/g, 1);
      if (m) {
        page = +m[0];
      }
    }

    let lastPageElement = doc.get("//div[@id='sp']/a[last()]");
    let lastPage = 0;

    if (lastPageElement) {
      let m = lastPageElement.attr("href").value().getMatches(/p=(\d+)/g, 1);
      if (m) {
        lastPage = +m[0];
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
