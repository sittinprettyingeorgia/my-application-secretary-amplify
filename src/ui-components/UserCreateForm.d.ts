/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserCreateFormInputValues = {
    firstName?: string;
    lastName?: string;
    email?: string;
    jobLinks?: string[];
    jobLinkCollectionInProgress?: boolean;
    jobPostingInProgress?: boolean;
    currentAppInfo?: string;
    subscriptionType?: string;
    subscriptionTier?: string;
    isActive?: boolean;
    identifier?: string;
    JobPreference?: string;
    owner?: string;
    userJobPreferenceId?: string;
};
export declare type UserCreateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    jobLinks?: ValidationFunction<string>;
    jobLinkCollectionInProgress?: ValidationFunction<boolean>;
    jobPostingInProgress?: ValidationFunction<boolean>;
    currentAppInfo?: ValidationFunction<string>;
    subscriptionType?: ValidationFunction<string>;
    subscriptionTier?: ValidationFunction<string>;
    isActive?: ValidationFunction<boolean>;
    identifier?: ValidationFunction<string>;
    JobPreference?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    userJobPreferenceId?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserCreateFormOverridesProps = {
    UserCreateFormGrid?: FormProps<GridProps>;
    firstName?: FormProps<TextFieldProps>;
    lastName?: FormProps<TextFieldProps>;
    email?: FormProps<TextFieldProps>;
    jobLinks?: FormProps<TextFieldProps>;
    jobLinkCollectionInProgress?: FormProps<SwitchFieldProps>;
    jobPostingInProgress?: FormProps<SwitchFieldProps>;
    currentAppInfo?: FormProps<TextAreaFieldProps>;
    subscriptionType?: FormProps<SelectFieldProps>;
    subscriptionTier?: FormProps<SelectFieldProps>;
    isActive?: FormProps<SwitchFieldProps>;
    identifier?: FormProps<TextFieldProps>;
    JobPreference?: FormProps<SelectFieldProps>;
    owner?: FormProps<TextFieldProps>;
    userJobPreferenceId?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserCreateFormProps = React.PropsWithChildren<{
    overrides?: UserCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserCreateFormInputValues) => UserCreateFormInputValues;
    onSuccess?: (fields: UserCreateFormInputValues) => void;
    onError?: (fields: UserCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: UserCreateFormInputValues) => UserCreateFormInputValues;
    onValidate?: UserCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserCreateForm(props: UserCreateFormProps): React.ReactElement;
