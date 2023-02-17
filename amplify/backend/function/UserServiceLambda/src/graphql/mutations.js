/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

module.exports.createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $input: CreateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    createAnswer(input: $input, condition: $condition) {
      id
      answer
      userID
      questionID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.updateAnswer = /* GraphQL */ `
  mutation UpdateAnswer(
    $input: UpdateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    updateAnswer(input: $input, condition: $condition) {
      id
      answer
      userID
      questionID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.deleteAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $input: DeleteAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    deleteAnswer(input: $input, condition: $condition) {
      id
      answer
      userID
      questionID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.createQualification = /* GraphQL */ `
  mutation CreateQualification(
    $input: CreateQualificationInput!
    $condition: ModelQualificationConditionInput
  ) {
    createQualification(input: $input, condition: $condition) {
      id
      variations
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.updateQualification = /* GraphQL */ `
  mutation UpdateQualification(
    $input: UpdateQualificationInput!
    $condition: ModelQualificationConditionInput
  ) {
    updateQualification(input: $input, condition: $condition) {
      id
      variations
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.deleteQualification = /* GraphQL */ `
  mutation DeleteQualification(
    $input: DeleteQualificationInput!
    $condition: ModelQualificationConditionInput
  ) {
    deleteQualification(input: $input, condition: $condition) {
      id
      variations
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
      id
      variations
      answers {
        nextToken
        startedAt
      }
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
      id
      variations
      answers {
        nextToken
        startedAt
      }
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
      id
      variations
      answers {
        nextToken
        startedAt
      }
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.createJob = /* GraphQL */ `
  mutation CreateJob(
    $input: CreateJobInput!
    $condition: ModelJobConditionInput
  ) {
    createJob(input: $input, condition: $condition) {
      id
      url
      companyName
      position
      jobType
      salary
      remote
      qualifications
      benefits
      expLvl
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.updateJob = /* GraphQL */ `
  mutation UpdateJob(
    $input: UpdateJobInput!
    $condition: ModelJobConditionInput
  ) {
    updateJob(input: $input, condition: $condition) {
      id
      url
      companyName
      position
      jobType
      salary
      remote
      qualifications
      benefits
      expLvl
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.deleteJob = /* GraphQL */ `
  mutation DeleteJob(
    $input: DeleteJobInput!
    $condition: ModelJobConditionInput
  ) {
    deleteJob(input: $input, condition: $condition) {
      id
      url
      companyName
      position
      jobType
      salary
      remote
      qualifications
      benefits
      expLvl
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.createJobPreferences = /* GraphQL */ `
  mutation CreateJobPreferences(
    $input: CreateJobPreferencesInput!
    $condition: ModelJobPreferencesConditionInput
  ) {
    createJobPreferences(input: $input, condition: $condition) {
      id
      jobTypes
      salaryReq
      expLvl
      preferredLocation
      preferredAge
      qualifications
      education
      companyBlacklist
      jobLinksLimit
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.updateJobPreferences = /* GraphQL */ `
  mutation UpdateJobPreferences(
    $input: UpdateJobPreferencesInput!
    $condition: ModelJobPreferencesConditionInput
  ) {
    updateJobPreferences(input: $input, condition: $condition) {
      id
      jobTypes
      salaryReq
      expLvl
      preferredLocation
      preferredAge
      qualifications
      education
      companyBlacklist
      jobLinksLimit
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.deleteJobPreferences = /* GraphQL */ `
  mutation DeleteJobPreferences(
    $input: DeleteJobPreferencesInput!
    $condition: ModelJobPreferencesConditionInput
  ) {
    deleteJobPreferences(input: $input, condition: $condition) {
      id
      jobTypes
      salaryReq
      expLvl
      preferredLocation
      preferredAge
      qualifications
      education
      companyBlacklist
      jobLinksLimit
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
module.exports.createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      jobLinks
      jobLinkCollectionInProgress
      jobPostingInProgress
      currentAppInfo
      subscriptionType
      subscriptionTier
      isActive
      identifier
      JobPreferences {
        id
        jobTypes
        salaryReq
        expLvl
        preferredLocation
        preferredAge
        qualifications
        education
        companyBlacklist
        jobLinksLimit
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Answers {
        nextToken
        startedAt
      }
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userJobPreferencesId
    }
  }
`;
module.exports.updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      jobLinks
      jobLinkCollectionInProgress
      jobPostingInProgress
      currentAppInfo
      subscriptionType
      subscriptionTier
      isActive
      identifier
      JobPreferences {
        id
        jobTypes
        salaryReq
        expLvl
        preferredLocation
        preferredAge
        qualifications
        education
        companyBlacklist
        jobLinksLimit
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Answers {
        nextToken
        startedAt
      }
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userJobPreferencesId
    }
  }
`;
module.exports.deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      jobLinks
      jobLinkCollectionInProgress
      jobPostingInProgress
      currentAppInfo
      subscriptionType
      subscriptionTier
      isActive
      identifier
      JobPreferences {
        id
        jobTypes
        salaryReq
        expLvl
        preferredLocation
        preferredAge
        qualifications
        education
        companyBlacklist
        jobLinksLimit
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Answers {
        nextToken
        startedAt
      }
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userJobPreferencesId
    }
  }
`;
