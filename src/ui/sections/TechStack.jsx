import python from "../../assets/python.png";
import java from "../../assets/java.png";
import cIcon from "../../assets/letter-c.png";
import js from "../../assets/js.png";
import sql from "../../assets/sql.png";
import css from "../../assets/css-3.png";
import html from "../../assets/html.png";
import react from "../../assets/react.svg";
import streamlit from "../../assets/streamlit.svg";
import ros from "../../assets/ros.svg";
import qt from "../../assets/qt.svg";
import tailwind from "../../assets/tailwindcss.png";
import restapi from "../../assets/restapi.svg";
import firebase from "../../assets/firebase.png";
import mysql from "../../assets/mysql.png";
import github from "../../assets/github.svg";
import junit from "../../assets/junit.png";
import linux from "../../assets/linux.png";
import bash from "../../assets/bash.svg";

export default function TechStack() {
  const stack = {
    languages: [
      { icon: python, name: "Python" },
      { icon: java, name: "Java" },
      { icon: cIcon, name: "C" },
      { icon: js, name: "JavaScript" },
      { icon: sql, name: "SQL" },
      { icon: css, name: "CSS" },
      { icon: html, name: "HTML" },
    ],
    frameworks: [
      { icon: react, name: "React.js" },
      { icon: streamlit, name: "Streamlit" },
      { icon: ros, name: "ROS 2" },
      { icon: qt, name: "Qt" },
      { icon: tailwind, name: "TailwindCSS" },
      { icon: restapi, name: "REST APIs" },
    ],
    tools: [
      { icon: firebase, name: "Firebase" },
      { icon: mysql, name: "MySQL" },
      { icon: github, name: "GitHub" },
      { icon: junit, name: "JUnit" },
      { icon: linux, name: "Linux" },
      { icon: bash, name: "Bash" },
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
                src={item.icon}
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
                src={item.icon}
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
                src={item.icon}
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
