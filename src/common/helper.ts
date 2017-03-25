/**
 * Created by rodriguesc on 10/03/2017.
 */


import "./declarations";

import {getHtml} from "./request";

import {parseHtmlString} from "libxmljs";
import {IMangaXDoc} from "./declarations";


export const parseDoc = (source: string, params: {location: string} = undefined): IMangaXDoc => {
  let doc: IMangaXDoc = <any>parseHtmlString(source);

  if (params && params.location) {
    doc.location = doc.baseUrl = params.location;
  }
  return doc;
};
export const getDoc = (uri: string) => {
  return getHtml(uri).then(x => {
    return parseDoc(x, {location: uri});
  });
};

