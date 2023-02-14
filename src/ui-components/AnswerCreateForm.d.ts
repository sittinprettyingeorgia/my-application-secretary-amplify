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
export declare type AnswerCreateFormInputValues = {
    answer?: string;
};
export declare type AnswerCreateFormValidationValues = {
    answer?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AnswerCreateFormOverridesProps = {
    AnswerCreateFormGrid?: FormProps<GridProps>;
    answer?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AnswerCreateFormProps = React.PropsWithChildren<{
    overrides?: AnswerCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AnswerCreateFormInputValues) => AnswerCreateFormInputValues;
    onSuccess?: (fields: AnswerCreateFormInputValues) => void;
    onError?: (fields: AnswerCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: AnswerCreateFormInputValues) => AnswerCreateFormInputValues;
    onValidate?: AnswerCreateFormValidationValues;
} & React.CSSProperties>;
export default function AnswerCreateForm(props: AnswerCreateFormProps): React.ReactElement;
