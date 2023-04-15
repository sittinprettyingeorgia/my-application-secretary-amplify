/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCorpus = /* GraphQL */ `
  subscription OnCreateCorpus($filter: ModelSubscriptionCorpusFilterInput) {
    onCreateCorpus(filter: $filter) {
      id
      corpus {
        name
        locale
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateCorpus = /* GraphQL */ `
  subscription OnUpdateCorpus($filter: ModelSubscriptionCorpusFilterInput) {
    onUpdateCorpus(filter: $filter) {
      id
      corpus {
        name
        locale
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteCorpus = /* GraphQL */ `
  subscription OnDeleteCorpus($filter: ModelSubscriptionCorpusFilterInput) {
    onDeleteCorpus(filter: $filter) {
      id
      corpus {
        name
        locale
      }
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
export const onCreateRateLimit = /* GraphQL */ `
  subscription OnCreateRateLimit(
    $filter: ModelSubscriptionRateLimitFilterInput
  ) {
    onCreateRateLimit(filter: $filter) {
      id
      identifier
      lastRefillTime
      tokenPerMin
      tokenCapacity
      availableTokens
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateRateLimit = /* GraphQL */ `
  subscription OnUpdateRateLimit(
    $filter: ModelSubscriptionRateLimitFilterInput
  ) {
    onUpdateRateLimit(filter: $filter) {
      id
      identifier
      lastRefillTime
      tokenPerMin
      tokenCapacity
      availableTokens
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteRateLimit = /* GraphQL */ `
  subscription OnDeleteRateLimit(
    $filter: ModelSubscriptionRateLimitFilterInput
  ) {
    onDeleteRateLimit(filter: $filter) {
      id
      identifier
      lastRefillTime
      tokenPerMin
      tokenCapacity
      availableTokens
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
      qualifications
      JobPreferences
      corpus {
        name
        locale
      }
      modelExpiresAt
      apikey
      apikeyId
      usagePlanId
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
      qualifications
      JobPreferences
      corpus {
        name
        locale
      }
      modelExpiresAt
      apikey
      apikeyId
      usagePlanId
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
      qualifications
      JobPreferences
      corpus {
        name
        locale
      }
      modelExpiresAt
      apikey
      apikeyId
      usagePlanId
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
