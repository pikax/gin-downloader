const ginDownloader = require('./dist/index');

module.exports = {
    ...ginDownloader,
    default: ginDownloader.gindownloader
}
