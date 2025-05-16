'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  children: React.ReactNode;
}

export function Select({ children, ...props }: SelectProps) {
  return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
}

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  children: React.ReactNode;
}

export function SelectTrigger({ children, ...props }: SelectTriggerProps) {
  return <SelectPrimitive.Trigger {...props}>{children}</SelectPrimitive.Trigger>;
}

interface SelectValueProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value> {
  children?: React.ReactNode;
}

export function SelectValue({ children, ...props }: SelectValueProps) {
  return <SelectPrimitive.Value {...props}>{children}</SelectPrimitive.Value>;
}

interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  children: React.ReactNode;
}

export function SelectContent({ children, ...props }: SelectContentProps) {
  return <SelectPrimitive.Content {...props}>{children}</SelectPrimitive.Content>;
}

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  children: React.ReactNode;
}

export function SelectItem({ children, ...props }: SelectItemProps) {
  return <SelectPrimitive.Item {...props}>{children}</SelectPrimitive.Item>;
} 