


import {batoto, ginConfig, parseDoc} from "../dist/index";


batoto.login("", "")
.then(async (x)=>{

  const html = await ginConfig.config.sites.batoto.request("http://bato.to/comic/_/comics/mi-seijuku-r19038");
  // const html = await ginConfig.config.sites.batoto.request("http://bato.to/comic/_/comics/gintama-r94");

  const doc = parseDoc(html)

  var info = batoto.parser.info(doc);
  console.log(info);

    var chap = batoto.parser.chapters(doc);

  console.log(chap);

});