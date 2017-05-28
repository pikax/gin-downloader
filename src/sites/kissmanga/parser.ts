/**
 * Created by rodriguesc on 24/03/2017.
 */
import "../../declarations";
import {
  Chapter, FilteredResults, FilterSupport, MangaInfo, MangaSource, MangaXDoc,
  SiteParser
} from "../../declarations";
import {resolve} from "url";

import {config} from "./config";
import {Script, createContext} from "vm";
import {unescape} from "querystring";

export class Parser implements SiteParser {

  private _vm: Script;

  private static fixNames: { [id: string]: string; } = {
  "http://kissmanga.com/Manga/Desire-KOTANI-Kenichi": "Desire KOTANI Kenichi",
  "http://kissmanga.com/Manga/Tokyo-Toy-Box-o": "Tokyo Toy Box o",
  "http://kissmanga.com/Manga/Valkyrie%20Profile": "Valkyrie%20Profile",
};


  private static resolveName = (src: string) => Parser.fixNames[src];

  mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[] {
    let mangas: MangaSource[] = [];
    let rows = new Map<any, CheerioElement[]>();

    $("table.listing > tr > td").each((i, el) => {
        let array = rows.get(el.parentNode) || [];
        array.push(el);
        rows.set(el.parentNode, array);
    });

    rows.forEach((children) => {
      let titleTd = children[0];
      let lastChapter = children[1].lastChild.nodeValue.trim();

      let a = titleTd.children[1];

      let title = a.lastChild.nodeValue.leftTrim();
      let src = resolve(config.mangas_url, a.attribs.href);

      mangas.push({
        name: Parser.resolveName(src) || title,
        src: src,
        status: lastChapter === "complete" ? "Closed" : "Open",
      });
    });
    return mangas;
  }

  latest(doc: MangaXDoc): Promise<Chapter[]> | Chapter[] {
    const xpath = "//table[@class='listing']/tr/td[2]/a";

    return doc.find(xpath)
      .map(x => {
        return <Chapter> {
          chap_number: x.text(),
          src: resolve(config.site, x.attr("href").value()),
          name: x.get("../preceding-sibling::td/a").text().trim(),
        };
      });


    // return doc.find(xpath).map(x => Parser.parseChapter(x, "following-sibling::text()"));
  }

  info($: MangaXDoc): Promise<MangaInfo> | MangaInfo {
    let $main = $("#leftside > div > div.barContent > div").eq(1);
    let img = $("#rightside > div > div.barContent > div > img").eq(0);
    let a = $main.children("a");
    let rows = $main.children("p");



    let image = img.attr("src");
    let title = a.text();
    let synonyms = rows.eq(0).children("a").map((x, el) => el.lastChild.nodeValue).get();
    let genres = rows.eq(1).children("a").map((x, el) => el.lastChild.nodeValue).get();
    let authors = rows.eq(2).children("a").map((x, el) => el.lastChild.nodeValue).get();
    let artists = authors;
    if (authors.length > 1) {
      authors = authors.slice(0, -1);
      artists = artists.slice(-1);
    }
    let status = rows.eq(3).children("span").eq(0).map((i, el) => el.next).text().trim();
    let views = rows.eq(3).children("span").eq(1).map((i, el) => el.next).text().trim();
    let synopsis = rows.eq(5).text();

    return {
      image,
      title,
      synonyms,
      authors,
      artists,
      genres,
      synopsis,
      status,
      views,
    };
  }

  chapters($: MangaXDoc): Promise<Chapter[]> | Chapter[] {
    let mangas: Chapter[] = [];
    let rows = new Map<any, CheerioElement[]>();

    $("table.listing > tr > td").each((i, el) => {
      let array = rows.get(el.parentNode) || [];
      array.push(el);
      rows.set(el.parentNode, array);
    });

    rows.forEach((children) => {
      let titleTd = children[0];

      let dateAdded = children[1].lastChild.nodeValue.trim();

      let a = titleTd.children[1];

      let title = a.lastChild.nodeValue.leftTrim();
      let src = resolve(config.mangas_url, a.attribs.href);
      //
      // console.log(title);
      // console.log(src);
      // console.log(dateAdded);

      mangas.push({
        name: Parser.ResolveChapterName(title),
        chap_number : Parser.ResolveChapterNumber(title),
        volume: Parser.ResolveChapterVolume(title),

        src: src,
        dateAdded: dateAdded,
      });
    });


    console.log(mangas);

    return mangas;


    const xpath = "//table/tr/td[1]/a";

    return doc.find(xpath)
      .map(x => {
        return {
          chap_number : x.text().trim().lastDigit(),
          name: x.text().leftTrim(),
          src: resolve(config.site, x.attr("href").value())
        };
      })
      .map(x => {
        return {
          chap_number: x.chap_number,
          name: Parser.resolveName(x.src) || x.name,
          src : x.src
        };
      });
  }


  imagesList(html: string, secret: string, vm: Script): string[] {
    let lstImages = html.getMatches(/wrapKA\("([^"]*)"/gm, 1);

    const sandbox = {
      lstImages,
      imgs : Array<string>(),
      secret : secret,
      alert : console.log
    };
    let context = createContext(sandbox);
    vm.runInContext(context);

    return sandbox.imgs.map(x => /url=([^&]*)/.exec(x)[1]).map(decodeURIComponent);
  }

  getSecret(html: string): string {
    let m = /\["([^"]*)"]; chko[^\[]*\[(\d+)]/gm.exec(html);
    if (m) {
      return m[1].decodeEscapeSequence();
    }
    return null;
  }

  imagesPaths(doc: MangaXDoc): string[] {
    throw new Error("no needed");
  }

  image(html: string): string {
    throw new Error("no needed");
  }

  get VM(): Script {
    return this._vm;
  }

  buildVM(cajs: string, lojs: string) {
    let scripts = [cajs
      , lojs
      , "chko = secret || chko; key = CryptoJS.SHA256(chko);"
      , "for (var img in lstImages) imgs.push(wrapKA(lstImages[img]).toString());"
    ];

    return this._vm = new Script(scripts.join("\n"));
  }


  filter(doc: MangaXDoc): Promise<FilteredResults> | FilteredResults {
    return <FilteredResults>{
      results: this.mangas(doc),
      page: 1,
      total: 1
    };
  }



  static ResolveChapterVolume(title: string): number {
    if (title.indexOf("_vol") < 0)
      return;

    let frags = title.split(": ", 1);
    let chapfrags = frags[0].split("ch.");
    return chapfrags[0].trim().lastDigit();
  }

  static ResolveChapterNumber(title: string): number {
    let frags = title.split(": ", 1);
    return frags[0].lastDigit();
  }

  static ResolveChapterName(title: string): string {
    let frags = title.split(": ");
    return frags[frags.length - 1];
  }

}

export const parser = new Parser();
export default parser;
