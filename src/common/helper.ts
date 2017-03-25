/**
 * Created by rodriguesc on 10/03/2017.
 */


import "./declarations";

import {getHtml} from "./request";

import {parseHtmlString} from "libxmljs";
import {IMangaXDoc} from "./declarations";


export const parseDoc = (source: string): IMangaXDoc => <any>parseHtmlString(source);
export const getDoc = (uri: string) => getHtml(uri).then(x => {
  let doc = parseDoc(x);
  doc.location = doc.baseUrl = uri.toString();

  return doc;
});

