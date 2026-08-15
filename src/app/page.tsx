import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { Projects } from "@/components/sections/Projects";
import { Capabilities } from "@/components/sections/Capabilities";
import { Lab } from "@/components/sections/Lab";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Approach />
      <Projects />
      <Capabilities />
      <Lab />
      <Contact />
    </main>
  );
}