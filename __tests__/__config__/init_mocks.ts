/* istanbul ignore next */

if (!process.env.mock) {

} else {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    jest.setTimeout(30000);
}
