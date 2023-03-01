/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
