import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier, CustomIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum SubscriptionTier {
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
  PREFERRED = "PREFERRED"
}

export enum SubscriptionType {
  MONTHLY = "MONTHLY",
  ANNUALLY = "ANNUALLY",
  ONE_TIME = "ONE_TIME"
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



type EagerAnswer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Answer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly answer: string;
  readonly userID: string;
  readonly questionID: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAnswer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Answer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly answer: string;
  readonly userID: string;
  readonly questionID: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Answer = LazyLoading extends LazyLoadingDisabled ? EagerAnswer : LazyAnswer

export declare const Answer: (new (init: ModelInit<Answer>) => Answer) & {
  copyOf(source: Answer, mutator: (draft: MutableModel<Answer>) => MutableModel<Answer> | void): Answer;
}

type EagerQualification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Qualification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly variations: string[];
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQualification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Qualification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly variations: string[];
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Qualification = LazyLoading extends LazyLoadingDisabled ? EagerQualification : LazyQualification

export declare const Qualification: (new (init: ModelInit<Qualification>) => Qualification) & {
  copyOf(source: Qualification, mutator: (draft: MutableModel<Qualification>) => MutableModel<Qualification> | void): Qualification;
}

type EagerQuestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Question, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly variations?: string[] | null;
  readonly answers?: (Answer | null)[] | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Question, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly variations?: string[] | null;
  readonly answers: AsyncCollection<Answer>;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Question = LazyLoading extends LazyLoadingDisabled ? EagerQuestion : LazyQuestion

export declare const Question: (new (init: ModelInit<Question>) => Question) & {
  copyOf(source: Question, mutator: (draft: MutableModel<Question>) => MutableModel<Question> | void): Question;
}

type EagerJob = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Job, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly url: string;
  readonly companyName?: string | null;
  readonly position: string;
  readonly jobType: JobType | keyof typeof JobType;
  readonly salary: number;
  readonly remote: boolean;
  readonly qualifications: string[];
  readonly benefits?: BenefitType | keyof typeof BenefitType | null;
  readonly expLvl?: ExpType | keyof typeof ExpType | null;
  readonly owner?: string | null;
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
  readonly position: string;
  readonly jobType: JobType | keyof typeof JobType;
  readonly salary: number;
  readonly remote: boolean;
  readonly qualifications: string[];
  readonly benefits?: BenefitType | keyof typeof BenefitType | null;
  readonly expLvl?: ExpType | keyof typeof ExpType | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Job = LazyLoading extends LazyLoadingDisabled ? EagerJob : LazyJob

export declare const Job: (new (init: ModelInit<Job>) => Job) & {
  copyOf(source: Job, mutator: (draft: MutableModel<Job>) => MutableModel<Job> | void): Job;
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
  readonly preferredAge?: number | null;
  readonly qualifications: string;
  readonly education?: EducationType | keyof typeof EducationType | null;
  readonly companyBlacklist?: (string | null)[] | null;
  readonly jobLinksLimit: number;
  readonly owner?: string | null;
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
  readonly preferredAge?: number | null;
  readonly qualifications: string;
  readonly education?: EducationType | keyof typeof EducationType | null;
  readonly companyBlacklist?: (string | null)[] | null;
  readonly jobLinksLimit: number;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type JobPreferences = LazyLoading extends LazyLoadingDisabled ? EagerJobPreferences : LazyJobPreferences

export declare const JobPreferences: (new (init: ModelInit<JobPreferences>) => JobPreferences) & {
  copyOf(source: JobPreferences, mutator: (draft: MutableModel<JobPreferences>) => MutableModel<JobPreferences> | void): JobPreferences;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<User, 'identifier'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email: string;
  readonly jobLinks?: (string | null)[] | null;
  readonly jobLinkCollectionInProgress: boolean;
  readonly jobPostingInProgress: boolean;
  readonly currentAppInfo?: string | null;
  readonly subscriptionType?: SubscriptionType | keyof typeof SubscriptionType | null;
  readonly subscriptionTier?: SubscriptionTier | keyof typeof SubscriptionTier | null;
  readonly isActive: boolean;
  readonly identifier: string;
  readonly JobPreferences?: JobPreferences | null;
  readonly Answers?: (Answer | null)[] | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userJobPreferencesId?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<User, 'identifier'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email: string;
  readonly jobLinks?: (string | null)[] | null;
  readonly jobLinkCollectionInProgress: boolean;
  readonly jobPostingInProgress: boolean;
  readonly currentAppInfo?: string | null;
  readonly subscriptionType?: SubscriptionType | keyof typeof SubscriptionType | null;
  readonly subscriptionTier?: SubscriptionTier | keyof typeof SubscriptionTier | null;
  readonly isActive: boolean;
  readonly identifier: string;
  readonly JobPreferences: AsyncItem<JobPreferences | undefined>;
  readonly Answers: AsyncCollection<Answer>;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userJobPreferencesId?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}