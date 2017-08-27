import {writeFile, createFile, outputJson, appendFile} from "fs-extra";
import {batoto, ginConfig} from "../dist/index";
import {SuperChapter, SuperObject} from "../dist/index";

import {escapeRegExp} from 'lodash'

batoto.login("pikax", "carlos").then(async () => {

  ginConfig.use = {
    interval: 1000,
    maxRetries: 500,
  };

  let i = 119;

  let result;
  do {
    console.log("getting " + i + " page");

    result = await batoto.filter({page: i});

    // const cc = [];

    for (let item of result.results) {
      const o = new SuperObject(item.name, batoto, (item as any).src);

      /*const p =  await*/ processObject(o).catch(x => appendFile(`${__dirname}/test/failed.txt`, `{"name":${JSON.stringify(item.name)}, "url":${JSON.stringify(item.src)}}\n`));
      // cc.push(p);
    }

    console.log(result);

    // await Promise.all(cc);

    i++;
  } while (result.results.length > 0);
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
