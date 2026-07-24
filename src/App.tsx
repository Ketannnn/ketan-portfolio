import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Education } from "./components/sections/Education";
import { Contact } from "./components/sections/Contact";
import { SectionDivider } from "./components/ui/SectionDivider";

function App() {
  return (
    <div className="min-h-screen bg-base text-white">
      {/*
       * Skip-to-content link — WCAG 2.4.1 (Bypass Blocks, Level A).
       * Visually hidden until keyboard-focused; appears as an indigo pill
       * in the top-left corner when a keyboard user presses Tab first.
       * Must be the very first focusable element in the DOM so it intercepts
       * the first Tab press before reaching the navbar.
       */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-glow focus:outline-none"
      >
        Skip to main content
      </a>

      <Navbar />
      <main id="main-content" role="main">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
