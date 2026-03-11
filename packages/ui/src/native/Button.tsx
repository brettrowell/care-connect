import type { ComponentProps } from "react";
import { Pressable, Text } from "react-native";

export type ButtonProps = ComponentProps<typeof Pressable> & {
  title: string;
  variant?: "solid" | "outline";
};

export function Button({ title, variant = "solid", className = "", ...props }: ButtonProps) {
  const base = "rounded-full px-5 py-3";
  const solid = "bg-brand";
  const outline = "border border-brand";
  const textSolid = "text-white";
  const textOutline = "text-brand";

  return (
    <Pressable
      accessibilityRole="button"
      className={[base, variant === "solid" ? solid : outline, className].join(" ")}
      {...props}
    >
      <Text className={["text-sm font-semibold", variant === "solid" ? textSolid : textOutline].join(" ")}>
        {title}
      </Text>
    </Pressable>
  );
}
