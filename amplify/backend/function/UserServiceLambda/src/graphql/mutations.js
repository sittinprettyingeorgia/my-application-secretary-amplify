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
