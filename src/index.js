/**
 * Created by david on 25/03/2017.
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
require("./common/declarations");
const mangafox_1 = require("./sites/mangafox");
let name = 'Gintama';
let chapter = 41;
function ff() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield mangafox_1.manga.images(name, chapter);
        yield Promise.all(result.map(x => x.then(console.log)));
    });
}
ff();
//# sourceMappingURL=index.js.map