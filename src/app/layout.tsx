import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "AmanTrack - Asset Management System",
  description: "Professional asset compliance tracking and management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <Providers>
            <DashboardLayout>{children}</DashboardLayout>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
