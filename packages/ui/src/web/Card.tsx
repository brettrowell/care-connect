import type { HTMLAttributes, PropsWithChildren } from "react";

const base = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm";

export type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ className = "", ...props }: CardProps) {
  const styles = [base, className].join(" ").trim();
  return <div className={styles} {...props} />;
}
