import { Nav } from "@/components/landing/Nav";
import { HeroSplit } from "@/components/landing/HeroSplit";
import { Services } from "@/components/landing/Services";
import { Manifesto } from "@/components/landing/Manifesto";
import { Process } from "@/components/landing/Process";
import { Work } from "@/components/landing/Work";
import { Testimonial } from "@/components/landing/Testimonial";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

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
