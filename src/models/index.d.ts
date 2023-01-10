import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";

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



type EagerQuestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Question, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly variations?: string[] | null;
  readonly answers?: string[] | null;
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
  readonly answers?: string[] | null;
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
  readonly position?: string | null;
  readonly jobType?: JobType | keyof typeof JobType | null;
  readonly salary?: number | null;
  readonly remote?: boolean | null;
  readonly qualifications?: string | null;
  readonly benefits?: BenefitType | keyof typeof BenefitType | null;
  readonly expLvl?: ExpType | keyof typeof ExpType | null;
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
  readonly expLvl?: ExpType | keyof typeof ExpType | null;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type JobPreferences = LazyLoading extends LazyLoadingDisabled ? EagerJobPreferences : LazyJobPreferences

export declare const JobPreferences: (new (init: ModelInit<JobPreferences>) => JobPreferences) & {
  copyOf(source: JobPreferences, mutator: (draft: MutableModel<JobPreferences>) => MutableModel<JobPreferences> | void): JobPreferences;
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
  readonly jobLinkCollectionInProgress: boolean;
  readonly jobPostingInProgress: boolean;
  readonly currentAppInfo?: string | null;
  readonly JobPreferences?: JobPreferences | null;
  readonly subscriptionType: SubscriptionType | keyof typeof SubscriptionType;
  readonly subscriptionTier: SubscriptionTier | keyof typeof SubscriptionTier;
  readonly isActive: boolean;
  readonly identifier: string;
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
  readonly jobLinkCollectionInProgress: boolean;
  readonly jobPostingInProgress: boolean;
  readonly currentAppInfo?: string | null;
  readonly JobPreferences: AsyncItem<JobPreferences | undefined>;
  readonly subscriptionType: SubscriptionType | keyof typeof SubscriptionType;
  readonly subscriptionTier: SubscriptionTier | keyof typeof SubscriptionTier;
  readonly isActive: boolean;
  readonly identifier: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userJobPreferencesId?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}