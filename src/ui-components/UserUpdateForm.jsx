/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
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
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { User } from "../models";
import { fetchByPath, validateField } from "./utils";
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
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
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
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
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
  const arraySection = (
    <React.Fragment>
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
                {getBadgeText ? getBadgeText(value) : value.toString()}
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
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
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
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function UserUpdateForm(props) {
  const {
    identifier: identifierProp,
    user: userModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    jobLinks: [],
    jobLinkCollectionInProgress: false,
    jobPostingInProgress: false,
    currentAppInfo: "",
    subscriptionType: "",
    subscriptionTier: "",
    isActive: false,
    identifier: "",
    qualifications: "",
    JobPreferences: "",
    modelExpiresAt: "",
    apikey: "",
    apikeyId: "",
    usagePlanId: "",
    owner: "",
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
  );
  const [subscriptionType, setSubscriptionType] = React.useState(
    initialValues.subscriptionType
  );
  const [subscriptionTier, setSubscriptionTier] = React.useState(
    initialValues.subscriptionTier
  );
  const [isActive, setIsActive] = React.useState(initialValues.isActive);
  const [identifier, setIdentifier] = React.useState(initialValues.identifier);
  const [qualifications, setQualifications] = React.useState(
    initialValues.qualifications
  );
  const [JobPreferences, setJobPreferences] = React.useState(
    initialValues.JobPreferences
  );
  const [modelExpiresAt, setModelExpiresAt] = React.useState(
    initialValues.modelExpiresAt
  );
  const [apikey, setApikey] = React.useState(initialValues.apikey);
  const [apikeyId, setApikeyId] = React.useState(initialValues.apikeyId);
  const [usagePlanId, setUsagePlanId] = React.useState(
    initialValues.usagePlanId
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord }
      : initialValues;
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setEmail(cleanValues.email);
    setJobLinks(cleanValues.jobLinks ?? []);
    setCurrentJobLinksValue("");
    setJobLinkCollectionInProgress(cleanValues.jobLinkCollectionInProgress);
    setJobPostingInProgress(cleanValues.jobPostingInProgress);
    setCurrentAppInfo(
      typeof cleanValues.currentAppInfo === "string"
        ? cleanValues.currentAppInfo
        : JSON.stringify(cleanValues.currentAppInfo)
    );
    setSubscriptionType(cleanValues.subscriptionType);
    setSubscriptionTier(cleanValues.subscriptionTier);
    setIsActive(cleanValues.isActive);
    setIdentifier(cleanValues.identifier);
    setQualifications(
      typeof cleanValues.qualifications === "string"
        ? cleanValues.qualifications
        : JSON.stringify(cleanValues.qualifications)
    );
    setJobPreferences(
      typeof cleanValues.JobPreferences === "string"
        ? cleanValues.JobPreferences
        : JSON.stringify(cleanValues.JobPreferences)
    );
    setModelExpiresAt(cleanValues.modelExpiresAt);
    setApikey(cleanValues.apikey);
    setApikeyId(cleanValues.apikeyId);
    setUsagePlanId(cleanValues.usagePlanId);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = identifierProp
        ? await DataStore.query(User, identifierProp)
        : userModelProp;
      setUserRecord(record);
    };
    queryData();
  }, [identifierProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord]);
  const [currentJobLinksValue, setCurrentJobLinksValue] = React.useState("");
  const jobLinksRef = React.createRef();
  const validations = {
    firstName: [{ type: "Required" }],
    lastName: [{ type: "Required" }],
    email: [{ type: "Required" }],
    jobLinks: [],
    jobLinkCollectionInProgress: [{ type: "Required" }],
    jobPostingInProgress: [{ type: "Required" }],
    currentAppInfo: [{ type: "JSON" }],
    subscriptionType: [{ type: "Required" }],
    subscriptionTier: [{ type: "Required" }],
    isActive: [{ type: "Required" }],
    identifier: [{ type: "Required" }],
    qualifications: [{ type: "JSON" }],
    JobPreferences: [{ type: "JSON" }],
    modelExpiresAt: [],
    apikey: [{ type: "Required" }],
    apikeyId: [{ type: "Required" }],
    usagePlanId: [{ type: "Required" }],
    owner: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
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
          subscriptionType,
          subscriptionTier,
          isActive,
          identifier,
          qualifications,
          JobPreferences,
          modelExpiresAt,
          apikey,
          apikeyId,
          usagePlanId,
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
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
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
      {...getOverrideProps(overrides, "UserUpdateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={true}
        isReadOnly={false}
        value={firstName}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
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
        value={lastName}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
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
        value={email}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
            };
            const result = onChange(modelFields);
            values = result?.jobLinks ?? values;
          }
          setJobLinks(values);
          setCurrentJobLinksValue("");
        }}
        currentFieldValue={currentJobLinksValue}
        label={"Job links"}
        items={jobLinks}
        hasError={errors?.jobLinks?.hasError}
        errorMessage={errors?.jobLinks?.errorMessage}
        setFieldValue={setCurrentJobLinksValue}
        inputFieldRef={jobLinksRef}
        defaultFieldValue={""}
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
          labelHidden={true}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
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
        value={currentAppInfo}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
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
              subscriptionType: value,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
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
              subscriptionType,
              subscriptionTier: value,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
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
              subscriptionType,
              subscriptionTier,
              isActive: value,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
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
        isReadOnly={true}
        value={identifier}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier: value,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
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
      <TextAreaField
        label="Qualifications"
        isRequired={false}
        isReadOnly={false}
        value={qualifications}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications: value,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
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
      <TextAreaField
        label="Job preferences"
        isRequired={false}
        isReadOnly={false}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences: value,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
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
      ></TextAreaField>
      <TextField
        label="Model expires at"
        isRequired={false}
        isReadOnly={false}
        value={modelExpiresAt}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt: value,
              apikey,
              apikeyId,
              usagePlanId,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.modelExpiresAt ?? value;
          }
          if (errors.modelExpiresAt?.hasError) {
            runValidationTasks("modelExpiresAt", value);
          }
          setModelExpiresAt(value);
        }}
        onBlur={() => runValidationTasks("modelExpiresAt", modelExpiresAt)}
        errorMessage={errors.modelExpiresAt?.errorMessage}
        hasError={errors.modelExpiresAt?.hasError}
        {...getOverrideProps(overrides, "modelExpiresAt")}
      ></TextField>
      <TextField
        label="Apikey"
        isRequired={true}
        isReadOnly={false}
        value={apikey}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey: value,
              apikeyId,
              usagePlanId,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.apikey ?? value;
          }
          if (errors.apikey?.hasError) {
            runValidationTasks("apikey", value);
          }
          setApikey(value);
        }}
        onBlur={() => runValidationTasks("apikey", apikey)}
        errorMessage={errors.apikey?.errorMessage}
        hasError={errors.apikey?.hasError}
        {...getOverrideProps(overrides, "apikey")}
      ></TextField>
      <TextField
        label="Apikey id"
        isRequired={true}
        isReadOnly={false}
        value={apikeyId}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId: value,
              usagePlanId,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.apikeyId ?? value;
          }
          if (errors.apikeyId?.hasError) {
            runValidationTasks("apikeyId", value);
          }
          setApikeyId(value);
        }}
        onBlur={() => runValidationTasks("apikeyId", apikeyId)}
        errorMessage={errors.apikeyId?.errorMessage}
        hasError={errors.apikeyId?.hasError}
        {...getOverrideProps(overrides, "apikeyId")}
      ></TextField>
      <TextField
        label="Usage plan id"
        isRequired={true}
        isReadOnly={false}
        value={usagePlanId}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.usagePlanId ?? value;
          }
          if (errors.usagePlanId?.hasError) {
            runValidationTasks("usagePlanId", value);
          }
          setUsagePlanId(value);
        }}
        onBlur={() => runValidationTasks("usagePlanId", usagePlanId)}
        errorMessage={errors.usagePlanId?.errorMessage}
        hasError={errors.usagePlanId?.hasError}
        {...getOverrideProps(overrides, "usagePlanId")}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
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
              subscriptionType,
              subscriptionTier,
              isActive,
              identifier,
              qualifications,
              JobPreferences,
              modelExpiresAt,
              apikey,
              apikeyId,
              usagePlanId,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(identifierProp || userModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(identifierProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
