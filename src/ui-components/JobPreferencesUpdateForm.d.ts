/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { JobPreferences } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type JobPreferencesUpdateFormInputValues = {
    jobTypes?: string;
    salaryReq?: number;
    expLvl?: string;
    preferredLocation?: string;
    preferredAge?: string;
    qualifications?: string;
    education?: string;
    companyBlacklist?: string[];
    jobLinksLimit?: number;
};
export declare type JobPreferencesUpdateFormValidationValues = {
    jobTypes?: ValidationFunction<string>;
    salaryReq?: ValidationFunction<number>;
    expLvl?: ValidationFunction<string>;
    preferredLocation?: ValidationFunction<string>;
    preferredAge?: ValidationFunction<string>;
    qualifications?: ValidationFunction<string>;
    education?: ValidationFunction<string>;
    companyBlacklist?: ValidationFunction<string>;
    jobLinksLimit?: ValidationFunction<number>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JobPreferencesUpdateFormOverridesProps = {
    JobPreferencesUpdateFormGrid?: FormProps<GridProps>;
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
export declare type JobPreferencesUpdateFormProps = React.PropsWithChildren<{
    overrides?: JobPreferencesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    jobPreferences?: JobPreferences;
    onSubmit?: (fields: JobPreferencesUpdateFormInputValues) => JobPreferencesUpdateFormInputValues;
    onSuccess?: (fields: JobPreferencesUpdateFormInputValues) => void;
    onError?: (fields: JobPreferencesUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: JobPreferencesUpdateFormInputValues) => JobPreferencesUpdateFormInputValues;
    onValidate?: JobPreferencesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function JobPreferencesUpdateForm(props: JobPreferencesUpdateFormProps): React.ReactElement;
