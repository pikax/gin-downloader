"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./common");
var config_1 = require("../src/config");
describe("config ", function () {
    var _config = config_1.ginConfig.defaultConfig;
    afterEach(function () {
        config_1.ginConfig.reset();
    });
    it("should get default config", function () {
        config_1.ginConfig.defaultConfig.should.be.deep.eq(_config);
    });
    it("should change config", function () {
        var c = {
            timeout: -1,
            request: {
                timeout: -1,
                headers: { "GinHeader": "Common" }
            }
        };
        config_1.ginConfig.use = c;
        config_1.ginConfig.config.should.deep.include({ timeout: c.timeout });
        config_1.ginConfig.config.request.should.deep.include(c.request);
    });
    it("should reset config", function () {
        var c = {
            timeout: -1,
            sites: {},
            request: {
                timeout: -1,
                headers: { "GinHeader": "Common" }
            }
        };
        config_1.ginConfig.use = c;
        config_1.ginConfig.use.should.deep.equal(c);
        config_1.ginConfig.config.should.deep.include({ timeout: c.timeout });
        config_1.ginConfig.config.request.should.deep.include(c.request);
        config_1.ginConfig.reset();
        config_1.ginConfig.config.should.not.deep.include({ timeout: c.timeout });
        config_1.ginConfig.config.request.should.not.deep.include(c.request);
        config_1.ginConfig.should.have.property("use").and.be.null;
    });
});
