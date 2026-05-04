import { Nav } from "@/components/landing/Nav";
import { HeroSplit } from "@/components/landing/HeroSplit";
import { Services } from "@/components/landing/Services";
import { Manifesto } from "@/components/landing/Manifesto";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSplit />
        <Services />
        <Manifesto />
      </main>
    </>
  );
}
