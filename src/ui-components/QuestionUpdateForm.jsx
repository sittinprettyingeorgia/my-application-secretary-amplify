/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Question } from "../models";
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
export default function QuestionUpdateForm(props) {
  const {
    id,
    question,
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
    possibleQuestions: [],
    possibleAnswers: [],
  };
  const [possibleQuestions, setPossibleQuestions] = React.useState(
    initialValues.possibleQuestions
  );
  const [possibleAnswers, setPossibleAnswers] = React.useState(
    initialValues.possibleAnswers
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...questionRecord };
    setPossibleQuestions(cleanValues.possibleQuestions ?? []);
    setCurrentPossibleQuestionsValue(undefined);
    setPossibleAnswers(cleanValues.possibleAnswers ?? []);
    setCurrentPossibleAnswersValue(undefined);
    setErrors({});
  };
  const [questionRecord, setQuestionRecord] = React.useState(question);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(Question, id) : question;
      setQuestionRecord(record);
    };
    queryData();
  }, [id, question]);
  React.useEffect(resetStateValues, [questionRecord]);
  const [currentPossibleQuestionsValue, setCurrentPossibleQuestionsValue] =
    React.useState(undefined);
  const possibleQuestionsRef = React.createRef();
  const [currentPossibleAnswersValue, setCurrentPossibleAnswersValue] =
    React.useState(undefined);
  const possibleAnswersRef = React.createRef();
  const validations = {
    possibleQuestions: [{ type: "Required" }],
    possibleAnswers: [{ type: "Required" }],
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
          possibleQuestions,
          possibleAnswers,
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
            Question.copyOf(questionRecord, (updated) => {
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
      {...getOverrideProps(overrides, "QuestionUpdateForm")}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              possibleQuestions: values,
              possibleAnswers,
            };
            const result = onChange(modelFields);
            values = result?.possibleQuestions ?? values;
          }
          setPossibleQuestions(values);
          setCurrentPossibleQuestionsValue(undefined);
        }}
        currentFieldValue={currentPossibleQuestionsValue}
        label={"Possible questions"}
        items={possibleQuestions}
        hasError={errors.possibleQuestions?.hasError}
        setFieldValue={setCurrentPossibleQuestionsValue}
        inputFieldRef={possibleQuestionsRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Possible questions"
          isRequired={true}
          isReadOnly={false}
          value={currentPossibleQuestionsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.possibleQuestions?.hasError) {
              runValidationTasks("possibleQuestions", value);
            }
            setCurrentPossibleQuestionsValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "possibleQuestions",
              currentPossibleQuestionsValue
            )
          }
          errorMessage={errors.possibleQuestions?.errorMessage}
          hasError={errors.possibleQuestions?.hasError}
          ref={possibleQuestionsRef}
          {...getOverrideProps(overrides, "possibleQuestions")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              possibleQuestions,
              possibleAnswers: values,
            };
            const result = onChange(modelFields);
            values = result?.possibleAnswers ?? values;
          }
          setPossibleAnswers(values);
          setCurrentPossibleAnswersValue(undefined);
        }}
        currentFieldValue={currentPossibleAnswersValue}
        label={"Possible answers"}
        items={possibleAnswers}
        hasError={errors.possibleAnswers?.hasError}
        setFieldValue={setCurrentPossibleAnswersValue}
        inputFieldRef={possibleAnswersRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Possible answers"
          isRequired={true}
          isReadOnly={false}
          value={currentPossibleAnswersValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.possibleAnswers?.hasError) {
              runValidationTasks("possibleAnswers", value);
            }
            setCurrentPossibleAnswersValue(value);
          }}
          onBlur={() =>
            runValidationTasks("possibleAnswers", currentPossibleAnswersValue)
          }
          errorMessage={errors.possibleAnswers?.errorMessage}
          hasError={errors.possibleAnswers?.hasError}
          ref={possibleAnswersRef}
          {...getOverrideProps(overrides, "possibleAnswers")}
        ></TextField>
      </ArrayField>
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
