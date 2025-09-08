import { type ReactNode } from "react";
import type { DefaultValues, FieldError, Resolver } from "react-hook-form";
import { Controller, FormProvider, useFormContext, useForm } from "react-hook-form";
import InputTextComponent from "@/components/Inputs/InputText";
import InputSelectComponent from "@/components/Inputs/InputSelect";

interface FormStepProps<T extends Record<string, unknown>> {
    defaultValues: DefaultValues<T>;
    resolver: Resolver<T>;
    children: ReactNode;
    disabled?: boolean;
    onSubmit?: (output: T) => void;
}

export default function FormStep<T extends Record<string, unknown>>({
    defaultValues,
    resolver,
    children,
    disabled = false,
    onSubmit = () => { },
}: FormStepProps<T>) {
    const form = useForm({ defaultValues, resolver });

    console.log("Watch: ", form.watch());
    console.log("Error: ", form?.formState?.errors);

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="form-container"
            inert={disabled}
        >
            {children && <FormProvider {...form}>{children}</FormProvider>}
        </form>
    );
}

interface FormInputTextProps {
    name: string
    placeholder?: string
    label: string
    onBlur?: (e?: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputText({ name, placeholder, label, onBlur }: FormInputTextProps) {
    const Form = useFormContext();
    const control = Form?.control;
    const error = Form?.formState.errors[name] as FieldError;

    return <Controller
        control={control}
        name={name}
        render={({ field }) => (
            <InputTextComponent
                name={name}
                value={field.value}
                className={name}
                label={label}
                placeholder={placeholder}
                onChange={field.onChange}
                fieldError={error}
                saveOnBlur={onBlur}
            />
        )}
    />
}

type FormInputSelectProps = FormInputTextProps & {
    option: { value: number, name: string }[]
}

export function InputSelect({ name, label, option }: FormInputSelectProps) {
    const Form = useFormContext();
    const control = Form?.control;
    const error = Form?.formState.errors[name] as FieldError;

    return <Controller
        control={control}
        name={name}
        render={({ field }) => (
            <InputSelectComponent
                name={name}
                label={label}
                option={option}
                value={field.value}
                onChange={field.onChange}
                fieldError={error}
            />
        )}
    />
}