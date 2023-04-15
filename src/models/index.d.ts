import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier, CustomIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

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
  VISIO_ND = "VISIONd",
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
  readonly intent: string;
  readonly utterances?: string[] | null;
  readonly answers?: (string | null)[] | null;
}

type LazyQuestion = {
  readonly intent: string;
  readonly utterances?: string[] | null;
  readonly answers?: (string | null)[] | null;
}

export declare type Question = LazyLoading extends LazyLoadingDisabled ? EagerQuestion : LazyQuestion

export declare const Question: (new (init: ModelInit<Question>) => Question)

type EagerBaseCorpus = {
  readonly name: string;
  readonly locale: string;
  readonly data?: Question[] | null;
}

type LazyBaseCorpus = {
  readonly name: string;
  readonly locale: string;
  readonly data?: Question[] | null;
}

export declare type BaseCorpus = LazyLoading extends LazyLoadingDisabled ? EagerBaseCorpus : LazyBaseCorpus

export declare const BaseCorpus: (new (init: ModelInit<BaseCorpus>) => BaseCorpus)

type EagerCorpus = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Corpus, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly corpus: BaseCorpus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCorpus = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Corpus, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly corpus: BaseCorpus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Corpus = LazyLoading extends LazyLoadingDisabled ? EagerCorpus : LazyCorpus

export declare const Corpus: (new (init: ModelInit<Corpus>) => Corpus) & {
  copyOf(source: Corpus, mutator: (draft: MutableModel<Corpus>) => MutableModel<Corpus> | void): Corpus;
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

type EagerRateLimit = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<RateLimit, 'identifier'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly identifier: string;
  readonly lastRefillTime: string;
  readonly tokenPerMin: number;
  readonly tokenCapacity: number;
  readonly availableTokens: number;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRateLimit = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<RateLimit, 'identifier'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly identifier: string;
  readonly lastRefillTime: string;
  readonly tokenPerMin: number;
  readonly tokenCapacity: number;
  readonly availableTokens: number;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RateLimit = LazyLoading extends LazyLoadingDisabled ? EagerRateLimit : LazyRateLimit

export declare const RateLimit: (new (init: ModelInit<RateLimit>) => RateLimit) & {
  copyOf(source: RateLimit, mutator: (draft: MutableModel<RateLimit>) => MutableModel<RateLimit> | void): RateLimit;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<User, 'identifier'>;
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
  readonly subscriptionType: SubscriptionType | keyof typeof SubscriptionType;
  readonly subscriptionTier: SubscriptionTier | keyof typeof SubscriptionTier;
  readonly isActive: boolean;
  readonly identifier: string;
  readonly qualifications?: string | null;
  readonly JobPreferences?: string | null;
  readonly corpus?: BaseCorpus | null;
  readonly modelExpiresAt?: string | null;
  readonly apikey: string;
  readonly apikeyId: string;
  readonly usagePlanId: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<User, 'identifier'>;
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
  readonly subscriptionType: SubscriptionType | keyof typeof SubscriptionType;
  readonly subscriptionTier: SubscriptionTier | keyof typeof SubscriptionTier;
  readonly isActive: boolean;
  readonly identifier: string;
  readonly qualifications?: string | null;
  readonly JobPreferences?: string | null;
  readonly corpus?: BaseCorpus | null;
  readonly modelExpiresAt?: string | null;
  readonly apikey: string;
  readonly apikeyId: string;
  readonly usagePlanId: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}