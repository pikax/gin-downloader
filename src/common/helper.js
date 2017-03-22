/**
 * Created by rodriguesc on 10/03/2017.
 */


import libxmljs from 'libxmljs';
import {getHtml} from './request';


export const parseDoc = libxmljs.parseHtmlString;
export const getDoc= (uri)=> getHtml(uri).then(parseDoc);
