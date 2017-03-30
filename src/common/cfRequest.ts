/**
 * Created by rodriguesc on 27/03/2017.
 */
import {MangaXDoc, Request} from "../declarations";
import {parseDoc} from "./helper";

const debug = require("debug")("gin-downloader:request");
const verbose = require("debug")("gin-downloader:request:verbose");
const error = require("debug")("gin-downloader:error");

const cloudscraper = require("cloudscraper");

const Headers = {
  "Accept-Charset": "utf-8;q=0.7,*;q=0.3",
  "Accept-Language": "en-US,en;q=0.8",
  "Connection": "keep-alive",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
  "Accept-Encoding": "gzip,deflate",
};

export const getHtml = async (requestedPath: string, params?: any) : Promise<string> => {
  let bytes = await getBytes(requestedPath, params);
  return bytes.toString();
};


export const getBytes = (requestedPath: string, params?: any) : Promise<Buffer> => {
  let request = {
    method: "GET",
    url: requestedPath,
    qs: params,
    headers: Headers,
    gzip: true,
    encoding: "",
    followAllRedirects: true,
    forever: true

    // proxy: config.proxy, // Note the fully-qualified path to Fiddler proxy. No "https" is required, even for https connections to outside.
  };

  return new Promise((res, rej) => {
    cloudscraper.request(request, (err: number, response: any, body: Buffer) => {
      if (err) {
        return rej(err);
      }
      return res(body);
    });
  });
};

export const getDoc = (requestedPath: string) : Promise<MangaXDoc> => {
  return getHtml(requestedPath).then(x => parseDoc(x, {location: requestedPath}));
};

export const request: Request = {
  getBytes,
  getHtml,
  getDoc
};


export default request;
