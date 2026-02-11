import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Providers } from "@/lib/providers";

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <DashboardLayout>{children}</DashboardLayout>
    </Providers>
  );
}
