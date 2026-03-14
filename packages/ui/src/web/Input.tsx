import type { InputHTMLAttributes } from "react";

const base =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-ink outline-none transition focus:border-brand";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  const styles = [base, className].join(" ").trim();
  return <input className={styles} {...props} />;
}
