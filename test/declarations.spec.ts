/**
 * Created by pikax on 25/03/2017.
 */

import "./common";


import "./../src/declarations";





describe("declarations", () => {


  it("should parse first digit", () => {
    "115 Gintama".firstDigit().should.be.eq(115);
  });

  it("should fail at parsing first digit", () => {
    ("Gintama".firstDigit() === null).should.be.true;
  });


  it("should parse last digit", () => {
    "Gintama 115".lastDigit().should.be.eq(115);
  });

  it("should fail at parsing last digit", () => {
    ("Gintama".lastDigit() === null).should.be.true;
  });

  it("should get matches", () => {
    "Gintama13".getMatches(/(\d+)$/g).should.be.deep.eq(["13"]);
  });




  it("should decode escape sequence", () => {
    "\xff".decodeEscapeSequence().should.be.eq("ÿ");
  });

});
