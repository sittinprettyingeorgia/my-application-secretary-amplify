/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Job } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type JobUpdateFormInputValues = {
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
export declare type JobUpdateFormValidationValues = {
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
export declare type JobUpdateFormOverridesProps = {
    JobUpdateFormGrid?: FormProps<GridProps>;
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
export declare type JobUpdateFormProps = React.PropsWithChildren<{
    overrides?: JobUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    job?: Job;
    onSubmit?: (fields: JobUpdateFormInputValues) => JobUpdateFormInputValues;
    onSuccess?: (fields: JobUpdateFormInputValues) => void;
    onError?: (fields: JobUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: JobUpdateFormInputValues) => JobUpdateFormInputValues;
    onValidate?: JobUpdateFormValidationValues;
} & React.CSSProperties>;
export default function JobUpdateForm(props: JobUpdateFormProps): React.ReactElement;
