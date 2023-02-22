const { DynamoDBClient, ScanCommand, QueryCommand } = require('@aws-sdk/client-dynamodb');
const Fuse = require('fuse.js');

module.exports.ddbClient = new DynamoDBClient({ region: 'us-east-1' });
module.exports.getError = (e) => {
    let message = '';
    let err;
  
    if (e.response) {
      message =
        'The request was made and the server responded with a status code that falls out of the range of 2xx';
      err = { message, status: e?.response?.status, data: e?.response?.data};
    } else if (e.request) {
      message =
        'The request was made but no response was received `e.request` is an instance of XMLHttpRequest' +
        ' in the browser and an instance of http.ClientRequest in node.js';
      err = { message, error: e.request};
    } else {
      message =
        'Something happened in setting up the request that triggered an error';
      err = { message };
    }
  
    return err;
};

module.exports.CONSTANTS = {
  POST: 'POST',
  X_API_KEY: 'x-api-key',
  API_KEY_CONST: 'API_KEY',
};

module.exports.searchForAnswers = async(questionVariations, userID) => {
  const answerArray = [];

  for (const questionVariation of questionVariations) {
    const params = {
      TableName: 'Question',
      IndexName: 'byQuestion',
      KeyConditionExpression: 'id = :idValue',
      FilterExpression: 'contains(answers[0].userID, :userIdValue) OR answers[0].userID <= :zeroValue',
      ExpressionAttributeValues: {
        ':idValue': 'questionId',
        ':userIdValue': userID,
        ':zeroValue': 0,
      },
    };

    try {
      const data = await ddbClient.send(new ScanCommand(params));

      const options = {
        keys: ['variations'],
        threshold: 0.3,
      };

      const fuse = new Fuse(data.Items, options);

      const result = fuse.search(questionVariation);

      if (result.length > 0) {
        const questionId = result[0].id;
        const answer = result[0].answers[0].answer;
        const answerUserId = result[0].answers[0].userID;

        if (answerUserId <= 0 || answerUserId === userID) {
          answerArray.push(answer);
        }
      } else {
        const qualificationParams = {
          TableName: 'Qualification',
          ProjectionExpression: 'id, variations, questionId',
        };

        const qualificationData = await ddbClient.send(new ScanCommand(qualificationParams));
        const qualificationFuse = new Fuse(qualificationData.Items, options);
        const qualificationResult = qualificationFuse.search(questionVariation);

        if (qualificationResult.length > 0) {
          const questionId = qualificationResult[0].questionId;
          const answerParams = {
            TableName: 'Answer',
            KeyConditionExpression: 'questionID = :qId',
            ExpressionAttributeValues: {
              ':qId': { S: questionId },
            },
          };

          const answerData = await ddbClient.send(new QueryCommand(answerParams));
          const answer = answerData.Items[0].answer.S;
          const answerUserId = answerData.Items[0].userID.N;

          if (answerUserId <= 0 || answerUserId === userID) {
            answerArray.push(answer, qualificationResult[0].variations[0]);
          }
        } else {
          answerArray.push('Yes');
        }
      }
    } catch (err) {
      console.log(err);
      answerArray.push('Error');
    }
  }

  return answerArray;
}