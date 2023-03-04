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
  }
}
`;