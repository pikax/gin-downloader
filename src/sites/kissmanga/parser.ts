/**
 * Created by rodriguesc on 24/03/2017.
 */
import {resolve} from "url";
import * as _ from "lodash";

import {config, debug} from "./config";
import {Script, createContext} from "vm";


import {FilteredResults} from "src/filter";
import {gin, Info, Synonym} from "src/interface";
import {sanitize} from "src/util";
import ChapterSource = gin.ChapterSource;
import MangaSource = gin.MangaSource;
import MangaXDoc = gin.MangaXDoc;
import SiteParser = gin.SiteParser;
import {Type} from "src/enum";

export class Parser implements SiteParser {
  get secretAlgorithm(): string {
    return this._secretAlgorithm;
  }

  private _secretAlgorithm: string;
  private _vm: Script;

  private static fixNames: { [id: string]: string; } = {
    "http://kissmanga.com/Manga/Desire-KOTANI-Kenichi": "Desire KOTANI Kenichi",
    "http://kissmanga.com/Manga/Tokyo-Toy-Box-o": "Tokyo Toy Box o",
    "http://kissmanga.com/Manga/Valkyrie%20Profile": "Valkyrie%20Profile", // there are two mangas with the same name.
  };


  private static resolveName = (src: string) => Parser.fixNames[src];

  mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[] {
    let mangas: MangaSource[] = [];

    $("table.listing > tbody > tr").slice(2).each((i, el) => {
      let tds = sanitize(el.children);

      let ma = tds[0].children.find(x => x.name === "a");
      let mangaUrl = ma.attribs.href;

      let mangaName = ma.children.map(x => x.nodeValue).join("").leftTrim();

      let completed = tds[1].lastChild.nodeValue === "Completed";

      let src = resolve($.location || config.latest_url, mangaUrl);

      mangas[i] = {
        name: Parser.resolveName(src) || mangaName,
        src: src,
        status: completed ? "Closed" : "Open",
      };
    });

    return mangas;
  }

  latest($: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[] {

    let chapters: ChapterSource[] = [];

    $("table.listing > tbody  > tr").slice(2).each((i, el) => {
      let tds = sanitize(el.children);

      let ma = tds[0].children.find(x => x.name === "a");
      // let mangaUrl = ma.attribs.href;
      let mangaName = ma.children.map(x => x.nodeValue).join("").leftTrim();


      let chapter: string | number = "completed";
      let vol = undefined;
      let ca = tds[1].children.find(x => x.name === "a");
      let src: string = ma.attribs.href;
      if (ca) {
        src = ca.attribs.href;
        // let aname = ca.lastChild.nodeValue;

        vol = _.last(src.match(/(?:vol-)(\d+)/i));

        const chapRegexes = [
          /(?:(?:ch|chapter|ep)-)(\d+(-\d{1,3})?)/i,
          /(\d+(-\d{1,3})?)(?:\?)/,

          /(?:\/)(\d+(-\d{1,3})?)/
        ];

        chapter = _.reduce(chapRegexes, (result, value) => {
          return result || _.head(_.slice(src.match(value), 1, 2));
        }, null);

        // TODO resolve chapter number or type
        if (!chapter) {
          chapter = -7;
          console.warn("couldn't resolve the chapter for '%s', please refer to %s", src, "https://github.com/pikax/gin-downloader/issues/7");
        }
      }

      if (chapter === "completed") {
        console.warn("couldn't resolve the chapter for '%s', probably is completed", mangaName);
      }

      chapters[i] = {
        name: mangaName,
        chap_number: chapter.toString(),
        src: resolve(config.latest_url, src).toString(),
        volume: vol,

        language: "English",

      };
    });
    return chapters;
  }

  info($: MangaXDoc): Promise<Info> | Info {
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
      synonyms: synonyms.map(x => ({title: x, language: "English"})),
      authors,
      artists,
      genres,
      synopsis,
      status,
      views,

      type: Type.Manga
    };
  }

  chapters($: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[] {
    let mangas: ChapterSource[] = [];
    let rows = new Map<any, CheerioElement[]>();

    $("table.listing > tbody > tr > td").each((i, el) => {
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
        chap_number: Parser.ResolveChapterNumber(title),
        volume: Parser.ResolveChapterVolume(title),

        src: src,
        dateAdded: dateAdded,
      });
    });


    return mangas;
  }


  imagesList(html: string, secret: string, vm: Script): string[] {
    let lstImages = html.getMatches(/wrapKA\("([^"]*)"/gm, 1);

    const sandbox = {
      lstImages,
      imgs: Array<string>(),
      secret: secret,
      alert: console.log
    };
    let context = createContext(sandbox);
    vm.runInContext(context);

    return sandbox.imgs.map(x => /url=([^&]*)/.exec(x)[1]).map(decodeURIComponent);
  }

  getSecret(html: string): string {
    let matches = [];
    let m;
    let regex = /(var (_[\da-z]*) = \["([^"]*)"]; chko =([^\[]*\[\d+][^;]*); [^)]*\))/gm;
    while (m = regex.exec(html)) {
      matches.push(m[1]);
    }
    return matches.join(";");
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

  buildVM(cajs: string, lojs: string, algorithm: string) {
    let scripts = [cajs
      , lojs
      , algorithm
      , "for (var img in lstImages) {" +
      "imgs.push(wrapKA(lstImages[img]).toString())" +
      "};"
    ];

    debug("building vm with: %o", algorithm);
    this._secretAlgorithm = algorithm;

    return this._vm = new Script(scripts.join("\n"));
  }


  filter(doc: MangaXDoc): Promise<FilteredResults> | FilteredResults {
    return <FilteredResults>{
      results: this.mangas(doc),
      page: 1,
      total: 1
    };
  }


  static ResolveChapterVolume(title: string): string {
    if (title.indexOf("_vol") < 0) {
      return;
    }

    let frags = title.split(": ", 1);
    let chapfrags = frags[0].split("ch.");
    return chapfrags[0].trim().lastDigit().toString();
  }

  static ResolveChapterNumber(title: string): string {
    let frags = title.split(": ", 1);
    return frags[0].lastDigit().toString();
  }

  static ResolveChapterName(title: string): string {
    let frags = title.split(": ");
    return frags[frags.length - 1];
  }

}

export const parser = new Parser();
export default parser;
