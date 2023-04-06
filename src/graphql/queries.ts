/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCorpus = /* GraphQL */ `
  query GetCorpus($id: ID!) {
    getCorpus(id: $id) {
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
export const listCorpuses = /* GraphQL */ `
  query ListCorpuses(
    $filter: ModelCorpusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCorpuses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCorpuses = /* GraphQL */ `
  query SyncCorpuses(
    $filter: ModelCorpusFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCorpuses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getJob = /* GraphQL */ `
  query GetJob($id: ID!) {
    getJob(id: $id) {
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
export const listJobs = /* GraphQL */ `
  query ListJobs(
    $filter: ModelJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncJobs = /* GraphQL */ `
  query SyncJobs(
    $filter: ModelJobFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncJobs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const jobByPositionAndSalary = /* GraphQL */ `
  query JobByPositionAndSalary(
    $position: String!
    $salary: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    jobByPositionAndSalary(
      position: $position
      salary: $salary
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getRateLimit = /* GraphQL */ `
  query GetRateLimit($identifier: String!) {
    getRateLimit(identifier: $identifier) {
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
export const listRateLimits = /* GraphQL */ `
  query ListRateLimits(
    $identifier: String
    $filter: ModelRateLimitFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRateLimits(
      identifier: $identifier
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncRateLimits = /* GraphQL */ `
  query SyncRateLimits(
    $filter: ModelRateLimitFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRateLimits(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($identifier: String!) {
    getUser(identifier: $identifier) {
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
      key
      keyId
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $identifier: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      identifier: $identifier
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
        key
        keyId
        usagePlanId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
        key
        keyId
        usagePlanId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const usersById = /* GraphQL */ `
  query UsersById(
    $id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersById(
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        key
        keyId
        usagePlanId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
