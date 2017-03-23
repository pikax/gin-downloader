/**
 * Created by david on 19/03/2017.
 */

import fs from 'fs';

import builder from './sites';


let sites = {};

const sitesDir = __dirname + '/sites/';
fs.readdirSync(sitesDir).forEach((file)=> {
  let fp = sitesDir + file;

  if( fs.statSync(fp).isFile())
    return; //nothing to do here

  let site = require(fp).default;
  let parser = require(fp + '/parser').default;
  let config = require(fp + '/config').default;


  let def = new builder(site,config,parser);

  let s = site;

  s.mangas = s.mangas || def.mangas.bind(def);

  site[config.name] = s;
});


modules.export = site;


