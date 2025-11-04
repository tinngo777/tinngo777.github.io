import Header from "../ui/sections/Header";
import Footer from "../ui/sections/Footer";
import TerminalSection from "../ui/sections/TerminalSection";
import Experience from "../ui/sections/Experience";
import TechStack from "../ui/sections/TechStack";
import Projects from "../ui/sections/Projects";
import MusicLab from "../ui/sections/MusicLab";
import MagicCursor from "./MagicCursor";


export default function App() {
  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen flex flex-col relative overflow-hidden">
      {/* ✨ Magical wand lightning effect */}
      <MagicCursor />

      {/* ===== HEADER ===== */}
      <Header />

      {/* ===== MAIN SECTIONS ===== */}
      <main className="flex-grow">
        {/* Terminal intro */}
        <section id="terminal">
          <TerminalSection />
        </section>

        {/* Experience */}
        <section id="experience" className="py-20">
          <Experience />
        </section>

        {/* Tech Stack */}
        <section id="techstack" className="py-20">
          <TechStack />
        </section>


        {/* Projects */}
        <section id="projects" className="py-20">
          <Projects username="tinngo777" />
        </section>

        {/* Music Lab */}
        <section id="musiclab" className="py-20">
          <MusicLab />
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
