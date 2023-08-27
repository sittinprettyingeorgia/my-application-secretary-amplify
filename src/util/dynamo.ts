/* eslint-disable prefer-const */
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand
} from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb';
import log from 'loglevel';

log.setLevel('error');

const userTableName =
  process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_NAME;

const getDynamoClient = () => {
  try {
    let dynamoClient;
    const marshallOptions = {
      // Whether to automatically convert empty strings, blobs, and sets to `null`.
      convertEmptyValues: true, // false, by default.
      removeUndefinedValues: true
    };

    const unmarshallOptions = {
      // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
      wrapNumbers: false, // false, by default.

      // Here we specify that the 'listAttr' field is a List type
      // with elements of type 'S' (String)
      typeConverter: {
        fromDb: (attributeValue: any) =>
          attributeValue.L.map((value: any) => value.S)
      }
    };
    const translateConfig = { marshallOptions, unmarshallOptions };

    const dynamoDBClient = new DynamoDBClient({ region: process.env.REGION });
    dynamoClient = DynamoDBDocument.from(dynamoDBClient, translateConfig);

    return dynamoClient;
  } catch (e: any) {
    log.error(e);
    throw new Error('Get DynamoClient error');
  }
};

class DynamoUtil {
  dynamoClient: any;
  lastRefillTime;

  constructor(dynamoClient: DynamoDBDocument) {
    this.dynamoClient = dynamoClient;
    this.lastRefillTime = Date.now();
  }

  async query(action: string, Username: string) {
    try {
      let result;

      switch (action) {
        case 'getUser':
          result = await this.getItem(Username);
          break;
      }

      return result;
    } catch (e) {
      log.error(e);
      throw new Error('get DynamoClient error');
    }
  }

  async getItem(identifier: string, TableName = userTableName) {
    try {
      const Key = {
        identifier: { S: identifier }
      };

      const result: any = await this.dynamoClient.send(
        new GetItemCommand({ TableName, Key })
      );

      if (result?.Item) {
        return unmarshall(result.Item);
      }

      return null;
    } catch (e) {
      log.error(e);
      throw new Error('There was an error reading the item');
    }
  }

  async putItem(item: any, TableName = userTableName) {
    try {
      const Item = marshall(item);

      await this.dynamoClient.send(new PutItemCommand({ TableName, Item }));
    } catch (e) {
      log.error(e);
      throw new Error('There was an error updating the item');
    }
  }

  async updateModelExpiresAt(
    identifier: string,
    modelExpiresAt: string | number,
    TableName = userTableName
  ) {
    try {
      const Key = {
        identifier: { S: identifier }
      };

      const params = {
        TableName,
        Key,
        UpdateExpression: 'SET modelExpiresAt = :modelExpiresAt',
        ExpressionAttributeValues: {
          ':modelExpiresAt': { S: new Date(modelExpiresAt).toISOString() }
        },
        ReturnValues: 'ALL_NEW'
      };

      const command = new UpdateItemCommand(params);
      await this.dynamoClient.send(command);
    } catch (e) {
      log.error(e);
      throw new Error(
        'There was an error updating the items modelExpiresAt property'
      );
    }
  }

  async updateChromeStatus(item: any, id: string) {
    try {
      const TableName = userTableName;

      const UpdateExpression = `SET jobLinkCollectionInProgress = :jobLinkCollectionInProgress, jobPostingInProgress = :jobPostingInProgress, jobLinks = :jobLinks`;
      const ExpressionAttributeValues = {
        ':jobLinks': { L: item.jobLinks.map((link: string) => ({ S: link })) },
        ':jobLinkCollectionInProgress': {
          BOOL: item.jobLinkCollectionInProgress
        },
        ':jobPostingInProgress': { BOOL: item.jobPostingInProgress }
      };

      // Construct the update request
      const params = {
        TableName,
        Key: {
          identifier: { S: id }
        },
        UpdateExpression,
        ExpressionAttributeValues,
        ReturnValues: 'ALL_NEW'
      };

      const result = await this.dynamoClient.send(
        new UpdateItemCommand(params)
      );

      if (result && result?.$metadata?.httpStatusCode !== 200) {
        throw new Error();
      }
    } catch (e) {
      log.error(e);
      throw new Error('There was an error updating the item');
    }
  }

  async updateNlpModel(
    nlpModel: any,
    modelExpiresAt: string | number,
    id: string
  ) {
    try {
      const TableName = userTableName;

      const UpdateExpression = `SET nlpModel = :nlpModel, modelExpiresAt = :modelExpiresAt`;
      const ExpressionAttributeValues = {
        ':nlpModel': { S: JSON.stringify(nlpModel) },
        ':modelExpiresAt': { S: modelExpiresAt.toString() }
      };

      // Construct the update request
      const params = {
        TableName,
        Key: {
          identifier: { S: id }
        },
        UpdateExpression,
        ExpressionAttributeValues,
        ReturnValues: 'ALL_NEW'
      };

      const result = await this.dynamoClient.send(
        new UpdateItemCommand(params)
      );

      if (result && result?.$metadata?.httpStatusCode !== 200) {
        throw new Error();
      }
    } catch (e) {
      log.error(e);
      throw new Error('There was an error updating the item');
    }
  }

  async deleteItem(identifier: string, TableName = userTableName) {
    try {
      // Construct the updatase request
      const params = {
        TableName,
        Key: {
          identifier: { S: identifier }
        }
      };

      await this.dynamoClient.send(new DeleteItemCommand(params));
    } catch (e) {
      log.error(e);
      throw new Error('There was an error deleting the item');
    }
  }
}

const dynamoClient = getDynamoClient();
const dynamo = new DynamoUtil(dynamoClient);

export default dynamo;
