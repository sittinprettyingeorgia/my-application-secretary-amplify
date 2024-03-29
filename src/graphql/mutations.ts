/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCorpus = /* GraphQL */ `
  mutation CreateCorpus(
    $input: CreateCorpusInput!
    $condition: ModelCorpusConditionInput
  ) {
    createCorpus(input: $input, condition: $condition) {
      id
      corpus {
        name
        locale
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateCorpus = /* GraphQL */ `
  mutation UpdateCorpus(
    $input: UpdateCorpusInput!
    $condition: ModelCorpusConditionInput
  ) {
    updateCorpus(input: $input, condition: $condition) {
      id
      corpus {
        name
        locale
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteCorpus = /* GraphQL */ `
  mutation DeleteCorpus(
    $input: DeleteCorpusInput!
    $condition: ModelCorpusConditionInput
  ) {
    deleteCorpus(input: $input, condition: $condition) {
      id
      corpus {
        name
        locale
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createRateLimit = /* GraphQL */ `
  mutation CreateRateLimit(
    $input: CreateRateLimitInput!
    $condition: ModelRateLimitConditionInput
  ) {
    createRateLimit(input: $input, condition: $condition) {
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
      __typename
    }
  }
`;
export const updateRateLimit = /* GraphQL */ `
  mutation UpdateRateLimit(
    $input: UpdateRateLimitInput!
    $condition: ModelRateLimitConditionInput
  ) {
    updateRateLimit(input: $input, condition: $condition) {
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
      __typename
    }
  }
`;
export const deleteRateLimit = /* GraphQL */ `
  mutation DeleteRateLimit(
    $input: DeleteRateLimitInput!
    $condition: ModelRateLimitConditionInput
  ) {
    deleteRateLimit(input: $input, condition: $condition) {
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
      __typename
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
      qualifications
      JobPreferences
      corpus {
        name
        locale
        __typename
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
      __typename
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
      qualifications
      JobPreferences
      corpus {
        name
        locale
        __typename
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
      __typename
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
      qualifications
      JobPreferences
      corpus {
        name
        locale
        __typename
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
      __typename
    }
  }
`;
