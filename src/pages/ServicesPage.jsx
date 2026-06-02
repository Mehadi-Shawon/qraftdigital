import { motion } from "framer-motion";
import { Icon, SectionLabel, Reveal, StaggerContainer, StaggerItem, LimeBtn, GhostBtn, Badge, GlassCard } from "../components/UI";

const SERVICES = [
  { icon:"terminal",      title:"Web Design & Dev",  tags:["Next.js","TypeScript","Vercel"],    desc:"We engineer immersive web experiences prioritizing functional clarity and technical performance. Every layout is a balance of aesthetic intent and mathematical precision ensuring lightning-fast load times.", highlight:"Most Popular" },
  { icon:"token",         title:"Brand Identity",    tags:["Strategy","Motion","Print"],         desc:"Strategic visual systems designed for longevity. We define your brand DNA through rigorous color theory, typographic architecture, and iconic symbology that resonates across every touchpoint.", highlight:null },
  { icon:"shopping_cart", title:"E-Commerce",        tags:["Shopify","Custom","Headless"],       desc:"End-to-end commerce solutions from product architecture to conversion-optimized checkout flows. We build for friction-free global transactions and inventory systems that scale.", highlight:null },
  { icon:"smartphone",    title:"Mobile Apps",       tags:["React Native","iOS","Android"],      desc:"Native-feel mobile experiences with React Native. Cross-platform apps that maintain performance parity with fully native solutions, delivered faster and maintained more efficiently.", highlight:null },
  { icon:"monitoring",    title:"SEO & Growth",      tags:["Technical SEO","CRO","Analytics"],   desc:"Data-driven optimization ensuring your brand dominates search rankings. We combine deep technical SEO with content strategy and conversion rate optimization for compounding growth.", highlight:null },
  { icon:"build",         title:"Custom Software",   tags:["SaaS","APIs","Automation"],          desc:"Bespoke internal tools and automation systems for complex workflows. From CRM integrations to full SaaS platforms — we build the operational backbone modern businesses run on.", highlight:null },
];

const PROCESS = [
  { n:"01", icon:"search",      title:"Discovery",    desc:"Deep-dive into your business, audience, and competitive landscape. We define success metrics before a single line of code is written." },
  { n:"02", icon:"design_services",title:"Architecture",desc:"Technical blueprint, design system, and database schema. We establish the foundation so everything built on top scales without friction." },
  { n:"03", icon:"code",        title:"Engineering",  desc:"Two-week agile sprints with live build tracking and weekly demos. You see real progress — not presentations or status meetings." },
  { n:"04", icon:"rocket_launch",title:"Launch",      desc:"Staged deployment with load testing and Lighthouse benchmarking. Every project includes a 60-day post-launch support window." },
];

const GUARANTEES = [
  { icon:"groups",         title:"Senior Engineers Only",      desc:"No juniors, no hand-offs. You work directly with specialists on every decision." },
  { icon:"task_alt",       title:"Fixed Scope, No Surprises",  desc:"Every project is scoped before a single line of code. No creep, no hidden costs." },
  { icon:"play_circle",    title:"Weekly Live Demos",          desc:"Real builds every sprint — not slides, not status calls. You see real progress." },
  { icon:"speed",          title:"Performance Benchmarked",    desc:"Every delivery is Lighthouse-audited and load-tested before it reaches production." },
  { icon:"support_agent",  title:"60-Day Post-Launch Support", desc:"We stay with you for two months after launch to fix, tune, and optimise." },
  { icon:"lock",           title:"Full IP Ownership",          desc:"Every asset, codebase, and design file belongs 100% to you at project handover." },
];

export default function ServicesPage({ navigate }) {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section style={{ position:"relative", overflow:"hidden", minHeight:"68vh", display:"flex", alignItems:"center" }}>

        {/* Background image */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=900&fit=crop)", backgroundSize:"cover", backgroundPosition:"center top", zIndex:0 }} />

        {/* Layered dark overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(6,4,14,0.94) 0%, rgba(30,10,70,0.82) 50%, rgba(6,4,14,0.9) 100%)", zIndex:1 }} />

        {/* Subtle grid texture */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(204,255,0,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(204,255,0,.015) 1px,transparent 1px)", backgroundSize:"80px 80px", zIndex:2, pointerEvents:"none" }} />

        {/* Bottom fade */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:120, background:"linear-gradient(to bottom, transparent, var(--bg))", zIndex:3, pointerEvents:"none" }} />

        <div className="px-section" style={{ maxWidth:1440, margin:"0 auto", position:"relative", zIndex:4, padding:"clamp(64px,10vw,120px) clamp(20px,4vw,40px) clamp(56px,8vw,100px)", width:"100%" }}>
          <Reveal>
            <SectionLabel>Services</SectionLabel>
            <h1 className="h1" style={{ marginBottom:24, maxWidth:680 }}>What we<br />build for you.</h1>
            <p className="body-lg" style={{ maxWidth:520, marginBottom:44 }}>
              High-performance digital products engineered for precision and scale. We architect competitive advantages, not just features.
            </p>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
              <LimeBtn onClick={() => navigate("contact")}>Start a Project <Icon name="arrow_forward" style={{ fontSize:17 }} /></LimeBtn>
              <GhostBtn onClick={() => navigate("work")}>View Our Work</GhostBtn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SERVICE CARDS ═══ */}
      <section className="section-grad px-section" style={{ padding:"0 clamp(20px,4vw,40px) clamp(56px,8vw,100px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <StaggerContainer className="services-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"transparent" }}>
            {SERVICES.map(({ icon, title, tags, desc, highlight }) => (
              <StaggerItem key={title}>
                <div className="card" style={{ padding:48, border:"none", height:"100%", display:"flex", flexDirection:"column", position:"relative" }}>
                  {highlight && (
                    <div style={{ position:"absolute", top:20, right:20 }}>
                      <span className="lime-badge badge">{highlight}</span>
                    </div>
                  )}
                  <Icon name={icon} className="service-icon" style={{ fontSize:40, marginBottom:24 }} />
                  <h3 className="h3" style={{ marginBottom:16 }}>{title}</h3>
                  <p className="body-sm" style={{ marginBottom:28, flexGrow:1, lineHeight:1.8 }}>{desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    {tags.map(t => <Badge key={t}>{t}</Badge>)}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="section-photo px-section" style={{ backgroundImage:"url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=900&fit=crop)", padding:"clamp(56px,8vw,100px) clamp(20px,4vw,40px)", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:64 }}>
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="h2">From zero to launch.<br />Every time.</h2>
          </Reveal>
          <StaggerContainer className="process-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24 }}>
            {PROCESS.map(({ n, icon, title, desc }, i) => (
              <StaggerItem key={n}>
                <GlassCard style={{ padding:36, height:"100%" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:24 }}>
                    <Icon name={icon} style={{ fontSize:28, color:"var(--lime)" }} />
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:52, fontWeight:700, color:"rgba(255,255,255,.06)", letterSpacing:"-.04em", lineHeight:1 }}>{n}</span>
                  </div>
                  <div style={{ width:28, height:2, background:"var(--lime)", marginBottom:16 }} />
                  <h3 className="h3" style={{ marginBottom:10 }}>{title}</h3>
                  <p className="body-sm">{desc}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ WHAT'S ALWAYS INCLUDED ═══ */}
      <section className="px-section" style={{ background:"rgba(4,2,12,0.85)", borderTop:"1px solid var(--border)", padding:"clamp(56px,8vw,100px) clamp(20px,4vw,40px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:72, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:24 }}>
            <div>
              <SectionLabel>Every Engagement</SectionLabel>
              <h2 className="h2">What you always get.</h2>
              <p className="body-lg" style={{ maxWidth:480, marginTop:16 }}>
                Every project — regardless of scope — is held to the same uncompromising standard.
              </p>
            </div>
            <LimeBtn onClick={() => navigate("contact")}>
              Get a Custom Quote <Icon name="arrow_forward" style={{ fontSize:17 }} />
            </LimeBtn>
          </Reveal>

          <StaggerContainer style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"transparent" }} className="process-grid">
            {GUARANTEES.map(({ icon, title, desc }) => (
              <StaggerItem key={title}>
                <motion.div
                  whileHover={{ background:"rgba(204,255,0,0.04)" }}
                  transition={{ duration:.25 }}
                  style={{ padding:"44px 40px", border:"1px solid var(--border)", height:"100%", display:"flex", flexDirection:"column", gap:20, position:"relative", overflow:"hidden" }}
                >
                  {/* Top accent */}
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, var(--lime) 0%, transparent 60%)" }} />

                  {/* Icon */}
                  <div style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(204,255,0,0.06)", border:"1px solid rgba(204,255,0,0.14)", flexShrink:0 }}>
                    <Icon name={icon} style={{ fontSize:24, color:"var(--lime)" }} />
                  </div>

                  <div>
                    <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:17, color:"var(--text)", marginBottom:10, letterSpacing:"-.02em" }}>{title}</h3>
                    <p className="body-sm" style={{ lineHeight:1.7 }}>{desc}</p>
                  </div>

                  {/* Check mark */}
                  <div style={{ marginTop:"auto", display:"flex", alignItems:"center", gap:8 }}>
                    <Icon name="check_circle" style={{ fontSize:16, color:"var(--lime)" }} />
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"var(--lime)" }}>Included</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="px-section" style={{ maxWidth:1440, margin:"0 auto", padding:"clamp(56px,8vw,100px) clamp(20px,4vw,40px)" }}>
        <Reveal>
          <motion.div
            style={{ background:"var(--lime)", padding:"64px clamp(32px,6vw,80px)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:32, position:"relative", overflow:"hidden" }}
            animate={{ boxShadow:["0 0 30px rgba(204,255,0,.15)","0 0 60px rgba(204,255,0,.35)","0 0 30px rgba(204,255,0,.15)"] }}
            transition={{ repeat:Infinity, duration:3 }}
          >
            <div>
              <h2 className="h2" style={{ color:"#000", marginBottom:10 }}>Let's build something great.</h2>
              <p style={{ color:"rgba(0,0,0,.6)", fontSize:16 }}>Tell us about your project — we respond in 24h.</p>
            </div>
            <motion.button
              className="lime-btn" style={{ background:"#000", color:"#fff", padding:"18px 44px", fontSize:15, whiteSpace:"nowrap" }}
              onClick={() => navigate("contact")}
              whileHover={{ scale:1.05 }} whileTap={{ scale:.96 }}
            >
              Start a Project <Icon name="arrow_forward" style={{ fontSize:19 }} />
            </motion.button>
          </motion.div>
        </Reveal>
      </section>
    </div>
  );
}
