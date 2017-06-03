/**
 * Created by rodriguesc on 24/03/2017.
 */
import {
  Chapter, FilteredResults, FilterStatus, MangaInfo, MangaSource, MangaXDoc,
  SiteParser
} from "../../declarations";

import {resolve} from "url";
import * as url from "url";

import {config} from "./config";
import {sanitize} from "../../common/helper";


export class Parser implements SiteParser {
  mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[] {

    let mangas: MangaSource[] = [];
    $(".series_preview").each((i, el) => {
      mangas[i] = {
        name: (<any>el.children[0]).data,
        src: el.attribs["href"],

        status: el.attribs.class.indexOf("manga_open") >= 0
            ? FilterStatus.Ongoing.toString()
             : FilterStatus.Complete.toString()

      };
    });

    return mangas;
  }

  latest($: MangaXDoc): Promise<Chapter[]> | Chapter[] {

    let chapters: Chapter[] = [];
    $("#updates > li > div").each((i, el) => {
      let divChildren = sanitize(el.children);


      let aManga = sanitize(divChildren[0].children)[0];
      // let mangaUrl = aManga.attribs.href;
      let mangaName = aManga.lastChild.nodeValue;

      let dts = sanitize(divChildren[1].children);


      for (let dt of dts) {
        let children = sanitize(dt.children);
        let date = children[0].lastChild.nodeValue;

        let a = children[1].children.find(x => x.name === "a");

        let src = a.attribs.href;
        let title = a.lastChild.nodeValue;
        let volume = a.next.type === "text" && a.next.nodeValue.trim().slice(1);

        let chapNumber = title.lastDigit();

        chapters.push({
          name: mangaName,
          src: src,
          volume,
          chap_number: chapNumber,
          dateAdded: date
        });
      }

    });

    return chapters;

  }

  info($: MangaXDoc): Promise<MangaInfo> | MangaInfo {
    let imgElem = $("div .cover img");
    let titleElem = $("#title");
    let seriesInfo = $("#series_info");

    let image = imgElem.attr("src");
    let title = imgElem.attr("alt");

    let synonyms = titleElem.find("h3").text().split("; ");


    let released = titleElem.find("table tr td a").first().text();
    let authors = [titleElem.find("table tr td a").eq(1).text()];
    let artists = [titleElem.find("table tr td a").eq(2).text()];
    let genres = titleElem.find("table tr td a").slice(3).map((i, el) => el.children[0].nodeValue).get();

    let sSstatus = seriesInfo.find("div .data span").eq(0).html().trim();
    let status = sSstatus.slice(0, sSstatus.indexOf(","));
    let ranked = seriesInfo.find("div .data span").eq(2).text();
    let rating = seriesInfo.find("div .data span").eq(3).text();
    let scanlators = seriesInfo.find("div.data span a").slice(1).map((i, el) => el.children[0].nodeValue).get();

    let synopsis = titleElem.find("p").text();

    return {
      image,
      title,
      synonyms,
      released,
      authors,
      artists,
      genres,
      synopsis,
      status,
      ranked,
      rating,
      scanlators
    };
  }

  chapters($: MangaXDoc): Promise<Chapter[]> | Chapter[] {
    let chapters: Chapter[] = [];

    $(".chlist > li > div").each((i, el) => {

      // console.log(el.children)

      let children = sanitize(el.children);

      let date = children[0].lastChild.nodeValue;
      let h3Children = sanitize(children[children.length - 1].children);

      let a = h3Children[0];
      let span = h3Children.length > 1 && h3Children[1];


      // let title = $(el).parent().parent().parent().prev('div').text();


      // let title = sanitize(el.parent.parent.prev.children).name;

      let volume;
      let slide = el.parent.parent.prev;
      if (slide) {
        volume = sanitize(slide.children)[1].children[0].nodeValue;
      }

      chapters.push(Parser.parseChapter(a, span, volume, date));

    });

    return chapters;
  }


  private static parseChapter(a: CheerioElement, span: CheerioElement, volume: string, date: string): Chapter {
    let aText = a.lastChild.nodeValue;
    let name = (span || a).lastChild.nodeValue;

    let href = a.attribs.href;

    return {
      chap_number : aText.lastDigit(),
      name,
      src: resolve(config.site, href),
      volume,
      dateAdded: date
    };
  }

  imagesPaths($: MangaXDoc): string[] {

    let paths: string[] = [];

    $("#top_bar > div > div > select > option").slice(0, -1).each((i, el) => {
        paths[i] = resolve($.location, `${el.attribs.value}.html`);
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
    let lastPageElement = $("#nav > ul > li > a").slice(-2, -1);

    let mangas: MangaSource[] = [];
    $(".manga_text").each((i, el) => {

      let children = sanitize(el.children);

      let a = children.find(x => x.name === "a");
      let info = children.find(x => x.name === "p" && x.attribs && !!x.attribs.title);

      let parentA = sanitize(el.parent.children)[0];
      let completed = sanitize(parentA.children).find(x => x.name === "em" && x.attribs && x.attribs.class === "tag_completed");


      mangas[i] = {
        name : a.lastChild.nodeValue,
        src : a.attribs.href,

        mature : info.attribs.title.indexOf("Mature") >= 0,
        status : completed ? FilterStatus.Complete.toString() : FilterStatus.Ongoing.toString(),
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

    let lastPage = 1;

    if (lastPageElement) {
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
