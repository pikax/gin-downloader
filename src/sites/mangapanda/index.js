/**
 * Created by rodriguesc on 05/03/2017.
 */

const debug = require('debug')('gin-downloader:mangapanda');
import url from 'url';

import {resolveUrl} from './names';

const images = (name, chapter) => {
  debug(`getting images ${name}:${chapter}`);

  let mangaUri = resolveUrl(name);
  //NOTE mangapanda dont add volume to url is a simple {site}/{name}/{chapter}
  let uri = url.resolve(mangaUri + '/', chapter.toString());
  return this.imagesByUrl(uri);
};
