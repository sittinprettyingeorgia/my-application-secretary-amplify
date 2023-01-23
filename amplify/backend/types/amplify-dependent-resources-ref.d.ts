export type AmplifyDependentResourcesAttributes = {
    "api": {
        "myapplicationsecretaryamplify": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "UserService": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
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
        "myapplicationsecretaawsAmplify": {
            "Arn": "string"
        },
        "myapplicationsecretafuse": {
            "Arn": "string"
        },
        "myapplicationsecretaawsSdk": {
            "Arn": "string"
        },
        "myapplicationsecretanodeFetch": {
            "Arn": "string"
        },
        "UserServiceLambda": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}