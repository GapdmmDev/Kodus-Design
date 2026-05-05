import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Começar projeto",
  robots: { index: false, follow: false },
};

export default function FormularioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
