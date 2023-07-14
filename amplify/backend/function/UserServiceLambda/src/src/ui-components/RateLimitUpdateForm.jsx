/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { RateLimit } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function RateLimitUpdateForm(props) {
  const {
    identifier: identifierProp,
    rateLimit: rateLimitModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    identifier: "",
    lastRefillTime: "",
    tokenPerMin: "",
    tokenCapacity: "",
    availableTokens: "",
    owner: "",
  };
  const [identifier, setIdentifier] = React.useState(initialValues.identifier);
  const [lastRefillTime, setLastRefillTime] = React.useState(
    initialValues.lastRefillTime
  );
  const [tokenPerMin, setTokenPerMin] = React.useState(
    initialValues.tokenPerMin
  );
  const [tokenCapacity, setTokenCapacity] = React.useState(
    initialValues.tokenCapacity
  );
  const [availableTokens, setAvailableTokens] = React.useState(
    initialValues.availableTokens
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = rateLimitRecord
      ? { ...initialValues, ...rateLimitRecord }
      : initialValues;
    setIdentifier(cleanValues.identifier);
    setLastRefillTime(cleanValues.lastRefillTime);
    setTokenPerMin(cleanValues.tokenPerMin);
    setTokenCapacity(cleanValues.tokenCapacity);
    setAvailableTokens(cleanValues.availableTokens);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [rateLimitRecord, setRateLimitRecord] =
    React.useState(rateLimitModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = identifierProp
        ? await DataStore.query(RateLimit, identifierProp)
        : rateLimitModelProp;
      setRateLimitRecord(record);
    };
    queryData();
  }, [identifierProp, rateLimitModelProp]);
  React.useEffect(resetStateValues, [rateLimitRecord]);
  const validations = {
    identifier: [{ type: "Required" }],
    lastRefillTime: [{ type: "Required" }],
    tokenPerMin: [{ type: "Required" }],
    tokenCapacity: [{ type: "Required" }],
    availableTokens: [{ type: "Required" }],
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
          identifier,
          lastRefillTime,
          tokenPerMin,
          tokenCapacity,
          availableTokens,
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
            RateLimit.copyOf(rateLimitRecord, (updated) => {
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
      {...getOverrideProps(overrides, "RateLimitUpdateForm")}
      {...rest}
    >
      <TextField
        label="Identifier"
        isRequired={true}
        isReadOnly={true}
        value={identifier}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              identifier: value,
              lastRefillTime,
              tokenPerMin,
              tokenCapacity,
              availableTokens,
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
      <TextField
        label="Last refill time"
        isRequired={true}
        isReadOnly={false}
        value={lastRefillTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              identifier,
              lastRefillTime: value,
              tokenPerMin,
              tokenCapacity,
              availableTokens,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.lastRefillTime ?? value;
          }
          if (errors.lastRefillTime?.hasError) {
            runValidationTasks("lastRefillTime", value);
          }
          setLastRefillTime(value);
        }}
        onBlur={() => runValidationTasks("lastRefillTime", lastRefillTime)}
        errorMessage={errors.lastRefillTime?.errorMessage}
        hasError={errors.lastRefillTime?.hasError}
        {...getOverrideProps(overrides, "lastRefillTime")}
      ></TextField>
      <TextField
        label="Token per min"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={tokenPerMin}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              identifier,
              lastRefillTime,
              tokenPerMin: value,
              tokenCapacity,
              availableTokens,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.tokenPerMin ?? value;
          }
          if (errors.tokenPerMin?.hasError) {
            runValidationTasks("tokenPerMin", value);
          }
          setTokenPerMin(value);
        }}
        onBlur={() => runValidationTasks("tokenPerMin", tokenPerMin)}
        errorMessage={errors.tokenPerMin?.errorMessage}
        hasError={errors.tokenPerMin?.hasError}
        {...getOverrideProps(overrides, "tokenPerMin")}
      ></TextField>
      <TextField
        label="Token capacity"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={tokenCapacity}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              identifier,
              lastRefillTime,
              tokenPerMin,
              tokenCapacity: value,
              availableTokens,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.tokenCapacity ?? value;
          }
          if (errors.tokenCapacity?.hasError) {
            runValidationTasks("tokenCapacity", value);
          }
          setTokenCapacity(value);
        }}
        onBlur={() => runValidationTasks("tokenCapacity", tokenCapacity)}
        errorMessage={errors.tokenCapacity?.errorMessage}
        hasError={errors.tokenCapacity?.hasError}
        {...getOverrideProps(overrides, "tokenCapacity")}
      ></TextField>
      <TextField
        label="Available tokens"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={availableTokens}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              identifier,
              lastRefillTime,
              tokenPerMin,
              tokenCapacity,
              availableTokens: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.availableTokens ?? value;
          }
          if (errors.availableTokens?.hasError) {
            runValidationTasks("availableTokens", value);
          }
          setAvailableTokens(value);
        }}
        onBlur={() => runValidationTasks("availableTokens", availableTokens)}
        errorMessage={errors.availableTokens?.errorMessage}
        hasError={errors.availableTokens?.hasError}
        {...getOverrideProps(overrides, "availableTokens")}
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
              identifier,
              lastRefillTime,
              tokenPerMin,
              tokenCapacity,
              availableTokens,
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
          isDisabled={!(identifierProp || rateLimitModelProp)}
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
              !(identifierProp || rateLimitModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
