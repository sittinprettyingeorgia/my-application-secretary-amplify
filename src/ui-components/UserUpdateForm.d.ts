/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { User } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserUpdateFormInputValues = {
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
    JobPreferences?: string;
    userJobPreferenceId?: string;
    userJobPreferencesId?: string;
};
export declare type UserUpdateFormValidationValues = {
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
    JobPreferences?: ValidationFunction<string>;
    userJobPreferenceId?: ValidationFunction<string>;
    userJobPreferencesId?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserUpdateFormOverridesProps = {
    UserUpdateFormGrid?: FormProps<GridProps>;
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
    JobPreferences?: FormProps<SelectFieldProps>;
    userJobPreferenceId?: FormProps<TextFieldProps>;
    userJobPreferencesId?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    user?: User;
    onSubmit?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onSuccess?: (fields: UserUpdateFormInputValues) => void;
    onError?: (fields: UserUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onValidate?: UserUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserUpdateForm(props: UserUpdateFormProps): React.ReactElement;
