export default function Footer() {
    return (
      <footer id="contact" className="border-t border-white/10 bg-[hsl(var(--bg))]/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-center">Contact</h2>
          <p className="mt-2 text-center text-white/70">
            Let's connect! Whether you are interested in building software or jamming music!
          </p>
  
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="mailto:tinngo461@gmail.com"
               className="rounded-xl bg-emerald-400/90 px-6 py-2 font-semibold text-emerald-950 hover:brightness-110">Email Me</a>
            <a href="https://github.com/tinngo777" target="_blank" rel="noreferrer"
               className="rounded-xl border border-white/15 bg-white/5 px-6 py-2 hover:bg-white/10">GitHub</a>
            <a href="https://www.linkedin.com/in/duc-tin-ngo" target="_blank" rel="noreferrer"
               className="rounded-xl border border-white/15 bg-white/5 px-6 py-2 hover:bg-white/10">LinkedIn</a>
          </div>
  
          <p className="mt-10 text-center text-sm text-white/50">
            © {new Date().getFullYear()} Duc Tin Ngo — Built with React + Tailwind
          </p>
        </div>
      </footer>
    );
  }
  