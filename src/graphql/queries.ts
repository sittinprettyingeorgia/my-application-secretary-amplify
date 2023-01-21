/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAnswer = /* GraphQL */ `
  query GetAnswer($id: ID!) {
    getAnswer(id: $id) {
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
export const listAnswers = /* GraphQL */ `
  query ListAnswers(
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncAnswers = /* GraphQL */ `
  query SyncAnswers(
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAnswers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const answersByUserID = /* GraphQL */ `
  query AnswersByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    answersByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const answersByQuestionID = /* GraphQL */ `
  query AnswersByQuestionID(
    $questionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    answersByQuestionID(
      questionID: $questionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getQualification = /* GraphQL */ `
  query GetQualification($id: ID!) {
    getQualification(id: $id) {
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
export const listQualifications = /* GraphQL */ `
  query ListQualifications(
    $filter: ModelQualificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQualifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        variations
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
export const syncQualifications = /* GraphQL */ `
  query SyncQualifications(
    $filter: ModelQualificationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncQualifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        variations
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
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
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
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        variations
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
export const syncQuestions = /* GraphQL */ `
  query SyncQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncQuestions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        variations
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
export const getJobPreferences = /* GraphQL */ `
  query GetJobPreferences($id: ID!) {
    getJobPreferences(id: $id) {
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
export const listJobPreferences = /* GraphQL */ `
  query ListJobPreferences(
    $filter: ModelJobPreferencesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobPreferences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncJobPreferences = /* GraphQL */ `
  query SyncJobPreferences(
    $filter: ModelJobPreferencesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncJobPreferences(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
      userJobPreferenceId
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userJobPreferenceId
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userJobPreferenceId
      }
      nextToken
      startedAt
    }
  }
`;
export const usersByIdentifier = /* GraphQL */ `
  query UsersByIdentifier(
    $identifier: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByIdentifier(
      identifier: $identifier
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userJobPreferenceId
      }
      nextToken
      startedAt
    }
  }
`;
