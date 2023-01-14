// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SubscriptionType = {
  "MONTHLY": "MONTHLY",
  "ANNUALLY": "ANNUALLY",
  "ONE_TIME": "ONE_TIME"
};

const SubscriptionTier = {
  "BASIC": "BASIC",
  "PREMIUM": "PREMIUM",
  "PREFERRED": "PREFERRED"
};

const JobType = {
  "FULL_TIME": "FULL_TIME",
  "PART_TIME": "PART_TIME",
  "TEMPORARY": "TEMPORARY",
  "INTERNSHIP": "INTERNSHIP",
  "CONTRACT": "CONTRACT"
};

const EducationType = {
  "HIGH_SCHOOL": "HIGH_SCHOOL",
  "ASSOCIATES": "ASSOCIATES",
  "BACHELORS": "BACHELORS",
  "MASTERS": "MASTERS",
  "DOCTORATE": "DOCTORATE"
};

const ExpType = {
  "NONE": "NONE",
  "ENTRY_LEVEL": "ENTRY_LEVEL",
  "MID_LEVEL": "MID_LEVEL",
  "SENIOR_LEVEL": "SENIOR_LEVEL"
};

const BenefitType = {
  "RET401_K": "RET401K",
  "RET401_KMATCH": "RET401KMATCH",
  "DENTAL": "DENTAL",
  "MEDICAL": "MEDICAL",
  "VISION": "VISION",
  "PTO": "PTO"
};

const { Answer, User, JobPreferences, Question, Qualification, Job, AnswerUser, AnswerQuestion } = initSchema(schema);

export {
  Answer,
  User,
  JobPreferences,
  Question,
  Qualification,
  Job,
  AnswerUser,
  AnswerQuestion,
  SubscriptionType,
  SubscriptionTier,
  JobType,
  EducationType,
  ExpType,
  BenefitType
};