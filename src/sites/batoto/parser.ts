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


  mangas(doc: MangaXDoc): Promise<MangaSource[]> | MangaSource[] {
    const xpath = "//table[@class='ipb_table chapters_list']/tbody/tr/td[1]/strong/a";

    return doc.find(xpath)
      .map(x => {
        return {
          name: x.text().leftTrim(),
          src: resolve(config.site, x.attr("href").value())
        };
      })
      .map(x => {
        return {
          name:  x.name,
          src : x.src
        };
      });
  }

  latest(doc: MangaXDoc): Promise<Chapter[]> | Chapter[] {
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

  info(doc: MangaXDoc): Promise<MangaInfo> | MangaInfo {
    let image = doc.get("//div[@class='ipsBox']/div[1]/div[1]/img").attr("src").value();
    let title = doc.get("//h1[@class='ipsType_pagetitle']").text().trim();
    let synonyms = doc.find("//table[@class='ipb_table']/tr[1]/td[2]/span").map(x => x.text().trim());
    let authors = [doc.get("//div[@class='ipsBox']/div[1]/div[2]/table[@class='ipb_table']/tr[2]/td[2]/a").text()];
    let artists = [doc.get("//div[@class='ipsBox']/div[1]/div[2]/table[@class='ipb_table']/tr[3]/td[2]/a").text()];
    let genres = doc.find("//table[@class='ipb_table']/tr[4]/td[2]/a/span").map(x => x.text().trim());
    let synopsis = doc.get("//div[@class='ipsBox']/div/div/table[@class='ipb_table']/tr[7]/td[2]").text();
    let status = doc.get("//div[@class='ipsBox']/div/div/table[@class='ipb_table']/tr[6]/td[2]").text().trim();
    let type = doc.get("//div[@class='ipsBox']/div/div/table[@class='ipb_table']/tr[5]/td[2]").text().trim();

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

  chapters(doc: MangaXDoc): Promise<Chapter[]> | Chapter[] {
    // const xpath = "//table[@class='ipb_table chapters_list']/tbody/tr/td[1]/a";

    const xpath = "//table[@class='ipb_table chapters_list']/tbody/tr/td[1]/a/../.."; // tr

    // let items = doc.find(xpath)
    //   .map(x => {
    //       return {
    //         href: x.attr("href").value(),
    //         language: x.get("../following::td/div").attr("title").value(),
    //         group: x.get("../../td[3]/a").text()
    //       };
    //     }
    //   );

    // return doc.find(xpath)
    //   .map(x => {
    //     return {
    //       chap_number : x.text().trim(), // todo fix me
    //       name: x.text().leftTrim(),
    //       src: resolve(config.site, x.attr("href").value())
    //     };
    //   })
    //   .map(x => {
    //     return {
    //       chap_number: x.chap_number,
    //       name: x.name,
    //       src : x.src
    //     };
    //   });


    return doc.find(xpath)
      .map(x => ({
        chap_number: Parser.extractChapterNumber(x.get("td[1]/a").text().trim()),
        volume: Parser.extractVolumeNumber(x.get("td[1]/a").text().trim()),
        src: resolve(config.site, x.get("td[1]/a").attr("href").value()),
        name: Parser.extractChapterName(x.get("td[1]/a").text().trim()),
        language :   x.get("td[2]/div").attr("title").value().trim(),
        scanlator: x.get("td[3]/a").text().trim(),
        dateAdded: x.get("td[5]").text().trim(),
      }));
  }

  imagesPaths(doc: MangaXDoc): string[] {
    let xpath = "//select[@id='page_select'][1]/option";
    return uniq(doc.find(xpath).map(x => x.attr("value").value()));
  }

  image(html: string): string {
    let regex = /(http:\/\/img\.bato\.to\/comics\/g\/[^"]*)/gm;

    let m = regex.exec(html); // get the first match

    if (!m) {
      throw new Error("Image not found");
    }
    return m[0];
  }


  filter(doc: MangaXDoc): Promise<FilteredResults> | FilteredResults {
    let results = this.mangas(doc);
    let next = doc.find("//input[@class='input_submit']");


    let {location} = doc;
    let matches = location.match(/\d+$/); // get page | &p=11
    let match = matches && +matches[0];


    return <FilteredResults>{
      results: results,
      page: match || 1,
      total: (next.length && 99999) || +match || 1
    };
  }
  static extractChapterNumber(text: string): number {
    console.log(text);
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
