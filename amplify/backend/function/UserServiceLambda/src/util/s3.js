const { validateParams } = require('./validator');
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

const Bucket = process.env.STORAGE_NLPMODELSTORAGE_BUCKETNAME;
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
      throw new Error('Failed to fetch s3 resource');
    }
  }
}

const s3Client = getS3Client();
const s3 = new S3Util(s3Client);

module.exports.s3 = s3;
