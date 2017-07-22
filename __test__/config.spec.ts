/**
 * Created by pikax on 22/07/2017.
 */


import "./common";
import {ginConfig, GinConfig} from "../src/config";



describe("config ", () => {

  let _config = ginConfig.defaultConfig;

  afterEach(() => {
    ginConfig.reset();
  });

  it("should get default config", () => {
    ginConfig.defaultConfig.should.be.deep.eq(_config);
  });


  it("should change config", () => {
    const c: GinConfig = {
      timeout: -1,

      request: {
        timeout: -1,
        headers: {"GinHeader": "Common"}
      }
    };

    ginConfig.use = c;


    ginConfig.config.should.deep.include({timeout: c.timeout});
    ginConfig.config.request.should.deep.include(c.request);
  });


  it("should reset config", () => {
    const c: GinConfig = {
      timeout: -1,
      sites: {},

      request: {
        timeout: -1,
        headers: {"GinHeader": "Common"}
      }
    };

    ginConfig.use = c;

    ginConfig.use.should.deep.equal(c);
    ginConfig.config.should.deep.include({timeout: c.timeout});
    ginConfig.config.request.should.deep.include(c.request);

    ginConfig.reset();

    ginConfig.config.should.not.deep.include({timeout: c.timeout});
    ginConfig.config.request.should.not.deep.include(c.request);

    ginConfig.should.have.property("use").and.be.null;
  });

});
