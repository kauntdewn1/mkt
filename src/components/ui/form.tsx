'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>;
}

interface FormFieldProps {
  name: string;
  control: any;
  render: (props: { field: any }) => React.ReactNode;
}

export function FormField({ name, control, render }: FormFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const element = render({ field });
        if (!React.isValidElement(element)) {
          throw new Error('O método render deve retornar um ReactElement válido.');
        }
        return element;
      }}
    />
  );
}

interface FormItemProps {
  children: React.ReactNode;
  className?: string;
}

export function FormItem({ children, className }: FormItemProps) {
  return <div className={className}>{children}</div>;
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function FormLabel({ children, ...props }: FormLabelProps) {
  return <label {...props}>{children}</label>;
}

interface FormControlProps {
  children: React.ReactNode;
}

export function FormControl({ children }: FormControlProps) {
  return <div>{children}</div>;
}

interface FormMessageProps {
  children?: React.ReactNode;
  className?: string;
}

export function FormMessage({ children, className }: FormMessageProps) {
  return <p className={className}>{children}</p>;
}

interface FormDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function FormDescription({ children, className }: FormDescriptionProps) {
  return <p className={className}>{children}</p>;
} 