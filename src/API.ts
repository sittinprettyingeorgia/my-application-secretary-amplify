/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCorpusInput = {
  id?: string | null,
  corpus: BaseCorpusInput,
  _version?: number | null,
};

export type BaseCorpusInput = {
  name: string,
  locale: string,
  data?: Array< QuestionInput > | null,
};

export type QuestionInput = {
  intent: string,
  utterances?: Array< string > | null,
  answers?: Array< string | null > | null,
};

export type ModelCorpusConditionInput = {
  and?: Array< ModelCorpusConditionInput | null > | null,
  or?: Array< ModelCorpusConditionInput | null > | null,
  not?: ModelCorpusConditionInput | null,
};

export type Corpus = {
  __typename: "Corpus",
  id: string,
  corpus: BaseCorpus,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type BaseCorpus = {
  __typename: "BaseCorpus",
  name: string,
  locale: string,
  data?:  Array<Question > | null,
};

export type Question = {
  __typename: "Question",
  intent: string,
  utterances?: Array< string > | null,
  answers?: Array< string | null > | null,
};

export type UpdateCorpusInput = {
  id: string,
  corpus?: BaseCorpusInput | null,
  _version?: number | null,
};

export type DeleteCorpusInput = {
  id: string,
  _version?: number | null,
};

export type CreateJobInput = {
  id?: string | null,
  url: string,
  companyName?: string | null,
  position: string,
  jobType: JobType,
  salary: number,
  remote: boolean,
  qualifications: Array< string >,
  benefits?: BenefitType | null,
  expLvl?: ExpType | null,
  owner?: string | null,
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
  owner?: ModelStringInput | null,
  and?: Array< ModelJobConditionInput | null > | null,
  or?: Array< ModelJobConditionInput | null > | null,
  not?: ModelJobConditionInput | null,
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
  position: string,
  jobType: JobType,
  salary: number,
  remote: boolean,
  qualifications: Array< string >,
  benefits?: BenefitType | null,
  expLvl?: ExpType | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
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
  owner?: string | null,
  _version?: number | null,
};

export type DeleteJobInput = {
  id: string,
  _version?: number | null,
};

export type CreateRateLimitInput = {
  id?: string | null,
  identifier: string,
  lastRefillTime: string,
  tokenPerMin: number,
  tokenCapacity: number,
  availableTokens: number,
  owner?: string | null,
  _version?: number | null,
};

export type ModelRateLimitConditionInput = {
  lastRefillTime?: ModelStringInput | null,
  tokenPerMin?: ModelIntInput | null,
  tokenCapacity?: ModelIntInput | null,
  availableTokens?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelRateLimitConditionInput | null > | null,
  or?: Array< ModelRateLimitConditionInput | null > | null,
  not?: ModelRateLimitConditionInput | null,
};

export type RateLimit = {
  __typename: "RateLimit",
  id: string,
  identifier: string,
  lastRefillTime: string,
  tokenPerMin: number,
  tokenCapacity: number,
  availableTokens: number,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateRateLimitInput = {
  id?: string | null,
  identifier: string,
  lastRefillTime?: string | null,
  tokenPerMin?: number | null,
  tokenCapacity?: number | null,
  availableTokens?: number | null,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteRateLimitInput = {
  identifier: string,
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
  qualifications?: string | null,
  JobPreferences?: string | null,
  corpus?: BaseCorpusInput | null,
  owner?: string | null,
  _version?: number | null,
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
  qualifications?: ModelStringInput | null,
  JobPreferences?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
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
  qualifications?: string | null,
  JobPreferences?: string | null,
  corpus?: BaseCorpus | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateUserInput = {
  id?: string | null,
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
  identifier: string,
  qualifications?: string | null,
  JobPreferences?: string | null,
  corpus?: BaseCorpusInput | null,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  identifier: string,
  _version?: number | null,
};

export type ModelCorpusFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelCorpusFilterInput | null > | null,
  or?: Array< ModelCorpusFilterInput | null > | null,
  not?: ModelCorpusFilterInput | null,
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

export type ModelCorpusConnection = {
  __typename: "ModelCorpusConnection",
  items:  Array<Corpus | null >,
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
  owner?: ModelStringInput | null,
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

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelRateLimitFilterInput = {
  id?: ModelIDInput | null,
  identifier?: ModelStringInput | null,
  lastRefillTime?: ModelStringInput | null,
  tokenPerMin?: ModelIntInput | null,
  tokenCapacity?: ModelIntInput | null,
  availableTokens?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelRateLimitFilterInput | null > | null,
  or?: Array< ModelRateLimitFilterInput | null > | null,
  not?: ModelRateLimitFilterInput | null,
};

export type ModelRateLimitConnection = {
  __typename: "ModelRateLimitConnection",
  items:  Array<RateLimit | null >,
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
  qualifications?: ModelStringInput | null,
  JobPreferences?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionCorpusFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionCorpusFilterInput | null > | null,
  or?: Array< ModelSubscriptionCorpusFilterInput | null > | null,
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
  owner?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionJobFilterInput | null > | null,
  or?: Array< ModelSubscriptionJobFilterInput | null > | null,
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

export type ModelSubscriptionRateLimitFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  identifier?: ModelSubscriptionStringInput | null,
  lastRefillTime?: ModelSubscriptionStringInput | null,
  tokenPerMin?: ModelSubscriptionIntInput | null,
  tokenCapacity?: ModelSubscriptionIntInput | null,
  availableTokens?: ModelSubscriptionIntInput | null,
  owner?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRateLimitFilterInput | null > | null,
  or?: Array< ModelSubscriptionRateLimitFilterInput | null > | null,
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
  qualifications?: ModelSubscriptionStringInput | null,
  JobPreferences?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type CreateCorpusMutationVariables = {
  input: CreateCorpusInput,
  condition?: ModelCorpusConditionInput | null,
};

export type CreateCorpusMutation = {
  createCorpus?:  {
    __typename: "Corpus",
    id: string,
    corpus:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateCorpusMutationVariables = {
  input: UpdateCorpusInput,
  condition?: ModelCorpusConditionInput | null,
};

export type UpdateCorpusMutation = {
  updateCorpus?:  {
    __typename: "Corpus",
    id: string,
    corpus:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteCorpusMutationVariables = {
  input: DeleteCorpusInput,
  condition?: ModelCorpusConditionInput | null,
};

export type DeleteCorpusMutation = {
  deleteCorpus?:  {
    __typename: "Corpus",
    id: string,
    corpus:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    position: string,
    jobType: JobType,
    salary: number,
    remote: boolean,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    position: string,
    jobType: JobType,
    salary: number,
    remote: boolean,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    position: string,
    jobType: JobType,
    salary: number,
    remote: boolean,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateRateLimitMutationVariables = {
  input: CreateRateLimitInput,
  condition?: ModelRateLimitConditionInput | null,
};

export type CreateRateLimitMutation = {
  createRateLimit?:  {
    __typename: "RateLimit",
    id: string,
    identifier: string,
    lastRefillTime: string,
    tokenPerMin: number,
    tokenCapacity: number,
    availableTokens: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateRateLimitMutationVariables = {
  input: UpdateRateLimitInput,
  condition?: ModelRateLimitConditionInput | null,
};

export type UpdateRateLimitMutation = {
  updateRateLimit?:  {
    __typename: "RateLimit",
    id: string,
    identifier: string,
    lastRefillTime: string,
    tokenPerMin: number,
    tokenCapacity: number,
    availableTokens: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteRateLimitMutationVariables = {
  input: DeleteRateLimitInput,
  condition?: ModelRateLimitConditionInput | null,
};

export type DeleteRateLimitMutation = {
  deleteRateLimit?:  {
    __typename: "RateLimit",
    id: string,
    identifier: string,
    lastRefillTime: string,
    tokenPerMin: number,
    tokenCapacity: number,
    availableTokens: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    qualifications?: string | null,
    JobPreferences?: string | null,
    corpus?:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    qualifications?: string | null,
    JobPreferences?: string | null,
    corpus?:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    qualifications?: string | null,
    JobPreferences?: string | null,
    corpus?:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetCorpusQueryVariables = {
  id: string,
};

export type GetCorpusQuery = {
  getCorpus?:  {
    __typename: "Corpus",
    id: string,
    corpus:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListCorpusesQueryVariables = {
  filter?: ModelCorpusFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCorpusesQuery = {
  listCorpuses?:  {
    __typename: "ModelCorpusConnection",
    items:  Array< {
      __typename: "Corpus",
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncCorpusesQueryVariables = {
  filter?: ModelCorpusFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncCorpusesQuery = {
  syncCorpuses?:  {
    __typename: "ModelCorpusConnection",
    items:  Array< {
      __typename: "Corpus",
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
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
    position: string,
    jobType: JobType,
    salary: number,
    remote: boolean,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
      position: string,
      jobType: JobType,
      salary: number,
      remote: boolean,
      qualifications: Array< string >,
      benefits?: BenefitType | null,
      expLvl?: ExpType | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
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
      position: string,
      jobType: JobType,
      salary: number,
      remote: boolean,
      qualifications: Array< string >,
      benefits?: BenefitType | null,
      expLvl?: ExpType | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type JobByPositionAndSalaryQueryVariables = {
  position: string,
  salary?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type JobByPositionAndSalaryQuery = {
  jobByPositionAndSalary?:  {
    __typename: "ModelJobConnection",
    items:  Array< {
      __typename: "Job",
      id: string,
      url: string,
      companyName?: string | null,
      position: string,
      jobType: JobType,
      salary: number,
      remote: boolean,
      qualifications: Array< string >,
      benefits?: BenefitType | null,
      expLvl?: ExpType | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetRateLimitQueryVariables = {
  identifier: string,
};

export type GetRateLimitQuery = {
  getRateLimit?:  {
    __typename: "RateLimit",
    id: string,
    identifier: string,
    lastRefillTime: string,
    tokenPerMin: number,
    tokenCapacity: number,
    availableTokens: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListRateLimitsQueryVariables = {
  identifier?: string | null,
  filter?: ModelRateLimitFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListRateLimitsQuery = {
  listRateLimits?:  {
    __typename: "ModelRateLimitConnection",
    items:  Array< {
      __typename: "RateLimit",
      id: string,
      identifier: string,
      lastRefillTime: string,
      tokenPerMin: number,
      tokenCapacity: number,
      availableTokens: number,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncRateLimitsQueryVariables = {
  filter?: ModelRateLimitFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncRateLimitsQuery = {
  syncRateLimits?:  {
    __typename: "ModelRateLimitConnection",
    items:  Array< {
      __typename: "RateLimit",
      id: string,
      identifier: string,
      lastRefillTime: string,
      tokenPerMin: number,
      tokenCapacity: number,
      availableTokens: number,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  identifier: string,
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
    qualifications?: string | null,
    JobPreferences?: string | null,
    corpus?:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUsersQueryVariables = {
  identifier?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
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
      qualifications?: string | null,
      JobPreferences?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
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
      qualifications?: string | null,
      JobPreferences?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UsersByIdQueryVariables = {
  id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByIdQuery = {
  usersById?:  {
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
      qualifications?: string | null,
      JobPreferences?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateCorpusSubscriptionVariables = {
  filter?: ModelSubscriptionCorpusFilterInput | null,
};

export type OnCreateCorpusSubscription = {
  onCreateCorpus?:  {
    __typename: "Corpus",
    id: string,
    corpus:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateCorpusSubscriptionVariables = {
  filter?: ModelSubscriptionCorpusFilterInput | null,
};

export type OnUpdateCorpusSubscription = {
  onUpdateCorpus?:  {
    __typename: "Corpus",
    id: string,
    corpus:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteCorpusSubscriptionVariables = {
  filter?: ModelSubscriptionCorpusFilterInput | null,
};

export type OnDeleteCorpusSubscription = {
  onDeleteCorpus?:  {
    __typename: "Corpus",
    id: string,
    corpus:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
};

export type OnCreateJobSubscription = {
  onCreateJob?:  {
    __typename: "Job",
    id: string,
    url: string,
    companyName?: string | null,
    position: string,
    jobType: JobType,
    salary: number,
    remote: boolean,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
};

export type OnUpdateJobSubscription = {
  onUpdateJob?:  {
    __typename: "Job",
    id: string,
    url: string,
    companyName?: string | null,
    position: string,
    jobType: JobType,
    salary: number,
    remote: boolean,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
};

export type OnDeleteJobSubscription = {
  onDeleteJob?:  {
    __typename: "Job",
    id: string,
    url: string,
    companyName?: string | null,
    position: string,
    jobType: JobType,
    salary: number,
    remote: boolean,
    qualifications: Array< string >,
    benefits?: BenefitType | null,
    expLvl?: ExpType | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateRateLimitSubscriptionVariables = {
  filter?: ModelSubscriptionRateLimitFilterInput | null,
};

export type OnCreateRateLimitSubscription = {
  onCreateRateLimit?:  {
    __typename: "RateLimit",
    id: string,
    identifier: string,
    lastRefillTime: string,
    tokenPerMin: number,
    tokenCapacity: number,
    availableTokens: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateRateLimitSubscriptionVariables = {
  filter?: ModelSubscriptionRateLimitFilterInput | null,
};

export type OnUpdateRateLimitSubscription = {
  onUpdateRateLimit?:  {
    __typename: "RateLimit",
    id: string,
    identifier: string,
    lastRefillTime: string,
    tokenPerMin: number,
    tokenCapacity: number,
    availableTokens: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteRateLimitSubscriptionVariables = {
  filter?: ModelSubscriptionRateLimitFilterInput | null,
};

export type OnDeleteRateLimitSubscription = {
  onDeleteRateLimit?:  {
    __typename: "RateLimit",
    id: string,
    identifier: string,
    lastRefillTime: string,
    tokenPerMin: number,
    tokenCapacity: number,
    availableTokens: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    qualifications?: string | null,
    JobPreferences?: string | null,
    corpus?:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    qualifications?: string | null,
    JobPreferences?: string | null,
    corpus?:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    qualifications?: string | null,
    JobPreferences?: string | null,
    corpus?:  {
      __typename: "BaseCorpus",
      name: string,
      locale: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
