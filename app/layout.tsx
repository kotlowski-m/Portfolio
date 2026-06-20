import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miłosz Kot — IT Support, PostgreSQL & Technical Operations",
  description:
    "Theoretical Computer Science student focused on IT support, PostgreSQL databases and LLM-assisted troubleshooting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
