/**
 * Created by pikax on 11/06/2017.
 */


// const gin = require("../dist/index");


const cloudscraper = require("cloudscraper");
const requestRetry = require("requestretry");

const util = require('util');// node 8
const fs = require('fs');
const path = require('path');

let delay = util.promisify(setTimeout);


const cloudscraperPromise =  (opts)=>{
  return new Promise((res, rej) => {
    let callback = (err, response, body) => {
      if (err) {
        return rej(err);
      }
      return res(body);
    };

    if (opts.method === "POST") {
      cloudscraper.post(opts.url, opts.body, callback, null);
    }
    else {
      cloudscraper.request(opts, callback);
    }
  });
};

const writeFile = util.promisify(fs.writeFile);


const byRequest = [
  { name : "batoto",
    pages : [
      {path:"batoto/html/mangas.html", uri:"https://bato.to/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/latest.html", uri:"https://bato.to/"},
      {path:"batoto/html/ch001.html", uri:"http://bato.to/areader?id=f6b99d4eee4fb2f2_2&p=1" , referer: "http://bato.to/reader" },
      {path:"batoto/html/filter/byGenre.html", uri:" https://bato.to/search_ajax?name=&&artist_name=&&genres=i1;i2;i3;i8;i20;i33&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/filter/outGenre.html", uri:"https://bato.to/search_ajax?name=gin&name_cond=s&artist_name=Sora&artist_name_cond=c&genres=e6&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/filter/byAuthor.html", uri:"https://bato.to/search_ajax?name=&&artist_name=Sorachi&artist_name_cond=c&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/filter/byCompleted.html", uri:"https://bato.to/search_ajax?name=kenichi&name_cond=c&artist_name=&&genres=&genre_cond=and&status=c&type=null&mature=y&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/filter/byType.html", uri:"https://bato.to/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=kr&mature=y&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/filter/noMature.html", uri:"https://bato.to/search_ajax?name=ginta&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=n&rating_low=0&rating_high=5&p=1"},
      {path:"batoto/html/filter/rating5~5.html", uri:"https://bato.to/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=5&rating_high=5&p=1"},
      {path:"batoto/html/filter/rating0~1.html", uri:"https://bato.to/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=1&rating_high=1&p=1"},
      {path:"batoto/html/filter/genreOr.html", uri:"https://bato.to/search_ajax?name=ginta&&artist_name=&&genres=i34;i35;i38&genre_cond=or&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1"},
    ]},
  { name: "mangafox",
    pages : [
      {path:"mangafox/html/mangas.html", uri: "http://mangafox.me/manga/"},
      {path:"mangafox/html/latest.html", uri: "http://mangafox.me/releases/"},
      {path:"mangafox/html/Gintama.html", uri: "http://mangafox.me/manga/gintama"},
      {path:"mangafox/html/ZuiWuDao.html", uri: "http://mangafox.me/manga/zui_wu_dao"},
      {path:"mangafox/html/c042.html", uri: "http://mangafox.me/manga/zui_wu_dao/c042/1.html"},

      {path:"mangafox/html/filter/byName.html", uri: "http://mangafox.me/search.php?name_method=cw&name=Gintama&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1"},
      {path:"mangafox/html/filter/byGenre.html", uri: "http://mangafox.me/search.php?name_method=cw&name=&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=1&genres%5BAdult%5D=0&genres%5BAdventure%5D=1&genres%5BComedy%5D=1&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=1&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=1&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=1&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=1&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=1&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1"},
      {path:"mangafox/html/filter/outGenre.html", uri: "http://mangafox.me/search.php?name_method=bw&name=gin&type=&author_method=cw&author=Sora&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=2&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1"},
      {path:"mangafox/html/filter/byAuthor.html", uri: "http://mangafox.me/search.php?name_method=cw&name=&type=&author_method=cw&author=Sorachi&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1"},
      {path:"mangafox/html/filter/byCompleted.html", uri: "http://mangafox.me/search.php?name_method=cw&name=kenichi&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1"},
      {path:"mangafox/html/filter/byType.html", uri: "http://mangafox.me/search.php?name_method=cw&name=&type=2&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1"}
    ]},
  { name: "mangahere",
    pages : [
      {path:"mangahere/html/mangas.html", uri: "http://mangahere.co/mangalist/"},
      {path:"mangahere/html/latest.html", uri: "http://mangahere.co/latest/"},
      {path:"mangahere/html/Gintama.html", uri: "http://mangahere.co/manga/gintama"},
      {path:"mangahere/html/c041.html", uri: "http://www.mangahere.co/manga/gintama/c041/"},
      {path:"mangahere/html/filter/byName.html", uri: "http://mangahere.co/search.php?name_method=cw&name=Gintama&direction=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BLolicon%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShotacon%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1", delay:6000},
      {path:"mangahere/html/filter/byGenre.html", uri: "http://mangahere.co/search.php?name_method=cw&name=&direction=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=1&genres%5BAdult%5D=0&genres%5BAdventure%5D=1&genres%5BComedy%5D=1&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=1&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=1&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BLolicon%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=1&genres%5BSeinen%5D=0&genres%5BShotacon%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=1&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=1&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1", delay:6000},
      {path:"mangahere/html/filter/outGenre.html", uri: "http://mangahere.co/search.php?name_method=bw&name=gin&direction=&author_method=cw&author=Sora&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BLolicon%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=2&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShotacon%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1", delay:6000},
      {path:"mangahere/html/filter/byAuthor.html", uri: "http://mangahere.co/search.php?name_method=cw&name=&direction=&author_method=cw&author=Sorachi&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BLolicon%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShotacon%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1", delay:6000},
      {path:"mangahere/html/filter/byCompleted.html", uri: "http://mangahere.co/search.php?name_method=cw&name=kenichi&direction=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BLolicon%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShotacon%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1", delay:6000},
      {path:"mangahere/html/filter/byType.html", uri: "http://mangahere.co/search.php?name_method=cw&name=10&direction=lr&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BLolicon%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShotacon%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1", delay:6000}
    ]
  },
  {name: "mangapanda",
    pages : [
      {path:"mangapanda/html/mangas.html", uri: "http://mangapanda.com/alphabetical"},
      {path:"mangapanda/html/latest.html", uri: "http://mangapanda.com/latest"},
      {path:"mangapanda/html/Gintama.html", uri: "http://mangapanda.com/gintama"},
      {path:"mangapanda/html/41.html", uri: "http://www.mangapanda.com/gintama/41"},
      {path:"mangapanda/html/filter/byName.html", uri: "http://mangapanda.com/search/?w=Gintama&rd=0&status=&genre=0000000000000000000000000000000000000&p=0"},
      {path:"mangapanda/html/filter/byGenre.html", uri: "http://mangapanda.com/search/?w=&rd=0&status=&genre=1010000000000000000000100010000000000&p=0"},
      {path:"mangapanda/html/filter/outGenre.html", uri: "http://mangapanda.com/search/?w=Sora&rd=0&status=&genre=0000000000000000000020000000000000000&p=0"},
      {path:"mangapanda/html/filter/byAuthor.html", uri: "http://mangapanda.com/search/?w=Sorachi&rd=0&status=&genre=0000000000000000000000000000000000000&p=0"},
      {path:"mangapanda/html/filter/byCompleted.html", uri: "http://mangapanda.com/search/?w=&rd=0&status=2&genre=0000000000000000000000000000000000000&p=0"},
      {path:"mangapanda/html/filter/byType.html", uri: "http://mangapanda.com/search/?w=&rd=1&status=&genre=0000000000000000000000000000000000000&p=0"}
    ]
  }

];

const byCFRequest = [
  {name: "kissmanga",
    pages : [
      {path:"kissmanga/html/mangas.html", uri: "http://kissmanga.com/AdvanceSearch", args: "mangaName=&authorArtist=&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status="},
      {path:"kissmanga/html/latest.html", uri: "http://kissmanga.com/MangaList/LatestUpdate"},
      {path:"kissmanga/html/Gintama.html", uri: "http://kissmanga.com/Manga/Gintama"},
      {path:"kissmanga/html/Lesson-042.html", uri: "http://kissmanga.com/Manga/Gintama/Lesson-042?id=288316"},
      {path:"kissmanga/html/ca.js", uri: "http://kissmanga.com/Scripts/ca.js"},
      {path:"kissmanga/html/lo.js", uri: "http://kissmanga.com/Scripts/lo.js"},
      {path:"kissmanga/html/filter/byName.html", uri: "http://kissmanga.com/AdvanceSearch", args: "mangaName=Gintama&authorArtist=&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status="},
      {path:"kissmanga/html/filter/byGenre.html", uri: "http://kissmanga.com/AdvanceSearch", args: "mangaName=&authorArtist=&genres=0&genres=1&genres=0&genres=0&genres=1&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=1&genres=0&genres=0&genres=0&genres=0&genres=1&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status="},
      {path:"kissmanga/html/filter/outGenre.html", uri: "http://kissmanga.com/AdvanceSearch", args: "mangaName=&authorArtist=&genres=2&genres=0&genres=2&genres=2&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=2&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status="},
      {path:"kissmanga/html/filter/byAuthor.html", uri: "http://kissmanga.com/AdvanceSearch", args: "mangaName=&authorArtist=Sorachi&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status="},
      {path:"kissmanga/html/filter/byCompleted.html", uri: "http://kissmanga.com/AdvanceSearch", args: "mangaName=&authorArtist=&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&genres=0&status=Complete"}
    ]
  }
];

function getRequest(opts){
  "use strict";
  return requestRetry(opts );
}


async function processPages(strategy, pages){

  for (let page of pages) {

    let headers = page.referer && {referer:page.referer}

    await strategy({url:page.uri, gzip: true, headers,fullResponse:false} )
      .then(x=> writeFile(path.resolve(__dirname, '../__test__/sites', page.path), x))
      .then(x=>console.log("'%s' file saved",path.resolve(__dirname, '../__test__/sites', page.path)))
      .then(x=>delay(page.delay || 0))


    ;
  }

}

async function resolveRequests() {
  return Promise.all(byRequest.map(x=>processPages(requestRetry, x.pages)))
}

async function resolveCFRequest(){



  for (let obj of byCFRequest) {

    for (let page of obj.pages) {

      let body = page.args;
      let method = body ? 'POST' : 'GET';

      await cloudscraperPromise({url:page.uri, method: method, body,   gzip: true} )
        .then(x=> writeFile(path.resolve(__dirname, '../__test__/sites', page.path), x))
        .then(x=>console.log("'%s' file saved",path.resolve(__dirname, '../__test__/sites', page.path)))
      ;
    }
  }

}

Promise.all([
  resolveRequests(),
  resolveCFRequest()])
  .then(x=>console.log('finished'))






