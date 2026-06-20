import ScrollController from "./ScrollController";

const heroHighlights = [
  "TCS UJ",
  "Linguistics Olympiad Finalist",
  "Database Systems",
];

const contact = {
  email: "kot.milosz@outlook.com",
  phone: "+48 531 079 300",
  phoneHref: "tel:+48531079300",
  linkedin:
    "https://www.linkedin.com/in/mi%C5%82osz-kot-739491333",
  linkedinLabel: "linkedin.com/in/miłosz-kot-739491333",
  github: "https://github.com/kotlowski-m",
  githubLabel: "github.com/kotlowski-m",
  project: "https://github.com/kotlowski-m/CEX",
  cv: "/MK_CV.pdf",
};

const proof = [
  ["01", "Theoretical Computer Science · UJ", "Oct 2025 — Present"],
  ["02", "OLM finalist", "Linguistics Olympiad · 2025"],
  ["03", "KryptoCX / CEX", "24-table PostgreSQL exchange database"],
  ["04", "Clinic IT support", "Private Medical Clinic · 2021 — 2024"],
  ["05", "Windows + Microsoft 365", "Troubleshooting and daily support"],
  ["06", "Sport & training", "UJ Basketball Team · 100 kg bench press"],
];

const toolkit = [
  {
    number: "01",
    title: "Support",
    items:
      "Windows / Microsoft 365 / printers / scanners / Wi-Fi / router basics / IP checks / user support",
  },
  {
    number: "02",
    title: "Databases",
    items:
      "PostgreSQL / SQL / ERD / constraints / views / functions / triggers / indexes",
  },
  {
    number: "03",
    title: "LLM workflow",
    items:
      "ChatGPT / Codex / Claude Code / PRDs / context control / file-grounded work / documentation",
  },
  {
    number: "04",
    title: "Environment",
    items:
      "Git / GitHub / Linux / Bash / command line / Vercel / Supabase / local development",
  },
];

const projectFacts = [
  "24 tables",
  "PK / FK",
  "CHECK constraints",
  "Views",
  "Functions",
  "Triggers",
  "Indexes",
  "Data integrity",
];

export default function Home() {
  return (
    <main className="deck">
      <ScrollController />
      <header className="nav">
        <a className="brand" href="#hero" aria-label="Miłosz Kot — back to top">
          <strong>MK</strong>
          <span>Miłosz Kot</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#proof">Proof</a>
          <a href="#projects">Projects</a>
          <a href="#toolkit">Tools</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="panel screen hero" id="hero">
        <div className="panel-meta hero-reveal delay-1">
          <span>Portfolio / 2026</span>
          <span>Krakow, Poland</span>
        </div>

        <div className="hero-copy">
          <h1 className="hero-name" aria-label="Miłosz Kot">
            <span className="hero-reveal delay-2">Miłosz</span>
            <span className="hero-reveal delay-3">Kot</span>
          </h1>
          <div className="hero-descriptors hero-reveal delay-4">
            {heroHighlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        </div>

        <div className="hero-footer hero-reveal delay-5">
          <p>Theoretical Computer Science @ UJ</p>
          <div className="hero-signals" aria-label="Key facts">
            <span>PostgreSQL / SQL</span>
            <span>OLM finalist</span>
            <span>KryptoCX / CEX</span>
            <span>Clinic IT support</span>
          </div>
          <a className="next-link scroll-arrow" href="#proof">
            Proof <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="panel screen proof" id="proof">
        <header className="section-head reveal">
          <div>
            <span>01</span>
            <span>Proof</span>
          </div>
          <h2>Credentials.</h2>
        </header>

        <div className="proof-wall reveal">
          {proof.map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel screen projects" id="projects">
        <div className="projects-inner">
          <header className="section-head light reveal">
            <div>
              <span>02</span>
              <span>Projects</span>
            </div>
            <h2>KryptoCX / CEX</h2>
          </header>

          <div className="project-layout">
            <div className="project-copy reveal">
              <p className="project-lead">
                Created a 24-table PostgreSQL database for a simulated
                cryptocurrency exchange.
              </p>
              <p className="project-note">
                Users, wallets, orders, trades. Integrity first.
              </p>
              <a
                href={contact.project}
                target="_blank"
                rel="noreferrer"
              >
                View CEX repository ↗
              </a>
            </div>

            <div
              className="schema reveal"
              aria-label="Simplified KryptoCX / CEX schema"
            >
              <div className="schema-top">
                <span>SCHEMA / 24 TABLES</span>
                <span>POSTGRESQL + SQL</span>
              </div>
              <div className="schema-map" aria-hidden="true">
                <svg
                  className="schema-relations"
                  viewBox="0 0 1000 420"
                  preserveAspectRatio="none"
                >
                  <line x1="13%" y1="19%" x2="50%" y2="51%" />
                  <line x1="87%" y1="19%" x2="50%" y2="51%" />
                  <line x1="50%" y1="51%" x2="21%" y2="86%" />
                  <line x1="50%" y1="51%" x2="79%" y2="86%" />
                  <line x1="87%" y1="19%" x2="79%" y2="86%" />
                </svg>
                <div className="node users">
                  <span>01</span>
                  <strong>users</strong>
                  <small>user_id / email</small>
                </div>
                <div className="node wallets">
                  <span>02</span>
                  <strong>wallets</strong>
                  <small>wallet_id / balance</small>
                </div>
                <div className="node orders">
                  <span>03</span>
                  <strong>orders</strong>
                  <small>order_id / pair_id</small>
                </div>
                <div className="node trades">
                  <span>04</span>
                  <strong>trades</strong>
                  <small>trade_id / amount</small>
                </div>
                <div className="node pairs">
                  <span>05</span>
                  <strong>trading_pairs</strong>
                  <small>base / quote</small>
                </div>
              </div>
            </div>
          </div>

          <div className="project-bottom reveal">
            <div className="project-facts">
              {projectFacts.map((fact) => (
                <span key={fact}>{fact}</span>
              ))}
            </div>
            <div className="next-project">
              <span>Next project / in progress</span>
              <strong>
                Obsidamn — a Markdown notes web app with wiki links and an
                interactive knowledge graph.
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="panel screen toolkit" id="toolkit">
        <header className="section-head reveal">
          <div>
            <span>03</span>
            <span>Tools</span>
          </div>
          <h2>Tools.</h2>
        </header>

        <div className="toolkit-index reveal">
          {toolkit.map((group) => (
            <article key={group.title}>
              <span>{group.number}</span>
              <h3>{group.title}</h3>
              <p>{group.items}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="panel screen contact" id="contact">
        <div className="contact-inner">
          <div className="panel-meta">
            <span>04 / Contact</span>
            <span>Krakow, Poland</span>
          </div>

          <div className="contact-title reveal">
            <h2>Let&apos;s get in touch.</h2>
            <p>
              Available for IT Support, Technical Support, Database Support and
              LLM-assisted operations roles.
            </p>
          </div>

          <div className="contact-list reveal">
            <a href={`mailto:${contact.email}`}>
              <span>Email</span>
              <strong>{contact.email} ↗</strong>
            </a>
            <a href={contact.phoneHref}>
              <span>Phone</span>
              <strong>{contact.phone} ↗</strong>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span>LinkedIn</span>
              <strong>{contact.linkedinLabel} ↗</strong>
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
            >
              <span>GitHub</span>
              <strong>{contact.githubLabel} ↗</strong>
            </a>
            <a href={contact.cv} target="_blank" rel="noreferrer">
              <span>CV</span>
              <strong>Open CV.pdf ↗</strong>
            </a>
            <a href={contact.project} target="_blank" rel="noreferrer">
              <span>Project</span>
              <strong>github.com/kotlowski-m/CEX ↗</strong>
            </a>
          </div>

          <div className="footer-line">
            <span>Miłosz Kot</span>
            <span>TCS / Databases / Support / LLM</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
