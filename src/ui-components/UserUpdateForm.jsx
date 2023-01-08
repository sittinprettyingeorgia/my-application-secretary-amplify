/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { User } from "../models";
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
export default function UserUpdateForm(props) {
  const {
    id,
    user,
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
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    jobLinks: [],
    jobLinkCollectionInProgress: false,
    jobPostingInProgress: false,
    currentAppInfo: undefined,
    JobPreferences: {},
    subscriptionType: undefined,
    subscriptionTier: undefined,
    isActive: false,
    identifier: undefined,
    userJobPreferencesId: undefined,
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [jobLinks, setJobLinks] = React.useState(initialValues.jobLinks);
  const [jobLinkCollectionInProgress, setJobLinkCollectionInProgress] =
    React.useState(initialValues.jobLinkCollectionInProgress);
  const [jobPostingInProgress, setJobPostingInProgress] = React.useState(
    initialValues.jobPostingInProgress
  );
  const [currentAppInfo, setCurrentAppInfo] = React.useState(
    initialValues.currentAppInfo
      ? JSON.stringify(initialValues.currentAppInfo)
      : undefined
  );
  const [JobPreferences, setJobPreferences] = React.useState(
    initialValues.JobPreferences
  );
  const [subscriptionType, setSubscriptionType] = React.useState(
    initialValues.subscriptionType
  );
  const [subscriptionTier, setSubscriptionTier] = React.useState(
    initialValues.subscriptionTier
  );
  const [isActive, setIsActive] = React.useState(initialValues.isActive);
  const [identifier, setIdentifier] = React.useState(initialValues.identifier);
  const [userJobPreferencesId, setUserJobPreferencesId] = React.useState(
    initialValues.userJobPreferencesId
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...userRecord };
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setEmail(cleanValues.email);
    setJobLinks(cleanValues.jobLinks ?? []);
    setCurrentJobLinksValue(undefined);
    setJobLinkCollectionInProgress(cleanValues.jobLinkCollectionInProgress);
    setJobPostingInProgress(cleanValues.jobPostingInProgress);
    setCurrentAppInfo(
      typeof cleanValues.currentAppInfo === "string"
        ? cleanValues.currentAppInfo
        : JSON.stringify(cleanValues.currentAppInfo)
    );
    setJobPreferences(cleanValues.JobPreferences);
    setSubscriptionType(cleanValues.subscriptionType);
    setSubscriptionTier(cleanValues.subscriptionTier);
    setIsActive(cleanValues.isActive);
    setIdentifier(cleanValues.identifier);
    setUserJobPreferencesId(cleanValues.userJobPreferencesId);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(user);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(User, id) : user;
      setUserRecord(record);
    };
    queryData();
  }, [id, user]);
  React.useEffect(resetStateValues, [userRecord]);
  const [currentJobLinksValue, setCurrentJobLinksValue] =
    React.useState(undefined);
  const jobLinksRef = React.createRef();
  const validations = {
    firstName: [{ type: "Required" }],
    lastName: [{ type: "Required" }],
    email: [{ type: "Required" }],
    jobLinks: [],
    jobLinkCollectionInProgress: [{ type: "Required" }],
    jobPostingInProgress: [{ type: "Required" }],
    currentAppInfo: [{ type: "JSON" }],
    JobPreferences: [],
    subscriptionType: [{ type: "Required" }],
    subscriptionTier: [{ type: "Required" }],
    isActive: [{ type: "Required" }],
    identifier: [{ type: "Required" }],
    userJobPreferencesId: [],
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
          firstName,
          lastName,
          email,
          jobLinks,
          jobLinkCollectionInProgress,
          jobPostingInProgress,
          currentAppInfo,
          JobPreferences,
          subscriptionType,
          subscriptionTier,
          isActive,
          identifier,
          userJobPreferencesId,
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
            User.copyOf(userRecord, (updated) => {
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
      {...getOverrideProps(overrides, "UserUpdateForm")}
    >
      <TextField
        label="First name"
        isRequired={true}
        isReadOnly={false}
        defaultValue={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastName,
              email,
              jobLinks,
              jobLinkCollectionInProgress,
              jobPostingInProgress,
              currentAppInfo,
              JobPreferences,
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              userJobPreferencesId,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={true}
        isReadOnly={false}
        defaultValue={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName: value,
              email,
              jobLinks,
              jobLinkCollectionInProgress,
              jobPostingInProgress,
              currentAppInfo,
              JobPreferences,
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              userJobPreferencesId,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        defaultValue={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email: value,
              jobLinks,
              jobLinkCollectionInProgress,
              jobPostingInProgress,
              currentAppInfo,
              JobPreferences,
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              userJobPreferencesId,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              jobLinks: values,
              jobLinkCollectionInProgress,
              jobPostingInProgress,
              currentAppInfo,
              JobPreferences,
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              userJobPreferencesId,
            };
            const result = onChange(modelFields);
            values = result?.jobLinks ?? values;
          }
          setJobLinks(values);
          setCurrentJobLinksValue(undefined);
        }}
        currentFieldValue={currentJobLinksValue}
        label={"Job links"}
        items={jobLinks}
        hasError={errors.jobLinks?.hasError}
        setFieldValue={setCurrentJobLinksValue}
        inputFieldRef={jobLinksRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Job links"
          isRequired={false}
          isReadOnly={false}
          value={currentJobLinksValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.jobLinks?.hasError) {
              runValidationTasks("jobLinks", value);
            }
            setCurrentJobLinksValue(value);
          }}
          onBlur={() => runValidationTasks("jobLinks", currentJobLinksValue)}
          errorMessage={errors.jobLinks?.errorMessage}
          hasError={errors.jobLinks?.hasError}
          ref={jobLinksRef}
          {...getOverrideProps(overrides, "jobLinks")}
        ></TextField>
      </ArrayField>
      <SwitchField
        label="Job link collection in progress"
        defaultChecked={false}
        isDisabled={false}
        isChecked={jobLinkCollectionInProgress}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              jobLinks,
              jobLinkCollectionInProgress: value,
              jobPostingInProgress,
              currentAppInfo,
              JobPreferences,
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              userJobPreferencesId,
            };
            const result = onChange(modelFields);
            value = result?.jobLinkCollectionInProgress ?? value;
          }
          if (errors.jobLinkCollectionInProgress?.hasError) {
            runValidationTasks("jobLinkCollectionInProgress", value);
          }
          setJobLinkCollectionInProgress(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "jobLinkCollectionInProgress",
            jobLinkCollectionInProgress
          )
        }
        errorMessage={errors.jobLinkCollectionInProgress?.errorMessage}
        hasError={errors.jobLinkCollectionInProgress?.hasError}
        {...getOverrideProps(overrides, "jobLinkCollectionInProgress")}
      ></SwitchField>
      <SwitchField
        label="Job posting in progress"
        defaultChecked={false}
        isDisabled={false}
        isChecked={jobPostingInProgress}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              jobLinks,
              jobLinkCollectionInProgress,
              jobPostingInProgress: value,
              currentAppInfo,
              JobPreferences,
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              userJobPreferencesId,
            };
            const result = onChange(modelFields);
            value = result?.jobPostingInProgress ?? value;
          }
          if (errors.jobPostingInProgress?.hasError) {
            runValidationTasks("jobPostingInProgress", value);
          }
          setJobPostingInProgress(value);
        }}
        onBlur={() =>
          runValidationTasks("jobPostingInProgress", jobPostingInProgress)
        }
        errorMessage={errors.jobPostingInProgress?.errorMessage}
        hasError={errors.jobPostingInProgress?.hasError}
        {...getOverrideProps(overrides, "jobPostingInProgress")}
      ></SwitchField>
      <TextAreaField
        label="Current app info"
        isRequired={false}
        isReadOnly={false}
        defaultValue={currentAppInfo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              jobLinks,
              jobLinkCollectionInProgress,
              jobPostingInProgress,
              currentAppInfo: value,
              JobPreferences,
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              userJobPreferencesId,
            };
            const result = onChange(modelFields);
            value = result?.currentAppInfo ?? value;
          }
          if (errors.currentAppInfo?.hasError) {
            runValidationTasks("currentAppInfo", value);
          }
          setCurrentAppInfo(value);
        }}
        onBlur={() => runValidationTasks("currentAppInfo", currentAppInfo)}
        errorMessage={errors.currentAppInfo?.errorMessage}
        hasError={errors.currentAppInfo?.hasError}
        {...getOverrideProps(overrides, "currentAppInfo")}
      ></TextAreaField>
      <SelectField
        label="Job preferences"
        placeholder="Please select an option"
        isDisabled={false}
        value={JobPreferences}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              jobLinks,
              jobLinkCollectionInProgress,
              jobPostingInProgress,
              currentAppInfo,
              JobPreferences: value,
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              userJobPreferencesId,
            };
            const result = onChange(modelFields);
            value = result?.JobPreferences ?? value;
          }
          if (errors.JobPreferences?.hasError) {
            runValidationTasks("JobPreferences", value);
          }
          setJobPreferences(value);
        }}
        onBlur={() => runValidationTasks("JobPreferences", JobPreferences)}
        errorMessage={errors.JobPreferences?.errorMessage}
        hasError={errors.JobPreferences?.hasError}
        {...getOverrideProps(overrides, "JobPreferences")}
      ></SelectField>
      <SelectField
        label="Subscription type"
        placeholder="Please select an option"
        isDisabled={false}
        value={subscriptionType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              jobLinks,
              jobLinkCollectionInProgress,
              jobPostingInProgress,
              currentAppInfo,
              JobPreferences,
              subscriptionType: value,
              subscriptionTier,
              isActive,
              identifier,
              userJobPreferencesId,
            };
            const result = onChange(modelFields);
            value = result?.subscriptionType ?? value;
          }
          if (errors.subscriptionType?.hasError) {
            runValidationTasks("subscriptionType", value);
          }
          setSubscriptionType(value);
        }}
        onBlur={() => runValidationTasks("subscriptionType", subscriptionType)}
        errorMessage={errors.subscriptionType?.errorMessage}
        hasError={errors.subscriptionType?.hasError}
        {...getOverrideProps(overrides, "subscriptionType")}
      >
        <option
          children="Monthly"
          value="MONTHLY"
          {...getOverrideProps(overrides, "subscriptionTypeoption0")}
        ></option>
        <option
          children="Annually"
          value="ANNUALLY"
          {...getOverrideProps(overrides, "subscriptionTypeoption1")}
        ></option>
        <option
          children="One time"
          value="ONE_TIME"
          {...getOverrideProps(overrides, "subscriptionTypeoption2")}
        ></option>
      </SelectField>
      <SelectField
        label="Subscription tier"
        placeholder="Please select an option"
        isDisabled={false}
        value={subscriptionTier}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              jobLinks,
              jobLinkCollectionInProgress,
              jobPostingInProgress,
              currentAppInfo,
              JobPreferences,
              subscriptionType,
              subscriptionTier: value,
              isActive,
              identifier,
              userJobPreferencesId,
            };
            const result = onChange(modelFields);
            value = result?.subscriptionTier ?? value;
          }
          if (errors.subscriptionTier?.hasError) {
            runValidationTasks("subscriptionTier", value);
          }
          setSubscriptionTier(value);
        }}
        onBlur={() => runValidationTasks("subscriptionTier", subscriptionTier)}
        errorMessage={errors.subscriptionTier?.errorMessage}
        hasError={errors.subscriptionTier?.hasError}
        {...getOverrideProps(overrides, "subscriptionTier")}
      >
        <option
          children="Basic"
          value="BASIC"
          {...getOverrideProps(overrides, "subscriptionTieroption0")}
        ></option>
        <option
          children="Premium"
          value="PREMIUM"
          {...getOverrideProps(overrides, "subscriptionTieroption1")}
        ></option>
        <option
          children="Preferred"
          value="PREFERRED"
          {...getOverrideProps(overrides, "subscriptionTieroption2")}
        ></option>
      </SelectField>
      <SwitchField
        label="Is active"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isActive}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              jobLinks,
              jobLinkCollectionInProgress,
              jobPostingInProgress,
              currentAppInfo,
              JobPreferences,
              subscriptionType,
              subscriptionTier,
              isActive: value,
              identifier,
              userJobPreferencesId,
            };
            const result = onChange(modelFields);
            value = result?.isActive ?? value;
          }
          if (errors.isActive?.hasError) {
            runValidationTasks("isActive", value);
          }
          setIsActive(value);
        }}
        onBlur={() => runValidationTasks("isActive", isActive)}
        errorMessage={errors.isActive?.errorMessage}
        hasError={errors.isActive?.hasError}
        {...getOverrideProps(overrides, "isActive")}
      ></SwitchField>
      <TextField
        label="Identifier"
        isRequired={true}
        isReadOnly={false}
        defaultValue={identifier}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              jobLinks,
              jobLinkCollectionInProgress,
              jobPostingInProgress,
              currentAppInfo,
              JobPreferences,
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier: value,
              userJobPreferencesId,
            };
            const result = onChange(modelFields);
            value = result?.identifier ?? value;
          }
          if (errors.identifier?.hasError) {
            runValidationTasks("identifier", value);
          }
          setIdentifier(value);
        }}
        onBlur={() => runValidationTasks("identifier", identifier)}
        errorMessage={errors.identifier?.errorMessage}
        hasError={errors.identifier?.hasError}
        {...getOverrideProps(overrides, "identifier")}
      ></TextField>
      <TextField
        label="User job preferences id"
        isRequired={false}
        isReadOnly={false}
        defaultValue={userJobPreferencesId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              jobLinks,
              jobLinkCollectionInProgress,
              jobPostingInProgress,
              currentAppInfo,
              JobPreferences,
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              userJobPreferencesId: value,
            };
            const result = onChange(modelFields);
            value = result?.userJobPreferencesId ?? value;
          }
          if (errors.userJobPreferencesId?.hasError) {
            runValidationTasks("userJobPreferencesId", value);
          }
          setUserJobPreferencesId(value);
        }}
        onBlur={() =>
          runValidationTasks("userJobPreferencesId", userJobPreferencesId)
        }
        errorMessage={errors.userJobPreferencesId?.errorMessage}
        hasError={errors.userJobPreferencesId?.hasError}
        {...getOverrideProps(overrides, "userJobPreferencesId")}
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
