/**
 * Created by rodriguesc on 24/03/2017.
 */
import {IChapter, IMangaInfo, IMangas, IMangaXDoc, IParser} from "../../common/declarations";
import {resolve} from "url";

import {default as config} from "./config";
import {Element} from "libxmljs";


class Parser implements IParser {
  mangas(doc: IMangaXDoc): Promise<IMangas[]> | IMangas[] {
    const xpath = "//div[@class='manga_list']/ul/li/a";
    return doc.find(xpath).map(x => {
      return {
        name: x.text(),
        src: resolve(config.site, x.attr("href").value())
      };
    });
  };

  latest(doc: IMangaXDoc): Promise<IChapter[]> | IChapter[] {
    const xpath = "//dt/span/a[@class='chapter']";
    let l = doc.find(xpath).map(x => Parser.parseChapter(x, "following-sibling::text()"));
    return l;
  }

  info(doc: IMangaXDoc): Promise<IMangaInfo> | IMangaInfo {
    let image = doc.get("//div[@class='cover']/img").attr("src").value();
    let title = doc.get("//div[@class='cover']/img").attr("alt").value();
    let synonyms = doc.get("//div[@id='title']/h3").text().split("; ");
    let released = doc.get("//div[@id='title']/table/tr[2]/td[1]/a").text();
    let authors = [doc.get("//div[@id='title']/table/tr[2]/td[2]/a").text()];
    let artists = [doc.get("//div[@id='title']/table/tr[2]/td[3]/a").text()];
    let genres = doc.find("//div[@id='title']/table/tr[2]/td[4]/a").map(x => x.text());
    let synopsis = doc.get("//div[@id='title']/p").text();
    let status = doc.get("//div[@id='series_info']/div[@class='data'][1]/span/text()[1]").text().trim().slice(0, -1);
    let ranked = doc.get("//div[@id='series_info']/div[@class='data'][2]/span").text();
    let rating = doc.get("//div[@id='series_info']/div[@class='data'][3]/span").text();
    let scanlators = doc.find("//div[@id='series_info']/div[@class='data'][4]/span/a").map(x => x.text());

    let result = {
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

    return result;
  }

  chapters(doc: IMangaXDoc): Promise<IChapter[]> | IChapter[] {
    const xpath = "//div[@id='chapters']/ul/li/div//a[@class='tips']";
    let m = doc.find(xpath).map(x => Parser.parseChapter(x, "preceding::div[@class='slide']/h3/text()"));
    return m;
  }


  private static parseChapter(x: Element, xVolume: string) {
    return {
      number : x.text().lastDigit(),
      name: (x.get("following-sibling::span/text()") || x).text(),
      src: resolve(config.site, x.attr("href").value()),
      volume: x.get(xVolume).text().trim()
    };
  }

  imagesPaths(doc: IMangaXDoc): string[] {
    const xpath = "//form[@id='top_bar']/div/div[@class='l']/select/option[position()< last()]/text()";
    return doc.find(xpath)
      .map(x => resolve(doc.location, `${x.text()}.html`));
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
}

export const parser = new Parser();
export default parser;
