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
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  SwitchField,
  Text,
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
    qualifications: [],
    benefits: undefined,
    expLvl: undefined,
    owner: undefined,
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
  );
  const [benefits, setBenefits] = React.useState(initialValues.benefits);
  const [expLvl, setExpLvl] = React.useState(initialValues.expLvl);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUrl(initialValues.url);
    setCompanyName(initialValues.companyName);
    setPosition(initialValues.position);
    setJobType(initialValues.jobType);
    setSalary(initialValues.salary);
    setRemote(initialValues.remote);
    setQualifications(initialValues.qualifications);
    setCurrentQualificationsValue(undefined);
    setBenefits(initialValues.benefits);
    setExpLvl(initialValues.expLvl);
    setOwner(initialValues.owner);
    setErrors({});
  };
  const [currentQualificationsValue, setCurrentQualificationsValue] =
    React.useState(undefined);
  const qualificationsRef = React.createRef();
  const validations = {
    url: [{ type: "Required" }],
    companyName: [],
    position: [{ type: "Required" }],
    jobType: [{ type: "Required" }],
    salary: [{ type: "Required" }],
    remote: [{ type: "Required" }],
    qualifications: [{ type: "Required" }],
    benefits: [],
    expLvl: [],
    owner: [],
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
          expLvl,
          owner,
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
              expLvl,
              owner,
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
              expLvl,
              owner,
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
        isRequired={true}
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
              expLvl,
              owner,
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
              expLvl,
              owner,
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
        isRequired={true}
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
              expLvl,
              owner,
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
              expLvl,
              owner,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              url,
              companyName,
              position,
              jobType,
              salary,
              remote,
              qualifications: values,
              benefits,
              expLvl,
              owner,
            };
            const result = onChange(modelFields);
            values = result?.qualifications ?? values;
          }
          setQualifications(values);
          setCurrentQualificationsValue(undefined);
        }}
        currentFieldValue={currentQualificationsValue}
        label={"Qualifications"}
        items={qualifications}
        hasError={errors.qualifications?.hasError}
        setFieldValue={setCurrentQualificationsValue}
        inputFieldRef={qualificationsRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Qualifications"
          isRequired={true}
          isReadOnly={false}
          value={currentQualificationsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.qualifications?.hasError) {
              runValidationTasks("qualifications", value);
            }
            setCurrentQualificationsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("qualifications", currentQualificationsValue)
          }
          errorMessage={errors.qualifications?.errorMessage}
          hasError={errors.qualifications?.hasError}
          ref={qualificationsRef}
          {...getOverrideProps(overrides, "qualifications")}
        ></TextField>
      </ArrayField>
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
              expLvl,
              owner,
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
        label="Exp lvl"
        placeholder="Please select an option"
        isDisabled={false}
        value={expLvl}
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
              expLvl: value,
              owner,
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
      >
        <option
          children="None"
          value="NONE"
          {...getOverrideProps(overrides, "expLvloption0")}
        ></option>
        <option
          children="Entry level"
          value="ENTRY_LEVEL"
          {...getOverrideProps(overrides, "expLvloption1")}
        ></option>
        <option
          children="Mid level"
          value="MID_LEVEL"
          {...getOverrideProps(overrides, "expLvloption2")}
        ></option>
        <option
          children="Senior level"
          value="SENIOR_LEVEL"
          {...getOverrideProps(overrides, "expLvloption3")}
        ></option>
      </SelectField>
      <TextField
        label="Owner"
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
              qualifications,
              benefits,
              expLvl,
              owner: value,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
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
