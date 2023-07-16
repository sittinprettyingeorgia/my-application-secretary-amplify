const {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    UpdateItemCommand,
    DeleteItemCommand
  } = require('@aws-sdk/client-dynamodb');
  const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
  const { unmarshall, marshall } = require('@aws-sdk/util-dynamodb');
  const { validateParams } = require('./validator');
  const log = require('loglevel');
  
  log.setLevel('error');
  
  const userTableName = process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_NAME;

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
          fromDb: attributeValue => attributeValue.L.map(value => value.S)
        }
      };
      const translateConfig = { marshallOptions, unmarshallOptions };
  
      let dynamoDB = new DynamoDBClient({
        region: process.env.REGION,
        httpOptions: {
          timeout: 3000
        }
      });
      dynamoClient = DynamoDBDocument.from(dynamoDB, translateConfig);
  
      return dynamoClient;
    } catch (e) {
      log.error(e);
      throw new Error(e, 'getDynamoClient error');
    }
  };
  
  class DynamoUtil {
    dynamoClient;
  
    constructor(dynamoClient) {
      this.dynamoClient = dynamoClient;
      this.lastRefillTime = Date.now();
    }
  
    async query(action, Username) {
      try {
        let result;
        validateParams(action, Username);
  
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
  
    async getItem(
      identifier,
      TableName = userTableName
    ) {
      try {
        validateParams(identifier, TableName);
  
        const Key = {
          identifier: { S: identifier }
        };
  
        const params = { TableName, Key };
        const result = await this.dynamoClient.send(new GetItemCommand(params));
  
        if (result?.Item) {
          return unmarshall(result.Item);
        }
  
        return null;
      } catch (e) {
        log.error(e);
        throw new Error('There was an error reading the item');
      }
    }
  
    async putItem(
      item,
      TableName = userTableName
    ) {
      try {
        validateParams(item, TableName);
  
        const Item = marshall(item);
        const params = { TableName, Item };
  
        await this.dynamoClient.send(new PutItemCommand(params));
      } catch (e) {
        log.error(e);
        throw new Error('There was an error updating the item');
      }
    }
  
    async updateModelExpiresAt(
      identifier,
      modelExpiresAt,
      TableName = userTableName
    ) {
      try {
        validateParams(identifier, modelExpiresAt);
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
  
    async updateChromeStatus(item, id) {
      try {
        validateParams(item);
        const TableName =
          userTableName;
        console.log(item.jobLinks);
  
        const UpdateExpression = `SET jobLinkCollectionInProgress = :jobLinkCollectionInProgress, jobPostingInProgress = :jobPostingInProgress, jobLinks = :jobLinks`;
        const ExpressionAttributeValues = {
          ':jobLinks': { L: item.jobLinks.map(link => ({ S: link })) },
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
  
    async updateNlpModel(nlpModel, modelExpiresAt, id) {
      try {
        validateParams(nlpModel);
  
        const TableName =
          userTableName;
  
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
  
    async deleteItem(
      identifier,
      TableName = userTableName
    ) {
      try {
        validateParams(identifier, TableName);
  
        // Construct the update request
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

  module.exports.dynamo = dynamo;
  