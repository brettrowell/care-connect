import type { ComponentProps } from "react";
import { TextInput } from "react-native";

export type InputProps = ComponentProps<typeof TextInput> & {
  className?: string;
};

export function Input({ className = "", ...props }: InputProps) {
  return (
    <TextInput
      className={`rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 ${className}`.trim()}
      {...props}
    />
  );
}
