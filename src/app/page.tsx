import { Nav } from "@/components/landing/Nav";
import { HeroSplit } from "@/components/landing/HeroSplit";
import { Services } from "@/components/landing/Services";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSplit />
        <Services />
      </main>
    </>
  );
}
