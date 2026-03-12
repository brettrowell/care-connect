import "./globals.css";
import type { ReactNode } from "react";
import AuthSync from "./AuthSync";

export const metadata = {
  title: "Care Connect",
  description: "Care coordination, reimagined."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthSync />
        {children}
      </body>
    </html>
  );
}
