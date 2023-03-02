/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type JobCreateFormInputValues = {
    url?: string;
    companyName?: string;
    position?: string;
    jobType?: string;
    salary?: number;
    remote?: boolean;
    qualifications?: string[];
    benefits?: string;
    expLvl?: string;
    owner?: string;
};
export declare type JobCreateFormValidationValues = {
    url?: ValidationFunction<string>;
    companyName?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    jobType?: ValidationFunction<string>;
    salary?: ValidationFunction<number>;
    remote?: ValidationFunction<boolean>;
    qualifications?: ValidationFunction<string>;
    benefits?: ValidationFunction<string>;
    expLvl?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JobCreateFormOverridesProps = {
    JobCreateFormGrid?: FormProps<GridProps>;
    url?: FormProps<TextFieldProps>;
    companyName?: FormProps<TextFieldProps>;
    position?: FormProps<TextFieldProps>;
    jobType?: FormProps<SelectFieldProps>;
    salary?: FormProps<TextFieldProps>;
    remote?: FormProps<SwitchFieldProps>;
    qualifications?: FormProps<TextFieldProps>;
    benefits?: FormProps<SelectFieldProps>;
    expLvl?: FormProps<SelectFieldProps>;
    owner?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type JobCreateFormProps = React.PropsWithChildren<{
    overrides?: JobCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: JobCreateFormInputValues) => JobCreateFormInputValues;
    onSuccess?: (fields: JobCreateFormInputValues) => void;
    onError?: (fields: JobCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: JobCreateFormInputValues) => JobCreateFormInputValues;
    onValidate?: JobCreateFormValidationValues;
} & React.CSSProperties>;
export default function JobCreateForm(props: JobCreateFormProps): React.ReactElement;
