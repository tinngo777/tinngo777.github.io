import { useEffect, useState, useRef } from "react";


const TERMINAL_HEIGHT = "32rem";
const BG_COLOR = "#0b0b3d";
const TYPE_SPEED_MS = 7;
const AFTER_INTRO_DELAY_MS = 200;
const NAV_OFFSET = 80;
const PROMPT = "tinngo@portfolio:~$";


const bullets = [
  "SWE senior @ UTA",
  "Full-stack Developer",
  "Linux Enthusiast (I use Arch btw😎)",
  "Bedroom Musician",
];

// Intro line
const intro = `Hey there, I'm Tin — a software engineering student who loves turning ideas and curiosities into full-stack apps across web, desktop, and mobile. 
Outside from programming, I love to dive deep into Linux or jamming on guitar, piano, and audio experiments.
`;

// Sections for 'cd' command
const SECTIONS = ["experience", "techstack", "projects", "musiclab"];

export default function TerminalSection() {
  const [opened, setOpened] = useState(false);
  const [lines, setLines] = useState([]);
  const [current, setCurrent] = useState("");
  const [locked, setLocked] = useState(false);

  // ref to scrollable output
  const outRef = useRef(null);

  // Opening with intro typing out
  useEffect(() => {
    if (!opened) return;

    // whoami command
    setLines([{ text: `${PROMPT} whoami`, color: "emerald" }]);

    let i = 0;
    const id = setInterval(() => {
      const text = intro.slice(0, i++);
      setLines([
        { text: `${PROMPT} whoami`, color: "emerald" },
        { text, color: "white" },
      ]);

      if (i > intro.length) {
        clearInterval(id);
        // Print section selection and instruct commands
        setTimeout(() => {
          setLines((prev) => [
            ...prev,
            { text: "", color: "white" },
            { text: "Sections:", color: "emerald" },
            { text: SECTIONS.join("      "), clickable: SECTIONS },
            { text: "", color: "white" },
            { text: "Type: cd <section> to navigate", color: "gray" },
            { text: PROMPT, color: "emerald" },
          ]);
        }, AFTER_INTRO_DELAY_MS);
      }
    }, TYPE_SPEED_MS);

    return () => clearInterval(id);
  }, [opened]);

  // Keyboard Input Handler
  useEffect(() => {
    if (!opened) return;

    const onKey = (e) => {
      if (locked) return;

      // Prevent page scroll default
      if (e.key.length === 1 || e.key === "Backspace" || e.key === "Enter") {
        e.preventDefault();
      }

      // Manage command typing + Enter + Backspace in terminal
      if (e.key === "Enter") {
        runCommand(current.trim());
        setCurrent("");
      } else if (e.key === "Backspace") {
        setCurrent((c) => c.slice(0, -1));
      } else if (e.key.length === 1) {
        setCurrent((c) => c + e.key);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [opened, current, locked]);

  // Scroll to bottom when new line appear
  useEffect(() => {
    if (!outRef.current) return;
    outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [lines]);

  // Execute user command
  const runCommand = (cmd) => {
    setLocked(true);
    if (!cmd) {
      return setTimeout(() => {
        appendPrompt();
        setLocked(false);
      }, 150);
    }

    const lower = cmd.toLowerCase();

    // cd command handler
    if (lower.startsWith("cd")) {
      const target = lower.split(" ")[1];
      if (target) {
        append(`Navigating to ${target}...`);
        const el = document.getElementById(target);
        if (el) {
          setTimeout(() => {
            window.scrollTo({
              top: el.offsetTop - NAV_OFFSET,
              behavior: "smooth",
            });
          }, 350);
        } else {
          append(`No section named '${target}' found.`);
        }
      } else {
        append("usage: cd [section]");
      }
    } else if (lower === "ls") {
      append(SECTIONS.join("  "));
    } else if (lower === "clear") {
      setLines([]);
    } else {
      append(`${cmd}: command not found`);
    }

    // After the command is handled, reprint the prompt
    setTimeout(() => {
      appendPrompt();
      setLocked(false);
    }, 500);
  };


  const append = (text, color = "white") =>
    setLines((prev) => [...prev, { text, color }]);


  const appendPrompt = () =>
    setLines((prev) => [...prev, { text: PROMPT, color: "emerald" }]);


  const handleCD = (section) => {
    const el = document.getElementById(section);
    append(`Navigating to ${section}...`);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      append(`No section named '${section}' found.`);
    }
    setTimeout(() => appendPrompt(), 300);
  };


  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[320px_1fr]">
        <aside className="space-y-3">
          {/* About Me */}
          <h3 className="text-lg font-bold tracking-tight">About Me</h3>
          <ul className="space-y-2 text-white/80">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Terminal Panel */}
        <div
          onClick={() => !opened && setOpened(true)}
          className="cursor-text overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl"
          style={{ height: TERMINAL_HEIGHT, backgroundColor: BG_COLOR }}
        >
          {/* Title bar dots */}
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
            <span className="ml-3 text-xs text-white/60">bash</span>
          </div>

          {/* Output + input line */}
          <div
            ref={outRef}
            className="h-[calc(100%-2rem)] overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed"
          >
            {/* Idle hint */}
            {!opened && (
              <div className="italic text-white/60">
                /* click to start */
              </div>
            )}

            {/* Printed lines */}
            {lines.map((line, idx) => (
              <div key={idx} className="mb-1 whitespace-pre-wrap">
                {line.clickable ? (
                  // Clickable chips
                  <div className="flex flex-wrap gap-5">
                    {line.clickable.map((dir) => (
                      <button
                        key={dir}
                        onClick={() => handleCD(dir)}
                        className="cursor-pointer text-emerald-300 underline-offset-2 hover:underline"
                      >
                        {dir}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span
                    className={
                      line.color === "emerald"
                        ? "text-emerald-300"
                        : line.color === "gray"
                        ? "text-white/50"
                        : "text-white"
                    }
                  >
                    {line.text}
                  </span>
                )}
              </div>
            ))}

            {/* Live input line with blinking caret */}
            {opened && !locked && (
              <div className="flex gap-2">
                <span className="text-emerald-300">{PROMPT}</span>
                <span className="text-white">{current}</span>
                <span className="animate-pulse">▮</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
