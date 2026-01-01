/*
==================================================
File Name:    layout.tsx
Created On:   12/29/2025
Purpose:      Root layout with global navbar
              and shared styling.
==================================================
*/

import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="page-glass">{children}</div>
      </body>
    </html>
  );
}
