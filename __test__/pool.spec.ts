import "./common";
import {GinUrlOptions, RequestStrategy} from "src/request";
import {HistoryPool, IntervalPool} from "src/request/pool";
import {isCombinedNodeFlagSet} from "tslint";
import {promiseSetTimeout} from "src/util";

class MockedRequestStrategy implements RequestStrategy {
  request(options: GinUrlOptions): Promise<any> {
    return Promise.resolve("mocked");
  }
}


function makeMockedStrategy(p: () => Promise<any> ): RequestStrategy {
  return {
    request: (options: GinUrlOptions) => p()
  };
}





describe("request pool", () => {




  describe("interval pool", () => {


    function mockRequest<T>(value?: T) {
      return makeMockedStrategy(() => {
        // console.log(`took ${Date.now() - dt}ms to finish expecting ${requestInterval}`);
        return Promise.resolve(value || 1);
      });
    }


    it("should run straight", async () => {
      const requestInterval = 500;
      const queue = new IntervalPool({match: /-/, requestInterval});

      const dt = Date.now();
      await queue.queue("", mockRequest());
      const lapsed = Date.now() - dt;
      // console.log(`1 - took ${lapsed}ms to finish expecting ${requestInterval}`);
      lapsed.should.be.lt(requestInterval);
    });


    it("should fail ", async () => {
      const requestInterval = 500;
      const queue = new IntervalPool({match: /-/, requestInterval});

      try {
        const strategy = makeMockedStrategy(() => promiseSetTimeout(requestInterval + 100).then(x => {throw new Error("fail"); }));

        await queue.queue("", strategy);
        "1".should.be.eq(2); // it should never it this
      }
      catch (e){
        e.should.be.throw;
      }

    });


    it("should fail middle but should continue ", async () => {
      const n = 7;
      const requestInterval = 500;
      const queue = new IntervalPool({match: /-/, requestInterval});

      const strategy = makeMockedStrategy(() => promiseSetTimeout(requestInterval + 100).then(x => {throw new Error("fail"); }));

      const p: Promise<number>[] = [];

      for (let i = 1; i <= n; i++) {
        p.push(queue.queue("", i % 3 === 0 ? strategy : mockRequest(i)));
      }

      for(let i= 0; i< p.length; i++){
        try {
          const v = await p[i];

          v.should.be.eq(i + 1);
        }
        catch (e){
          ((i + 1) % 3).should.be.eq(0);
        }
      }
    });

    it("should wait 500ms", async () => {
      const requestInterval = 500;
      const queue = new IntervalPool({match: /-/, requestInterval});


      let dt = Date.now();

      await queue.queue("", mockRequest());

      dt = Date.now();

      await queue.queue("", mockRequest())
        .then(x => {
          const lapsed = Date.now() - dt;
          // console.log(`1 - took ${lapsed}ms to finish expecting ${requestInterval}`);
          lapsed.should.not.be.lt(requestInterval);
        });
    });



    it("should wait 1000ms", async () => {
      const requestInterval = 500;
      const queue = new IntervalPool({match: /-/, requestInterval});


      let dt = Date.now();

      queue.queue("", mockRequest());

      dt = Date.now();

      await queue.queue("", mockRequest())
        .then(x => {
          const lapsed = Date.now() - dt;
          // console.log(`1 - took ${lapsed}ms to finish expecting ${requestInterval}`);
          lapsed.should.not.be.lt(requestInterval);
        });

      dt = Date.now();

      await queue.queue("", mockRequest())
        .then(x => {
          const lapsed = Date.now() - dt;
          // console.log(`2 - took ${lapsed}ms to finish expecting ${requestInterval}`);
          lapsed.should.not.be.lt(requestInterval);
        });
    });


    it("should wait but without wait 1000ms", async () => {
      const requestInterval = 500;
      const queue = new IntervalPool({match: /-/, requestInterval});
      const strategy = makeMockedStrategy(() => promiseSetTimeout(requestInterval + 100).then(x => 1));

      let dt = Date.now();

      queue.queue("", strategy);

      dt = Date.now();

      await queue.queue("", strategy)
        .then(x => {
          const lapsed = Date.now() - dt;
          // console.log(`1 - took ${lapsed}ms to finish expecting ${requestInterval}`);
          lapsed.should.not.be.lt(requestInterval);
        });

      dt = Date.now();

      await queue.queue("", strategy)
        .then(x => {
          const lapsed = Date.now() - dt;
          // console.log(`2 - took ${lapsed}ms to finish expecting ${requestInterval}`);
          lapsed.should.not.be.lt(requestInterval);
        });
    });




    it(`should generate 7 and resolve them by order`, async () => {
      const n = 7;
      const requestInterval = 500;
      const queue = new IntervalPool({match: /-/, requestInterval});

      let dt = Date.now();


      const p: Promise<number>[] = [];

      for (let i = 1; i <= n; i++) {
        p.push(queue.queue("", mockRequest(i)));
      }

      const r = await Promise.all(p);

      r.forEach((v, i) => v.should.be.eq(i + 1));
      const lapsed = Date.now() - dt;

      lapsed.should.not.be.lt(requestInterval * (n - 1));
    });


    it("should set active item", () => {
      const requestInterval = 500;
      const queue = new IntervalPool({match: /-/, requestInterval});
      const strategy = makeMockedStrategy(() => promiseSetTimeout(500).then(x => 1));

      queue.queue("", strategy);

      queue.isActive.should.be.true;
    });



    it("should set active item to null after finish", async () => {
      const requestInterval = 500;
      const queue = new IntervalPool({match: /-/, requestInterval});
      const strategy = makeMockedStrategy(() => promiseSetTimeout(requestInterval).then(x => 1));

      let dt = Date.now();

      await queue.queue("", strategy);

      const lapsed = Date.now() - dt;
      lapsed.should.not.be.lt(requestInterval - 10);
      queue.isActive.should.be.false;

    });




    it("should create correct history", async () => {
      const requestInterval = 500;
      const queue = new IntervalPool({match: /-/, requestInterval});

      const n = 7;
      const p = [];

      for (let i = 1; i <= n; i++) {
        p.push(queue.queue("", mockRequest(i)));
      }

      const r = await Promise.all(p);

      queue.history.length.should.be.eq(n);

    });




  });

});
