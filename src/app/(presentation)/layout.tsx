import { PresentationNav } from "@/components/presentation/navigation/PresentationNav";
import { PresentationFooter } from "@/components/presentation/navigation/PresentationFooter";

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="presentation-wrapper">
      <PresentationNav />
      <main className="presentation-main">{children}</main>
      <PresentationFooter />
    </div>
  );
}
