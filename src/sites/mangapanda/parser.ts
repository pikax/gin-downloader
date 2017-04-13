/**
 * Created by rodriguesc on 05/03/2017.
 */

import {resolve} from "url";
import config from "./config";
import {Chapter, MangaInfo, MangaSource, MangaXDoc, SiteParser} from "../../declarations";


export class Parser implements SiteParser {
  mangas(doc: MangaXDoc): MangaSource[] | Promise<MangaSource[]> {
    const xpath = "//ul[@class='series_alpha']/li/a";
    return doc.find(xpath)
      .map(x => {
        return {
          name : x.text().leftTrim(),
          src :  resolve(config.site,  x.attr("href").value())
        };
      });
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

  info(doc: MangaXDoc): MangaInfo | Promise<MangaInfo> {
    let image = doc.get("//div[@id='mangaimg']/img").attr("src").value();
    let title = doc.get("//h2[@class='aname']").text();
    let synonyms = doc.get("//div[@id='mangaproperties']/table/tr[2]/td[2]").text().split(", ");
    let released = doc.get("//div[@id='mangaproperties']/table/tr[3]/td[2]").text();
    let status = doc.get("//div[@id='mangaproperties']/table/tr[4]/td[2]").text();
    let authors = [doc.get("//div[@id='mangaproperties']/table/tr[5]/td[2]").text()];
    let artists = [doc.get("//div[@id='mangaproperties']/table/tr[6]/td[2]").text()];
    let genres = doc.find("//span[@class='genretags']").map(x => x.text());
    let synopsis = doc.get("//div[@id='readmangasum']/p").text();

    let direction = doc.get("//div[@id='mangaproperties']/table/tr[7]/td[2]").text();

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

  chapters(doc: MangaXDoc): Chapter[] | Promise<Chapter[]> {
    const xpath = "//table[@id='listing']/tr[position()> 1]";
    return doc.find(xpath)
      .map(x => {
        return {
          number : x.get("td/a").text().trim().lastDigit(),
          name: x.text() || x.get("td/a/following-sibling::text()").text().slice(3),
          src : resolve(doc.baseUrl, x.get("td/a").attr("href").value()),
        };
      });
  }

  imagesPaths(doc: MangaXDoc): string[] {
    const xpath = "//select[@id='pageMenu']/option/@value";
    return doc.find(xpath)
      .map(x => resolve(config.site, (<any>x).value()));
  }

  image(html: string): string {
    const __img__ = /src="[^"]*" alt/gmi;

    return html.match(__img__)[0].slice(5, -5).replace(/.v=\d+/, "");
  }
}

export const parser = new Parser();
export default parser;
