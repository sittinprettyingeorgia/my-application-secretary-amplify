export type AmplifyDependentResourcesAttributes = {
    "api": {
        "UserService": {
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
        "UserServiceLambda": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string",
            "LambdaExecutionRoleArn": "string"
        },
        "myapplicationsecretaawsSdkSSM": {
            "Arn": "string"
        },
        "myapplicationsecretadynamodb": {
            "Arn": "string"
        },
        "myapplicationsecretafuse": {
            "Arn": "string"
        },
        "myapplicationsecretanodeFetch": {
            "Arn": "string"
        }
    }
}