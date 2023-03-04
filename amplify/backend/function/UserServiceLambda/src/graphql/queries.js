module.exports.getUser = /* GraphQL */ `
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
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
  }
}
`;