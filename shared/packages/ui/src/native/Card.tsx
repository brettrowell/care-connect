import type { ComponentProps, PropsWithChildren } from "react";
import { View } from "react-native";

export type CardProps = PropsWithChildren<ComponentProps<typeof View>> & {
  className?: string;
};

export function Card({ className = "", ...props }: CardProps) {
  return (
    <View
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`.trim()}
      {...props}
    />
  );
}
