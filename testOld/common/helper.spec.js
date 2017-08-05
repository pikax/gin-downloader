"use strict";
/**
 * Created by rodriguesc on 10/03/2017.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("./../common");
var request_1 = require("../../src/request");
var helper_1 = require("../../src/common/helper");
var requestRetryStrategy_1 = require("../../src/request/requestRetryStrategy");
var requestCloudFareStrategy_1 = require("../../src/request/requestCloudFareStrategy");
var common_1 = require("../common");
var nock = require("nock");
var request = new request_1.GinRequest(requestRetryStrategy_1.strategy);
var cfRequest = new request_1.GinRequest(requestCloudFareStrategy_1.strategy);
describe("Helper.js", function () {
    var manga = "\n      <html>\n      <div>\n          <a id=\"chap\" href=\"1\"/>\n          <div />\n          <div />\n          <div />\n      </div>\n      </html>";
    it("should not be able to create request without strategy", function () {
        try {
            var doc = new request_1.GinRequest(null);
            doc.should.be.null;
        }
        catch (e) {
            e.should.be.throw;
        }
    });
    it("should not get html", function () { return __awaiter(_this, void 0, void 0, function () {
        var url, doc, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "ht222tps://github.com/";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, request.getDoc({ url: url })];
                case 2:
                    doc = _a.sent();
                    doc.should.be.null;
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    e_1.should.be.throw;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should request with params", function () { return __awaiter(_this, void 0, void 0, function () {
        var bytes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.request('http://github.com', 'POST', 'testbody')];
                case 1:
                    bytes = _a.sent();
                    bytes.should.not.be.empty;
                    return [2 /*return*/];
            }
        });
    }); });
    it("should post Doc", function () { return __awaiter(_this, void 0, void 0, function () {
        var doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.postDoc('http://github.com')];
                case 1:
                    doc = _a.sent();
                    doc.should.not.be.undefined;
                    doc.location.should.eq('http://github.com');
                    return [2 /*return*/];
            }
        });
    }); });
    it("should get html", function () { return __awaiter(_this, void 0, void 0, function () {
        var uri, $, xx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uri = "https://github.com/";
                    return [4 /*yield*/, request.getDoc(uri)];
                case 1:
                    $ = _a.sent();
                    xx = $("a.header-logo-invertocat").length.should.exist.and.be.eq(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should parse doc", function () {
        helper_1.parseDoc(manga).should.exist;
    });
    it("should get doc", function () { return __awaiter(_this, void 0, void 0, function () {
        var uri, $;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uri = "https://github.com/";
                    return [4 /*yield*/, request.getDoc(uri)];
                case 1:
                    $ = _a.sent();
                    $("a.header-logo-invertocat").length.should.be.eq(1);
                    $.should.have.property("location", uri);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should get bytes", function () { return __awaiter(_this, void 0, void 0, function () {
        var uri, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uri = "https://github.com/";
                    return [4 /*yield*/, requestRetryStrategy_1.strategy.request(uri)];
                case 1:
                    html = _a.sent();
                    html.should.exist;
                    return [2 /*return*/];
            }
        });
    }); });
    // NOTE cloudfare blocks travis ci ip
    it("should get kissmanga by bypassing cloudfare protection", function () { return __awaiter(_this, void 0, void 0, function () {
        var uri, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock("http://kissmanga.com/")
                            .get("/")
                            .reply(200, 'ccapsldjas');
                    }
                    uri = "http://kissmanga.com/";
                    return [4 /*yield*/, cfRequest.getHtml(uri)];
                case 1:
                    html = _a.sent();
                    html.should.not.contain("Checking your browser before accessing");
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fail bypassing cloudfare', function () { return __awaiter(_this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    nock("http://kissmanga.com/")
                        .get("/")
                        .reply(200, 'why_captcha');
                    return [4 /*yield*/, requestCloudFareStrategy_1.strategy.request("http://kissmanga.com/")];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    e_2.should.be.throw;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=helper.spec.js.map