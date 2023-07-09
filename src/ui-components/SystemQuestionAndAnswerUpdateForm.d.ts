/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { SystemQuestionAndAnswer } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SystemQuestionAndAnswerUpdateFormInputValues = {
    answerVariations?: string[];
    questionVariations?: string[];
};
export declare type SystemQuestionAndAnswerUpdateFormValidationValues = {
    answerVariations?: ValidationFunction<string>;
    questionVariations?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SystemQuestionAndAnswerUpdateFormOverridesProps = {
    SystemQuestionAndAnswerUpdateFormGrid?: FormProps<GridProps>;
    answerVariations?: FormProps<TextFieldProps>;
    questionVariations?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SystemQuestionAndAnswerUpdateFormProps = React.PropsWithChildren<{
    overrides?: SystemQuestionAndAnswerUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    systemQuestionAndAnswer?: SystemQuestionAndAnswer;
    onSubmit?: (fields: SystemQuestionAndAnswerUpdateFormInputValues) => SystemQuestionAndAnswerUpdateFormInputValues;
    onSuccess?: (fields: SystemQuestionAndAnswerUpdateFormInputValues) => void;
    onError?: (fields: SystemQuestionAndAnswerUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: SystemQuestionAndAnswerUpdateFormInputValues) => SystemQuestionAndAnswerUpdateFormInputValues;
    onValidate?: SystemQuestionAndAnswerUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SystemQuestionAndAnswerUpdateForm(props: SystemQuestionAndAnswerUpdateFormProps): React.ReactElement;
