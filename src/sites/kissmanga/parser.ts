/**
 * Created by rodriguesc on 24/03/2017.
 */
import "../../declarations";
import {Chapter, MangaInfo, MangaSource, MangaXDoc, SiteParser} from "../../declarations";
import {resolve} from "url";

import {config} from "./config";
import {Script, createContext} from "vm";

export class Parser implements SiteParser {

  private _vm: Script;

  mangas(doc: MangaXDoc): Promise<MangaSource[]> | MangaSource[] {
    const xpath = "//table[@class='listing']/tr/td[1]/a";
    return doc.find(xpath).map(x => {
      return {
        name: x.text().leftTrim(),
        src: resolve(config.site, x.attr("href").value())
      };
    });
  };

  latest(doc: MangaXDoc): Promise<Chapter[]> | Chapter[] {
    const xpath = "//dt/span/a[@class='chapter']";
   throw  new Error("not implemented");
    // return doc.find(xpath).map(x => Parser.parseChapter(x, "following-sibling::text()"));
  }

  info(doc: MangaXDoc): Promise<MangaInfo> | MangaInfo {
    let image = doc.get("///div[@class='rightBox'][1]/div[@class='barContent']/div[2]/img").attr("src").value();
    let title = doc.get("//div[2]/a[@class='bigChar']").text();
    let synonyms = doc.find("//div[@class='barContent']/div[2]/p[1]/a/text()").map(x => x.text());
    let authors = [doc.get("//div[2]/p[3]/a[1]").text()];
    let artists = [doc.get("//div[2]/p[3]/a[last()]").text()];
    let genres = doc.find("//div[2]/p[2]/a").map(x => x.text());
    let synopsis = doc.get("//div[@class='barContent']/div[2]/p[6]").text();
    let status = doc.get("//p[4]/span[@class='info'][1]/following-sibling::text()[1]").text().trim();
    let views = doc.get("//p[4]/span[@class='info'][1]/following-sibling::text()[2]").text().trim();

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

  chapters(doc: MangaXDoc): Promise<Chapter[]> | Chapter[] {
    const xpath = "//table/tr/td[1]/a";

    return doc.find(xpath).map(x => {
      return {
        number : x.text().trim().lastDigit(),
        name: x.text().trim(),
        src: resolve(config.site, x.attr("href").value()),
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
    let m = /\["([^\"]*)"]; chko[^\[]*\[(\d+)\]/gm.exec(html);
    return m[1].decodeEscapeSequence();
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
      , "chko = secret; key = CryptoJS.SHA256(chko);"
      , "for (var img in lstImages) imgs.push(wrapKA(lstImages[img]).toString());"
    ];

    return this._vm = new Script(scripts.join("\n"));
  }
}

export const parser = new Parser();
export default parser;
