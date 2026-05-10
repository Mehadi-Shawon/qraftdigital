import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon, SectionLabel, Reveal, StaggerContainer, StaggerItem, LimeBtn, Badge } from "../components/UI";

const PROJECTS = [
  { client:"NexaStore",   title:"High-Performance E-Commerce Engine",  tag:"Retail Tech",  filter:"Web",    result:"45% conversion lift",  desc:"Headless commerce with sub-100ms interactions, global CDN edge caching, and a checkout flow that reduced abandonment by 32%.",    stack:["React","Node.js","AWS"],           img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop", wide:true  },
  { client:"Orbit",       title:"Real-Time SaaS Analytics Dashboard",  tag:"SaaS",         filter:"SaaS",   result:"3× faster reporting",  desc:"Live data visualization for 50k+ concurrent users with Redis caching, PostgreSQL partitioning, and real-time WebSocket feeds.",   stack:["Next.js","PostgreSQL","Redis"],    img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",  wide:false },
  { client:"Aura Labs",   title:"Complete Brand Identity System",       tag:"Branding",     filter:"Brand",  result:"Brand recognition +80%",desc:"Full rebrand: logo, typography system, motion guidelines, brand book, and an interactive component library for their design team.", stack:["Figma","Motion","Print"],          img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",  wide:false },
  { client:"HealthSync",  title:"HIPAA-Compliant Mobile Health App",    tag:"Mobile",       filter:"Mobile", result:"4.9★ App Store",       desc:"Biometric-secured React Native app with encrypted data flows, offline support, and a doctor-patient communication module.",       stack:["React Native","GraphQL","AWS"],   img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop",wide:true  },
  { client:"GreenTech",   title:"Sustainability Reporting Platform",    tag:"SaaS",         filter:"SaaS",   result:"60% time saved",       desc:"ESG data aggregation platform used by 40+ enterprise clients. Automated reporting workflows replaced 3 FTE of manual data work.",    stack:["Python","PostgreSQL","Docker"],   img:"https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&h=600&fit=crop",  wide:false },
  { client:"LuxeRetail",  title:"Luxury Brand E-Commerce Experience",   tag:"Web",          filter:"Web",    result:"$2M+ first-month GMV", desc:"Premium headless Shopify storefront with AR try-on integration, curated editorial layouts, and an invite-only checkout flow.",    stack:["Next.js","Shopify","Framer"],     img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",  wide:false },
];

const FILTERS = ["All","Web","Mobile","Brand","SaaS"];

export default function WorkPage({ navigate }) {
  const [active, setActive] = useState("All");
  const filtered = active==="All" ? PROJECTS : PROJECTS.filter(p => p.filter===active);

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section style={{ position:"relative", overflow:"hidden", padding:"100px 40px 64px", borderBottom:"1px solid var(--border)" }} className="px-section">
        <div style={{ position:"absolute", bottom:-100, right:-100, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(88,28,135,0.2) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1440, margin:"0 auto", position:"relative", zIndex:1 }}>
          <Reveal>
            <SectionLabel>Our Work</SectionLabel>
            <h1 className="h1" style={{ marginBottom:24 }}>Selected<br />projects.</h1>
            <p className="body-lg" style={{ maxWidth:560 }}>
              A showcase of high-performance digital products built with technical precision and deliberate aesthetic restraint.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ FILTERS ═══ */}
      <div className="px-section filter-bar" style={{ maxWidth:1440, margin:"0 auto", padding:"28px 40px", display:"flex", gap:10, borderBottom:"1px solid var(--border)", flexWrap:"wrap" }}>
        {FILTERS.map(f => (
          <motion.button
            key={f}
            onClick={() => setActive(f)}
            style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", padding:"9px 22px", border:`1px solid ${active===f?"var(--lime)":"var(--border)"}`, background: active===f?"var(--lime)":"none", color: active===f?"#000":"var(--text3)" }}
            whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}
            transition={{ type:"spring", stiffness:400, damping:20 }}
          >
            {f}
          </motion.button>
        ))}
      </div>

      {/* ═══ GRID ═══ */}
      <div className="px-section" style={{ maxWidth:1440, margin:"0 auto", padding:"64px 40px 100px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="work-grid"
            style={{ display:"grid", gridTemplateColumns:"repeat(12,1fr)", gap:24 }}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-20 }} transition={{ duration:.4, ease:[.2,.8,.2,1] }}
          >
            {filtered.map(({ client, title, tag, result, desc, stack, img, wide }) => (
              <motion.div
                key={title}
                className={`project-card ${wide?"work-wide":"work-narrow"}`}
                style={{ gridColumn: wide?"span 8":"span 4", display:"flex", flexDirection:"column" }}
                whileHover={{ y:-4 }}
                transition={{ type:"spring", stiffness:300, damping:20 }}
              >
                <div style={{ padding:"28px 28px 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
                  <div>
                    <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"var(--text3)", marginBottom:6 }}>Client: {client}</p>
                    <h3 className="h3" style={{ textTransform:"uppercase", letterSpacing:"-.02em", maxWidth:360 }}>{title}</h3>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span className="lime-badge badge">{tag}</span>
                    <Icon name="arrow_outward" className="project-arrow" style={{ fontSize:20 }} />
                  </div>
                </div>
                <div className="img-hover" style={{ overflow:"hidden", margin:"20px 0", flexGrow:1 }}>
                  <img src={img} alt={title} style={{ width:"100%", height: wide?320:180, objectFit:"cover", display:"block" }} />
                </div>
                <div style={{ padding:"0 28px 28px" }}>
                  <p className="body-sm" style={{ marginBottom:20, lineHeight:1.7 }}>{desc}</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:16, borderTop:"1px solid var(--border)", flexWrap:"wrap", gap:12 }}>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{stack.map(s => <Badge key={s}>{s}</Badge>)}</div>
                    <div style={{ textAlign:"right" }}>
                      <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"var(--lime)", marginBottom:3 }}>Result</p>
                      <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:700, color:"var(--text)" }}>{result}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Invite block */}
        <Reveal style={{ marginTop:64 }}>
          <motion.div
            style={{ textAlign:"center", padding:"clamp(40px,6vw,72px)", border:"1px solid var(--border)", background:"var(--surface)", position:"relative", overflow:"hidden" }}
            whileHover={{ borderColor:"var(--lime)" }}
          >
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(204,255,0,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(204,255,0,.02) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <h3 className="h2" style={{ fontSize:"clamp(24px,4vw,40px)", marginBottom:16 }}>Have a project in mind?</h3>
              <p className="body-sm" style={{ marginBottom:32, fontSize:16 }}>We'd love to add it to this list.</p>
              <LimeBtn onClick={() => navigate("contact")}>Start a Conversation <Icon name="arrow_forward" style={{ fontSize:18 }} /></LimeBtn>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </div>
  );
}
