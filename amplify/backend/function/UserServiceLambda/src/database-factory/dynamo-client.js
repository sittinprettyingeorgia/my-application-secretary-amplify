const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand
} = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { unmarshall, marshall } = require('@aws-sdk/util-dynamodb');

const getDynamoClient = () => {
  try {
    let dynamoClient;
    const marshallOptions = {
      // Whether to automatically convert empty strings, blobs, and sets to `null`.
      convertEmptyValues: true // false, by default.
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

    let dynamoDB = new DynamoDBClient({ region: process.env.REGION });
    dynamoClient = DynamoDBDocument.from(dynamoDB, translateConfig);

    return dynamoClient;
  } catch (e) {
    console.log(e);
  }
};

class DynamoUtil {
  dynamoClient;

  constructor(dynamoClient) {
    this.dynamoClient = dynamoClient;
    this.lastRefillTime = Date.now();
  }

  async query(action, Username) {
    let result;

    switch (action) {
      case 'getUser':
        result = await this.getItem(Username);
        break;
    }

    return result;
  }

  async getItem(
    identifier,
    TableName = process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_NAME
  ) {
    try {
      if (!identifier) {
        throw new Error('The key could not be found');
      }

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
      console.log(e);
      return 'There was an error retrieving the item';
    }
  }

  async putItem(
    item,
    TableName = process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_NAME
  ) {
    try {
      if (!item) {
        throw new Error('The item could not be found');
      }

      const Item = marshall(item);
      const params = { TableName, Item };
      await this.dynamoClient.send(new PutItemCommand(params));
    } catch (e) {
      console.log(e);
      return 'There was an error retrieving the user';
    }
  }
}

const dynamoClient = getDynamoClient();
const dynamo = new DynamoUtil(dynamoClient);

module.exports.dynamo = dynamo;
