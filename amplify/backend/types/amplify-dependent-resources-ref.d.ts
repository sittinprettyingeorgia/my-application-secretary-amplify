export type AmplifyDependentResourcesAttributes = {
  "api": {
    "UserService": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "myapplicationsecretaryamplify": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "myapplicationsecretaryamplify": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "HostedUIDomain": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "OAuthMetadata": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "UserServiceLambda": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "myapplicationsecretadynamodb": {
      "Arn": "string"
    },
    "myapplicationsecretanlp": {
      "Arn": "string"
    }
  },
  "storage": {
    "nlpModelStorage": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}