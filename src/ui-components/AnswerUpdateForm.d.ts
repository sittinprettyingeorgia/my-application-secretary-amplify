/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Answer } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AnswerUpdateFormInputValues = {
    answer?: string;
};
export declare type AnswerUpdateFormValidationValues = {
    answer?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AnswerUpdateFormOverridesProps = {
    AnswerUpdateFormGrid?: FormProps<GridProps>;
    answer?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AnswerUpdateFormProps = React.PropsWithChildren<{
    overrides?: AnswerUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    answer?: Answer;
    onSubmit?: (fields: AnswerUpdateFormInputValues) => AnswerUpdateFormInputValues;
    onSuccess?: (fields: AnswerUpdateFormInputValues) => void;
    onError?: (fields: AnswerUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: AnswerUpdateFormInputValues) => AnswerUpdateFormInputValues;
    onValidate?: AnswerUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AnswerUpdateForm(props: AnswerUpdateFormProps): React.ReactElement;
