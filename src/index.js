/**
 * Created by david on 19/03/2017.
 */

import fs from 'fs';

import {extend} from './sites';


let sites = {};

const sitesDir = __dirname + '/sites/';
fs.readdirSync(sitesDir).forEach((file)=> {
  let fp = sitesDir + file;

  if( fs.statSync(fp).isFile())
    return; //nothing to do here

  let site = require(fp).default;
  let parser = require(fp + '/parser').default;
  let config = require(fp + '/config').default;
  let resolveUrl = require(fp + '/names').resolveUrl;


  let def = extend(site,config,parser,resolveUrl);

  sites[config.name] = def;
});


//modules.export = site;

export default module.exports = sites;

