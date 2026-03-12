import type { ButtonHTMLAttributes } from "react";

const base = "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition";
const solid = "bg-brand text-white hover:bg-brand/90 active:bg-brand";
const outline = "border border-brand text-brand hover:bg-brand/10";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
};

export function Button({ variant = "solid", className = "", ...props }: ButtonProps) {
  const styles = [base, variant === "solid" ? solid : outline, className].join(" ").trim();
  return <button className={styles} {...props} />;
}
