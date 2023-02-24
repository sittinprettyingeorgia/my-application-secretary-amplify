/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { SystemQuestionAndAnswer } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
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
export default function SystemQuestionAndAnswerCreateForm(props) {
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
    answerVariations: [],
    questionVariations: [],
  };
  const [answerVariations, setAnswerVariations] = React.useState(
    initialValues.answerVariations
  );
  const [questionVariations, setQuestionVariations] = React.useState(
    initialValues.questionVariations
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setAnswerVariations(initialValues.answerVariations);
    setCurrentAnswerVariationsValue(undefined);
    setQuestionVariations(initialValues.questionVariations);
    setCurrentQuestionVariationsValue(undefined);
    setErrors({});
  };
  const [currentAnswerVariationsValue, setCurrentAnswerVariationsValue] =
    React.useState(undefined);
  const answerVariationsRef = React.createRef();
  const [currentQuestionVariationsValue, setCurrentQuestionVariationsValue] =
    React.useState(undefined);
  const questionVariationsRef = React.createRef();
  const validations = {
    answerVariations: [{ type: "Required" }],
    questionVariations: [],
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
          answerVariations,
          questionVariations,
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
          await DataStore.save(new SystemQuestionAndAnswer(modelFields));
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
      {...getOverrideProps(overrides, "SystemQuestionAndAnswerCreateForm")}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              answerVariations: values,
              questionVariations,
            };
            const result = onChange(modelFields);
            values = result?.answerVariations ?? values;
          }
          setAnswerVariations(values);
          setCurrentAnswerVariationsValue(undefined);
        }}
        currentFieldValue={currentAnswerVariationsValue}
        label={"Answer variations"}
        items={answerVariations}
        hasError={errors.answerVariations?.hasError}
        setFieldValue={setCurrentAnswerVariationsValue}
        inputFieldRef={answerVariationsRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Answer variations"
          isRequired={true}
          isReadOnly={false}
          value={currentAnswerVariationsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.answerVariations?.hasError) {
              runValidationTasks("answerVariations", value);
            }
            setCurrentAnswerVariationsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("answerVariations", currentAnswerVariationsValue)
          }
          errorMessage={errors.answerVariations?.errorMessage}
          hasError={errors.answerVariations?.hasError}
          ref={answerVariationsRef}
          {...getOverrideProps(overrides, "answerVariations")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              answerVariations,
              questionVariations: values,
            };
            const result = onChange(modelFields);
            values = result?.questionVariations ?? values;
          }
          setQuestionVariations(values);
          setCurrentQuestionVariationsValue(undefined);
        }}
        currentFieldValue={currentQuestionVariationsValue}
        label={"Question variations"}
        items={questionVariations}
        hasError={errors.questionVariations?.hasError}
        setFieldValue={setCurrentQuestionVariationsValue}
        inputFieldRef={questionVariationsRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Question variations"
          isRequired={false}
          isReadOnly={false}
          value={currentQuestionVariationsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.questionVariations?.hasError) {
              runValidationTasks("questionVariations", value);
            }
            setCurrentQuestionVariationsValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "questionVariations",
              currentQuestionVariationsValue
            )
          }
          errorMessage={errors.questionVariations?.errorMessage}
          hasError={errors.questionVariations?.hasError}
          ref={questionVariationsRef}
          {...getOverrideProps(overrides, "questionVariations")}
        ></TextField>
      </ArrayField>
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
