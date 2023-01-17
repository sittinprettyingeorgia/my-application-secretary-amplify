/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer(
    $filter: ModelSubscriptionAnswerFilterInput
    $owner: String
  ) {
    onCreateAnswer(filter: $filter, owner: $owner) {
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
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer(
    $filter: ModelSubscriptionAnswerFilterInput
    $owner: String
  ) {
    onUpdateAnswer(filter: $filter, owner: $owner) {
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
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer(
    $filter: ModelSubscriptionAnswerFilterInput
    $owner: String
  ) {
    onDeleteAnswer(filter: $filter, owner: $owner) {
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
export const onCreateQualification = /* GraphQL */ `
  subscription OnCreateQualification(
    $filter: ModelSubscriptionQualificationFilterInput
    $owner: String
  ) {
    onCreateQualification(filter: $filter, owner: $owner) {
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
export const onUpdateQualification = /* GraphQL */ `
  subscription OnUpdateQualification(
    $filter: ModelSubscriptionQualificationFilterInput
    $owner: String
  ) {
    onUpdateQualification(filter: $filter, owner: $owner) {
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
export const onDeleteQualification = /* GraphQL */ `
  subscription OnDeleteQualification(
    $filter: ModelSubscriptionQualificationFilterInput
    $owner: String
  ) {
    onDeleteQualification(filter: $filter, owner: $owner) {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion(
    $filter: ModelSubscriptionQuestionFilterInput
    $owner: String
  ) {
    onCreateQuestion(filter: $filter, owner: $owner) {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion(
    $filter: ModelSubscriptionQuestionFilterInput
    $owner: String
  ) {
    onUpdateQuestion(filter: $filter, owner: $owner) {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion(
    $filter: ModelSubscriptionQuestionFilterInput
    $owner: String
  ) {
    onDeleteQuestion(filter: $filter, owner: $owner) {
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
export const onCreateJob = /* GraphQL */ `
  subscription OnCreateJob(
    $filter: ModelSubscriptionJobFilterInput
    $owner: String
  ) {
    onCreateJob(filter: $filter, owner: $owner) {
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
export const onUpdateJob = /* GraphQL */ `
  subscription OnUpdateJob(
    $filter: ModelSubscriptionJobFilterInput
    $owner: String
  ) {
    onUpdateJob(filter: $filter, owner: $owner) {
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
export const onDeleteJob = /* GraphQL */ `
  subscription OnDeleteJob(
    $filter: ModelSubscriptionJobFilterInput
    $owner: String
  ) {
    onDeleteJob(filter: $filter, owner: $owner) {
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
export const onCreateJobPreferences = /* GraphQL */ `
  subscription OnCreateJobPreferences(
    $filter: ModelSubscriptionJobPreferencesFilterInput
    $owner: String
  ) {
    onCreateJobPreferences(filter: $filter, owner: $owner) {
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
export const onUpdateJobPreferences = /* GraphQL */ `
  subscription OnUpdateJobPreferences(
    $filter: ModelSubscriptionJobPreferencesFilterInput
    $owner: String
  ) {
    onUpdateJobPreferences(filter: $filter, owner: $owner) {
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
export const onDeleteJobPreferences = /* GraphQL */ `
  subscription OnDeleteJobPreferences(
    $filter: ModelSubscriptionJobPreferencesFilterInput
    $owner: String
  ) {
    onDeleteJobPreferences(filter: $filter, owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
