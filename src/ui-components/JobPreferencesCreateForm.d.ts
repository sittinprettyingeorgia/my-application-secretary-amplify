/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type JobPreferencesCreateFormInputValues = {
    jobTypes?: string;
    salaryReq?: number;
    expLvl?: string;
    preferredLocation?: string;
    preferredAge?: number;
    qualifications?: string;
    education?: string;
    companyBlacklist?: string[];
    jobLinksLimit?: number;
};
export declare type JobPreferencesCreateFormValidationValues = {
    jobTypes?: ValidationFunction<string>;
    salaryReq?: ValidationFunction<number>;
    expLvl?: ValidationFunction<string>;
    preferredLocation?: ValidationFunction<string>;
    preferredAge?: ValidationFunction<number>;
    qualifications?: ValidationFunction<string>;
    education?: ValidationFunction<string>;
    companyBlacklist?: ValidationFunction<string>;
    jobLinksLimit?: ValidationFunction<number>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JobPreferencesCreateFormOverridesProps = {
    JobPreferencesCreateFormGrid?: FormProps<GridProps>;
    jobTypes?: FormProps<SelectFieldProps>;
    salaryReq?: FormProps<TextFieldProps>;
    expLvl?: FormProps<TextFieldProps>;
    preferredLocation?: FormProps<TextFieldProps>;
    preferredAge?: FormProps<TextFieldProps>;
    qualifications?: FormProps<TextAreaFieldProps>;
    education?: FormProps<SelectFieldProps>;
    companyBlacklist?: FormProps<TextFieldProps>;
    jobLinksLimit?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type JobPreferencesCreateFormProps = React.PropsWithChildren<{
    overrides?: JobPreferencesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: JobPreferencesCreateFormInputValues) => JobPreferencesCreateFormInputValues;
    onSuccess?: (fields: JobPreferencesCreateFormInputValues) => void;
    onError?: (fields: JobPreferencesCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: JobPreferencesCreateFormInputValues) => JobPreferencesCreateFormInputValues;
    onValidate?: JobPreferencesCreateFormValidationValues;
} & React.CSSProperties>;
export default function JobPreferencesCreateForm(props: JobPreferencesCreateFormProps): React.ReactElement;
