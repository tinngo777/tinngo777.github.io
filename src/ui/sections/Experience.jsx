import { Bot, AppWindow } from "lucide-react";

export default function Experience() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* Header Title + Subtitle */}
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
          Experience
        </h2>
        <p className="text-white/60">
          Real-world experience developing scalable full-stack applications and conducting research
          on autonomous robotic systems.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Softwar Engineer */}
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <AppWindow className="h-5 w-5 text-emerald-300" />
            <h3 className="font-semibold">
              Software Engineer 
            </h3>
          </div>

          <p className="text-white/80">
            A&N Professional Services (Sep 2024 – Current)
          </p>

          <ul className="mt-3 text-sm text-white/70 list-disc pl-5 space-y-2">
            <li>
              Developed and deployed a responsive website using React, Vite, and Tailwind CSS 
              integrated with backend form and API services.
            </li>
            <li>
              Collaborated to implement new features, resolve bugs, and follow SDLC best practices.
            </li>
            <li>
              Automated CI/CD deployment via GitHub Actions and Netlify, improving release speed and code
              reliability.
            </li>
            <li>
              Participated in team code reviews and documentation to ensure maintainable, scalable system design.
            </li>
          </ul>
        </article>

        {/* Undergraduate REU Research*/}
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Bot className="h-5 w-5 text-violet-300" />
            <h3 className="font-semibold">
              Undergraduate REU Research
            </h3>
          </div>
          <p className="text-white/80">
            TWIST Lab, University of Texas at Arlington (Sep 2023 - Sep 2024)
          </p>

          <ul className="mt-3 text-sm text-white/70 list-disc pl-5 space-y-2">
            <li>
              Designed and implemented modular Python/ROS 2 program that dynamically optimized sensor usage 
              to improve runtime performance and reduce power consumption.
            </li>
            <li>
              Designed and deployed scalable software modules on TurtleBot4 robots via NVIDIA Jetson Orin controllers,
              improving runtime efficiency and data throughput.
            </li>
            <li>
              Collaborated in a cross-functional team, presenting findings and maintaining reproducible experiment 
              pipelines.
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
