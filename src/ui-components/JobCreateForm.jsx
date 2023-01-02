/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Job } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  SwitchField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function JobCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    url: undefined,
    companyName: undefined,
    position: undefined,
    jobType: undefined,
    salary: undefined,
    remote: false,
    qualifications: undefined,
    benefits: undefined,
    experienceLvl: undefined,
  };
  const [url, setUrl] = React.useState(initialValues.url);
  const [companyName, setCompanyName] = React.useState(
    initialValues.companyName
  );
  const [position, setPosition] = React.useState(initialValues.position);
  const [jobType, setJobType] = React.useState(initialValues.jobType);
  const [salary, setSalary] = React.useState(initialValues.salary);
  const [remote, setRemote] = React.useState(initialValues.remote);
  const [qualifications, setQualifications] = React.useState(
    initialValues.qualifications
      ? JSON.stringify(initialValues.qualifications)
      : undefined
  );
  const [benefits, setBenefits] = React.useState(initialValues.benefits);
  const [experienceLvl, setExperienceLvl] = React.useState(
    initialValues.experienceLvl
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUrl(initialValues.url);
    setCompanyName(initialValues.companyName);
    setPosition(initialValues.position);
    setJobType(initialValues.jobType);
    setSalary(initialValues.salary);
    setRemote(initialValues.remote);
    setQualifications(initialValues.qualifications);
    setBenefits(initialValues.benefits);
    setExperienceLvl(initialValues.experienceLvl);
    setErrors({});
  };
  const validations = {
    url: [{ type: "Required" }],
    companyName: [],
    position: [],
    jobType: [],
    salary: [],
    remote: [],
    qualifications: [{ type: "JSON" }],
    benefits: [],
    experienceLvl: [],
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
          url,
          companyName,
          position,
          jobType,
          salary,
          remote,
          qualifications,
          benefits,
          experienceLvl,
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
          await DataStore.save(new Job(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "JobCreateForm")}
    >
      <TextField
        label="Url"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              url: value,
              companyName,
              position,
              jobType,
              salary,
              remote,
              qualifications,
              benefits,
              experienceLvl,
            };
            const result = onChange(modelFields);
            value = result?.url ?? value;
          }
          if (errors.url?.hasError) {
            runValidationTasks("url", value);
          }
          setUrl(value);
        }}
        onBlur={() => runValidationTasks("url", url)}
        errorMessage={errors.url?.errorMessage}
        hasError={errors.url?.hasError}
        {...getOverrideProps(overrides, "url")}
      ></TextField>
      <TextField
        label="Company name"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              url,
              companyName: value,
              position,
              jobType,
              salary,
              remote,
              qualifications,
              benefits,
              experienceLvl,
            };
            const result = onChange(modelFields);
            value = result?.companyName ?? value;
          }
          if (errors.companyName?.hasError) {
            runValidationTasks("companyName", value);
          }
          setCompanyName(value);
        }}
        onBlur={() => runValidationTasks("companyName", companyName)}
        errorMessage={errors.companyName?.errorMessage}
        hasError={errors.companyName?.hasError}
        {...getOverrideProps(overrides, "companyName")}
      ></TextField>
      <TextField
        label="Position"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              url,
              companyName,
              position: value,
              jobType,
              salary,
              remote,
              qualifications,
              benefits,
              experienceLvl,
            };
            const result = onChange(modelFields);
            value = result?.position ?? value;
          }
          if (errors.position?.hasError) {
            runValidationTasks("position", value);
          }
          setPosition(value);
        }}
        onBlur={() => runValidationTasks("position", position)}
        errorMessage={errors.position?.errorMessage}
        hasError={errors.position?.hasError}
        {...getOverrideProps(overrides, "position")}
      ></TextField>
      <SelectField
        label="Job type"
        placeholder="Please select an option"
        isDisabled={false}
        value={jobType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              url,
              companyName,
              position,
              jobType: value,
              salary,
              remote,
              qualifications,
              benefits,
              experienceLvl,
            };
            const result = onChange(modelFields);
            value = result?.jobType ?? value;
          }
          if (errors.jobType?.hasError) {
            runValidationTasks("jobType", value);
          }
          setJobType(value);
        }}
        onBlur={() => runValidationTasks("jobType", jobType)}
        errorMessage={errors.jobType?.errorMessage}
        hasError={errors.jobType?.hasError}
        {...getOverrideProps(overrides, "jobType")}
      >
        <option
          children="Full time"
          value="FULL_TIME"
          {...getOverrideProps(overrides, "jobTypeoption0")}
        ></option>
        <option
          children="Part time"
          value="PART_TIME"
          {...getOverrideProps(overrides, "jobTypeoption1")}
        ></option>
        <option
          children="Temporary"
          value="TEMPORARY"
          {...getOverrideProps(overrides, "jobTypeoption2")}
        ></option>
        <option
          children="Internship"
          value="INTERNSHIP"
          {...getOverrideProps(overrides, "jobTypeoption3")}
        ></option>
        <option
          children="Contract"
          value="CONTRACT"
          {...getOverrideProps(overrides, "jobTypeoption4")}
        ></option>
      </SelectField>
      <TextField
        label="Salary"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              salary: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              url,
              companyName,
              position,
              jobType,
              salary: value,
              remote,
              qualifications,
              benefits,
              experienceLvl,
            };
            const result = onChange(modelFields);
            value = result?.salary ?? value;
          }
          if (errors.salary?.hasError) {
            runValidationTasks("salary", value);
          }
          setSalary(value);
        }}
        onBlur={() => runValidationTasks("salary", salary)}
        errorMessage={errors.salary?.errorMessage}
        hasError={errors.salary?.hasError}
        {...getOverrideProps(overrides, "salary")}
      ></TextField>
      <SwitchField
        label="Remote"
        defaultChecked={false}
        isDisabled={false}
        isChecked={remote}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              url,
              companyName,
              position,
              jobType,
              salary,
              remote: value,
              qualifications,
              benefits,
              experienceLvl,
            };
            const result = onChange(modelFields);
            value = result?.remote ?? value;
          }
          if (errors.remote?.hasError) {
            runValidationTasks("remote", value);
          }
          setRemote(value);
        }}
        onBlur={() => runValidationTasks("remote", remote)}
        errorMessage={errors.remote?.errorMessage}
        hasError={errors.remote?.hasError}
        {...getOverrideProps(overrides, "remote")}
      ></SwitchField>
      <TextAreaField
        label="Qualifications"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              url,
              companyName,
              position,
              jobType,
              salary,
              remote,
              qualifications: value,
              benefits,
              experienceLvl,
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
        label="Benefits"
        placeholder="Please select an option"
        isDisabled={false}
        value={benefits}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              url,
              companyName,
              position,
              jobType,
              salary,
              remote,
              qualifications,
              benefits: value,
              experienceLvl,
            };
            const result = onChange(modelFields);
            value = result?.benefits ?? value;
          }
          if (errors.benefits?.hasError) {
            runValidationTasks("benefits", value);
          }
          setBenefits(value);
        }}
        onBlur={() => runValidationTasks("benefits", benefits)}
        errorMessage={errors.benefits?.errorMessage}
        hasError={errors.benefits?.hasError}
        {...getOverrideProps(overrides, "benefits")}
      >
        <option
          children="Ret401 k"
          value="RET401K"
          {...getOverrideProps(overrides, "benefitsoption0")}
        ></option>
        <option
          children="Ret401 kmatch"
          value="RET401KMATCH"
          {...getOverrideProps(overrides, "benefitsoption1")}
        ></option>
        <option
          children="Dental"
          value="DENTAL"
          {...getOverrideProps(overrides, "benefitsoption2")}
        ></option>
        <option
          children="Medical"
          value="MEDICAL"
          {...getOverrideProps(overrides, "benefitsoption3")}
        ></option>
        <option
          children="Vision"
          value="VISION"
          {...getOverrideProps(overrides, "benefitsoption4")}
        ></option>
        <option
          children="Pto"
          value="PTO"
          {...getOverrideProps(overrides, "benefitsoption5")}
        ></option>
      </SelectField>
      <SelectField
        label="Experience lvl"
        placeholder="Please select an option"
        isDisabled={false}
        value={experienceLvl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              url,
              companyName,
              position,
              jobType,
              salary,
              remote,
              qualifications,
              benefits,
              experienceLvl: value,
            };
            const result = onChange(modelFields);
            value = result?.experienceLvl ?? value;
          }
          if (errors.experienceLvl?.hasError) {
            runValidationTasks("experienceLvl", value);
          }
          setExperienceLvl(value);
        }}
        onBlur={() => runValidationTasks("experienceLvl", experienceLvl)}
        errorMessage={errors.experienceLvl?.errorMessage}
        hasError={errors.experienceLvl?.hasError}
        {...getOverrideProps(overrides, "experienceLvl")}
      >
        <option
          children="None"
          value="NONE"
          {...getOverrideProps(overrides, "experienceLvloption0")}
        ></option>
        <option
          children="Entry level"
          value="ENTRY_LEVEL"
          {...getOverrideProps(overrides, "experienceLvloption1")}
        ></option>
        <option
          children="Mid level"
          value="MID_LEVEL"
          {...getOverrideProps(overrides, "experienceLvloption2")}
        ></option>
        <option
          children="Senior level"
          value="SENIOR_LEVEL"
          {...getOverrideProps(overrides, "experienceLvloption3")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ClearButton")}
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
