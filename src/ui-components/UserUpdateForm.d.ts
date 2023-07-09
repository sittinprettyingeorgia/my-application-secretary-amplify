/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { User } from "../models";
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
    qualifications?: string;
    JobPreferences?: string;
    owner?: string;
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
    qualifications?: ValidationFunction<string>;
    JobPreferences?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserUpdateFormOverridesProps = {
    UserUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    jobLinks?: PrimitiveOverrideProps<TextFieldProps>;
    jobLinkCollectionInProgress?: PrimitiveOverrideProps<SwitchFieldProps>;
    jobPostingInProgress?: PrimitiveOverrideProps<SwitchFieldProps>;
    currentAppInfo?: PrimitiveOverrideProps<TextAreaFieldProps>;
    subscriptionType?: PrimitiveOverrideProps<SelectFieldProps>;
    subscriptionTier?: PrimitiveOverrideProps<SelectFieldProps>;
    isActive?: PrimitiveOverrideProps<SwitchFieldProps>;
    identifier?: PrimitiveOverrideProps<TextFieldProps>;
    qualifications?: PrimitiveOverrideProps<TextAreaFieldProps>;
    JobPreferences?: PrimitiveOverrideProps<TextAreaFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserUpdateFormOverridesProps | undefined | null;
} & {
    identifier?: string;
    user?: User;
    onSubmit?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onSuccess?: (fields: UserUpdateFormInputValues) => void;
    onError?: (fields: UserUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onValidate?: UserUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserUpdateForm(props: UserUpdateFormProps): React.ReactElement;
