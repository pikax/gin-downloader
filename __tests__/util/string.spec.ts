import {firstDigit, lastDigit, leftTrim} from "../../src/util/string";
import {EXDEV} from "constants";

describe("string util", () => {


    describe("functions", () => {
        describe("lastDigit", () => {

            it("should resolve last digit", () => {
                const expected = 23;
                const str = "Test" + expected;

                const result = lastDigit(str);

                expect(result).toBe(expected);
            });

            it("should not resolve last digit", () => {
                const str = "Test";

                const result = lastDigit(str);

                expect(result).toBeNull();
            });

            it("should resolve last digit with decimal precision", () => {
                const expected = 23.56;
                const str = "Test" + expected;

                const result = lastDigit(str);

                expect(result).toBe(expected);
            });


        });

        describe("firstDigit", () => {

            it("should resolve first digit", () => {
                const expected = 23;
                const str = expected + "Test";

                const result = firstDigit(str);

                expect(result).toBe(expected);
            });

            it("should not resolve first digit", () => {
                const str = "Test";

                const result = firstDigit(str);

                expect(result).toBeNull();
            });

            it("should resolve first digit with decimal precision", () => {
                const expected = 23.5;
                const str = expected + "Test";

                const result = firstDigit(str);

                expect(result).toBe(expected);
            });
        });


        describe("leftTrim", () => {

            it("should left trim string", () => {
                const expected = "Test";
                const str = "    Test";

                const result = leftTrim(str);

                expect(result).toBe(expected);
            });

            it("should left trim string without spaces", () => {
                const expected = "Test";

                const result = leftTrim(expected);

                expect(result).toBe(expected);
            });

        });

        describe("decodeEscapeSequence", () => {

        });

    });


    describe("prototype", () => {
        describe("lastDigit", () => {
            it("should resolve last digit", () => {
                const expected = 23;
                const str = "Test" + expected;

                const result = str.lastDigit();

                expect(result).toBe(expected);
            });

            it("should not resolve last digit", () => {
                const str = "Test";

                const result = str.lastDigit();

                expect(result).toBeNull();
            });

            it("should resolve last digit with decimal precision", () => {
                const expected = 23.56;
                const str = "Test" + expected;

                const result = str.lastDigit();

                expect(result).toBe(expected);
            });

        });

        describe("firstDigit", () => {
            it("should resolve first digit", () => {
                const expected = 23;
                const str = expected + "Test";

                const result = str.firstDigit();

                expect(result).toBe(expected);
            });

            it("should not resolve first digit", () => {
                const str = "Test";

                const result = str.firstDigit();

                expect(result).toBeNull();
            });

            it("should resolve first digit with decimal precision", () => {
                const expected = 23.5;
                const str = expected + "Test";

                const result = str.firstDigit();

                expect(result).toBe(expected);
            });
        });


        describe("leftTrim", () => {
            it("should left trim string", () => {
                const expected = "Test";
                const str = "    Test";

                const result = str.leftTrim();

                expect(result).toBe(expected);
            });

            it("should left trim string without spaces", () => {
                const expected = "Test";

                const result = expected.leftTrim();

                expect(result).toBe(expected);
            });
        });

        describe("decodeEscapeSequence", () => {

        });
    });


});

