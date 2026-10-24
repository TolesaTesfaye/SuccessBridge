import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Chapter2 from "./dashboards/student/learning center/highschool/grade 11/chemistry/chapters/Chapter 2/Chapter2";

const subtopics = ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6"];
const params = new URLSearchParams(window.location.search);

const Harness: React.FC = () => {
  const [selected, setSelected] = useState<string | undefined>(
    params.get("sub") || undefined
  );
  const [dark, setDark] = useState(params.get("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const only = params.get("only");
    if (only) {
      document.querySelectorAll("section[id]").forEach((element) => {
        if (element.id !== `subtopic-${only}`) {
          (element as HTMLElement).style.display = "none";
        }
      });
    }
  }, []);

  const toggleDark = () => {
    setDark((current) => !current);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="sticky top-0 z-50 flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white/90 p-2 dark:border-slate-700 dark:bg-slate-900/90">
        {subtopics.map((id) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className="rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white"
          >
            {id}
          </button>
        ))}
        <button
          onClick={toggleDark}
          className="rounded bg-slate-800 px-2 py-1 text-xs font-bold text-white"
        >
          {dark ? "Light" : "Dark"}
        </button>
      </div>
      <div className="mx-auto max-w-5xl p-4">
        <Chapter2 selectedSubtopic={selected} />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Harness />
  </React.StrictMode>
);
