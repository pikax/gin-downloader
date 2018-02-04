/**
 * Created by pikax on 13/04/2017.
 */


import {MangaXDoc, Request} from "../../src/declarations";


export const getHtml = async (requestedPath: string, params: any = undefined) : Promise<string> => {
  return Promise.resolve("test");
};


// TODO setup configs in configs file
// TODO check this code, I dont remember this
let RequestBytes = function (requestedPath: string, params: any, method: string) {
 return Promise.resolve("test1");
};
export const getBytes = (requestedPath: string, params: any ) : Promise<any> => {
  return <any>Promise.resolve({});
};

export const getDoc = (requestedPath: string) : Promise<MangaXDoc> => {
  return <any>Promise.resolve({});
};



export const postBytes = (requestedPath: string, params?: any) : Promise<Buffer> => {
  return <any>Promise.resolve({});
};

export const postHtml = async (requestedPath: string, params?: any) : Promise<string> => {
  return <any>Promise.resolve({});
};
export const postDoc = (requestedPath: string, params?: any) : Promise<MangaXDoc> => {
  return <any>Promise.resolve({});
};


export const request: Request = {
  getBytes,
  getHtml,
  getDoc,

  postBytes,
  postHtml,
  postDoc,
};



