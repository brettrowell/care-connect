import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Care Connect",
  description: "Care coordination, reimagined."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
