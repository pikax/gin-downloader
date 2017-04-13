/**
 * Created by rodriguesc on 10/03/2017.
 */

import {parseHtmlString} from "libxmljs";
import {MangaXDoc} from "../declarations";


export const parseDoc = (source: string, params: {location: string} = undefined): MangaXDoc => {
  let doc: MangaXDoc = (<any>parseHtmlString(source));

  if (params && params.location) {
    doc.location = doc.baseUrl = params.location;
  }
  return doc;
};
