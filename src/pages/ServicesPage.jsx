import { motion } from "framer-motion";
import { Icon, SectionLabel, Reveal, StaggerContainer, StaggerItem, LimeBtn, Badge, GlassCard } from "../components/UI";

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

const PRICING = [
  { tier:"Starter",   price:"$8,000",  period:"one-time", color:"var(--border)",  items:["Landing page or MVP","Up to 5 pages","Basic SEO setup","Mobile responsive","14-day delivery","30-day support"] },
  { tier:"Growth",    price:"$25,000", period:"one-time", color:"var(--lime)",     items:["Full web application","Custom design system","API integrations","Performance optimization","8-week delivery","60-day support"], featured:true },
  { tier:"Enterprise",price:"Custom",  period:"per scope",color:"var(--surface3)", items:["Unlimited scope","Dedicated team","SLA guarantees","Infrastructure design","Custom timeline","12-month support"] },
];

export default function ServicesPage({ navigate }) {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section style={{ position:"relative", overflow:"hidden", padding:"100px 40px 80px" }} className="px-section">
        <div style={{ position:"absolute", top:-150, left:-150, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(109,40,217,0.2) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1440, margin:"0 auto", position:"relative", zIndex:1 }}>
          <Reveal>
            <SectionLabel>Services</SectionLabel>
            <h1 className="h1" style={{ marginBottom:24 }}>What we<br />build.</h1>
            <p className="body-lg" style={{ maxWidth:560 }}>
              High-performance digital products engineered for precision and scale. We architect competitive advantages, not just features.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ SERVICE CARDS ═══ */}
      <section className="section-grad px-section" style={{ padding:"0 40px 100px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <StaggerContainer className="services-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"var(--border)" }}>
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
      <section className="section-photo px-section" style={{ backgroundImage:"url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=900&fit=crop)", padding:"100px 40px", borderTop:"1px solid var(--border)" }}>
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

      {/* ═══ PRICING ═══ */}
      <section className="px-section" style={{ background:"rgba(4,2,12,0.85)", borderTop:"1px solid var(--border)", padding:"100px 40px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:64, textAlign:"center" }}>
            <SectionLabel>Investment</SectionLabel>
            <h2 className="h2">Transparent pricing.</h2>
            <p className="body-lg" style={{ maxWidth:480, margin:"16px auto 0" }}>No retainers, no lock-ins. Scoped engagements with a clear deliverable and a fixed price.</p>
          </Reveal>
          <StaggerContainer style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"var(--border)" }} className="process-grid">
            {PRICING.map(({ tier, price, period, items, featured }) => (
              <StaggerItem key={tier}>
                <div
                  className="card"
                  style={{ padding:48, border:"none", height:"100%", display:"flex", flexDirection:"column", background: featured?"var(--surface2)":"var(--surface)", position:"relative" }}
                >
                  {featured && <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"var(--lime)" }} />}
                  <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color: featured?"var(--lime)":"var(--text3)", marginBottom:16 }}>{tier}</p>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"var(--text)", letterSpacing:"-.04em", lineHeight:1, marginBottom:4 }}>{price}</div>
                  <p style={{ fontSize:12, color:"var(--text3)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:32 }}>{period}</p>
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:12, flexGrow:1, marginBottom:32 }}>
                    {items.map(item => (
                      <li key={item} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                        <Icon name="check_circle" style={{ fontSize:16, color:"var(--lime)", marginTop:1, flexShrink:0 }} />
                        <span className="body-sm" style={{ fontSize:14 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    className="lime-btn"
                    style={{ width:"100%", justifyContent:"center", background: featured?"var(--lime)":"transparent", color: featured?"#000":"var(--text)", border: featured?"none":"1px solid var(--border2)" }}
                    onClick={() => navigate("contact")}
                    whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }}
                  >
                    Get Started <Icon name="arrow_forward" style={{ fontSize:17 }} />
                  </motion.button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="px-section" style={{ maxWidth:1440, margin:"0 auto", padding:"100px 40px" }}>
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
