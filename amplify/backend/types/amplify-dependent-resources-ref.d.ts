export type AmplifyDependentResourcesAttributes = {
    "api": {
        "QAService": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "myapplicationsecretaryamplify": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "myapplicationsecretaryamplify": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "HostedUIDomain": "string",
            "OAuthMetadata": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "function": {
        "QAServiceLambda": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string",
            "LambdaExecutionRoleArn": "string"
        },
        "addUserToGroupOnSignUp": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string",
            "LambdaExecutionRoleArn": "string"
        },
        "myapplicationsecretaawsAmplify": {
            "Arn": "string"
        },
        "myapplicationsecretaawsSdk": {
            "Arn": "string"
        },
        "myapplicationsecretafuse": {
            "Arn": "string"
        }
    }
}