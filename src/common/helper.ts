/**
 * Created by rodriguesc on 10/03/2017.
 */

import * as cheerio from "cheerio";
import {MangaXDoc} from "../declarations";


export const parseDoc = (source: string, params: {location: string} = undefined): MangaXDoc => {
  let doc: MangaXDoc = (<any>cheerio.load(source));
  doc.location = params && params.location;
  return doc;
};


export const sanitize = (children: CheerioElement[])=> children.filter(x=>x.type !== "text");