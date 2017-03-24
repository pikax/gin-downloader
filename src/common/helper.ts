/**
 * Created by rodriguesc on 10/03/2017.
 */


import './declarations';

import {getHtml} from './request';

import * as libxmljs from '@types/libxmljs';
import {IMangaXDoc} from "./declarations";

// export const parseDoc = (source: string) : IMangaXDoc => <any> libxmljs.parseHtmlString(source);
export const parseDoc = (source): IMangaXDoc=> <any>libxmljs.parseHtmlString(source);
export const getDoc= (uri : string|URL)=> getHtml(uri).then(x=> {
  let doc = parseDoc(x);
  doc.location = doc.baseUrl = uri.toString();

  return doc;
});

