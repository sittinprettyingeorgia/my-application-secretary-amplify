/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Qualification } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type QualificationUpdateFormInputValues = {
    variations?: string[];
};
export declare type QualificationUpdateFormValidationValues = {
    variations?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type QualificationUpdateFormOverridesProps = {
    QualificationUpdateFormGrid?: FormProps<GridProps>;
    variations?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type QualificationUpdateFormProps = React.PropsWithChildren<{
    overrides?: QualificationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    qualification?: Qualification;
    onSubmit?: (fields: QualificationUpdateFormInputValues) => QualificationUpdateFormInputValues;
    onSuccess?: (fields: QualificationUpdateFormInputValues) => void;
    onError?: (fields: QualificationUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: QualificationUpdateFormInputValues) => QualificationUpdateFormInputValues;
    onValidate?: QualificationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function QualificationUpdateForm(props: QualificationUpdateFormProps): React.ReactElement;
