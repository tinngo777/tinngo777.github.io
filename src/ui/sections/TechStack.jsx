export default function TechStack() {
  const stack = {
    languages: [
      { icon: "python.png", name: "Python" },
      { icon: "java.png", name: "Java" },
      { icon: "letter-c.png", name: "C" },
      { icon: "js.png", name: "JavaScript" },
      { icon: "sql.png", name: "SQL" },
      { icon: "css-3.png", name: "CSS" },
      { icon: "html.png", name: "HTML" },
    ],
    frameworks: [
      { icon: "react.svg", name: "React.js" },
      { icon: "streamlit.svg", name: "Streamlit" },
      { icon: "ros.svg", name: "ROS 2" },
      { icon: "qt.svg", name: "Qt" },
      { icon: "tailwindcss.png", name: "TailwindCSS" },
      { icon: "restapi.svg", name: "REST APIs" },
    ],
    tools: [
      { icon: "firebase.png", name: "Firebase" },
      { icon: "mysql.png", name: "MySQL" },
      { icon: "github.svg", name: "GitHub" },
      { icon: "junit.png", name: "JUnit" },
      { icon: "linux.png", name: "Linux" },
      { icon: "bash.svg", name: "Bash" },
    ],
  };

  return (
    <section id="techstack" className="max-w-6xl mx-auto px-4 py-16">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight text-left">
        Tech Stack
      </h2>
      <p className="text-white/60 mb-8 text-left text-[0.95rem]">
        Tools and technologies I have worked with.
      </p>

      {/* Languages */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-5 text-white/80 text-left">
          Languages
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-5">
          {stack.languages.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-xl 
                         border border-white/10 bg-white/5 p-4 
                         hover:bg-white/10 transition-all duration-300
                         hover:scale-105 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            >
              <img
                src={`/src/assets/${item.icon}`}
                alt={item.name}
                className="h-10 w-10 mb-2 object-contain"
              />
              <span className="text-sm text-white/80">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Frameworks/Libraries */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-5 text-white/80 text-left">
          Frameworks / Libraries
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-5">
          {stack.frameworks.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-xl 
                         border border-white/10 bg-white/5 p-4 
                         hover:bg-white/10 transition-all duration-300
                         hover:scale-105 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            >
              <img
                src={`/src/assets/${item.icon}`}
                alt={item.name}
                className="h-10 w-10 mb-2 object-contain"
              />
              <span className="text-sm text-white/80">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tools/Platforms */}
      <div>
        <h3 className="text-lg font-semibold mb-5 text-white/80 text-left">
          Tools / Platforms
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-5">
          {stack.tools.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-xl 
                         border border-white/10 bg-white/5 p-4 
                         hover:bg-white/10 transition-all duration-300
                         hover:scale-105 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            >
              <img
                src={`/src/assets/${item.icon}`}
                alt={item.name}
                className="h-10 w-10 mb-2 object-contain"
              />
              <span className="text-sm text-white/80">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
