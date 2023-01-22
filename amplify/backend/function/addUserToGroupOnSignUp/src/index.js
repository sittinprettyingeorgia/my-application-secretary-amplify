
const AWS = require('aws-sdk');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context, callback)=> {
  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

  const params = {
      GroupName: 'non-paid-customer', //your confirmed user gets added to this group
      UserPoolId: event.userPoolId,  
      Username: event.userName
  };


  cognitoIdentityServiceProvider.adminAddUserToGroup(params, function(err, data) {

      if (err) {
          callback(err) // uh oh, an error 
      }

      callback(null, event); // yay! success
  });

  return Promise.resolve('Successfully processed DynamoDB record');
};
