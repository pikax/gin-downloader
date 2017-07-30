/**
 * Created by pikax on 22/07/2017.
 */

import {strategies} from "./../src/request/index";
import "./common";


//todo mock some funcionality, like retry and the cloudfare bypass

describe("request strategies", () => {


  describe("retry", () => {
    let request = strategies.retry.request;

    it("should get google.com by url", async () => {
      let http = await request("http://www.google.com");

      http.should.not.be.empty;
    });

    it("should get google.com", async () => {
      let http = await request({ url : "http://www.google.com"});

      http.should.not.be.empty;
    });

  });




  describe("cloudFlare", () => {
    let request = strategies.cloudflare.request;

    it("should get google.com by url", async () => {
      let http = await request("http://www.google.com");

      http.should.not.be.empty;
    });

    it("should get google.com", async () => {
      let http = await request({ url : "http://www.google.com"});

      http.should.not.be.empty;
    });

    it("should post to google.com", async()=>{
      let http = await request({ url : "http://www.google.com", method: "POST"});

      http.should.not.be.empty;
      http.should.contain("405"); // posting is not allowed on google.com page, 405 error is thrown
    });

    it("should fail", async()=>{
      try {
        let http = await request({url: "http://www.google.someWeird", timeout: 1});

        http.should.be.eq(null);

      }catch (e){
        e.should.not.be.null;
      }

    });

  });
});


