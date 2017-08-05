/**
 * Created by pikax on 13/04/2017.
 */


import {MangaSite} from "../../src/common/mangasite";
import {Site, SiteConfig} from "../../src/declarations";

import {Parser} from "./SiteParser";
import {Helper} from "./NameHelper";
import {config} from "./SiteConfig";
import {strategy} from "./Strategy";


export class MockSite extends MangaSite<SiteConfig, Parser, Helper> implements Site {
  public constructor() {
    super(config, new Parser, new Helper(), strategy);
  }
}

export const manga: Site = new MockSite();
export default manga;



