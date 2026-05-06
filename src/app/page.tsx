import dynamic from "next/dynamic";
import { Nav } from "@/components/landing/Nav";
import { HeroSplit } from "@/components/landing/HeroSplit";
import { Services } from "@/components/landing/Services";
import { Manifesto } from "@/components/landing/Manifesto";
import { Testimonial } from "@/components/landing/Testimonial";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

// Lazy load — remove Framer Motion do bundle inicial no mobile
const Process = dynamic(() =>
  import("@/components/landing/Process").then((m) => m.Process)
);
const Work = dynamic(() =>
  import("@/components/landing/Work").then((m) => m.Work)
);
const FAQ = dynamic(() =>
  import("@/components/landing/FAQ").then((m) => m.FAQ)
);

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSplit />
        <Services />
        <Manifesto />
        <Process />
        <Work />
        <Testimonial />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
