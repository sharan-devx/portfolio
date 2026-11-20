import { useState, useEffect, useRef } from "react";

const LINKS = {
  github: "https://github.com/sharan-devx",
  linkedin: "https://www.linkedin.com/in/koonasharan",
  email: "mailto:koonasharan@gmail.com",
};

const PROJECTS = [
  {
    name: "UrbanWeave",
    sub: "Fashion E-commerce App",
    desc: "A fashion storefront with Men, Women, and Kids categories, cart, wishlist, login, and an admin dashboard.",
    tags: [
      "React",
      "Vite",
      "JavaScript",
      "REST API",
      "JSON Server",
      "Vercel",
      "Render",
    ],
    live: "https://urban-weave-ecommerce.vercel.app/",
    code: "https://github.com/sharan-devx/UrbanWeave-ecommerce",
    img: "/screenshots/urbanweave.png",
  },
  {
    name: "Inkwell",
    sub: "Blog Platform",
    desc: "A blog platform where readers, authors, and admins have separate access, with blog create, edit, and delete, image upload, search, category and author filters, and comments with star ratings.",
    tags: [
      "React",
      "React Router",
      "Bootstrap",
      "JSON Server",
      "Vercel",
      "Render",
    ],
    live: "https://inkwell-blog-app-alpha.vercel.app/",
    code: "https://github.com/sharan-devx/inkwell-blog-app",
    img: "/screenshots/inkwell.png",
  },
];

const SKILLS = [
  [
    "Frontend",
    "React.js, React Hooks, Context API, React Router, JavaScript (ES6), HTML5, CSS3, Bootstrap, Vite",
  ],
  [
    "Web Development",
    "REST API integration, Fetch API, responsive design, form validation, lazy loading",
  ],
  [
    "Tools and Deployment",
    "Git, GitHub, VS Code, Vercel, Render, GitHub Pages",
  ],
  ["Learning", "Node.js, Express.js, MongoDB"],
];

const WORDS = [
  "Frontend Developer",
  "React.js Developer",
  "Aspiring Full Stack Developer",
];
const STATS = [
  [2, "", "Live projects"],
  [5, "+", "Months of internship"],
  [3, "", "User roles in Inkwell"],
];

function Typewriter() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = WORDS[i];
    const wait = !del && n === w.length ? 1400 : del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1);
      else if (!del) setDel(true);
      else if (n > 0) setN(n - 1);
      else {
        setDel(false);
        setI((i + 1) % WORDS.length);
      }
    }, wait);
    return () => clearTimeout(t);
  }, [n, del, i]);
  return (
    <span>
      {WORDS[i].slice(0, n)}
      <i className="caret" />
    </span>
  );
}

function Count({ to, suffix }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let f;
    const s = performance.now();
    const step = (t) => {
      const p = Math.min((t - s) / 1200, 1);
      setV(Math.round(to * p));
      if (p < 1) f = requestAnimationFrame(step);
    };
    f = requestAnimationFrame(step);
    return () => cancelAnimationFrame(f);
  }, [to]);
  return (
    <>
      {v}
      {suffix}
    </>
  );
}

const REDUCED = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Intro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="intro">
      <i className="bar top" />
      <i className="bar bot" />
      <div>
        <i className="dot" />
        <div className="it-name">KOONA SHARAN KUMAR</div>
        <div className="it-sub">FRONTEND DEVELOPER</div>
      </div>
      <button onClick={onDone}>Skip intro</button>
    </div>
  );
}

function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    if (REDUCED()) return;
    const c = ref.current,
      x = c.getContext("2d");
    let w, h, raf;
    const m = { x: -999, y: -999 };
    const N = innerWidth < 600 ? 35 : 80;
    const P = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
    }));
    const size = () => {
      w = c.width = innerWidth;
      h = c.height = innerHeight;
    };
    const mv = (e) => {
      m.x = e.clientX;
      m.y = e.clientY;
    };
    size();
    addEventListener("resize", size);
    addEventListener("pointermove", mv);
    const draw = () => {
      x.clearRect(0, 0, w, h);
      P.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const px = p.x * w,
          py = p.y * h;
        x.fillStyle = "rgba(255,90,100,.85)";
        x.beginPath();
        x.arc(px, py, 1.6, 0, 7);
        x.fill();
        for (let j = i + 1; j < N; j++) {
          const q = P[j],
            dx = px - q.x * w,
            dy = py - q.y * h,
            d = dx * dx + dy * dy;
          if (d < 14000) {
            x.strokeStyle = `rgba(255,70,80,${0.22 - d / 70000})`;
            x.beginPath();
            x.moveTo(px, py);
            x.lineTo(q.x * w, q.y * h);
            x.stroke();
          }
        }
        const mx = px - m.x,
          my = py - m.y;
        if (mx * mx + my * my < 22000) {
          x.strokeStyle = "rgba(255,138,92,.5)";
          x.beginPath();
          x.moveTo(px, py);
          x.lineTo(m.x, m.y);
          x.stroke();
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
      removeEventListener("pointermove", mv);
    };
  }, []);
  return <canvas ref={ref} className="particles" />;
}

const TECH = [
  "React.js",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Bootstrap",
  "Vite",
  "REST APIs",
  "Git",
  "Vercel",
  "Render",
];
const SCENES = [
  [
    "01 / A clear direction",
    "IMAGINE.",
    "Start with the problem. Picture the screen a person actually needs.",
  ],
  [
    "02 / Thoughtfully built",
    "BUILD.",
    "Components, state, and APIs, written to be readable.",
  ],
  [
    "03 / Something real",
    "LAUNCH.",
    "Ship it, share the link, and learn from real users.",
  ],
];
const VISUALS = [
  <div className="wire" key="w">
    <i className="h" />
    <i />
    <i />
    <i />
    <i className="w" />
  </div>,
  <pre className="code" key="c">
    <span className="k">function</span> <span className="f">ProductCard</span>
    {"({ item }) {"}
    {"\n  "}
    <span className="k">const</span> [liked, setLiked] ={" "}
    <span className="f">useState</span>(<span className="k">false</span>);
    {"\n  "}
    <span className="k">return</span> {"<Card item={item} />;"}
    {"\n}"}
  </pre>,
  <div className="term" key="t">
    <p>
      <b>$</b> npm run build
    </p>
    <p className="ok">✓ build complete</p>
    <p>
      <b>$</b> git push
    </p>
    <p className="ok">✓ deployed on Vercel</p>
    <p className="live">● Live now</p>
  </div>,
];
const WHAT = [
  [
    "React interfaces",
    "Component-based UIs with Hooks, Context API, and React Router.",
  ],
  ["Responsive layouts", "Pages that adapt to mobile and desktop screens."],
  [
    "REST API integration",
    "Fetching and sending data with the Fetch API and JSON Server.",
  ],
  ["Deployment", "Shipping apps on Vercel, Render, and GitHub Pages."],
];
const JOURNEY = [
  [
    "2025",
    "MERN Fullstack Course",
    "Aug to Dec 2025 at Elearn Infotech: HTML, CSS, Bootstrap, JavaScript, and React.",
  ],
  [
    "2026",
    "Frontend Developer Intern",
    "Feb to Jul 2026 at ENut Technologies: login page, responsive fixes, lazy loading.",
  ],
  [
    "2026",
    "Built UrbanWeave",
    "A React e-commerce app with cart, wishlist, and admin dashboard, deployed live.",
  ],
  [
    "2026",
    "Built Inkwell",
    "A role-based blog platform with a REST API, deployed live.",
  ],
  [
    "2026",
    "Graduated B.Tech",
    "Electrical Engineering, CMR College of Engineering and Technology.",
  ],
];
const FONT = {
  S: ["01111", "10000", "01110", "00001", "11110"],
  H: ["10001", "10001", "11111", "10001", "10001"],
  A: ["01110", "10001", "11111", "10001", "10001"],
  R: ["11110", "10001", "11110", "10010", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001"],
};

function Scramble({ text }) {
  const [t, setT] = useState(text);
  const run = () => {
    let f = 0;
    const id = setInterval(() => {
      f++;
      setT(
        text
          .split("")
          .map((c, i) =>
            c === " " || i < f / 2
              ? c
              : "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%"[Math.floor(Math.random() * 28)],
          )
          .join(""),
      );
      if (f > text.length * 2) {
        clearInterval(id);
        setT(text);
      }
    }, 30);
  };
  return <span onMouseEnter={run}>{t}</span>;
}

function Game() {
  const ref = useRef(null);
  const live = useRef(false);
  const over = useRef(false);
  const restart = useRef(false);
  const [label, setLabel] = useState("Play");
  useEffect(() => {
    const c = ref.current,
      x = c.getContext("2d"),
      W = (c.width = 600),
      H = (c.height = 260),
      S = 13;
    const build = () => {
      const bl = [];
      let cx = 0;
      ["SHARAN"].forEach((w) => {
        [...w].forEach((ch) => {
          FONT[ch].forEach((row, r) =>
            [...row].forEach(
              (v, k) =>
                v === "1" &&
                bl.push({ x: 56 + (cx + k) * (S + 1), y: 24 + r * (S + 1) }),
            ),
          );
          cx += 6;
        });
        cx += 2;
      });
      return bl;
    };
    const fresh = () => ({ x: W / 2, y: H - 40, vx: 3, vy: -3 });
    let bl = build(),
      px = W / 2,
      tx = W / 2,
      b = fresh(),
      raf;
    const mv = (e) => {
      if (!live.current) return;
      const r = c.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * W;
    };
    c.addEventListener("pointermove", mv);
    const draw = () => {
      if (restart.current) {
        bl = build();
        b = fresh();
        px = tx = W / 2;
        restart.current = false;
      }
      px += (tx - px) * 0.25;
      x.clearRect(0, 0, W, H);
      x.fillStyle = "#eef0f6";
      bl.forEach((k) => x.fillRect(k.x, k.y, S, S));
      x.fillStyle = "#f0303f";
      x.fillRect(px - 40, H - 20, 80, 8);
      if (!over.current) {
        x.fillStyle = "#ff3b47";
        x.beginPath();
        x.arc(b.x, b.y, 6, 0, 7);
        x.fill();
      }
      if (over.current) {
        x.fillStyle = "#eef0f6";
        x.font = "bold 22px sans-serif";
        x.textAlign = "center";
        x.fillText("Missed it. Press Retry", W / 2, 170);
      }
      if (live.current) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < 6 || b.x > W - 6) b.vx *= -1;
        if (b.y < 6) b.vy *= -1;
        if (b.y > H - 26 && b.y < H - 10 && Math.abs(b.x - px) < 46) {
          b.vy = -Math.abs(b.vy);
          b.vx = ((b.x - px) / 40) * 4;
        }
        const i = bl.findIndex(
          (k) =>
            b.x > k.x - 4 &&
            b.x < k.x + S + 4 &&
            b.y > k.y - 4 &&
            b.y < k.y + S + 4,
        );
        if (i > -1) {
          bl.splice(i, 1);
          b.vy *= -1;
        }
        if (b.y > H) {
          live.current = false;
          over.current = true;
          setLabel("Retry");
        }
        if (!bl.length) {
          bl = build();
          b = fresh();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      c.removeEventListener("pointermove", mv);
    };
  }, []);
  const click = () => {
    if (over.current) {
      over.current = false;
      restart.current = true;
      live.current = true;
      setLabel("Pause");
      return;
    }
    live.current = !live.current;
    setLabel(live.current ? "Pause" : "Play");
  };
  return (
    <div className="game">
      <canvas ref={ref} />
      <button className="btn primary" onClick={click}>
        {label}
      </button>
    </div>
  );
}

const tilt = (e) => {
  const el = e.currentTarget,
    r = el.getBoundingClientRect();
  el.style.setProperty(
    "--rx",
    `${-((e.clientY - r.top) / r.height - 0.5) * 10}deg`,
  );
  el.style.setProperty(
    "--ry",
    `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`,
  );
};
const untilt = (e) => {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
};

function Shot({ src, name }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className="shot fallback" aria-hidden="true">
        {name[0]}
      </div>
    );
  return (
    <img
      className="shot"
      src={src}
      alt={`${name} screenshot`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function App() {
  const [active, setActive] = useState("");
  const [intro, setIntro] = useState(() => {
    try {
      if (sessionStorage.getItem("seen")) return false;
      sessionStorage.setItem("seen", "1");
    } catch (e) {}
    return !REDUCED();
  });
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ["what", "projects", "skills", "journey", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const mv = (e) => {
      const r = document.documentElement;
      r.style.setProperty("--mx", e.clientX + "px");
      r.style.setProperty("--my", e.clientY + "px");
    };
    addEventListener("pointermove", mv);
    return () => removeEventListener("pointermove", mv);
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    const onScroll = () => {
      const h = document.documentElement;
      h.style.setProperty(
        "--p",
        h.scrollTop / (h.scrollHeight - h.clientHeight || 1),
      );
      h.style.setProperty("--sy", window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {intro && <Intro onDone={() => setIntro(false)} />}
      <Particles />
      <div className="spot" />
      <div className="grain" />
      <div className="progress" />
      <header className="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top">
            <img className="logo" src="/me.png" alt="" />
            <span className="full">KOONA SHARAN KUMAR</span>
          </a>
          <nav>
            {[
              ["what", "What I do"],
              ["projects", "Projects"],
              ["skills", "Skills"],
              ["journey", "Journey"],
            ].map(([id, l]) => (
              <a key={id} href={`#${id}`} className={active === id ? "on" : ""}>
                {l}
              </a>
            ))}
          </nav>
          <a className="pill" href="#contact">
            Let’s talk
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
          <div className="wrap hero-in">
            <div className="orb" aria-hidden="true">
              <i className="ring r1" />
              <i className="ring r2" />
              <img className="me" src="/me.png" alt="Koona Sharan Kumar" />
              {["React", "JavaScript", "CSS3", "REST API", "Git"].map(
                (c, i) => (
                  <span className={`chip c${i}`} key={c}>
                    {c}
                  </span>
                ),
              )}
            </div>
            <span className="avail">
              <i />
              Available for opportunities
            </span>
            <p className="eyebrow">KOONA SHARAN KUMAR</p>
            <h1 className="mega">PORTFOLIO</h1>
            <p className="role">
              <Typewriter />
            </p>
            <p className="lead">
              Electrical Engineering graduate turned frontend developer. I build
              responsive React interfaces and have deployed two projects
              connected to REST APIs. Based in Hyderabad, looking for an
              entry-level frontend role.
            </p>
            <div className="btns">
              <a className="btn primary" href="#projects">
                View projects
              </a>
              <a className="btn" href="/Koona_Sharan_Kumar_Resume.pdf" download>
                Download resume
              </a>
              <a
                className="btn"
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="btn"
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="stats">
              {STATS.map(([n, sfx, label]) => (
                <div key={label}>
                  <b>
                    <Count to={n} suffix={sfx} />
                  </b>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="marquee">
          <div>
            {[...TECH, ...TECH].map((t, i) => (
              <span key={i}>
                {t} <b>✳</b>
              </span>
            ))}
          </div>
        </div>

        <section className="wrap scenes">
          {SCENES.map(([n, w, t], i) => (
            <div className="scene reveal" key={w}>
              <span className="ghost">0{i + 1}</span>
              <div className="scene-t">
                <small>{n}</small>
                <div className="mega2">{w}</div>
                <p>{t}</p>
              </div>
              <div className="scene-v">{VISUALS[i]}</div>
            </div>
          ))}
        </section>

        <section id="what" className="wrap reveal">
          <span className="chapter">WHAT I DO</span>
          <h2>What I can do</h2>
          <ol className="what">
            {WHAT.map(([t, d], i) => (
              <li key={t}>
                <b>0{i + 1}</b>
                <Scramble text={t} />
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className="wrap reveal">
          <span className="chapter">CHAPTER 01</span>
          <h2>Projects</h2>
          <p className="note">
            Both run on free servers, so the first load can take about 30
            seconds.
          </p>
          <div className="grid">
            {PROJECTS.map((p, i) => (
              <article
                className="card reveal tilt"
                onMouseMove={tilt}
                onMouseLeave={untilt}
                style={{ "--d": `${i * 150}ms` }}
                key={p.name}
              >
                <Shot src={p.img} name={p.name} />
                <div className="card-body">
                  <h3>
                    {p.name} <small>{p.sub}</small>
                  </h3>
                  <p>{p.desc}</p>
                  <ul className="tags">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className="btns">
                    <a
                      className="btn primary"
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live demo
                    </a>
                    <a
                      className="btn"
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source code
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="wrap reveal">
          <span className="chapter">CHAPTER 02</span>
          <h2>Skills</h2>
          <dl className="skills">
            {SKILLS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd className="chips">
                  {v.split(", ").map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="experience" className="wrap reveal">
          <span className="chapter">CHAPTER 03</span>
          <h2>Experience</h2>
          <div className="card exp">
            <h3>Frontend Developer Intern (MERN Stack Team)</h3>
            <p className="meta">
              ENut Technologies Pvt Ltd, Hyderabad | Feb 2026 to Jul 2026
            </p>
            <ul>
              <li>
                Built the login page UI in React, including form validation
              </li>
              <li>
                Resolved layout and responsiveness bugs across 5 pages for
                mobile and desktop screens
              </li>
              <li>Implemented lazy loading to improve page load performance</li>
              <li>
                Completed assigned frontend tasks using React, JavaScript, and
                Git
              </li>
            </ul>
            <p className="meta">
              B.Tech, Electrical Engineering | CMR College of Engineering and
              Technology | 2026
            </p>
          </div>
        </section>

        <section className="wrap reveal">
          <span className="chapter">PLAY</span>
          <h2>Go on, play with it</h2>
          <p className="note">
            Steer the paddle with your mouse or finger. Break the pixels.
          </p>
          <Game />
        </section>

        <section id="journey" className="wrap reveal">
          <span className="chapter">LEARNING / BUILDING / SHIPPING</span>
          <h2>The journey</h2>
          <ol className="journey">
            {JOURNEY.map(([y, t, d]) => (
              <li key={t}>
                <b>{y}</b>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="wrap contact reveal">
          <span className="chapter">CHAPTER 04</span>
          <h2 className="mega2">LET’S TALK</h2>
          <p className="lead">
            I am open to entry-level frontend developer roles. The quickest way
            to reach me is email.
          </p>
          <div className="btns">
            <a className="btn primary" href={LINKS.email}>
              koonasharan@gmail.com
            </a>
            <a
              className="btn"
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="btn"
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="wrap foot">
        Koona Sharan Kumar | Built with React and Vite
      </footer>
    </>
  );
}
