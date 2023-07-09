/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RateLimitCreateFormInputValues = {
    identifier?: string;
    lastRefillTime?: string;
    tokenPerMin?: number;
    tokenCapacity?: number;
    availableTokens?: number;
    owner?: string;
};
export declare type RateLimitCreateFormValidationValues = {
    identifier?: ValidationFunction<string>;
    lastRefillTime?: ValidationFunction<string>;
    tokenPerMin?: ValidationFunction<number>;
    tokenCapacity?: ValidationFunction<number>;
    availableTokens?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RateLimitCreateFormOverridesProps = {
    RateLimitCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    identifier?: PrimitiveOverrideProps<TextFieldProps>;
    lastRefillTime?: PrimitiveOverrideProps<TextFieldProps>;
    tokenPerMin?: PrimitiveOverrideProps<TextFieldProps>;
    tokenCapacity?: PrimitiveOverrideProps<TextFieldProps>;
    availableTokens?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RateLimitCreateFormProps = React.PropsWithChildren<{
    overrides?: RateLimitCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RateLimitCreateFormInputValues) => RateLimitCreateFormInputValues;
    onSuccess?: (fields: RateLimitCreateFormInputValues) => void;
    onError?: (fields: RateLimitCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RateLimitCreateFormInputValues) => RateLimitCreateFormInputValues;
    onValidate?: RateLimitCreateFormValidationValues;
} & React.CSSProperties>;
export default function RateLimitCreateForm(props: RateLimitCreateFormProps): React.ReactElement;
