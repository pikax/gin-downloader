/**
 * Created by pikax on 23/05/2017.
 */

import {OptionsWithUrl} from "request";
import {RequestStrategy} from "../../src/request/headers";

export class MockRequestStrategy implements RequestStrategy {

  request(options: string | OptionsWithUrl): Promise<any> {

    return Promise.resolve((<any>options).return || options );
  }
}



export const strategy = new MockRequestStrategy();

export default strategy;
