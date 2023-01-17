/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $input: CreateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    createAnswer(input: $input, condition: $condition) {
      id
      answer
      userID
      questionID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateAnswer = /* GraphQL */ `
  mutation UpdateAnswer(
    $input: UpdateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    updateAnswer(input: $input, condition: $condition) {
      id
      answer
      userID
      questionID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $input: DeleteAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    deleteAnswer(input: $input, condition: $condition) {
      id
      answer
      userID
      questionID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createQualification = /* GraphQL */ `
  mutation CreateQualification(
    $input: CreateQualificationInput!
    $condition: ModelQualificationConditionInput
  ) {
    createQualification(input: $input, condition: $condition) {
      id
      variations
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateQualification = /* GraphQL */ `
  mutation UpdateQualification(
    $input: UpdateQualificationInput!
    $condition: ModelQualificationConditionInput
  ) {
    updateQualification(input: $input, condition: $condition) {
      id
      variations
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteQualification = /* GraphQL */ `
  mutation DeleteQualification(
    $input: DeleteQualificationInput!
    $condition: ModelQualificationConditionInput
  ) {
    deleteQualification(input: $input, condition: $condition) {
      id
      variations
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createQuestion = /* GraphQL */ `
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createJob = /* GraphQL */ `
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateJob = /* GraphQL */ `
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteJob = /* GraphQL */ `
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createJobPreferences = /* GraphQL */ `
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateJobPreferences = /* GraphQL */ `
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteJobPreferences = /* GraphQL */ `
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createUser = /* GraphQL */ `
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
      JobPreference {
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Answers {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userJobPreferenceId
      owner
    }
  }
`;
export const updateUser = /* GraphQL */ `
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
      JobPreference {
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Answers {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userJobPreferenceId
      owner
    }
  }
`;
export const deleteUser = /* GraphQL */ `
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
      JobPreference {
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Answers {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userJobPreferenceId
      owner
    }
  }
`;
