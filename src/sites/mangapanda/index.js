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
/**
 * Created by rodriguesc on 05/03/2017.
 */
const site_1 = require("../../common/site");
const parser_1 = require("./parser");
const config_1 = require("./config");
const names_1 = require("./names");
const url_1 = require("url");
class Manga extends site_1.Site {
    constructor() {
        super(config_1.config, parser_1.parser, names_1.name);
    }
    resolveChapterSource(name, chapter) {
        return __awaiter(this, void 0, void 0, function* () {
            let mangaUri = this.nameHelper.resolveUrl(name);
            //NOTE mangapanda dont add volume to url is a simple {site}/{name}/{chapter}
            return url_1.resolve(mangaUri + '/', chapter.toString());
        });
    }
}
exports.manga = new Manga();
exports.default = exports.manga;
//# sourceMappingURL=index.js.map