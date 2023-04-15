const { validateParams } = require('../util/validator');
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand
} = require('@aws-sdk/client-s3');
const log = require('loglevel');

log.setLevel('error');

const getS3Client = () => {
  try {
    return new S3Client({ region: process.env.REGION });
  } catch (e) {
    log.error(e);
    throw new Error(e, 'getS3Client error');
  }
};

const Bucket = process.env.NLP_BUCKET_NAME;
class S3Util {
  s3Client;

  constructor(s3Client) {
    this.s3Client = s3Client;
  }

  async updateNlpModel(compressedNlpModel, Key) {
    try {
      validateParams(compressedNlpModel);
      const putObjectParams = {
        Bucket,
        Key,
        Body: compressedNlpModel
      };

      const putObjectCommand = new PutObjectCommand(putObjectParams);
      const { ETag } = await this.s3Client.send(putObjectCommand);

      log.info(`nlpModel uploaded successfully. ETag: ${ETag}`);
    } catch (e) {
      log.error(e);
      throw new Error('There was an error updating the nlpModel');
    }
  }

  async getObjectFromS3(Key) {
    try {
      const getObjectParams = {
        Bucket,
        Key
      };
      const getObjectCommand = new GetObjectCommand(getObjectParams);
      const { Body } = await this.s3Client.send(getObjectCommand);

      return new Promise((resolve, reject) => {
        const chunks = [];
        Body.on('data', chunk => {
          chunks.push(chunk);
        });
        Body.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        Body.on('error', err => {
          reject(err);
        });
      });
    } catch (e) {
      log.error(e);
      throw new Error('There was an error retrieving the nlpModel from s3');
    }
  }
}

const s3 = (() => {
  let instance;

  function getInstance() {
    const s3 = getS3Client();
    instance = new S3Util(s3);
  }

  if (!instance) {
    getInstance();
  }

  return instance;
})();

module.exports.s3 = s3;
