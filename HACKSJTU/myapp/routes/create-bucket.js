
const libstorj = require('libgenaro');


const storj = new libstorj.Environment({
  bridgeUrl: 'http://101.132.159.197:8080',
  bridgeUser: 'simon@tedxsuzhou.com',
  bridgePass: 'fdsafdsa',
  encryptionKey: 'item bread pride medal mule stand ripple coil patch feed census cause',
  logLevel: 0
});

const testBucketName = 'test-' + Date.now();
storj.createBucket(testBucketName, function(err, result) {
  if (err) {
    return console.error(err);
  }
  console.log('info:', result);
  storj.destroy();
});
