/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { RateLimit } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RateLimitUpdateFormInputValues = {
    identifier?: string;
    lastRefillTime?: string;
    tokenPerMin?: number;
    tokenCapacity?: number;
    availableTokens?: number;
    owner?: string;
};
export declare type RateLimitUpdateFormValidationValues = {
    identifier?: ValidationFunction<string>;
    lastRefillTime?: ValidationFunction<string>;
    tokenPerMin?: ValidationFunction<number>;
    tokenCapacity?: ValidationFunction<number>;
    availableTokens?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RateLimitUpdateFormOverridesProps = {
    RateLimitUpdateFormGrid?: FormProps<GridProps>;
    identifier?: FormProps<TextFieldProps>;
    lastRefillTime?: FormProps<TextFieldProps>;
    tokenPerMin?: FormProps<TextFieldProps>;
    tokenCapacity?: FormProps<TextFieldProps>;
    availableTokens?: FormProps<TextFieldProps>;
    owner?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RateLimitUpdateFormProps = React.PropsWithChildren<{
    overrides?: RateLimitUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    rateLimit?: RateLimit;
    onSubmit?: (fields: RateLimitUpdateFormInputValues) => RateLimitUpdateFormInputValues;
    onSuccess?: (fields: RateLimitUpdateFormInputValues) => void;
    onError?: (fields: RateLimitUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: RateLimitUpdateFormInputValues) => RateLimitUpdateFormInputValues;
    onValidate?: RateLimitUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RateLimitUpdateForm(props: RateLimitUpdateFormProps): React.ReactElement;
