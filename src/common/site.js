///<reference path="declarations.ts"/>
/**
 * Created by rodriguesc on 24/03/2017.
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const helper_1 = require("./helper");
const lodash_1 = require("lodash");
const util_1 = require("util");
const request_1 = require("./request");
const url_1 = require("url");
class Site {
    constructor(config, parser, nameHelper) {
        this.debug = debug(`gin-downloader:${config.name}`);
        this.verbose = debug(`gin-downloader:${config.name}:verbose`);
        this.config = config;
        this.parser = parser;
        this.nameHelper = nameHelper;
    }
    mangas() {
        this.debug('getting mangas');
        return helper_1.getDoc(this.config.mangas_url)
            .then(this.parser.mangas)
            .tap(x => this.debug(`mangas: ${x.length}`));
    }
    latest() {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug('getting latest');
            let mangas = yield helper_1.getDoc(this.config.latest_url).then(this.parser.latest);
            this.verbose(`got ${mangas.length} chapters`);
            return mangas;
        });
    }
    info(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name)
                throw new Error('Please provide a name');
            this.debug(`getting info for ${name}`);
            try {
                let src = this.nameHelper.resolveUrl(name);
                let info = yield helper_1.getDoc(src).then(this.parser.info);
                this.verbose('info:%o', info);
                this.debug(`got info for ${name}`);
                return info;
            }
            catch (e) {
                this.debug(e);
                throw new Error(`${name} not found!`);
            }
        });
    }
    chapters(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name)
                throw new Error('Please provide a name');
            this.debug(`getting chapters for ${name}`);
            try {
                let src = this.nameHelper.resolveUrl(name);
                let chapters = yield helper_1.getDoc(src).then(this.parser.chapters);
                this.verbose('chapters:%o', chapters);
                this.debug(`got chapters for ${name}`);
                return chapters;
            }
            catch (e) {
                console.error(e);
                this.debug(e);
                throw new Error(`${name} not found!`);
            }
        });
    }
    infoChapters(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name)
                throw new Error('Please provide a name');
            this.debug(`getting info & chapters for ${name}`);
            try {
                let src = this.nameHelper.resolveUrl(name);
                let doc = yield helper_1.getDoc(src);
                let info = yield this.parser.info(doc);
                let chapters = yield this.parser.chapters(doc);
                this.verbose('info:%o\nchapters:%o', chapters);
                this.debug(`got info & chapters for ${name}`);
                return { info, chapters };
            }
            catch (e) {
                this.debug(e);
                throw new Error(`${name} not found!`);
            }
        });
    }
    images(name, chapter) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name)
                throw new Error('Please provide a name');
            if (!chapter)
                throw new Error('Please provide a chapter');
            if (!util_1.isNumber(chapter))
                throw new Error('Please provide a valid chapter');
            this.debug('getting images for %s : %s', name, chapter);
            let chap = yield this.resolveChapterSource(name, chapter);
            let paths = yield helper_1.getDoc(chap).then(this.parser.imagesPaths);
            return paths.map(x => Site.processImagePath(x, this.parser));
        });
    }
    resolveChapterSource(name, chapter) {
        return __awaiter(this, void 0, void 0, function* () {
            let chapters = yield this.chapters(name);
            let chap = lodash_1.find(chapters, { number: chapter });
            this.verbose('filtered chapters %o', chap);
            if (!chap)
                throw new Error('Chapter not found');
            return chap.src;
        });
    }
    static processImagePath(src, parser) {
        return __awaiter(this, void 0, void 0, function* () {
            let image = yield request_1.getHtml(src).then(parser.image);
            return {
                name: url_1.parse(image).pathname.split('/').reverse()[0],
                src: image
            };
        });
    }
}
exports.Site = Site;
exports.default = Site;
//# sourceMappingURL=site.js.map