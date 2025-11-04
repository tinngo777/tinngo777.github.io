import { useEffect, useState } from "react";
import { GitCommit, Star } from "lucide-react";


export default function Projects({ username }) {
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState({
    years: 0,
    publicRepos: 0,
    contributions: 2,
  });

  useEffect(() => {
    (async () => {
      // Fetch GitHub info (join year + public repo number)
      const user = await fetch(`https://api.github.com/users/${username}`).then((r) => r.json());
      if (user && user.created_at) {
        const years = Math.max(1, new Date().getFullYear() - new Date(user.created_at).getFullYear());
        setStats((s) => ({ ...s, years, publicRepos: user.public_repos || 0 }));
      }

      // Fetch 6 most recent repos
      const r = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
      ).then((r) => r.json());
      if (Array.isArray(r)) setRepos(r);
    })();
  }, [username]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Section Header */}
      <header className="mb-8 text-left">
        <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">Projects</h2>
        <p className="text-white/60 text-[0.95rem]">
          Six latest projects from Github
        </p>
      </header>

      {/* Top Stats */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        
        {/* Years on GitHub */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
          <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-emerald-400/20 grid place-items-center">
            <GitCommit className="h-5 w-5 text-emerald-300" />
          </div>
          <div className="text-2xl font-black">{stats.years}</div>
          <div className="text-white/60 text-sm">Years on GitHub</div>
        </div>

        {/* Public Repos */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
          <div className="mx-auto mb-2 h-12 w-12 rounded-[10px] bg-sky-400/20 grid place-items-center">
            <Star className="h-5 w-5 text-sky-300" />
          </div>
          <div className="text-2xl font-black">{stats.publicRepos}</div>
          <div className="text-white/60 text-sm">Public Repos</div>
        </div>

        {/* OSS Contributions */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
          <div className="mx-auto mb-2 h-12 w-12 rotate-45 rounded-[6px] bg-violet-400/20 grid place-items-center">
            <span className="-rotate-45 text-violet-300 font-bold">OSS</span>
          </div>
          <div className="text-2xl font-black">{stats.contributions}</div>
          <div className="text-white/60 text-sm">Open-source contributions</div>
        </div>
      </div>

      {/* === Repositories Grid === */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((r) => (
          <article
            key={r.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-emerald-400/30 transition-all"
          >
            <header className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold">{r.name}</h3>
              <span className="text-xs text-white/60">{r.language ?? "—"}</span>
            </header>
            <p className="mt-1 text-white/70 line-clamp-3">
              {r.description || "No description yet."}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/60">
              <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">
                ★ {r.stargazers_count}
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">
                Updated {new Date(r.pushed_at).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <a
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10 transition"
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
              >
                Repo
              </a>

              {r.homepage && (
                <a
                  className="rounded-lg bg-emerald-400/90 text-emerald-950 px-3 py-1.5 font-semibold hover:brightness-110"
                  href={r.homepage}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
