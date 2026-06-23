import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FixedCards from "@/components/FixedCards";
import SectionThree from "@/components/SectionThree";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ position: "relative", zIndex: 2 }}>
      <Navbar />
      <Hero />

      {/* Spacer */}
      <div style={{ height: "150vh" }} />

      {/* Cards Trigger Zone */}
      <div id="cards-trigger" style={{ height: "200vh" }} />

      {/* Fixed Cards Component */}
      <FixedCards />

      {/* Spacer */}
      <div style={{ height: "100vh" }} />

      {/* Section 3 */}
      <SectionThree />

      {/* Remaining Portfolio Sections */}
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
