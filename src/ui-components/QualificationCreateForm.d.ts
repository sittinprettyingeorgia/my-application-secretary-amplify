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
export declare type QualificationCreateFormInputValues = {
    variations?: string[];
    owner?: string;
};
export declare type QualificationCreateFormValidationValues = {
    variations?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type QualificationCreateFormOverridesProps = {
    QualificationCreateFormGrid?: FormProps<GridProps>;
    variations?: FormProps<TextFieldProps>;
    owner?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type QualificationCreateFormProps = React.PropsWithChildren<{
    overrides?: QualificationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: QualificationCreateFormInputValues) => QualificationCreateFormInputValues;
    onSuccess?: (fields: QualificationCreateFormInputValues) => void;
    onError?: (fields: QualificationCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: QualificationCreateFormInputValues) => QualificationCreateFormInputValues;
    onValidate?: QualificationCreateFormValidationValues;
} & React.CSSProperties>;
export default function QualificationCreateForm(props: QualificationCreateFormProps): React.ReactElement;
