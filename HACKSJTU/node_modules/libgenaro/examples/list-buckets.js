const libstorj = require('..');

const storj = new libstorj.Environment({
  bridgeUrl: 'http://101.132.159.197:8080',
  bridgeUser: 'simon@tedxsuzhou.com',
  bridgePass: 'fdsafdsa',
  encryptionKey: 'item bread pride medal mule stand ripple coil patch feed census cause',
  logLevel: 0
});

storj.getInfo(function(err, result) {
  if (err) {
    return console.error(err);
  }
  console.log('info:', result);

  storj.getBuckets(function(err, result) {
    if (err) {
      return console.error(err);
    }
    console.log('buckets:', result);
    storj.destroy();
  });
});



