"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { getPaymentUrl, paymentSettings } from "@/lib/payments";
const Sculpture = dynamic(() => import("@/components/Sculpture"), {
  ssr: false,
  loading: () => (
    <div
      className="sculpture-loading"
      aria-label="Loading interactive sculpture"
    >
      <div />
    </div>
  ),
});
const EMAIL = "aarushgupta707.2@gmail.com";
const paymentUrl = getPaymentUrl();
const Arrow = ({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Star = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path
      d="M32 3v58M3 32h58M11.5 11.5l41 41m0-41-41 41"
      stroke="currentColor"
      strokeWidth="9"
    />
  </svg>
);
const projects = [
  {
    name: "Tomas Bau & Sanierung",
    category: "Websites",
    description:
      "A digital home for a German flooring specialist. Built around real craftsmanship, local discovery, and a clear path to an inquiry.",
    tags: ["Business website", "Next.js", "Local SEO"],
    image: "/projects/tomas.jpg",
    url: "https://tomas-bau-website.vercel.app",
    repo: "https://github.com/Aaru5h/tomas",
    theme: "tomas",
    label: "Visit website",
  },
  {
    name: "EchoFoil",
    category: "Websites",
    description:
      "An inviting storefront for everyday kitchen essentials, with product discovery and a dedicated experience for wholesale customers.",
    tags: ["Storefront preview", "Next.js", "Product experience"],
    image: "/projects/echofoil.jpg",
    url: "https://echo-foil.vercel.app",
    repo: "https://github.com/Aaru5h/EchoFoil",
    theme: "echofoil",
    label: "Explore preview",
  },
];
const services = [
  {
    title: "Web development",
    short: "From first impression to final click.",
    detail:
      "Landing pages, business websites, online stores, and full web applications. Thoughtfully designed, responsive, and built around what your visitors need to do.",
    tags: ["Websites & landing pages", "Full-stack applications", "E-commerce"],
    icon: "M4 5h16v14H4zM4 9h16M7 7h.01M10 7h.01",
  },
  {
    title: "AI & automations",
    short: "Less busywork. More possibility.",
    detail:
      "Connect your tools, automate repetitive tasks, and put AI to work in your everyday workflows. From intelligent assistants to custom integrations, built around your business.",
    tags: ["Workflow automation", "AI assistants", "API integrations"],
    icon: "M12 3v4m0 10v4M3 12h4m10 0h4M7 7l-3-3m13 13 3 3M7 17l-3 3M17 7l3-3M8 8h8v8H8z",
  },
  {
    title: "AI & machine learning",
    short: "Turn your data into something useful.",
    detail:
      "Custom machine learning solutions, predictive models, and AI-powered features. I help turn a promising idea or a messy dataset into a practical tool you can use.",
    tags: ["Predictive models", "Data processing", "AI-powered features"],
    icon: "M9 4a3 3 0 0 0-5 3 4 4 0 0 0 0 8 3 3 0 0 0 5 4V4Zm6 0a3 3 0 0 1 5 3 4 4 0 0 1 0 8 3 3 0 0 1-5 4V4ZM5 9h4m6 6h4",
  },
  {
    title: "App development",
    short: "Your idea, right at their fingertips.",
    detail:
      "Useful, intuitive applications with the features your users actually need. From an early prototype to a polished product, I can help with the interface, backend, and integrations.",
    tags: ["Mobile experiences", "MVPs & prototypes", "Backend development"],
    icon: "M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM10 6h4m-3 12h2",
  },
];
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All work");
  const [openService, setOpenService] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Project inquiry: ${data.get("service")}`;
    const body = `Hi Aarush,\n\nI'm ${data.get("name")}.\n\nI'm looking for help with ${data.get("service")}.\n\n${data.get("brief")}\n\nMy email: ${data.get("email")}\n\nLooking forward to connecting!`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftReady(true);
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#" aria-label="Aarush Gupta home">
            aarush<span className="brand-dot">.</span>
            <span className="wordmark-caption">INDEPENDENT DEVELOPER</span>
          </a>
          <nav
            className={menuOpen ? "navigation is-open" : "navigation"}
            id="navigation"
            aria-label="Main navigation"
          >
            <a href="#work" onClick={() => setMenuOpen(false)}>
              Work
            </a>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Expertise
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#payments" onClick={() => setMenuOpen(false)}>
              Payments
            </a>
            <a
              href="#contact"
              className="nav-contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <Arrow diagonal />
            </a>
          </nav>
          <button
            id="menu-toggle"
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="navigation"
          >
            {menuOpen ? "Close" : "Menu"}
            <span>{menuOpen ? "−" : "+"}</span>
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-topline">
            <span className="availability">
              <span /> Available for freelance projects
            </span>
            <span className="location">
              Based in India. Building everywhere.
            </span>
          </div>
          <div className="hero-main">
            <div className="hero-copy">
              <h1 id="hero-title">
                Good ideas.
                <br />
                Great digital
                <br />
                <span className="orange-text">experiences.</span>
              </h1>
              <p>
                I’m Aarush, a freelance developer turning your
                <br className="desktop-break" /> “what if” into websites, apps,
                and smarter workflows.
              </p>
              <div className="hero-actions">
                <a href="#work" className="button button-dark">
                  Explore my work <Arrow diagonal />
                </a>
                <a href="#contact" className="text-link">
                  Have a project in mind? <Arrow />
                </a>
              </div>
              <div className="hero-footnote">
                <span className="mini-lines" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>{" "}
                Thoughtful work. Fair pricing. No runaround.
              </div>
            </div>
            <Sculpture />
          </div>
          <div className="hero-bottom">
            <span>DEVELOPMENT, WITH A LITTLE DIFFERENCE.</span>
            <a href="#work">
              Scroll to explore{" "}
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 4v16m-5-5 5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
          </div>
        </section>
        <div
          className="expertise-ribbon"
          aria-label="Web development, AI automations, app development, AI and machine learning"
        >
          <div>
            <span>Web development</span>
            <Star />
            <span>AI automations</span>
            <Star />
            <span>App development</span>
            <Star />
            <span>AI & machine learning</span>
            <Star />
          </div>
        </div>
        <section
          className="work-section shell section-space"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <h2 id="work-title">
              Ideas out in
              <br />
              the real world<span className="orange-text">.</span>
            </h2>
            <div className="section-intro">
              <p>
                A few things I’ve built for people
                <br />
                who wanted to make something happen.
              </p>
              <div className="filters" aria-label="Filter projects">
                {["All work", "Websites", "AI & tools"].map((item) => (
                  <button
                    key={item}
                    aria-pressed={filter === item}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="project-grid" aria-live="polite">
            {filter !== "AI & tools" &&
              projects.map((project) => (
                <article className="project" key={project.name}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`project-visual ${project.theme}`}
                    aria-label={`${project.label}: ${project.name} (opens in a new tab)`}
                  >
                    <span className="project-preview-label">
                      {project.theme === "tomas"
                        ? "CRAFT, MEET CLARITY."
                        : "EVERYDAY, REIMAGINED."}
                    </span>
                    <div className="browser-frame">
                      <div className="browser-toolbar">
                        <span />
                        <span />
                        <span />
                        <div>{new URL(project.url).hostname}</div>
                      </div>
                      <Image
                        src={project.image}
                        alt={`${project.name} website homepage`}
                        width={1440}
                        height={1000}
                        sizes="(max-width: 700px) 90vw, 44vw"
                      />
                    </div>
                    <span className="project-open">
                      <Arrow diagonal />
                    </span>
                  </a>
                  <div className="project-meta">
                    <h3>
                      <a href={project.url} target="_blank" rel="noreferrer">
                        {project.name}
                      </a>
                    </h3>
                    <a
                      className="source-link"
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} source code`}
                    >
                      Source <Arrow diagonal />
                    </a>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
          </div>
          {filter !== "Websites" && (
            <article className="resources-project resource-feature">
              <a
                href="https://www.crackai.tech/"
                target="_blank"
                rel="noreferrer"
                className="project-visual crackai"
                aria-label="Visit CrackAI resource platform (opens in a new tab)"
              >
                <span className="project-preview-label">
                  KNOWLEDGE, SHARED.
                </span>
                <div className="browser-frame">
                  <div className="browser-toolbar">
                    <span />
                    <span />
                    <span />
                    <div>www.crackai.tech</div>
                  </div>
                  <Image
                    src="/projects/crackai.jpg"
                    alt="CrackAI homepage with AI resources, tutorials, and community tools"
                    width={1440}
                    height={1000}
                    sizes="(max-width: 650px) 90vw, 44vw"
                  />
                </div>
                <span className="project-open">
                  <Arrow diagonal />
                </span>
              </a>
              <div className="resource-copy">
                <h3>
                  <a
                    href="https://www.crackai.tech/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    CrackAI
                  </a>
                </h3>
                <p>
                  A home for curious AI builders. A resource platform bringing
                  together tutorials, tools, projects, and GitHub repositories,
                  with community contributions at its heart.
                </p>
                <div className="project-tags">
                  <span>AI &amp; ML</span>
                  <span>Resource platform</span>
                  <span>Community</span>
                </div>
                <a
                  className="text-link"
                  href="https://www.crackai.tech/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore CrackAI <Arrow diagonal />
                </a>
              </div>
            </article>
          )}
        </section>
        <section
          className="services-section"
          id="services"
          aria-labelledby="services-title"
        >
          <div className="shell services-grid">
            <div className="services-intro">
              <h2 id="services-title">
                One curious mind.
                <br />A lot of possibilities
                <span className="orange-text">.</span>
              </h2>
              <p>
                From a better website to a business that runs a little smarter.
                Tell me what you need; I’ll help you figure out the build.
              </p>
              <a className="text-link" href="#contact">
                Let’s find your solution <Arrow diagonal />
              </a>
              <Star className="services-star" />
            </div>
            <div className="services-list">
              {services.map((service, index) => (
                <div
                  className={`service ${openService === index ? "expanded" : ""}`}
                  key={service.title}
                >
                  <h3>
                    <button
                      aria-expanded={openService === index}
                      aria-controls={`service-${index}`}
                      onClick={() =>
                        setOpenService(openService === index ? null : index)
                      }
                    >
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d={service.icon}
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{service.title}</span>
                      <span className="expand-icon">
                        {openService === index ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  <div
                    className="service-content"
                    id={`service-${index}`}
                    hidden={openService !== index}
                  >
                    <p className="service-short">{service.short}</p>
                    <p>{service.detail}</p>
                    <div className="service-tags">
                      {service.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          className="about-section shell section-space"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-art" aria-hidden="true">
            <div className="about-letter">
              a<span>.</span>
            </div>
            <div className="about-art-bottom">
              <span>
                PART DEVELOPER.
                <br />
                PART PROBLEM SOLVER.
              </span>
              <Star />
            </div>
            <span className="about-signature">Always figuring things out.</span>
          </div>
          <div className="about-copy">
            <h2 id="about-title">
              Hi, I’m Aarush.
              <br />
              Your idea’s new
              <br />
              favorite person.
            </h2>
            <p className="about-lead">
              I like making complicated things feel simple.
            </p>
            <p>
              I’m a freelance developer working across the web, apps, and AI. I
              bring the same curiosity to a small business website as I do to an
              ambitious automation: how can we make this genuinely useful?
            </p>
            <p>
              You work directly with me, from the first conversation to the
              finishing touches. Clear communication, practical solutions, and a
              price that makes sense for your project.
            </p>
            <div className="about-points">
              <span>
                <i /> Fast, focused execution
              </span>
              <span>
                <i /> Flexible, fair pricing
              </span>
              <span>
                <i /> One person, start to finish
              </span>
            </div>
          </div>
        </section>
        <section className="process-section shell">
          <div className="process-heading">
            <h2>
              Big ideas.
              <br />
              Simple process.
            </h2>
            <p>
              You bring the idea.
              <br />
              We make a plan and build from there.
            </p>
          </div>
          <div className="process-grid">
            {[
              {
                n: "01",
                title: "Let’s talk it through.",
                text: "Tell me about the idea, the people it’s for, and what you want it to do.",
              },
              {
                n: "02",
                title: "A clear plan. A fair quote.",
                text: "We agree on the scope, budget, and timeline before the building begins.",
              },
              {
                n: "03",
                title: "Build, refine, launch.",
                text: "You see the progress, we work through feedback, and get it ready for the world.",
              },
            ].map((step) => (
              <div className="process-step" key={step.n}>
                <span className="step-number">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section
          className="payments-section"
          id="payments"
          aria-labelledby="payments-title"
        >
          <div className="shell payments-grid">
            <div>
              <h2 id="payments-title">
                Great work.
                <br />
                Simple payments.
              </h2>
              <p>
                Already working together? Take care of your project deposit or
                milestone payment here, using the amount we’ve agreed on.
              </p>
            </div>
            <div className="payment-actions">
              <div className="payment-heading">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M3 10h18M7 15h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <h3>Project payments</h3>
              </div>
              {paymentUrl ? (
                <>
                  <a
                    href={paymentUrl}
                    className="button button-dark"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {paymentSettings.buttonLabel} <Arrow diagonal />
                  </a>
                  <p className="payment-note">
                    Continues to the payment provider in a new tab.
                  </p>
                </>
              ) : (
                <>
                  <button
                    className="button payment-pending"
                    disabled
                    aria-describedby="payment-note"
                  >
                    Online payments coming soon <Arrow diagonal />
                  </button>
                  <p className="payment-note" id="payment-note">
                    Payment options are being set up. For an existing project,
                    email me for payment details.
                  </p>
                </>
              )}
              <a
                className="text-link"
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("Payment details for my project")}&body=${encodeURIComponent("Hi Aarush,\n\nPlease share the payment details for my project.\n\nProject / invoice reference: ")}`}
              >
                Request payment details <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>
        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="shell contact-grid">
            <div className="contact-copy">
              <span className="availability">
                <span /> Open to good ideas
              </span>
              <h2 id="contact-title">
                Let’s make
                <br />
                something
                <br />
                <span>that matters.</span>
              </h2>
              <p>
                A brand-new idea, an overdue upgrade, or a
                <br className="desktop-break" /> “could you build this?” — I’m
                all ears.
              </p>
              <div className="email-row">
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <button onClick={copyEmail} aria-label="Copy email address">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 9h11v11H9zM15 9V4H4v11h5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
              </div>
              <span className="copy-status" role="status">
                {copied
                  ? "Email copied."
                  : copyError
                    ? "Please select and copy the email address above."
                    : "Prefer email? Go straight to my inbox."}
              </span>
            </div>
            <form className="inquiry-form" onSubmit={submitInquiry}>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Alex Taylor"
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="alex@company.com"
                    required
                    maxLength={200}
                  />
                </label>
              </div>
              <label>
                What can I help with?
                <select name="service" defaultValue="" required>
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option>Web development</option>
                  <option>AI & automations</option>
                  <option>AI & machine learning</option>
                  <option>App development</option>
                  <option>A bit of everything</option>
                </select>
              </label>
              <label>
                A little about your project
                <textarea
                  name="brief"
                  rows={4}
                  placeholder="The idea, the goal, and anything else I should know…"
                  required
                  minLength={10}
                  maxLength={5000}
                />
              </label>
              <button type="submit" className="button button-orange">
                Let’s start a conversation <Arrow diagonal />
              </button>
              <p className="form-note" role="status">
                {draftReady
                  ? `Your email draft is ready in your mail app. If it didn’t open, email ${EMAIL} directly.`
                  : "Opens a draft in your email app. No commitment, just a conversation."}
              </p>
            </form>
          </div>
        </section>
      </main>
      <footer className="site-footer shell">
        <a className="wordmark" href="#">
          aarush<span className="brand-dot">.</span>
        </a>
        <span>Independent by choice. Built with care.</span>
        <div>
          <a href="https://github.com/Aaru5h" target="_blank" rel="noreferrer">
            GitHub <Arrow diagonal />
          </a>
          <a
            href="https://www.linkedin.com/in/aarush-gupta-2946783a6/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <Arrow diagonal />
          </a>
          <a href="#" className="back-top" aria-label="Back to top">
            <Arrow diagonal />
          </a>
        </div>
        <small>© {new Date().getFullYear()} Aarush Gupta</small>
      </footer>
    </>
  );
}
