/**
 * Created by rodriguesc on 19/04/2017.
 */
import "../../declarations";
import {
  Chapter, FilteredResults, MangaFilter, MangaInfo, MangaSource, MangaXDoc,
  SiteParser
} from "../../declarations";
import {resolve} from "url";

import {config} from "./config";
import {uniq, takeWhile, last, slice} from "lodash";
import {sanitize} from "../../common/helper";


export class Parser implements SiteParser {


  mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[] {
    const rows = $("tr[id^='comic_rowo']");
    const location = $.location;

    let mangas: MangaSource[] = [];
    rows.each((i, e) => {
      // note this performance can be improved, is taking around 72ms to resolve 30 items, libxml could handle that
      // in 10ms, if we don't use the $() it can reach around those speeds, 72ms is not that much
      let td = $(e).prev();

      mangas[i] = {
        name: td.find("td > strong > a").text().slice(1), // contains a space at the beggining
        src: td.find("td > strong > a").attr("href"),
        status: td.find("td > strong > a > img").attr("src").indexOf("book_open") > 0 ? "Open" : "Closed",

        mature: td.find("td > img").eq(1).attr("alt") === "Mature",
      };
    });

    // console.log(mangas);
    return mangas;
  }

  latest($: MangaXDoc): Promise<Chapter[]> | Chapter[] {
    let chapters: Chapter[] = [];
    let $trs: CheerioElement[] = [];

    $("#content > div > div.category_block.block_wrap > table > tbody > tr").slice(1).each((i, el) => {
      $trs[i] = el;
    });


    for (let i = 0; i < $trs.length; ++i) {
      let header = $trs[i];
      let ha = last(sanitize(header.children)).children
          .find(x => x && x.attribs && x.attribs.href && x.attribs.href.startsWith("http"));

      // let mangaUrl = ha.attribs.href;
      let mangaName = ha.lastChild.nodeValue;
      let row = header.attribs.class.slice(0, 4);




      let tr: CheerioElement;
      while ((tr = $trs[++i]) && (tr.attribs && tr.attribs.class.startsWith(row))) {
        let tds = sanitize(tr.children).reverse(); // reversed


        let date = tds[0].lastChild.nodeValue.trim(); // date
        let sTd = tds[1].children.find(x => x.name === "a"); // scanlator
        let lTd = tds[2].children.find(x => x.name === "div"); // lang
        let cTd = tds[3].children.find(x => x.name === "a"); // chapter


        //
        // if(i>9){
        //   console.log($trs[i]);
        //   console.log(mangaName);
        //   console.log(mangaUrl);
        // }


        let cname = cTd.lastChild.nodeValue;
        let src = cTd.attribs.href;
        let lang = lTd.attribs.title;
        let scanlator = sTd.lastChild.nodeValue;


        chapters[i] = {
          name: mangaName, // Parser.extractChapterName(cname),
          chap_number : Parser.extractChapterNumber(cname),
          volume: Parser.extractVolumeNumber(cname),

          src: Parser.convertChapterReaderUrl(src),

          language: lang,
          scanlator: scanlator,

          dateAdded: date
        };
      }
      --i;
    }
    return chapters;
  }

  info($: MangaXDoc): Promise<MangaInfo> | MangaInfo {

    let $content = $("#content");
    let $ipsBox = $content.find("div.ipsBox");
    let $ipbTable = $ipsBox.find(".ipb_table");
    let $tr = $ipbTable.find("tr > td");


    let title = $("h1.ipsType_pagetitle").text().trim();
    let image = $ipsBox.find("img").attr("src");
    let synonyms = $tr.eq(1).children("span").map((i, e) => e.lastChild.nodeValue.slice(1)).get();
    let authors = $tr.eq(3).children("a").map((i, e) => e.lastChild.nodeValue).get();
    let artists = $tr.eq(5).children("a").map((i, e) => e.lastChild.nodeValue).get();
    let genres = $tr.eq(7).children("a").map((i, e) => e.lastChild.lastChild).filter((x, e) => !!e).map((i, e) => e.nodeValue.slice(1)).get();
    let synopsis = $tr.eq(13).text();
    let type = $tr.eq(9).text().trim(); // TODO curate this result, Manga (Japanese)
    let status = $tr.eq(11).text().trim();

    return {
      image,
      title,
      synonyms,
      authors,
      artists,
      genres,
      synopsis,
      status,
      type,
    };
  }

  chapters($: MangaXDoc): Promise<Chapter[]> | Chapter[] {
    let chapters: Chapter[] = [];


    $(".chapter_row")
      .each((i, e) => {
        let children = e.children.filter(x => x.type === "tag");

        let eTitle = children[0];
        let eLanguage = children[1];
        let eGroup = children[2];
        let eDate = children[4];


        // const fullTitle = eTitle.next.childNodes[1].lastChild.nodeValue.slice(1);

        const a = eTitle.childNodes.find(x => x.name === "a");
        const fullTitle = a.lastChild.nodeValue.slice(1);
        const src = Parser.convertChapterReaderUrl(a.attribs.href);

        const name = Parser.extractChapterName(fullTitle);
        const chap_number = Parser.extractChapterNumber(fullTitle);
        const volume = Parser.extractVolumeNumber(fullTitle);
        const language = eLanguage.lastChild.attribs.title;
        const scanlator = eGroup.childNodes.find(x => x.name === "a").lastChild.nodeValue;

        const dateAdded = eDate.lastChild.nodeValue;

        chapters[i] = {
          chap_number,
          volume,
          src,
          name,
          language,
          scanlator,
          dateAdded,
        };
      });

    return chapters;

  }

  imagesPaths($: MangaXDoc): string[] {
    let paths: string[] = [];
    $("#page_select").eq(1).children().each((i, e) => paths[i] = Parser.convertChapterReaderUrl(e.attribs["value"]));
    return paths;
  }

  static convertChapterReaderUrl(src: string) {
    if (src.startsWith(resolve(config.site, "/areader"))) {
      return src;
    }

    let idNumber = src.split("#")[1];
    let pg = 1;

    let pgMatch = /_\d+$/.exec(idNumber);

    if (pgMatch) {
      pg = +pgMatch[0].slice(1);

      idNumber = idNumber.replace(pgMatch[0], "");
    }

    return resolve(config.site, `/areader?id=${idNumber}&p=${pg}`);
  }

  image(html: string): string {
    let regex = /(?:id="comic_page".*)((http|https):\/\/img\.bato\.to\/comics\/[^"]*)/gm;

    let m = regex.exec(html); // get the first match

    if (!m) {
      throw new Error("Image not found");
    }
    return m[1];
  }


  filter($: MangaXDoc): Promise<FilteredResults> | FilteredResults {
    let results = this.mangas($);
    let next = $(".input_submit");


    let {location} = $;
    let matches = location.match(/\d+$/); // get page | &p=11
    let match = matches && +matches[0];

    return <FilteredResults>{
      results: results,
      page: match || 1,
      total: (next.length && 99999) || +match || 1
    };
  }
  static extractChapterNumber(text: string): number {
    let match = text.match(/Ch\.\d+(\.\d{1,3})?/);
    return match && match[0] && +match[0].slice(3);
  }
  static extractVolumeNumber(text: string): string {
    let match = text.match(/Vol\.\d+/);
    return match && match[0] && match[0].slice(4);
  }
  static extractChapterName(text: string): string {
    let index = text.indexOf(":");
    return (index > 0 && text.slice(index + 2)) || text;
  }
}

export const parser = new Parser();
export default parser;
