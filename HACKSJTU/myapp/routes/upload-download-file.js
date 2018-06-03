const libstorj = require('libgenaro');

const storj = new libstorj.Environment({
  bridgeUrl: 'http://101.132.159.197:8080',
  bridgeUser: 'simon@tedxsuzhou.com',
  bridgePass: 'fdsafdsa',
  encryptionKey: 'item bread pride medal mule stand ripple coil patch feed census cause',
  logLevel: 0
});

const bucketId = 'dca3c8321db05b01c52cbeaf';
const uploadFilePath = './file/test2.txt';
const downloadFilePath = './downloadFile/test2.txt';
const fileName = 'test2.txt';

// upload file
storj.storeFile(bucketId, uploadFilePath, {
  filename: fileName,
  progressCallback: function(progress, uploadedBytes, totalBytes) {
    console.log('Progress: %d, uploadedBytes: %d, totalBytes: %d',
                progress, uploadedBytes, totalBytes);
  },
  finishedCallback: function(err, fileId) {
    if (err) {
      return console.error(err);
    }
    console.log('File upload complete:', fileId);

    // download file that was just uploaded
    storj.resolveFile(bucketId, fileId, downloadFilePath, {
      progressCallback: function(progress, downloadedBytes, totalBytes) {
        console.log('Progress: %d, downloadedBytes: %d, totalBytes: %d',
                    progress, downloadedBytes, totalBytes);
      },
      finishedCallback: function(err) {
        if (err) {
          return console.error(err);
        }
        console.log('File download complete');
        storj.destroy();
      }
    });
  }
});
