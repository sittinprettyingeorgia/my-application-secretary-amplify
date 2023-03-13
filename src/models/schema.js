export const schema = {
    "models": {
        "Corpus": {
            "name": "Corpus",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "corpus": {
                    "name": "corpus",
                    "isArray": false,
                    "type": {
                        "nonModel": "BaseCorpus"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Corpuses",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Job": {
            "name": "Job",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "url": {
                    "name": "url",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "companyName": {
                    "name": "companyName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "position": {
                    "name": "position",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "jobType": {
                    "name": "jobType",
                    "isArray": false,
                    "type": {
                        "enum": "JobType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "salary": {
                    "name": "salary",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "remote": {
                    "name": "remote",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "qualifications": {
                    "name": "qualifications",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "benefits": {
                    "name": "benefits",
                    "isArray": false,
                    "type": {
                        "enum": "BenefitType"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "expLvl": {
                    "name": "expLvl",
                    "isArray": false,
                    "type": {
                        "enum": "ExpType"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Jobs",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byPositionAndSalary",
                        "queryField": "jobByPositionAndSalary",
                        "fields": [
                            "position",
                            "salary"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "User": {
            "name": "User",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "firstName": {
                    "name": "firstName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "lastName": {
                    "name": "lastName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "jobLinks": {
                    "name": "jobLinks",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "jobLinkCollectionInProgress": {
                    "name": "jobLinkCollectionInProgress",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "jobPostingInProgress": {
                    "name": "jobPostingInProgress",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "currentAppInfo": {
                    "name": "currentAppInfo",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "subscriptionType": {
                    "name": "subscriptionType",
                    "isArray": false,
                    "type": {
                        "enum": "SubscriptionType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "subscriptionTier": {
                    "name": "subscriptionTier",
                    "isArray": false,
                    "type": {
                        "enum": "SubscriptionTier"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "isActive": {
                    "name": "isActive",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "identifier": {
                    "name": "identifier",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "qualifications": {
                    "name": "qualifications",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "JobPreferences": {
                    "name": "JobPreferences",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "corpus": {
                    "name": "corpus",
                    "isArray": false,
                    "type": {
                        "nonModel": "BaseCorpus"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Users",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "identifier"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "id"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "operations": [
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "SubscriptionTier": {
            "name": "SubscriptionTier",
            "values": [
                "BASIC",
                "PREMIUM",
                "PREFERRED"
            ]
        },
        "SubscriptionType": {
            "name": "SubscriptionType",
            "values": [
                "MONTHLY",
                "ANNUALLY",
                "ONE_TIME"
            ]
        },
        "ExpType": {
            "name": "ExpType",
            "values": [
                "NONE",
                "ENTRY_LEVEL",
                "MID_LEVEL",
                "SENIOR_LEVEL"
            ]
        },
        "BenefitType": {
            "name": "BenefitType",
            "values": [
                "RET401K",
                "RET401KMATCH",
                "DENTAL",
                "MEDICAL",
                "VISION",
                "PTO"
            ]
        },
        "JobType": {
            "name": "JobType",
            "values": [
                "FULL_TIME",
                "PART_TIME",
                "TEMPORARY",
                "INTERNSHIP",
                "CONTRACT"
            ]
        },
        "EducationType": {
            "name": "EducationType",
            "values": [
                "HIGH_SCHOOL",
                "ASSOCIATES",
                "BACHELORS",
                "MASTERS",
                "DOCTORATE"
            ]
        }
    },
    "nonModels": {
        "Question": {
            "name": "Question",
            "fields": {
                "intent": {
                    "name": "intent",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "utterances": {
                    "name": "utterances",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "answers": {
                    "name": "answers",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                }
            }
        },
        "BaseCorpus": {
            "name": "BaseCorpus",
            "fields": {
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "locale": {
                    "name": "locale",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "data": {
                    "name": "data",
                    "isArray": true,
                    "type": {
                        "nonModel": "Question"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                }
            }
        }
    },
    "codegenVersion": "3.3.2",
    "version": "920760b06f35b2fcc1d2f3a77ebb1660"
};