import { Github, Linkedin } from "lucide-react";


export default function Header() {
  return (
    <section
      className="
        relative isolate overflow-hidden
        pt-7             // distance from top of page 
        pb-12 md:pb-16   // distance to terminal section
      "
    >
      {/*
        Background glow using 2 radical gradients
      */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            radial-gradient(
              500px 240px at 30% 10%,
              rgba(111,255,234,0.12), 
              transparent 60%
            ),
            radial-gradient(
              700px 360px at 70% 30%,
              rgba(184,140,255,0.10),
              transparent 60%
            )
          `,
          backgroundRepeat: "no-repeat",
        }}
      />

      {/*
        LinkedIn and Github buttons
      */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-end gap-3">
          {/* LinkedIn Button */}
          <a
            href="https://linkedin.com/in/tinngo777"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="
              flex items-center justify-center
              h-9 w-9 rounded-xl
              border border-white/15
              bg-white/5
              text-white
              transition-all duration-200
              hover:bg-white/10 hover:scale-105
            "
          >
            <Linkedin className="h-5 w-5" />
          </a>

          {/* GitHub Button */}
          <a
            href="https://github.com/tinngo777"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="
              flex items-center justify-center
              h-9 w-9 rounded-xl
              border border-white/15
              bg-white/5
              text-white
              transition-all duration-200
              hover:bg-white/10 hover:scale-105
            "
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/*
        Middle: Name, Title and Location
      */}
      <div className="py-10 text-center md:py-14">
        {/* Name */}
        <h1
          className="
            text-4xl md:text-7xl
            font-black leading-tight tracking-tight
            text-white   /* pure white name for clarity and contrast */
          "
        >
          Duc Tin Ngo
        </h1>

        {/* Title and Location */}
        <p className="mt-3 text-lg md:text-2xl text-white/70">
          Software Engineer | Grand Prairie, TX
        </p>
      </div>
    </section>
  );
}
