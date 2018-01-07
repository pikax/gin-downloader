import {batoto, ginConfig} from "../dist/index";
import {SuperChapter, SuperObject} from "../dist/index";

import {appendFile, outputJson} from "fs-extra";
import {escapeRegExp} from "lodash";

//
// batoto.login("", "")
// .then(async (x)=>{
//
//   const html = await ginConfig.config.sites.batoto.request("http://bato.to/comic/_/comics/mi-seijuku-r19038");
//   // const html = await ginConfig.config.sites.batoto.request("http://bato.to/comic/_/comics/gintama-r94");
//
//   const doc = parseDoc(html)
//
//   var info = batoto.parser.info(doc);
//   console.log(info);
//
//     var chap = batoto.parser.chapters(doc);
//
//   console.log(chap);
//
// });


const mangas = [

  // "Ansatsu Kyoushitsu",
  // "Beelzebub",
  // "Berserk",
  // "Bleach",
  // "Blood Lad",
  // "Fairy Tail",
  // "Gintama",
  "Hungry Joker",
  // " Hunter x Hunter",
  "Magi",
  "Naruto",
  "Shijou Saikyou no Deshi Kenichi",
  "Toriko",
  "Vagabond",
  "Katekyo Hitman Reborn!",
  "Psyren",
  "xxxHOLiC",
  "One Piece",
  "Akame ga Kill!",
  "Holyland",
  "One Punch-Man",
  "Vinland Saga",
];


batoto.login("pikax", "carlos").then(async () => {

  ginConfig.use = {
    interval: 1000,
    maxRetries: 500,
  };

  let i = 119;

  let result;

  for (let m of mangas) {
    const murl = await batoto.resolveMangaUrl(m);
    result = await batoto.infoChapters(m);

    console.log(result.title)
    if (!result) {
      console.error(result);
      continue;
    }

    console.log(murl)
    const o = new SuperObject(m, batoto, murl);

    /*const p =  await*/
    await processObject(o).catch(x => appendFile(`${__dirname}/test/failed.txt`, `{"name":${JSON.stringify(m)}, "url":${JSON.stringify(murl)}}\n`));
    // cc.push(p);

    console.log('finished')
  }

  // do {
  //   console.log("getting " + i + " page");
  //
  //   result = await batoto.filter({page: i});
  //
  //   // const cc = [];
  //
  //   for (let item of result.results) {
  //     const o = new SuperObject(item.name, batoto, (item as any).src);
  //
  //     /*const p =  await*/ processObject(o).catch(x => appendFile(`${__dirname}/test/failed.txt`, `{"name":${JSON.stringify(item.name)}, "url":${JSON.stringify(item.src)}}\n`));
  //     // cc.push(p);
  //   }
  //
  //   console.log(result);
  //
  //   // await Promise.all(cc);
  //
  //   i++;
  // } while (result.results.length > 0);
});


async function processObject(o: SuperObject) {
  const info = await o.update();

  const pi = outputJson(`${__dirname}/test/${escapeRegExp(o.name)}/info.json`, info);

  const pc: Promise<any>[] = [];

  for (let chap of o.chapters) {
    pc.push(processChapter(chap));
  }


  return Promise.all([pi, ...pc]);
}

async function processChapter(c: SuperChapter) {
  const pi = await c.fetch();

  const images = await Promise.all(pi.map(x => x.value));

  const n = {...c.source, images};

  await outputJson(`${__dirname}/test/${escapeRegExp(c.master.name)}/${c.source.chap_number}.json`, n);
}


