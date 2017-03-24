/**
 * Created by rodriguesc on 03/03/2017.
 */

import {Site} from './../../common/site';
import {config} from './config';
import {parser} from './parser';
import {nameHelper} from './names';


export class MangaFox extends Site {

  public constructor(){
    super(config,parser,nameHelper);
  }
}

export const manga = new MangaFox();
export default manga;
