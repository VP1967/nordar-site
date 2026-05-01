const services = [
{
  n: "01",
  title: "Infrastructure Engineering",
  desc: "Enterprise networking, server architecture, and system integration — designed and deployed for hybrid on-premise/cloud or fully cloud-based environments.",
  meta: "Networking · Servers · Integration"
},
{
  n: "02",
  title: "Cybersecurity & Compliance",
  desc: "Security architecture, network hardening, access control, and ongoing monitoring built to meet asset-management compliance without compromising operational efficiency.",
  meta: "Hardening · Access · Monitoring"
},
{
  n: "03",
  title: "Disaster Recovery & Business Continuity",
  desc: "Planning, implementation, and testing of recovery systems with redundancy and failover across infrastructure to protect critical financial operations.",
  meta: "Redundancy · Failover · Testing"
},
{
  n: "04",
  title: "Telephony & Communications",
  desc: "VoIP, unified communications, and trading-floor integration. Hybrid and cloud deployments engineered for reliability over feature creep.",
  meta: "VoIP · UC · Trading floor"
},
{
  n: "05",
  title: "Back-Office Workflow Design",
  desc: "Analysis of existing workflows from trade processing to reporting. We identify bottlenecks and design practical solutions that fit how teams actually work.",
  meta: "Trade ops · Reporting · Process"
},
{
  n: "06",
  title: "Custom Software Development",
  desc: "Market data systems, trading-related software, and business applications built specifically to support the workflows we design and the operations we run.",
  meta: "Market data · Trading · Apps"
},
{
  n: "07",
  title: "Ongoing Support & Maintenance",
  desc: "We don't build and walk away. Continuous monitoring, updates, troubleshooting, and capacity planning as our clients' needs evolve over time.",
  meta: "Monitoring · Capacity · Support"
}];


const stack = [
{ layer: "L7 / Apps", name: "Custom software", detail: "Market data, trading utilities, internal business applications", badge: "BESPOKE" },
{ layer: "L6 / Workflows", name: "Back-office operations", detail: "Trade processing, reconciliation, reporting pipelines", badge: "DESIGNED" },
{ layer: "L5 / Communications", name: "Telephony & UC", detail: "VoIP, unified communications, trading-floor integration", badge: "HYBRID" },
{ layer: "L4 / Continuity", name: "DR & business continuity", detail: "Redundancy, failover, recovery testing", badge: "TESTED" },
{ layer: "L3 / Security", name: "Cybersecurity & compliance", detail: "Hardening, access control, monitoring", badge: "ENFORCED" },
{ layer: "L2 / Platform", name: "Servers & integration", detail: "Compute, storage, identity, system integration", badge: "MANAGED" },
{ layer: "L1 / Network", name: "Enterprise networking", detail: "Routing, switching, segmentation, edge", badge: "FOUNDATION" }];


const principles = [
{ n: "P.01", h: "Built from the ground up.", p: "We don't bolt onto fragile systems. Infrastructure is engineered as a coherent whole, with each layer serving the layers above it." },
{ n: "P.02", h: "Reliability over novelty.", p: "Asset management runs on uptime. We choose proven architectures and only deploy new technology when it earns its place." },
{ n: "P.03", h: "Compliance as a baseline.", p: "Security and regulatory posture are designed in, not bolted on after audit. Hardening, access, and monitoring are part of day-one architecture." },
{ n: "P.04", h: "We stay with the work.", p: "Continuous support is the default. The team that builds your infrastructure is the team that maintains it." }];


const Site = () => {
  const [tweaks, setTweak] = useTweaks(window.NORDAR_DEFAULTS);
  const Mark = ({ ...p }) => {
    const map = { A: window.LogoMarkA, B: window.LogoMarkB, C: window.LogoMarkC, D: window.LogoMarkD };
    const C = map[tweaks.logo] || window.LogoMarkA;
    return <C {...p} />;
  };

  React.useEffect(() => {
    document.documentElement.dataset.theme = tweaks.theme;
  }, [tweaks.theme]);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--cta-hover", tweaks.ctaHover);
  }, [tweaks.ctaHover]);

  // Scroll-spy: highlight nav link for the section currently in view
  const [activeId, setActiveId] = React.useState("");
  React.useEffect(() => {
    const ids = ["services", "approach", "stack", "principles"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const onScroll = () => {
      const probeY = window.innerHeight * 0.3; // 30% down the viewport
      let current = "";
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY) current = el.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const navCx = (id) => "" + (activeId === id ? "active" : "");

  const [menuOpen, setMenuOpen] = React.useState(false);
  const navRef = React.useRef(null);
  React.useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);

  return (
    <React.Fragment>
      {/* NAV */}
      <header className="nav">
        <div className="container nav-inner" ref={navRef}>
          <span className="brand">
            <Mark size={26} />
            <span className="word">Nordar</span>
          </span>
          <nav className="nav-links">
            <a href="#services" className={navCx("services")}>Services</a>
            <a href="#approach" className={navCx("approach")}>Approach</a>
            <a href="#stack" className={navCx("stack")}>Stack</a>
            <a href="#principles" className={navCx("principles")}>Principles</a>
            <a href="#contact" className="nav-cta">
              Start a project <span className="mono">→</span>
            </a>
          </nav>
          <button
            className="nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 5 H14 M2 11 H14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            </svg>
          </button>
          <div className={"nav-drawer" + (menuOpen ? " open" : "")}>
            <a href="#services" onClick={closeMenu}><span>Services</span><span className="num">01</span></a>
            <a href="#approach" onClick={closeMenu}><span>Approach</span><span className="num">02</span></a>
            <a href="#stack" onClick={closeMenu}><span>Stack</span><span className="num">03</span></a>
            <a href="#principles" onClick={closeMenu}><span>Principles</span><span className="num">04</span></a>
            <div className="drawer-divider"></div>
            <a href="#contact" onClick={closeMenu} className="drawer-cta">
              <span>Start a project</span><span className="mono">→</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 28, fontSize: "13px" }}>
            ◇ Nordar, LLC &nbsp;·&nbsp; Software consulting for asset management
          </div>
          <div className="hero-grid">
            <h1>
              Infrastructure for the firms that <span className="em" style={{ color: "rgb(52, 77, 129)" }}>move capital.</span>
            </h1>
            <div className="hero-meta" style={{ padding: "0px 0px 35px 24px", gap: "25px", borderStyle: "solid", borderWidth: "0px 0px 0px 2px" }}>
              <div className="row">
                <span className="label">Established</span>
                <span className="val">Independent · privately held</span>
              </div>
              <div className="row">
                <span className="label">Discipline</span>
                <span className="val">End-to-end systems for asset managers</span>
              </div>
              <div className="row">
                <span className="label">Engagement</span>
                <span className="val">Build, deploy, and operate — long term</span>
              </div>
            </div>
          </div>

          <div className="hero-bar">
            <div>
              <div className="k">/01</div>
              <div className="v">Networks &amp; servers, designed top-to-bottom</div>
            </div>
            <div>
              <div className="k">/02</div>
              <div className="v">Security and continuity built in from day one</div>
            </div>
            <div>
              <div className="k">/03</div>
              <div className="v">Custom software where off-the-shelf falls short</div>
            </div>
            <div>
              <div className="k">/04</div>
              <div className="v">Continuous support — not a deploy-and-leave shop</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="block" id="services">
        <div className="container">
          <div className="section-head">
            <div className="label eyebrow">[ Services / 07 ]</div>
            <div>
              <h2>A complete operating discipline, not a menu of point solutions.</h2>
              <p>
                Each service below is part of a single delivery practice. Most engagements span several — because trading floors, back offices, and the
                systems behind them aren't easily separated.
              </p>
            </div>
          </div>

          <div className="svc-list">
            {services.map((s) =>
            <a className="svc" href="#contact" key={s.n}>
                <span className="num">{s.n}</span>
                <h3>{s.title}</h3>
                <span className="desc">{s.desc}</span>
                <span className="meta">
                  {s.meta} <span className="arrow">→</span>
                </span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="block" id="approach">
        <div className="container">
          <div className="section-head">
            <div className="label eyebrow">[ Approach / 03 ]</div>
            <div>
              <h2>How an engagement actually runs.</h2>
              <p>
                We work in three overlapping phases. The same engineers who design a system are the ones who build it and stay with it through operation.
              </p>
            </div>
          </div>

          <div className="approach">
            <div className="approach-card">
              <span className="num">PHASE 01</span>
              <h4>Discovery &amp; architecture</h4>
              <p>
                We map your existing operations, regulatory posture, and pain points. The output is an architecture document specific to how your firm runs
                — not a template.
              </p>
              <div className="diag">Audit · Interviews · Architecture</div>
            </div>
            <div className="approach-card">
              <span className="num">PHASE 02</span>
              <h4>Build &amp; integration</h4>
              <p>
                Networks, servers, security, and applications are deployed in coordinated phases with rollback paths. We prioritize uptime over speed of
                delivery.
              </p>
              <div className="diag">Deploy · Integrate · Validate</div>
            </div>
            <div className="approach-card">
              <span className="num">PHASE 03</span>
              <h4>Operate &amp; evolve</h4>
              <p>
                Monitoring, patching, capacity planning, and continued software development. The same team is on the line when something needs attention.
              </p>
              <div className="diag">Monitor · Maintain · Extend</div>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <div className="stack-wrap" id="stack">
        <div className="container">
          <div className="section-head">
            <div className="label eyebrow" style={{ fontSize: "12px" }}>[ The stack / L1–L7 ]</div>
            <div>
              <h2>One firm, every layer of the stack.</h2>
              <p>
                We deliver infrastructure as a vertically-integrated practice. From routing at the edge to the applications your portfolio managers
                touch, the same firm owns the architecture.
              </p>
            </div>
          </div>

          <div className="stack">
            {stack.map((r) =>
            <div className="stack-row" key={r.layer}>
                <span className="layer" style={{ fontSize: "12px" }}>{r.layer}</span>
                <span className="name">{r.name}</span>
                <span className="detail">{r.detail}</span>
                <span className="badge" style={{ fontSize: "1px" }}>{r.badge}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRINCIPLES */}
      <section className="block" id="principles">
        <div className="container">
          <div className="section-head">
            <div className="label eyebrow" style={{ fontSize: "12px" }}>[ Principles / 04 ]</div>
            <div>
              <h2>What guides the work.</h2>
              <p>Four commitments that shape every engagement, regardless of size or scope.</p>
            </div>
          </div>

          <div className="principles">
            {principles.map((pr) =>
            <div className="principle" key={pr.n}>
                <span className="num">{pr.n}</span>
                <h4>{pr.h}</h4>
                <p>{pr.p}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-block" id="contact" style={{ borderColor: "rgb(40, 40, 23)" }}>
        <div className="container">
          <div className="cta-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: 24, fontSize: "12px" }}>◇ Engage Nordar</div>
              <h2>
                If your operations depend on it, <span className="em" style={{ color: "rgb(103, 114, 130)" }}>we should talk.</span>
              </h2>
            </div>
            <div className="cta-side" style={{ borderColor: "rgb(12, 17, 23)" }}>
              <div className="row">
                <span className="label">Direct</span>
                <span className="val">contact@nordarllc.com</span>
              </div>
              <div className="row">
                <span className="label">Engagement model</span>
                <span className="val">Architecture review, build, ongoing operation</span>
              </div>
              <a className="cta-button" href="mailto:contact@nordarllc.com" style={{ borderColor: "rgb(23, 33, 45)" }}>
                <span>Start a conversation</span>
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="foot">
            <div>
              <span className="brand" style={{ marginBottom: 16 }}>
                <Mark size={26} />
                <span className="word">Nordar</span>
              </span>
              <p style={{ fontSize: 14, color: "var(--ink-2)", maxWidth: "32ch", marginTop: 16, lineHeight: 1.55 }}>
                Independent software consulting for the firms that build, operate, and depend on financial asset-management infrastructure.
              </p>
            </div>
            <div>
              <h5>Practice</h5>
              <ul>
                <li><a href="#services">Services</a></li>
                <li><a href="#approach">Approach</a></li>
                <li><a href="#stack">Stack</a></li>
                <li><a href="#principles">Principles</a></li>
              </ul>
            </div>
            <div>
              <h5>Engage</h5>
              <ul>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#contact">Architecture review</a></li>
                <li><a href="#contact">RFP / proposal</a></li>
              </ul>
            </div>
            <div>
              <h5>Office</h5>
              <ul>
                <li>contact@nordarllc.com</li>
                <li>By appointment</li>
                <li><a href="Privacy Policy.html">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© Nordar, LLC · {new Date().getFullYear()}</span>
            <span>Built and operated, ground-up.</span>
          </div>
        </div>
      </footer>

      {/* TWEAKS */}
      <TweaksPanel title="Tweaks">
          <TweakSection label="Logo mark">
            <TweakRadio
            value={tweaks.logo}
            onChange={(v) => setTweak("logo", v)}
            options={[
            { value: "A", label: "Geom-N" },
            { value: "B", label: "Axis" },
            { value: "C", label: "Brackets" },
            { value: "D", label: "Compass" }]
            } />
          
            <div style={{ display: "flex", gap: 14, marginTop: 14, alignItems: "center", padding: 14, border: "1px solid var(--rule)", background: "var(--paper)" }}>
              <Mark size={36} />
              <div className="word" style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em" }}>Nordar</div>
            </div>
          </TweakSection>

          <TweakSection label="Theme">
            <TweakRadio
            value={tweaks.theme}
            onChange={(v) => setTweak("theme", v)}
            options={[
            { value: "default", label: "Steel-blue" },
            { value: "graphite", label: "Graphite" }]
            } />
          
          </TweakSection>

          <TweakSection label="“Start a project” hover">
            <TweakRadio
            value={tweaks.ctaHover}
            onChange={(v) => setTweak("ctaHover", v)}
            options={[
            { value: "#C9D4E0", label: "Steel" },
            { value: "#E5E2D8", label: "Sand" },
            { value: "#D6DDD3", label: "Sage" },
            { value: "#E8D9C8", label: "Clay" }]
            } />
          
            <div style={{ marginTop: 10 }}>
              <TweakColor
              label="Custom"
              value={tweaks.ctaHover}
              onChange={(v) => setTweak("ctaHover", v)} />
            
            </div>
          </TweakSection>
        </TweaksPanel>
    </React.Fragment>);

};

window.Site = Site;