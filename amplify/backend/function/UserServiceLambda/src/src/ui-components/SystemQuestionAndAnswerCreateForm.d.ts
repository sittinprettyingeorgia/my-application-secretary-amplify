/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SystemQuestionAndAnswerCreateFormInputValues = {
    answerVariations?: string[];
    questionVariations?: string[];
};
export declare type SystemQuestionAndAnswerCreateFormValidationValues = {
    answerVariations?: ValidationFunction<string>;
    questionVariations?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SystemQuestionAndAnswerCreateFormOverridesProps = {
    SystemQuestionAndAnswerCreateFormGrid?: FormProps<GridProps>;
    answerVariations?: FormProps<TextFieldProps>;
    questionVariations?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SystemQuestionAndAnswerCreateFormProps = React.PropsWithChildren<{
    overrides?: SystemQuestionAndAnswerCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SystemQuestionAndAnswerCreateFormInputValues) => SystemQuestionAndAnswerCreateFormInputValues;
    onSuccess?: (fields: SystemQuestionAndAnswerCreateFormInputValues) => void;
    onError?: (fields: SystemQuestionAndAnswerCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: SystemQuestionAndAnswerCreateFormInputValues) => SystemQuestionAndAnswerCreateFormInputValues;
    onValidate?: SystemQuestionAndAnswerCreateFormValidationValues;
} & React.CSSProperties>;
export default function SystemQuestionAndAnswerCreateForm(props: SystemQuestionAndAnswerCreateFormProps): React.ReactElement;
