/**
 * Created by rodriguesc on 03/03/2017.
 */

import {
  Chapter, FilteredResults, FilterStatus, MangaInfo, MangaSource, MangaXDoc,
  SiteParser
} from "../../declarations";

import "../../declarations";

import {resolve} from "url";
import * as url from "url";

import {config} from "./config";
import {sanitize} from "../../common/helper";



export class Parser implements SiteParser {
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

  latest(doc: MangaXDoc): Promise<Chapter[]> | Chapter[] {
    const xpath = "//div[@class='manga_updates']/dl/dd/a";
    return doc.find(xpath).map(x => {
      return {
        name: x.text(),
        src: x.attr("href").value(),
      };
    });
  }

  info($: MangaXDoc): Promise<MangaInfo> | MangaInfo {

    let image =  $("img.img").attr("src");
    let title = $("div.title > h3").text().slice(5,-7);


    let li: CheerioElement[] = [];
    $(".detail_topText > li").each((i,el)=>{
      li[i] = el;
    });

    let synonyms = li[2].lastChild.nodeValue.split("; ");
    let genres = li[3].lastChild.nodeValue.split(", ");


    let authors = li[4].children.filter(x=>x.name==="a").map(x=>x.lastChild.nodeValue);
    let artists = li[5].children.filter(x=>x.name==="a").map(x=>x.lastChild.nodeValue);



    let status = li[6].children[0].next.nodeValue.trim() === "Ongoing"
      ? FilterStatus.Ongoing.toString()
      : FilterStatus.Complete.toString();





    // 4545  let ranked = seriesInfo.find("div .data span").eq(2).text();
    // let rating = seriesInfo.find("div .data span").eq(3).text();
    // let scanlators = seriesInfo.find("div.data span a").slice(1).map((i, el) => el.children[0].nodeValue).get();;

    let synopsis = li.reverse()[0].children.reverse().find(x=>x.name == "p").children[0].nodeValue;



    //
    // let image = doc.get("//img[@class='img']").attr("src").value();
    // let title = doc.get("//div[@class='title']/h3").text().slice(5, -7);
    // let synonyms = doc.get("//ul[@class='detail_topText']/li[3]/text()").text().split("; ");
    // let authors = [doc.get("//ul[@class='detail_topText']/li[5]/a[@class='color_0077']").text()];
    // let artists = [doc.get("//ul[@class='detail_topText']/li[6]/a[@class='color_0077']").text()];
    // let genres = doc.get("//ul[@class='detail_topText']/li[4]/text()").text().split(", ");
    // let synopsis = doc.get("//ul[@class='detail_topText']/li/p[last()]/text()").text();
    // let status = doc.get("//ul[@class='detail_topText']/li[7]/text()[1]").text().trim();
    // let ranked = doc.get("//ul[@class='detail_topText']/li[8]/text()[1]").text();
    // let rating = doc.get("//ul[@class='detail_topText']/li[@id='rate']/span[@id='current_rating']").text();
    // let similarmanga = doc.find("//div[@class='box_radius mb10'][2]/ul[@class='right_aside']/li/a").map(x => x.attr("title").value());


    return {
      image,
      title,
      synonyms,
      authors,
      artists,
      genres,
      synopsis,
      status,
    };
  }

  chapters($: MangaXDoc): Promise<Chapter[]> | Chapter[] {
    let chapters: Chapter[] = [];

    $("span.left > a").each((i, el) => {
      let span = el.parent;
      let li = span.parent;

      let date = sanitize(li.children).reverse()[0].lastChild.nodeValue;
      let a = el;



      chapters.push(Parser.parseChapter(a, span, date));

    });

    return chapters;
  }

  private static parseChapter(a: CheerioElement, span: CheerioElement, date: string) : Chapter {
    let aText = a.lastChild.nodeValue.trim();
    let name = (span && span.lastChild.nodeValue) || aText;
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
      throw new Error("Image not found");
    }
    m = m[0].match(__img__);
    if (!m || m.length === 0) {
      throw new Error("Image not found");
    }

    return m[0].slice(5);
  }


  filter($: MangaXDoc): Promise<FilteredResults> | FilteredResults {
    // const xpath = "//a[@class='manga_info name_one']";
    //
    // let mangas = doc.find(xpath).map(x => {
    //   return {
    //     name: x.text(),
    //     src: x.attr("href").value()
    //   };
    // });

    let mangas: MangaSource[] = [];

    $("a.manga_info").each((i, el) => {
      mangas[i] =    {
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

    let lastPageElement = $("div.next-page > a").slice(-2,-1);
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
