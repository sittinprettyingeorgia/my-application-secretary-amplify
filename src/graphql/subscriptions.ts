/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSystemQuestionAndAnswer = /* GraphQL */ `
  subscription OnCreateSystemQuestionAndAnswer(
    $filter: ModelSubscriptionSystemQuestionAndAnswerFilterInput
  ) {
    onCreateSystemQuestionAndAnswer(filter: $filter) {
      id
      answerVariations
      questionVariations
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateSystemQuestionAndAnswer = /* GraphQL */ `
  subscription OnUpdateSystemQuestionAndAnswer(
    $filter: ModelSubscriptionSystemQuestionAndAnswerFilterInput
  ) {
    onUpdateSystemQuestionAndAnswer(filter: $filter) {
      id
      answerVariations
      questionVariations
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteSystemQuestionAndAnswer = /* GraphQL */ `
  subscription OnDeleteSystemQuestionAndAnswer(
    $filter: ModelSubscriptionSystemQuestionAndAnswerFilterInput
  ) {
    onDeleteSystemQuestionAndAnswer(filter: $filter) {
      id
      answerVariations
      questionVariations
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onCreateQuestion(filter: $filter) {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onUpdateQuestion(filter: $filter) {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onDeleteQuestion(filter: $filter) {
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
export const onCreateJob = /* GraphQL */ `
  subscription OnCreateJob($filter: ModelSubscriptionJobFilterInput) {
    onCreateJob(filter: $filter) {
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
export const onUpdateJob = /* GraphQL */ `
  subscription OnUpdateJob($filter: ModelSubscriptionJobFilterInput) {
    onUpdateJob(filter: $filter) {
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
export const onDeleteJob = /* GraphQL */ `
  subscription OnDeleteJob($filter: ModelSubscriptionJobFilterInput) {
    onDeleteJob(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
      qualifications
      JobPreferences
      answerAndQuestionIds
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
      qualifications
      JobPreferences
      answerAndQuestionIds
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
      qualifications
      JobPreferences
      answerAndQuestionIds
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
