/**
 * Created by rodriguesc on 19/04/2017.
 */
import "../../declarations";
import {
  Chapter, FilteredResults, FilterSupport, MangaInfo, MangaSource, MangaXDoc,
  SiteParser
} from "../../declarations";
import {resolve} from "url";

import {config} from "./config";
import {uniq} from "lodash";


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

    let chapters : Chapter[] = [];
    let $trs: CheerioElement[] = [];

    $(".chapters_list > tbody > tr > td[colspan='5']").each((i, el) => $trs[i] = el.parent);

    $trs = $trs.slice(1,3);

    console.log($trs.length)


    for (let i = 0; i < $trs.length; ++i) {
      let $current = $trs[i];
      let next = i+1 < $trs.length  && $trs[i + 1];

      let manga_name = $current.childNodes[3].childNodes[3].lastChild.nodeValue;


      do{
        let children: CheerioElement[] = [];
        let $cnext = $($current).next().next();
        $cnext.next().children('td').each((i,e)=>children[i] = e);

        //$current == tr
        // $current = $current.next.next;

        //$current == td

        // let children = $current.children.filter(x => x.type === "tag");





        let eTitle = children[0];
        let eLanguage = children[1];
        let eGroup = children[2];
        let eDate = children[3];


        // const fullTitle = eTitle.next.childNodes[1].lastChild.nodeValue.slice(1);

        const a = eTitle.childNodes.find(x => x.name === "a");


        const fullTitle = a.lastChild.nodeValue.slice(1);
        // console.log(fullTitle)

        const src = Parser.convertChapterReaderUrl(a.attribs.href);

        const name = Parser.extractChapterName(fullTitle);
        const chap_number = Parser.extractChapterNumber(fullTitle);
        const volume = Parser.extractVolumeNumber(fullTitle);
        const language = eLanguage.lastChild.attribs.title;
        const scanlator = eGroup.childNodes.find(x => x.name === "a").lastChild.nodeValue;

        const dateAdded = eDate.lastChild.nodeValue.trim();

        chapters.push({
          manga_name,
          chap_number,
          volume,
          src,
          name,
          language,
          scanlator,
          dateAdded,
        });



        $current = $cnext;

        // console.log($current);
      }((next && $current !== next ) || ($current.attribs.class && $current.attribs.class.split(' ').length ===1));





      console.log(manga_name);
    }



    console.log(chapters);



    // $(".chapters_list > tbody > tr > td[colspan='5']").each((i,$td)=>{
    //   let manga_name = $td.childNodes.reverse().find(x=>x.name === "a").lastChild.nodeValue;
    //
    //   let chapters : Chapter[] = [];
    //
    //
    //   let tr = $td.parent;
    //
    //
    //
    //   do{
    //     tr = tr.next.next;
    //
    //     let children = tr.children.filter(x => x.type === "tag");
    //
    //     let eTitle = children[0];
    //     let eLanguage = children[1];
    //     let eGroup = children[2];
    //     let eDate = children[3];
    //
    //
    //     // const fullTitle = eTitle.next.childNodes[1].lastChild.nodeValue.slice(1);
    //
    //     const a = eTitle.childNodes.find(x => x.name === "a");
    //     if(a.lastChild.nodeValue == null)
    //       console.log(a)
    //     const fullTitle = a.lastChild.nodeValue.slice(1);
    //
    //     const src = Parser.convertChapterReaderUrl(a.attribs.href);
    //
    //     const name = Parser.extractChapterName(fullTitle);
    //     const chap_number = Parser.extractChapterNumber(fullTitle);
    //     const volume = Parser.extractVolumeNumber(fullTitle);
    //     const language = eLanguage.lastChild.attribs.title;
    //     const scanlator = eGroup.childNodes.find(x => x.name === "a").lastChild.nodeValue;
    //
    //     const dateAdded = eDate.lastChild.nodeValue.trim();
    //
    //     chapters.push({
    //       manga_name,
    //       chap_number,
    //       volume,
    //       src,
    //       name,
    //       language,
    //       scanlator,
    //       dateAdded,
    //     });
    //
    //
    //     if(tr && tr.next.next.attribs.class.split(' ').length === 1)
    //
    //     console.log(tr.next.next)
    //
    //   }while(tr && tr.next.next.attribs.class.split(' ').length === 1)
    //
    //








    // console.log(chapters );



    // });















    const xpath = "//table[@class='ipb_table chapters_list']/tbody/tr/td/a[starts-with(@href,'/reader')]";

    return doc.find(xpath)
      .map(x => {
        return <Chapter> {
          chap_number: Parser.extractChapterNumber(x.text()),
          volume: Parser.extractVolumeNumber(x.text()),
          src: resolve(config.site, x.attr("href").value()),
          name: Parser.extractChapterName(x.get("../../preceding-sibling::tr/td[@colspan = '5']").text().trim()),
          language :  x.get("../following-sibling::td[1]/div").attr("title").value().trim(),
          scanlator: x.get("../following-sibling::td[2]/a").text().trim(),
          dateAdded: x.get("../following-sibling::td[3]").text().trim(),
        };
      });
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
    let match = text.match(/Ch\.\d+/);
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
