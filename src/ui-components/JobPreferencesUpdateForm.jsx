/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { JobPreferences } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
}) {
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      (currentFieldValue !== undefined ||
        currentFieldValue !== null ||
        currentFieldValue !== "") &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  return (
    <React.Fragment>
      {isEditing && children}
      {!isEditing ? (
        <>
          <Text>{label}</Text>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
}
export default function JobPreferencesUpdateForm(props) {
  const {
    id,
    jobPreferences,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    jobTypes: undefined,
    salaryReq: undefined,
    expLvl: undefined,
    preferredLocation: undefined,
    preferredAge: undefined,
    qualifications: undefined,
    education: undefined,
    companyBlacklist: [],
    jobLinksLimit: undefined,
  };
  const [jobTypes, setJobTypes] = React.useState(initialValues.jobTypes);
  const [salaryReq, setSalaryReq] = React.useState(initialValues.salaryReq);
  const [expLvl, setExpLvl] = React.useState(initialValues.expLvl);
  const [preferredLocation, setPreferredLocation] = React.useState(
    initialValues.preferredLocation
  );
  const [preferredAge, setPreferredAge] = React.useState(
    initialValues.preferredAge
  );
  const [qualifications, setQualifications] = React.useState(
    initialValues.qualifications
      ? JSON.stringify(initialValues.qualifications)
      : undefined
  );
  const [education, setEducation] = React.useState(initialValues.education);
  const [companyBlacklist, setCompanyBlacklist] = React.useState(
    initialValues.companyBlacklist
  );
  const [jobLinksLimit, setJobLinksLimit] = React.useState(
    initialValues.jobLinksLimit
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...jobPreferencesRecord };
    setJobTypes(cleanValues.jobTypes);
    setSalaryReq(cleanValues.salaryReq);
    setExpLvl(cleanValues.expLvl);
    setPreferredLocation(cleanValues.preferredLocation);
    setPreferredAge(cleanValues.preferredAge);
    setQualifications(
      typeof cleanValues.qualifications === "string"
        ? cleanValues.qualifications
        : JSON.stringify(cleanValues.qualifications)
    );
    setEducation(cleanValues.education);
    setCompanyBlacklist(cleanValues.companyBlacklist ?? []);
    setCurrentCompanyBlacklistValue(undefined);
    setJobLinksLimit(cleanValues.jobLinksLimit);
    setErrors({});
  };
  const [jobPreferencesRecord, setJobPreferencesRecord] =
    React.useState(jobPreferences);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id
        ? await DataStore.query(JobPreferences, id)
        : jobPreferences;
      setJobPreferencesRecord(record);
    };
    queryData();
  }, [id, jobPreferences]);
  React.useEffect(resetStateValues, [jobPreferencesRecord]);
  const [currentCompanyBlacklistValue, setCurrentCompanyBlacklistValue] =
    React.useState(undefined);
  const companyBlacklistRef = React.createRef();
  const validations = {
    jobTypes: [],
    salaryReq: [],
    expLvl: [],
    preferredLocation: [],
    preferredAge: [],
    qualifications: [{ type: "JSON" }],
    education: [],
    companyBlacklist: [],
    jobLinksLimit: [],
  };
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          jobTypes,
          salaryReq,
          expLvl,
          preferredLocation,
          preferredAge,
          qualifications,
          education,
          companyBlacklist,
          jobLinksLimit,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          await DataStore.save(
            JobPreferences.copyOf(jobPreferencesRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "JobPreferencesUpdateForm")}
    >
      <SelectField
        label="Job types"
        placeholder="Please select an option"
        isDisabled={false}
        value={jobTypes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTypes: value,
              salaryReq,
              expLvl,
              preferredLocation,
              preferredAge,
              qualifications,
              education,
              companyBlacklist,
              jobLinksLimit,
            };
            const result = onChange(modelFields);
            value = result?.jobTypes ?? value;
          }
          if (errors.jobTypes?.hasError) {
            runValidationTasks("jobTypes", value);
          }
          setJobTypes(value);
        }}
        onBlur={() => runValidationTasks("jobTypes", jobTypes)}
        errorMessage={errors.jobTypes?.errorMessage}
        hasError={errors.jobTypes?.hasError}
        {...getOverrideProps(overrides, "jobTypes")}
      >
        <option
          children="Full time"
          value="FULL_TIME"
          {...getOverrideProps(overrides, "jobTypesoption0")}
        ></option>
        <option
          children="Part time"
          value="PART_TIME"
          {...getOverrideProps(overrides, "jobTypesoption1")}
        ></option>
        <option
          children="Temporary"
          value="TEMPORARY"
          {...getOverrideProps(overrides, "jobTypesoption2")}
        ></option>
        <option
          children="Internship"
          value="INTERNSHIP"
          {...getOverrideProps(overrides, "jobTypesoption3")}
        ></option>
        <option
          children="Contract"
          value="CONTRACT"
          {...getOverrideProps(overrides, "jobTypesoption4")}
        ></option>
      </SelectField>
      <TextField
        label="Salary req"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        defaultValue={salaryReq}
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              salaryReq: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              jobTypes,
              salaryReq: value,
              expLvl,
              preferredLocation,
              preferredAge,
              qualifications,
              education,
              companyBlacklist,
              jobLinksLimit,
            };
            const result = onChange(modelFields);
            value = result?.salaryReq ?? value;
          }
          if (errors.salaryReq?.hasError) {
            runValidationTasks("salaryReq", value);
          }
          setSalaryReq(value);
        }}
        onBlur={() => runValidationTasks("salaryReq", salaryReq)}
        errorMessage={errors.salaryReq?.errorMessage}
        hasError={errors.salaryReq?.hasError}
        {...getOverrideProps(overrides, "salaryReq")}
      ></TextField>
      <TextField
        label="Exp lvl"
        isRequired={false}
        isReadOnly={false}
        defaultValue={expLvl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTypes,
              salaryReq,
              expLvl: value,
              preferredLocation,
              preferredAge,
              qualifications,
              education,
              companyBlacklist,
              jobLinksLimit,
            };
            const result = onChange(modelFields);
            value = result?.expLvl ?? value;
          }
          if (errors.expLvl?.hasError) {
            runValidationTasks("expLvl", value);
          }
          setExpLvl(value);
        }}
        onBlur={() => runValidationTasks("expLvl", expLvl)}
        errorMessage={errors.expLvl?.errorMessage}
        hasError={errors.expLvl?.hasError}
        {...getOverrideProps(overrides, "expLvl")}
      ></TextField>
      <TextField
        label="Preferred location"
        isRequired={false}
        isReadOnly={false}
        defaultValue={preferredLocation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTypes,
              salaryReq,
              expLvl,
              preferredLocation: value,
              preferredAge,
              qualifications,
              education,
              companyBlacklist,
              jobLinksLimit,
            };
            const result = onChange(modelFields);
            value = result?.preferredLocation ?? value;
          }
          if (errors.preferredLocation?.hasError) {
            runValidationTasks("preferredLocation", value);
          }
          setPreferredLocation(value);
        }}
        onBlur={() =>
          runValidationTasks("preferredLocation", preferredLocation)
        }
        errorMessage={errors.preferredLocation?.errorMessage}
        hasError={errors.preferredLocation?.hasError}
        {...getOverrideProps(overrides, "preferredLocation")}
      ></TextField>
      <TextField
        label="Preferred age"
        isRequired={false}
        isReadOnly={false}
        defaultValue={preferredAge}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTypes,
              salaryReq,
              expLvl,
              preferredLocation,
              preferredAge: value,
              qualifications,
              education,
              companyBlacklist,
              jobLinksLimit,
            };
            const result = onChange(modelFields);
            value = result?.preferredAge ?? value;
          }
          if (errors.preferredAge?.hasError) {
            runValidationTasks("preferredAge", value);
          }
          setPreferredAge(value);
        }}
        onBlur={() => runValidationTasks("preferredAge", preferredAge)}
        errorMessage={errors.preferredAge?.errorMessage}
        hasError={errors.preferredAge?.hasError}
        {...getOverrideProps(overrides, "preferredAge")}
      ></TextField>
      <TextAreaField
        label="Qualifications"
        isRequired={false}
        isReadOnly={false}
        defaultValue={qualifications}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTypes,
              salaryReq,
              expLvl,
              preferredLocation,
              preferredAge,
              qualifications: value,
              education,
              companyBlacklist,
              jobLinksLimit,
            };
            const result = onChange(modelFields);
            value = result?.qualifications ?? value;
          }
          if (errors.qualifications?.hasError) {
            runValidationTasks("qualifications", value);
          }
          setQualifications(value);
        }}
        onBlur={() => runValidationTasks("qualifications", qualifications)}
        errorMessage={errors.qualifications?.errorMessage}
        hasError={errors.qualifications?.hasError}
        {...getOverrideProps(overrides, "qualifications")}
      ></TextAreaField>
      <SelectField
        label="Education"
        placeholder="Please select an option"
        isDisabled={false}
        value={education}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jobTypes,
              salaryReq,
              expLvl,
              preferredLocation,
              preferredAge,
              qualifications,
              education: value,
              companyBlacklist,
              jobLinksLimit,
            };
            const result = onChange(modelFields);
            value = result?.education ?? value;
          }
          if (errors.education?.hasError) {
            runValidationTasks("education", value);
          }
          setEducation(value);
        }}
        onBlur={() => runValidationTasks("education", education)}
        errorMessage={errors.education?.errorMessage}
        hasError={errors.education?.hasError}
        {...getOverrideProps(overrides, "education")}
      >
        <option
          children="High school"
          value="HIGH_SCHOOL"
          {...getOverrideProps(overrides, "educationoption0")}
        ></option>
        <option
          children="Associates"
          value="ASSOCIATES"
          {...getOverrideProps(overrides, "educationoption1")}
        ></option>
        <option
          children="Bachelors"
          value="BACHELORS"
          {...getOverrideProps(overrides, "educationoption2")}
        ></option>
        <option
          children="Masters"
          value="MASTERS"
          {...getOverrideProps(overrides, "educationoption3")}
        ></option>
        <option
          children="Doctorate"
          value="DOCTORATE"
          {...getOverrideProps(overrides, "educationoption4")}
        ></option>
      </SelectField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              jobTypes,
              salaryReq,
              expLvl,
              preferredLocation,
              preferredAge,
              qualifications,
              education,
              companyBlacklist: values,
              jobLinksLimit,
            };
            const result = onChange(modelFields);
            values = result?.companyBlacklist ?? values;
          }
          setCompanyBlacklist(values);
          setCurrentCompanyBlacklistValue(undefined);
        }}
        currentFieldValue={currentCompanyBlacklistValue}
        label={"Company blacklist"}
        items={companyBlacklist}
        hasError={errors.companyBlacklist?.hasError}
        setFieldValue={setCurrentCompanyBlacklistValue}
        inputFieldRef={companyBlacklistRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Company blacklist"
          isRequired={false}
          isReadOnly={false}
          value={currentCompanyBlacklistValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.companyBlacklist?.hasError) {
              runValidationTasks("companyBlacklist", value);
            }
            setCurrentCompanyBlacklistValue(value);
          }}
          onBlur={() =>
            runValidationTasks("companyBlacklist", currentCompanyBlacklistValue)
          }
          errorMessage={errors.companyBlacklist?.errorMessage}
          hasError={errors.companyBlacklist?.hasError}
          ref={companyBlacklistRef}
          {...getOverrideProps(overrides, "companyBlacklist")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Job links limit"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        defaultValue={jobLinksLimit}
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              jobLinksLimit: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              jobTypes,
              salaryReq,
              expLvl,
              preferredLocation,
              preferredAge,
              qualifications,
              education,
              companyBlacklist,
              jobLinksLimit: value,
            };
            const result = onChange(modelFields);
            value = result?.jobLinksLimit ?? value;
          }
          if (errors.jobLinksLimit?.hasError) {
            runValidationTasks("jobLinksLimit", value);
          }
          setJobLinksLimit(value);
        }}
        onBlur={() => runValidationTasks("jobLinksLimit", jobLinksLimit)}
        errorMessage={errors.jobLinksLimit?.errorMessage}
        hasError={errors.jobLinksLimit?.hasError}
        {...getOverrideProps(overrides, "jobLinksLimit")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
