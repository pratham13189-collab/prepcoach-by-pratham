import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prepcoach by PRATHAM | Electronics Interview Prep",
  description: "AI based interview preparation for electronics job questions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
