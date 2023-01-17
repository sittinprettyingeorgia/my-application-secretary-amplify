/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAnswerInput = {
  id?: string | null,
  answer: string,
  userID: string,
  questionID: string,
  _version?: number | null,
};

export type ModelAnswerConditionInput = {
  answer?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  questionID?: ModelIDInput | null,
  and?: Array< ModelAnswerConditionInput | null > | null,
  or?: Array< ModelAnswerConditionInput | null > | null,
  not?: ModelAnswerConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Answer = {
  __typename: "Answer",
  id: string,
  answer: string,
  userID: string,
  questionID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateAnswerInput = {
  id: string,
  answer?: string | null,
  userID?: string | null,
  questionID?: string | null,
  _version?: number | null,
};

export type DeleteAnswerInput = {
  id: string,
  _version?: number | null,
};

export type CreateQualificationInput = {
  id?: string | null,
  variations: Array< string >,
  _version?: number | null,
};

export type ModelQualificationConditionInput = {
  variations?: ModelStringInput | null,
  and?: Array< ModelQualificationConditionInput | null > | null,
  or?: Array< ModelQualificationConditionInput | null > | null,
  not?: ModelQualificationConditionInput | null,
};

export type Qualification = {
  __typename: "Qualification",
  id: string,
  variations: Array< string >,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateQualificationInput = {
  id: string,
  variations?: Array< string > | null,
  _version?: number | null,
};

export type DeleteQualificationInput = {
  id: string,
  _version?: number | null,
};

export type CreateQuestionInput = {
  id?: string | null,
  variations?: Array< string > | null,
  _version?: number | null,
};

export type ModelQuestionConditionInput = {
  variations?: ModelStringInput | null,
  and?: Array< ModelQuestionConditionInput | null > | null,
  or?: Array< ModelQuestionConditionInput | null > | null,
  not?: ModelQuestionConditionInput | null,
};

export type Question = {
  __typename: "Question",
  id: string,
  variations?: Array< string > | null,
  answers?: ModelAnswerConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type ModelAnswerConnection = {
  __typename: "ModelAnswerConnection",
  items:  Array<Answer | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateQuestionInput = {
  id: string,
  variations?: Array< string > | null,
  _version?: number | null,
};

export type DeleteQuestionInput = {
  id: string,
  _version?: number | null,
};

export type CreateJobInput = {
  id?: string | null,
  url: string,
  companyName?: string | null,
  position?: string | null,
  jobType?: JobType | null,
  salary?: number | null,
  remote?: boolean | null,
  qualifications: Array< string >,
  benefits?: BenefitType | null,
  expLvl?: ExpType | null,
  _version?: number | null,
};

export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  TEMPORARY = "TEMPORARY",
  INTERNSHIP = "INTERNSHIP",
  CONTRACT = "CONTRACT",
}


export enum BenefitType {
  RET401K = "RET401K",
  RET401KMATCH = "RET401KMATCH",
  DENTAL = "DENTAL",
  MEDICAL = "MEDICAL",
  VISION = "VISION",
  PTO = "PTO",
}


export enum ExpType {
  NONE = "NONE",
  ENTRY_LEVEL = "ENTRY_LEVEL",
  MID_LEVEL = "MID_LEVEL",
  SENIOR_LEVEL = "SENIOR_LEVEL",
}


export type ModelJobConditionInput = {
  url?: ModelStringInput | null,
  companyName?: ModelStringInput | null,
  position?: ModelStringInput | null,
  jobType?: ModelJobTypeInput | null,
  salary?: ModelIntInput | null,
  remote?: ModelBooleanInput | null,
  qualifications?: ModelStringInput | null,
  benefits?: ModelBenefitTypeInput | null,
  expLvl?: ModelExpTypeInput | null,
  and?: Array< ModelJobConditionInput | null > | null,
  or?: Array< ModelJobConditionInput | null > | null,
  not?: ModelJobConditionInput | null,
};

export type ModelJobTypeInput = {
  eq?: JobType | null,
  ne?: JobType | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBenefitTypeInput = {
  eq?: BenefitType | null,
  ne?: BenefitType | null,
};

export type ModelExpTypeInput = {
  eq?: ExpType | null,
  ne?: ExpType | null,
};

export type Job = {
  __typename: "Job",
  id: string,
  url: string,
  companyName?: string | null,
  position?: string | null,
  jobType?: JobType | null,
  salary?: number | null,
  remote?: boolean | null,
  qualifications: Array< string >,
  benefits?: BenefitType | null,
  expLvl?: ExpType | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateJobInput = {
  id: string,
  url?: string | null,
  companyName?: string | null,
  position?: string | null,
  jobType?: JobType | null,
  salary?: number | null,
  remote?: boolean | null,
  qualifications?: Array< string > | null,
  benefits?: BenefitType | null,
  expLvl?: ExpType | null,
  _version?: number | null,
};

export type DeleteJobInput = {
  id: string,
  _version?: number | null,
};

export type CreateJobPreferencesInput = {
  id?: string | null,
  jobTypes?: JobType | null,
  salaryReq?: number | null,
  expLvl?: string | null,
  preferredLocation?: string | null,
  preferredAge?: number | null,
  qualifications: string,
  education?: EducationType | null,
  companyBlacklist?: Array< string | null > | null,
  jobLinksLimit: number,
  _version?: number | null,
};

export enum EducationType {
  HIGH_SCHOOL = "HIGH_SCHOOL",
  ASSOCIATES = "ASSOCIATES",
  BACHELORS = "BACHELORS",
  MASTERS = "MASTERS",
  DOCTORATE = "DOCTORATE",
}


export type ModelJobPreferencesConditionInput = {
  jobTypes?: ModelJobTypeInput | null,
  salaryReq?: ModelIntInput | null,
  expLvl?: ModelStringInput | null,
  preferredLocation?: ModelStringInput | null,
  preferredAge?: ModelIntInput | null,
  qualifications?: ModelStringInput | null,
  education?: ModelEducationTypeInput | null,
  companyBlacklist?: ModelStringInput | null,
  jobLinksLimit?: ModelIntInput | null,
  and?: Array< ModelJobPreferencesConditionInput | null > | null,
  or?: Array< ModelJobPreferencesConditionInput | null > | null,
  not?: ModelJobPreferencesConditionInput | null,
};

export type ModelEducationTypeInput = {
  eq?: EducationType | null,
  ne?: EducationType | null,
};

export type JobPreferences = {
  __typename: "JobPreferences",
  id: string,
  jobTypes?: JobType | null,
  salaryReq?: number | null,
  expLvl?: string | null,
  preferredLocation?: string | null,
  preferredAge?: number | null,
  qualifications: string,
  education?: EducationType | null,
  companyBlacklist?: Array< string | null > | null,
  jobLinksLimit: number,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateJobPreferencesInput = {
  id: string,
  jobTypes?: JobType | null,
  salaryReq?: number | null,
  expLvl?: string | null,
  preferredLocation?: string | null,
  preferredAge?: number | null,
  qualifications?: string | null,
  education?: EducationType | null,
  companyBlacklist?: Array< string | null > | null,
  jobLinksLimit?: number | null,
  _version?: number | null,
};

export type DeleteJobPreferencesInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  firstName: string,
  lastName: string,
  email: string,
  jobLinks?: Array< string | null > | null,
  jobLinkCollectionInProgress: boolean,
  jobPostingInProgress: boolean,
  currentAppInfo?: string | null,
  subscriptionType: SubscriptionType,
  subscriptionTier: SubscriptionTier,
  isActive: boolean,
  identifier: string,
  _version?: number | null,
  userJobPreferenceId?: string | null,
};

export enum SubscriptionType {
  MONTHLY = "MONTHLY",
  ANNUALLY = "ANNUALLY",
  ONE_TIME = "ONE_TIME",
}


export enum SubscriptionTier {
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
  PREFERRED = "PREFERRED",
}


export type ModelUserConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  jobLinks?: ModelStringInput | null,
  jobLinkCollectionInProgress?: ModelBooleanInput | null,
  jobPostingInProgress?: ModelBooleanInput | null,
  currentAppInfo?: ModelStringInput | null,
  subscriptionType?: ModelSubscriptionTypeInput | null,
  subscriptionTier?: ModelSubscriptionTierInput | null,
  isActive?: ModelBooleanInput | null,
  identifier?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  userJobPreferenceId?: ModelIDInput | null,
};

export type ModelSubscriptionTypeInput = {
  eq?: SubscriptionType | null,
  ne?: SubscriptionType | null,
};

export type ModelSubscriptionTierInput = {
  eq?: SubscriptionTier | null,
  ne?: SubscriptionTier | null,
};

export type User = {
  __typename: "User",
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  jobLinks?: Array< string | null > | null,
  jobLinkCollectionInProgress: boolean,
  jobPostingInProgress: boolean,
  currentAppInfo?: string | null,
  subscriptionType: SubscriptionType,
  subscriptionTier: SubscriptionTier,
  isActive: boolean,
  identifier: string,
  JobPreference?: JobPreferences | null,
  Answers?: ModelAnswerConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  userJobPreferenceId?: string | null,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  jobLinks?: Array< string | null > | null,
  jobLinkCollectionInProgress?: boolean | null,
  jobPostingInProgress?: boolean | null,
  currentAppInfo?: string | null,
  subscriptionType?: SubscriptionType | null,
  subscriptionTier?: SubscriptionTier | null,
  isActive?: boolean | null,
  identifier?: string | null,
  _version?: number | null,
  userJobPreferenceId?: string | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type ModelAnswerFilterInput = {
  id?: ModelIDInput | null,
  answer?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  questionID?: ModelIDInput | null,
  and?: Array< ModelAnswerFilterInput | null > | null,
  or?: Array< ModelAnswerFilterInput | null > | null,
  not?: ModelAnswerFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelQualificationFilterInput = {
  id?: ModelIDInput | null,
  variations?: ModelStringInput | null,
  and?: Array< ModelQualificationFilterInput | null > | null,
  or?: Array< ModelQualificationFilterInput | null > | null,
  not?: ModelQualificationFilterInput | null,
};

export type ModelQualificationConnection = {
  __typename: "ModelQualificationConnection",
  items:  Array<Qualification | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelQuestionFilterInput = {
  id?: ModelIDInput | null,
  variations?: ModelStringInput | null,
  and?: Array< ModelQuestionFilterInput | null > | null,
  or?: Array< ModelQuestionFilterInput | null > | null,
  not?: ModelQuestionFilterInput | null,
};

export type ModelQuestionConnection = {
  __typename: "ModelQuestionConnection",
  items:  Array<Question | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelJobFilterInput = {
  id?: ModelIDInput | null,
  url?: ModelStringInput | null,
  companyName?: ModelStringInput | null,
  position?: ModelStringInput | null,
  jobType?: ModelJobTypeInput | null,
  salary?: ModelIntInput | null,
  remote?: ModelBooleanInput | null,
  qualifications?: ModelStringInput | null,
  benefits?: ModelBenefitTypeInput | null,
  expLvl?: ModelExpTypeInput | null,
  and?: Array< ModelJobFilterInput | null > | null,
  or?: Array< ModelJobFilterInput | null > | null,
  not?: ModelJobFilterInput | null,
};

export type ModelJobConnection = {
  __typename: "ModelJobConnection",
  items:  Array<Job | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelJobPreferencesFilterInput = {
  id?: ModelIDInput | null,
  jobTypes?: ModelJobTypeInput | null,
  salaryReq?: ModelIntInput | null,
  expLvl?: ModelStringInput | null,
  preferredLocation?: ModelStringInput | null,
  preferredAge?: ModelIntInput | null,
  qualifications?: ModelStringInput | null,
  education?: ModelEducationTypeInput | null,
  companyBlacklist?: ModelStringInput | null,
  jobLinksLimit?: ModelIntInput | null,
  and?: Array< ModelJobPreferencesFilterInput | null > | null,
  or?: Array< ModelJobPreferencesFilterInput | null > | null,
  not?: ModelJobPreferencesFilterInput | null,
};

export type ModelJobPreferencesConnection = {
  __typename: "ModelJobPreferencesConnection",
  items:  Array<JobPreferences | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  jobLinks?: ModelStringInput | null,
  jobLinkCollectionInProgress?: ModelBooleanInput | null,
  jobPostingInProgress?: ModelBooleanInput | null,
  currentAppInfo?: ModelStringInput | null,
  subscriptionType?: ModelSubscriptionTypeInput | null,
  subscriptionTier?: ModelSubscriptionTierInput | null,
  isActive?: ModelBooleanInput | null,
  identifier?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  userJobPreferenceId?: ModelIDInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionAnswerFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  answer?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  questionID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionAnswerFilterInput | null > | null,
  or?: Array< ModelSubscriptionAnswerFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionQualificationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  variations?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionQualificationFilterInput | null > | null,
  or?: Array< ModelSubscriptionQualificationFilterInput | null > | null,
};

export type ModelSubscriptionQuestionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  variations?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionQuestionFilterInput | null > | null,
  or?: Array< ModelSubscriptionQuestionFilterInput | null > | null,
};

export type ModelSubscriptionJobFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  url?: ModelSubscriptionStringInput | null,
  companyName?: ModelSubscriptionStringInput | null,
  position?: ModelSubscriptionStringInput | null,
  jobType?: ModelSubscriptionStringInput | null,
  salary?: ModelSubscriptionIntInput | null,
  remote?: ModelSubscriptionBooleanInput | null,
  qualifications?: ModelSubscriptionStringInput | null,
  benefits?: ModelSubscriptionStringInput | null,
  expLvl?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionJobFilterInput | null > | null,
  or?: Array< ModelSubscriptionJobFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionJobPreferencesFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  jobTypes?: ModelSubscriptionStringInput | null,
  salaryReq?: ModelSubscriptionIntInput | null,
  expLvl?: ModelSubscriptionStringInput | null,
  preferredLocation?: ModelSubscriptionStringInput | null,
  preferredAge?: ModelSubscriptionIntInput | null,
  qualifications?: ModelSubscriptionStringInput | null,
  education?: ModelSubscriptionStringInput | null,
  companyBlacklist?: ModelSubscriptionStringInput | null,
  jobLinksLimit?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionJobPreferencesFilterInput | null > | null,
  or?: Array< ModelSubscriptionJobPreferencesFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  jobLinks?: ModelSubscriptionStringInput | null,
  jobLinkCollectionInProgress?: ModelSubscriptionBooleanInput | null,
  jobPostingInProgress?: ModelSubscriptionBooleanInput | null,
  currentAppInfo?: ModelSubscriptionStringInput | null,
  subscriptionType?: ModelSubscriptionStringInput | null,
  subscriptionTier?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  identifier?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type CreateAnswerMutationVariables = {
  input: CreateAnswerInput,
  condition?: ModelAnswerConditionInput | null,
};

export type CreateAnswerMutation = {
  createAnswer?:  {
    __typename: "Answer",
    id: string,
    answer: string,
    userID: string,
    questionID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateAnswerMutationVariables = {
  input: UpdateAnswerInput,
  condition?: ModelAnswerConditionInput | null,
};

export type UpdateAnswerMutation = {
  updateAnswer?:  {
    __typename: "Answer",
    id: string,
    answer: string,
    userID: string,
    questionID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteAnswerMutationVariables = {
  input: DeleteAnswerInput,
  condition?: ModelAnswerConditionInput | null,
};

export type DeleteAnswerMutation = {
  deleteAnswer?:  {
    __typename: "Answer",
    id: string,
    answer: string,
    userID: string,
    questionID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateQualificationMutationVariables = {
  input: CreateQualificationInput,
  condition?: ModelQualificationConditionInput | null,
};

export type CreateQualificationMutation = {
  createQualification?:  {
    __typename: "Qualification",
    id: string,
    variations: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateQualificationMutationVariables = {
  input: UpdateQualificationInput,
  condition?: ModelQualificationConditionInput | null,
};

export type UpdateQualificationMutation = {
  updateQualification?:  {
    __typename: "Qualification",
    id: string,
    variations: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteQualificationMutationVariables = {
  input: DeleteQualificationInput,
  condition?: ModelQualificationConditionInput | null,
};

export type DeleteQualificationMutation = {
  deleteQualification?:  {
    __typename: "Qualification",
    id: string,
    variations: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateQuestionMutationVariables = {
  input: CreateQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type CreateQuestionMutation = {
  createQuestion?:  {
    __typename: "Question",
    id: string,
    variations?: Array< string > | null,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateQuestionMutationVariables = {
  input: UpdateQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type UpdateQuestionMutation = {
  updateQuestion?:  {
    __typename: "Question",
    id: string,
    variations?: Array< string > | null,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteQuestionMutationVariables = {
  input: DeleteQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type DeleteQuestionMutation = {
  deleteQuestion?:  {
    __typename: "Question",
    id: string,
    variations?: Array< string > | null,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateJobMutationVariables = {
  input: CreateJobInput,
  condition?: ModelJobConditionInput | null,
};

export type CreateJobMutation = {
  createJob?:  {
    __typename: "Job",
    id: string,
    url: string,
    companyName?: string | null,
    position?: string | null,
    jobType?: JobType | null,
    salary?: number | null,
    remote?: boolean | null,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateJobMutationVariables = {
  input: UpdateJobInput,
  condition?: ModelJobConditionInput | null,
};

export type UpdateJobMutation = {
  updateJob?:  {
    __typename: "Job",
    id: string,
    url: string,
    companyName?: string | null,
    position?: string | null,
    jobType?: JobType | null,
    salary?: number | null,
    remote?: boolean | null,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteJobMutationVariables = {
  input: DeleteJobInput,
  condition?: ModelJobConditionInput | null,
};

export type DeleteJobMutation = {
  deleteJob?:  {
    __typename: "Job",
    id: string,
    url: string,
    companyName?: string | null,
    position?: string | null,
    jobType?: JobType | null,
    salary?: number | null,
    remote?: boolean | null,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateJobPreferencesMutationVariables = {
  input: CreateJobPreferencesInput,
  condition?: ModelJobPreferencesConditionInput | null,
};

export type CreateJobPreferencesMutation = {
  createJobPreferences?:  {
    __typename: "JobPreferences",
    id: string,
    jobTypes?: JobType | null,
    salaryReq?: number | null,
    expLvl?: string | null,
    preferredLocation?: string | null,
    preferredAge?: number | null,
    qualifications: string,
    education?: EducationType | null,
    companyBlacklist?: Array< string | null > | null,
    jobLinksLimit: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateJobPreferencesMutationVariables = {
  input: UpdateJobPreferencesInput,
  condition?: ModelJobPreferencesConditionInput | null,
};

export type UpdateJobPreferencesMutation = {
  updateJobPreferences?:  {
    __typename: "JobPreferences",
    id: string,
    jobTypes?: JobType | null,
    salaryReq?: number | null,
    expLvl?: string | null,
    preferredLocation?: string | null,
    preferredAge?: number | null,
    qualifications: string,
    education?: EducationType | null,
    companyBlacklist?: Array< string | null > | null,
    jobLinksLimit: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteJobPreferencesMutationVariables = {
  input: DeleteJobPreferencesInput,
  condition?: ModelJobPreferencesConditionInput | null,
};

export type DeleteJobPreferencesMutation = {
  deleteJobPreferences?:  {
    __typename: "JobPreferences",
    id: string,
    jobTypes?: JobType | null,
    salaryReq?: number | null,
    expLvl?: string | null,
    preferredLocation?: string | null,
    preferredAge?: number | null,
    qualifications: string,
    education?: EducationType | null,
    companyBlacklist?: Array< string | null > | null,
    jobLinksLimit: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    jobLinks?: Array< string | null > | null,
    jobLinkCollectionInProgress: boolean,
    jobPostingInProgress: boolean,
    currentAppInfo?: string | null,
    subscriptionType: SubscriptionType,
    subscriptionTier: SubscriptionTier,
    isActive: boolean,
    identifier: string,
    JobPreference?:  {
      __typename: "JobPreferences",
      id: string,
      jobTypes?: JobType | null,
      salaryReq?: number | null,
      expLvl?: string | null,
      preferredLocation?: string | null,
      preferredAge?: number | null,
      qualifications: string,
      education?: EducationType | null,
      companyBlacklist?: Array< string | null > | null,
      jobLinksLimit: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userJobPreferenceId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    jobLinks?: Array< string | null > | null,
    jobLinkCollectionInProgress: boolean,
    jobPostingInProgress: boolean,
    currentAppInfo?: string | null,
    subscriptionType: SubscriptionType,
    subscriptionTier: SubscriptionTier,
    isActive: boolean,
    identifier: string,
    JobPreference?:  {
      __typename: "JobPreferences",
      id: string,
      jobTypes?: JobType | null,
      salaryReq?: number | null,
      expLvl?: string | null,
      preferredLocation?: string | null,
      preferredAge?: number | null,
      qualifications: string,
      education?: EducationType | null,
      companyBlacklist?: Array< string | null > | null,
      jobLinksLimit: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userJobPreferenceId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    jobLinks?: Array< string | null > | null,
    jobLinkCollectionInProgress: boolean,
    jobPostingInProgress: boolean,
    currentAppInfo?: string | null,
    subscriptionType: SubscriptionType,
    subscriptionTier: SubscriptionTier,
    isActive: boolean,
    identifier: string,
    JobPreference?:  {
      __typename: "JobPreferences",
      id: string,
      jobTypes?: JobType | null,
      salaryReq?: number | null,
      expLvl?: string | null,
      preferredLocation?: string | null,
      preferredAge?: number | null,
      qualifications: string,
      education?: EducationType | null,
      companyBlacklist?: Array< string | null > | null,
      jobLinksLimit: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userJobPreferenceId?: string | null,
    owner?: string | null,
  } | null,
};

export type GetAnswerQueryVariables = {
  id: string,
};

export type GetAnswerQuery = {
  getAnswer?:  {
    __typename: "Answer",
    id: string,
    answer: string,
    userID: string,
    questionID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListAnswersQueryVariables = {
  filter?: ModelAnswerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAnswersQuery = {
  listAnswers?:  {
    __typename: "ModelAnswerConnection",
    items:  Array< {
      __typename: "Answer",
      id: string,
      answer: string,
      userID: string,
      questionID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncAnswersQueryVariables = {
  filter?: ModelAnswerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncAnswersQuery = {
  syncAnswers?:  {
    __typename: "ModelAnswerConnection",
    items:  Array< {
      __typename: "Answer",
      id: string,
      answer: string,
      userID: string,
      questionID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type AnswersByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAnswerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AnswersByUserIDQuery = {
  answersByUserID?:  {
    __typename: "ModelAnswerConnection",
    items:  Array< {
      __typename: "Answer",
      id: string,
      answer: string,
      userID: string,
      questionID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type AnswersByQuestionIDQueryVariables = {
  questionID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAnswerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AnswersByQuestionIDQuery = {
  answersByQuestionID?:  {
    __typename: "ModelAnswerConnection",
    items:  Array< {
      __typename: "Answer",
      id: string,
      answer: string,
      userID: string,
      questionID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetQualificationQueryVariables = {
  id: string,
};

export type GetQualificationQuery = {
  getQualification?:  {
    __typename: "Qualification",
    id: string,
    variations: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListQualificationsQueryVariables = {
  filter?: ModelQualificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQualificationsQuery = {
  listQualifications?:  {
    __typename: "ModelQualificationConnection",
    items:  Array< {
      __typename: "Qualification",
      id: string,
      variations: Array< string >,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncQualificationsQueryVariables = {
  filter?: ModelQualificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncQualificationsQuery = {
  syncQualifications?:  {
    __typename: "ModelQualificationConnection",
    items:  Array< {
      __typename: "Qualification",
      id: string,
      variations: Array< string >,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetQuestionQueryVariables = {
  id: string,
};

export type GetQuestionQuery = {
  getQuestion?:  {
    __typename: "Question",
    id: string,
    variations?: Array< string > | null,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListQuestionsQueryVariables = {
  filter?: ModelQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestionsQuery = {
  listQuestions?:  {
    __typename: "ModelQuestionConnection",
    items:  Array< {
      __typename: "Question",
      id: string,
      variations?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncQuestionsQueryVariables = {
  filter?: ModelQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncQuestionsQuery = {
  syncQuestions?:  {
    __typename: "ModelQuestionConnection",
    items:  Array< {
      __typename: "Question",
      id: string,
      variations?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetJobQueryVariables = {
  id: string,
};

export type GetJobQuery = {
  getJob?:  {
    __typename: "Job",
    id: string,
    url: string,
    companyName?: string | null,
    position?: string | null,
    jobType?: JobType | null,
    salary?: number | null,
    remote?: boolean | null,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListJobsQueryVariables = {
  filter?: ModelJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListJobsQuery = {
  listJobs?:  {
    __typename: "ModelJobConnection",
    items:  Array< {
      __typename: "Job",
      id: string,
      url: string,
      companyName?: string | null,
      position?: string | null,
      jobType?: JobType | null,
      salary?: number | null,
      remote?: boolean | null,
      qualifications: Array< string >,
      benefits?: BenefitType | null,
      expLvl?: ExpType | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncJobsQueryVariables = {
  filter?: ModelJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncJobsQuery = {
  syncJobs?:  {
    __typename: "ModelJobConnection",
    items:  Array< {
      __typename: "Job",
      id: string,
      url: string,
      companyName?: string | null,
      position?: string | null,
      jobType?: JobType | null,
      salary?: number | null,
      remote?: boolean | null,
      qualifications: Array< string >,
      benefits?: BenefitType | null,
      expLvl?: ExpType | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetJobPreferencesQueryVariables = {
  id: string,
};

export type GetJobPreferencesQuery = {
  getJobPreferences?:  {
    __typename: "JobPreferences",
    id: string,
    jobTypes?: JobType | null,
    salaryReq?: number | null,
    expLvl?: string | null,
    preferredLocation?: string | null,
    preferredAge?: number | null,
    qualifications: string,
    education?: EducationType | null,
    companyBlacklist?: Array< string | null > | null,
    jobLinksLimit: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListJobPreferencesQueryVariables = {
  filter?: ModelJobPreferencesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListJobPreferencesQuery = {
  listJobPreferences?:  {
    __typename: "ModelJobPreferencesConnection",
    items:  Array< {
      __typename: "JobPreferences",
      id: string,
      jobTypes?: JobType | null,
      salaryReq?: number | null,
      expLvl?: string | null,
      preferredLocation?: string | null,
      preferredAge?: number | null,
      qualifications: string,
      education?: EducationType | null,
      companyBlacklist?: Array< string | null > | null,
      jobLinksLimit: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncJobPreferencesQueryVariables = {
  filter?: ModelJobPreferencesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncJobPreferencesQuery = {
  syncJobPreferences?:  {
    __typename: "ModelJobPreferencesConnection",
    items:  Array< {
      __typename: "JobPreferences",
      id: string,
      jobTypes?: JobType | null,
      salaryReq?: number | null,
      expLvl?: string | null,
      preferredLocation?: string | null,
      preferredAge?: number | null,
      qualifications: string,
      education?: EducationType | null,
      companyBlacklist?: Array< string | null > | null,
      jobLinksLimit: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    jobLinks?: Array< string | null > | null,
    jobLinkCollectionInProgress: boolean,
    jobPostingInProgress: boolean,
    currentAppInfo?: string | null,
    subscriptionType: SubscriptionType,
    subscriptionTier: SubscriptionTier,
    isActive: boolean,
    identifier: string,
    JobPreference?:  {
      __typename: "JobPreferences",
      id: string,
      jobTypes?: JobType | null,
      salaryReq?: number | null,
      expLvl?: string | null,
      preferredLocation?: string | null,
      preferredAge?: number | null,
      qualifications: string,
      education?: EducationType | null,
      companyBlacklist?: Array< string | null > | null,
      jobLinksLimit: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userJobPreferenceId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      jobLinks?: Array< string | null > | null,
      jobLinkCollectionInProgress: boolean,
      jobPostingInProgress: boolean,
      currentAppInfo?: string | null,
      subscriptionType: SubscriptionType,
      subscriptionTier: SubscriptionTier,
      isActive: boolean,
      identifier: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userJobPreferenceId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      jobLinks?: Array< string | null > | null,
      jobLinkCollectionInProgress: boolean,
      jobPostingInProgress: boolean,
      currentAppInfo?: string | null,
      subscriptionType: SubscriptionType,
      subscriptionTier: SubscriptionTier,
      isActive: boolean,
      identifier: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userJobPreferenceId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateAnswerSubscriptionVariables = {
  filter?: ModelSubscriptionAnswerFilterInput | null,
  owner?: string | null,
};

export type OnCreateAnswerSubscription = {
  onCreateAnswer?:  {
    __typename: "Answer",
    id: string,
    answer: string,
    userID: string,
    questionID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateAnswerSubscriptionVariables = {
  filter?: ModelSubscriptionAnswerFilterInput | null,
  owner?: string | null,
};

export type OnUpdateAnswerSubscription = {
  onUpdateAnswer?:  {
    __typename: "Answer",
    id: string,
    answer: string,
    userID: string,
    questionID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteAnswerSubscriptionVariables = {
  filter?: ModelSubscriptionAnswerFilterInput | null,
  owner?: string | null,
};

export type OnDeleteAnswerSubscription = {
  onDeleteAnswer?:  {
    __typename: "Answer",
    id: string,
    answer: string,
    userID: string,
    questionID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateQualificationSubscriptionVariables = {
  filter?: ModelSubscriptionQualificationFilterInput | null,
  owner?: string | null,
};

export type OnCreateQualificationSubscription = {
  onCreateQualification?:  {
    __typename: "Qualification",
    id: string,
    variations: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateQualificationSubscriptionVariables = {
  filter?: ModelSubscriptionQualificationFilterInput | null,
  owner?: string | null,
};

export type OnUpdateQualificationSubscription = {
  onUpdateQualification?:  {
    __typename: "Qualification",
    id: string,
    variations: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteQualificationSubscriptionVariables = {
  filter?: ModelSubscriptionQualificationFilterInput | null,
  owner?: string | null,
};

export type OnDeleteQualificationSubscription = {
  onDeleteQualification?:  {
    __typename: "Qualification",
    id: string,
    variations: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
  owner?: string | null,
};

export type OnCreateQuestionSubscription = {
  onCreateQuestion?:  {
    __typename: "Question",
    id: string,
    variations?: Array< string > | null,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateQuestionSubscription = {
  onUpdateQuestion?:  {
    __typename: "Question",
    id: string,
    variations?: Array< string > | null,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteQuestionSubscription = {
  onDeleteQuestion?:  {
    __typename: "Question",
    id: string,
    variations?: Array< string > | null,
    answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
  owner?: string | null,
};

export type OnCreateJobSubscription = {
  onCreateJob?:  {
    __typename: "Job",
    id: string,
    url: string,
    companyName?: string | null,
    position?: string | null,
    jobType?: JobType | null,
    salary?: number | null,
    remote?: boolean | null,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
  owner?: string | null,
};

export type OnUpdateJobSubscription = {
  onUpdateJob?:  {
    __typename: "Job",
    id: string,
    url: string,
    companyName?: string | null,
    position?: string | null,
    jobType?: JobType | null,
    salary?: number | null,
    remote?: boolean | null,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
  owner?: string | null,
};

export type OnDeleteJobSubscription = {
  onDeleteJob?:  {
    __typename: "Job",
    id: string,
    url: string,
    companyName?: string | null,
    position?: string | null,
    jobType?: JobType | null,
    salary?: number | null,
    remote?: boolean | null,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateJobPreferencesSubscriptionVariables = {
  filter?: ModelSubscriptionJobPreferencesFilterInput | null,
  owner?: string | null,
};

export type OnCreateJobPreferencesSubscription = {
  onCreateJobPreferences?:  {
    __typename: "JobPreferences",
    id: string,
    jobTypes?: JobType | null,
    salaryReq?: number | null,
    expLvl?: string | null,
    preferredLocation?: string | null,
    preferredAge?: number | null,
    qualifications: string,
    education?: EducationType | null,
    companyBlacklist?: Array< string | null > | null,
    jobLinksLimit: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateJobPreferencesSubscriptionVariables = {
  filter?: ModelSubscriptionJobPreferencesFilterInput | null,
  owner?: string | null,
};

export type OnUpdateJobPreferencesSubscription = {
  onUpdateJobPreferences?:  {
    __typename: "JobPreferences",
    id: string,
    jobTypes?: JobType | null,
    salaryReq?: number | null,
    expLvl?: string | null,
    preferredLocation?: string | null,
    preferredAge?: number | null,
    qualifications: string,
    education?: EducationType | null,
    companyBlacklist?: Array< string | null > | null,
    jobLinksLimit: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteJobPreferencesSubscriptionVariables = {
  filter?: ModelSubscriptionJobPreferencesFilterInput | null,
  owner?: string | null,
};

export type OnDeleteJobPreferencesSubscription = {
  onDeleteJobPreferences?:  {
    __typename: "JobPreferences",
    id: string,
    jobTypes?: JobType | null,
    salaryReq?: number | null,
    expLvl?: string | null,
    preferredLocation?: string | null,
    preferredAge?: number | null,
    qualifications: string,
    education?: EducationType | null,
    companyBlacklist?: Array< string | null > | null,
    jobLinksLimit: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    jobLinks?: Array< string | null > | null,
    jobLinkCollectionInProgress: boolean,
    jobPostingInProgress: boolean,
    currentAppInfo?: string | null,
    subscriptionType: SubscriptionType,
    subscriptionTier: SubscriptionTier,
    isActive: boolean,
    identifier: string,
    JobPreference?:  {
      __typename: "JobPreferences",
      id: string,
      jobTypes?: JobType | null,
      salaryReq?: number | null,
      expLvl?: string | null,
      preferredLocation?: string | null,
      preferredAge?: number | null,
      qualifications: string,
      education?: EducationType | null,
      companyBlacklist?: Array< string | null > | null,
      jobLinksLimit: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userJobPreferenceId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    jobLinks?: Array< string | null > | null,
    jobLinkCollectionInProgress: boolean,
    jobPostingInProgress: boolean,
    currentAppInfo?: string | null,
    subscriptionType: SubscriptionType,
    subscriptionTier: SubscriptionTier,
    isActive: boolean,
    identifier: string,
    JobPreference?:  {
      __typename: "JobPreferences",
      id: string,
      jobTypes?: JobType | null,
      salaryReq?: number | null,
      expLvl?: string | null,
      preferredLocation?: string | null,
      preferredAge?: number | null,
      qualifications: string,
      education?: EducationType | null,
      companyBlacklist?: Array< string | null > | null,
      jobLinksLimit: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userJobPreferenceId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    jobLinks?: Array< string | null > | null,
    jobLinkCollectionInProgress: boolean,
    jobPostingInProgress: boolean,
    currentAppInfo?: string | null,
    subscriptionType: SubscriptionType,
    subscriptionTier: SubscriptionTier,
    isActive: boolean,
    identifier: string,
    JobPreference?:  {
      __typename: "JobPreferences",
      id: string,
      jobTypes?: JobType | null,
      salaryReq?: number | null,
      expLvl?: string | null,
      preferredLocation?: string | null,
      preferredAge?: number | null,
      qualifications: string,
      education?: EducationType | null,
      companyBlacklist?: Array< string | null > | null,
      jobLinksLimit: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Answers?:  {
      __typename: "ModelAnswerConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userJobPreferenceId?: string | null,
    owner?: string | null,
  } | null,
};
