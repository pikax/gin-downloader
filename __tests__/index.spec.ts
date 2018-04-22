const gin = require('../src/index');

describe("Test public API", () => {


    it("should export 'gin'", () => {
        expect(gin).toHaveProperty("gin");
    });

});
