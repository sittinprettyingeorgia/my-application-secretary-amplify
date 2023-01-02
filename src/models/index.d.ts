import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  TEMPORARY = "TEMPORARY",
  INTERNSHIP = "INTERNSHIP",
  CONTRACT = "CONTRACT"
}

export enum EducationType {
  HIGH_SCHOOL = "HIGH_SCHOOL",
  ASSOCIATES = "ASSOCIATES",
  BACHELORS = "BACHELORS",
  MASTERS = "MASTERS",
  DOCTORATE = "DOCTORATE"
}

export enum ExpType {
  NONE = "NONE",
  ENTRY_LEVEL = "ENTRY_LEVEL",
  MID_LEVEL = "MID_LEVEL",
  SENIOR_LEVEL = "SENIOR_LEVEL"
}

export enum BenefitType {
  RET401_K = "RET401K",
  RET401_KMATCH = "RET401KMATCH",
  DENTAL = "DENTAL",
  MEDICAL = "MEDICAL",
  VISION = "VISION",
  PTO = "PTO"
}



type EagerQuestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Question, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly possibleQuestions?: string[] | null;
  readonly possibleAnswers?: string[] | null;
  readonly users?: (UserQuestion | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Question, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly possibleQuestions?: string[] | null;
  readonly possibleAnswers?: string[] | null;
  readonly users: AsyncCollection<UserQuestion>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Question = LazyLoading extends LazyLoadingDisabled ? EagerQuestion : LazyQuestion

export declare const Question: (new (init: ModelInit<Question>) => Question) & {
  copyOf(source: Question, mutator: (draft: MutableModel<Question>) => MutableModel<Question> | void): Question;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly jobLinks?: (string | null)[] | null;
  readonly jobLinkCollectionInProgress?: boolean | null;
  readonly jobPostingInProgress?: boolean | null;
  readonly currentAppInfo?: string | null;
  readonly JobPreferences?: JobPreferences | null;
  readonly Questions?: (UserQuestion | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userJobPreferencesId?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly jobLinks?: (string | null)[] | null;
  readonly jobLinkCollectionInProgress?: boolean | null;
  readonly jobPostingInProgress?: boolean | null;
  readonly currentAppInfo?: string | null;
  readonly JobPreferences: AsyncItem<JobPreferences | undefined>;
  readonly Questions: AsyncCollection<UserQuestion>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userJobPreferencesId?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerJobPreferences = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JobPreferences, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly jobTypes?: JobType | keyof typeof JobType | null;
  readonly salaryReq?: number | null;
  readonly expLvl?: string | null;
  readonly preferredLocation?: string | null;
  readonly preferredAge?: string | null;
  readonly qualifications?: string | null;
  readonly education?: EducationType | keyof typeof EducationType | null;
  readonly companyBlacklist?: (string | null)[] | null;
  readonly jobLinksLimit?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyJobPreferences = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JobPreferences, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly jobTypes?: JobType | keyof typeof JobType | null;
  readonly salaryReq?: number | null;
  readonly expLvl?: string | null;
  readonly preferredLocation?: string | null;
  readonly preferredAge?: string | null;
  readonly qualifications?: string | null;
  readonly education?: EducationType | keyof typeof EducationType | null;
  readonly companyBlacklist?: (string | null)[] | null;
  readonly jobLinksLimit?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type JobPreferences = LazyLoading extends LazyLoadingDisabled ? EagerJobPreferences : LazyJobPreferences

export declare const JobPreferences: (new (init: ModelInit<JobPreferences>) => JobPreferences) & {
  copyOf(source: JobPreferences, mutator: (draft: MutableModel<JobPreferences>) => MutableModel<JobPreferences> | void): JobPreferences;
}

type EagerJob = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Job, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly url: string;
  readonly companyName?: string | null;
  readonly position?: string | null;
  readonly jobType?: JobType | keyof typeof JobType | null;
  readonly salary?: number | null;
  readonly remote?: boolean | null;
  readonly qualifications?: string | null;
  readonly benefits?: BenefitType | keyof typeof BenefitType | null;
  readonly experienceLvl?: ExpType | keyof typeof ExpType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyJob = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Job, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly url: string;
  readonly companyName?: string | null;
  readonly position?: string | null;
  readonly jobType?: JobType | keyof typeof JobType | null;
  readonly salary?: number | null;
  readonly remote?: boolean | null;
  readonly qualifications?: string | null;
  readonly benefits?: BenefitType | keyof typeof BenefitType | null;
  readonly experienceLvl?: ExpType | keyof typeof ExpType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Job = LazyLoading extends LazyLoadingDisabled ? EagerJob : LazyJob

export declare const Job: (new (init: ModelInit<Job>) => Job) & {
  copyOf(source: Job, mutator: (draft: MutableModel<Job>) => MutableModel<Job> | void): Job;
}

type EagerUserQuestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserQuestion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly questionId?: string | null;
  readonly userId?: string | null;
  readonly question: Question;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserQuestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserQuestion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly questionId?: string | null;
  readonly userId?: string | null;
  readonly question: AsyncItem<Question>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserQuestion = LazyLoading extends LazyLoadingDisabled ? EagerUserQuestion : LazyUserQuestion

export declare const UserQuestion: (new (init: ModelInit<UserQuestion>) => UserQuestion) & {
  copyOf(source: UserQuestion, mutator: (draft: MutableModel<UserQuestion>) => MutableModel<UserQuestion> | void): UserQuestion;
}