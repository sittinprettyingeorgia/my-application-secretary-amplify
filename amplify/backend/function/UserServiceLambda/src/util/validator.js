// Custom validator function to check if a field is a Map with key=string and value=number
module.exports.isMapWithStringKeyAndNumberValue = value => {
  if (
    typeof value !== 'object' ||
    Array.isArray(value) ||
    value === null ||
    value === undefined
  ) {
    throw new Error('Value must be a Map object');
  }

  // Check if all keys are strings and all values are numbers
  const keys = Object.keys(value);
  const values = Object.values(value);

  if (!keys.every(key => key.length() < 30) || !values.every(val => val < 50)) {
    throw new Error(
      'The qualification name must be less than 30 characters and the qualification value must be less than 50'
    );
  }

  if (
    !keys.every(key => typeof key === 'string') ||
    !values.every(val => typeof val === 'number')
  ) {
    throw new Error(
      'Map object must have keys of type string and values of type number'
    );
  }

  return value;
};

// Define the allowed values for each JobPreference field
const ALLOWED_JOB_TYPES = [
  'full_time',
  'part_time',
  'contract',
  'temporary',
  'internship'
];
const ALLOWED_EXP_LVLS = ['entry_level', 'mid_level', 'senior_level', 'none'];
const ALLOWED_REDFLAGS = ['currentCompanyName'];

// Custom validator function to check if a field is a valid JobPreferences object
module.exports.isValidJobPreferences = value => {
  if (
    typeof value !== 'object' ||
    Array.isArray(value) ||
    value === null ||
    value === undefined
  ) {
    throw new Error('JobPreferences field must be an object');
  }

  // Check if each field is a valid value
  if (value.salary && typeof value.salary !== 'number') {
    throw new Error('Invalid salary value');
  }
  if (value.jobType && !ALLOWED_JOB_TYPES.includes(value.jobType)) {
    throw new Error('Invalid jobType value');
  }
  if (value.expLvl && !ALLOWED_EXP_LVLS.includes(value.expLvl)) {
    throw new Error('Invalid expLvl value');
  }
  if (typeof value.remote !== 'boolean') {
    throw new Error('remote field must be a boolean value');
  }
  if (
    !Array.isArray(value.redFlags) ||
    !value.redFlags.every(
      flag =>
        typeof flag === 'string' &&
        flag.length < 30 &&
        /^[a-zA-Z0-9]+$/.test(flag)
    )
  ) {
    throw new Error('Invalid redFlags value');
  }

  return value;
};
