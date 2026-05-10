import { motion } from "framer-motion";
import { useReveal } from "../hooks";
import { Icon, SectionLabel, Reveal, StaggerContainer, StaggerItem, LimeBtn, TechPill, Stars, GlassCard } from "../components/UI";

const TEAM = [
  { name:"Md. Mehad Hossain", role:"Founder & Principal Engineer", bio:"Architecting high-scale distributed systems and driving the full technical vision of the agency.", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face" },
  { name:"Farhan Khan",       role:"Head of Frontend Engineering", bio:"Bridging design and development with a deep focus on React, performance, and micro-interactions.",  img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&crop=face" },
  { name:"Saima Islam",       role:"Lead UI/UX Strategist",        bio:"Defining user journeys and aesthetic precision for our global portfolio of digital products.",        img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=face" },
  { name:"Nadia Rahman",      role:"Operations & Delivery Lead",   bio:"Ensuring every project is delivered on time, on scope, and on budget — with zero drama.",             img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop&crop=face" },
  { name:"Tariq Hassan",      role:"Backend Systems Architect",    bio:"Designing resilient APIs and database architectures that handle millions of operations per second.",   img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&crop=face" },
  { name:"Rina Chowdhury",    role:"Brand & Motion Designer",      bio:"Crafting visual identities and motion systems that give brands a distinct, lasting market presence.",  img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&crop=face" },
];

const HOW_WE_OPERATE = [
  { icon:"groups",        title:"Client Partnership",    desc:"We operate as an embedded extension of your team — not a vendor. You get direct Slack access to your engineers throughout." },
  { icon:"sprint",        title:"Agile Sprints",         desc:"Two-week cycles with live demos and retrospectives. Every sprint closes with something shippable and reviewed." },
  { icon:"verified",      title:"Quality Gates",         desc:"Code reviews, automated test suites, and accessibility checks on every pull request before anything merges." },
  { icon:"public",        title:"Global Standards",      desc:"We build to international accessibility, performance, and security standards — regardless of where your users are." },
];

const VALUES = [
  { n:"01", icon:"workspace_premium", title:"Quality",     desc:"Code that is battle-tested, documented, and built to survive the unexpected." },
  { n:"02", icon:"handshake",         title:"Honesty",     desc:"Direct communication — no over-promising, no hidden costs, no technical jargon to confuse." },
  { n:"03", icon:"palette",           title:"Craft",       desc:"Meticulous attention to typography, spacing, animation timing, and every micro-interaction." },
  { n:"04", icon:"diversity_3",       title:"Partnership", desc:"We don't build for you — we build with you. Your success is the only metric that matters." },
];

const STACK = ["React","Next.js","TypeScript","Node.js","Python","PostgreSQL","Redis","Docker","AWS","Kubernetes","GraphQL","Tailwind CSS","Rust","Figma","Vercel"];

export default function AboutPage({ navigate }) {
  useReveal();

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section style={{ position:"relative", overflow:"hidden", padding:"100px 40px 80px" }} className="px-section">
        <div style={{ position:"absolute", top:-200, right:-200, width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(88,28,135,0.25) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1440, margin:"0 auto", position:"relative", zIndex:1 }}>
          <Reveal>
            <SectionLabel>Our Story</SectionLabel>
            <h1 className="h1" style={{ marginBottom:24, maxWidth:700 }}>Who<br />we are.</h1>
            <p className="body-lg" style={{ maxWidth:560 }}>
              A high-performance digital laboratory engineering solutions for the modern web — from the heart of Dhaka to clients across the globe.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"80px 40px" }} className="px-section">
        <div className="about-grid" style={{ maxWidth:1440, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 440px", gap:80, alignItems:"center" }}>
          <Reveal direction="left">
            <h2 className="h2" style={{ marginBottom:28 }}>We started to solve a fundamental problem.</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              {[
                "NexbeeLabs was founded on the belief that technical excellence shouldn't be a premium accessory — it should be the baseline. In an industry cluttered with over-promising and underdelivering, we built a refuge for direct engineering and pure functional design.",
                "Based in Dhaka but operating globally, we bridge the gap between regional talent and international standards. Our team builds high-availability systems and pixel-perfect interfaces that always prioritize user efficiency over decorative noise.",
                "Today we serve partners from pre-seed startups to enterprise conglomerates. They all share one demand: software that works when the pressure is on.",
              ].map((p,i) => <p key={i} className="body-sm" style={{ fontSize:15, lineHeight:1.8 }}>{p}</p>)}
            </div>
            <div style={{ marginTop:36 }}>
              <LimeBtn onClick={() => navigate("contact")}>Work With Us <Icon name="arrow_forward" style={{ fontSize:18 }} /></LimeBtn>
            </div>
          </Reveal>

          <Reveal direction="right" className="about-img">
            <div style={{ position:"relative" }}>
              <div className="img-hover" style={{ overflow:"hidden" }}>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=880&h=1100&fit=crop" alt="Team" style={{ width:"100%", aspectRatio:"4/5", objectFit:"cover" }} />
              </div>
              <motion.div
                animate={{ width:["40%","65%","40%"] }} transition={{ repeat:Infinity, duration:4, ease:"easeInOut" }}
                style={{ position:"absolute", bottom:-16, right:-16, height:3, background:"var(--lime)" }}
              />
              <div style={{ position:"absolute", top:24, left:-24, background:"var(--lime)", padding:"12px 20px" }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:28, fontWeight:700, color:"#000", lineHeight:1 }}>7+</div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"rgba(0,0,0,.6)" }}>Years</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CORE VALUES — responsive 4-col grid ═══ */}
      <section className="section-grad px-section" style={{ padding:"100px 40px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:56 }}>
            <SectionLabel>Core Values</SectionLabel>
            <h2 className="h2">The principles we don't compromise on.</h2>
          </Reveal>
          <StaggerContainer className="values-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"var(--border)" }}>
            {VALUES.map(({ n, icon, title, desc }) => (
              <StaggerItem key={n}>
                <div className="card" style={{ padding:40, border:"none", height:"100%" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
                    <Icon name={icon} style={{ fontSize:32, color:"var(--lime)" }} />
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:40, fontWeight:700, color:"var(--border)", letterSpacing:"-.04em", lineHeight:1 }}>{n}</span>
                  </div>
                  <h3 className="h3" style={{ marginBottom:12 }}>{title}</h3>
                  <p className="body-sm">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ TEAM — responsive 3-col grid (was 4, caused overflow) ═══ */}
      <section className="section-photo px-section" style={{ backgroundImage:"url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop)", padding:"100px 40px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:56 }}>
            <SectionLabel>Engineering Leadership</SectionLabel>
            <h2 className="h2">The people behind the code.</h2>
          </Reveal>
          <StaggerContainer className="team-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
            {TEAM.map(({ name, role, bio, img }) => (
              <StaggerItem key={name}>
                <motion.div
                  className="glass-card"
                  style={{ padding:0, overflow:"hidden" }}
                  whileHover={{ y:-8, boxShadow:"0 32px 64px rgba(0,0,0,0.4)" }}
                >
                  <div className="img-hover" style={{ overflow:"hidden", aspectRatio:"1" }}>
                    <img src={img} alt={name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  </div>
                  <div style={{ padding:24 }}>
                    <h4 className="h3" style={{ fontSize:16, marginBottom:4 }}>{name}</h4>
                    <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"var(--lime)", marginBottom:12 }}>{role}</p>
                    <p className="body-sm" style={{ fontSize:13 }}>{bio}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ HOW WE OPERATE — responsive 2-col grid ═══ */}
      <section className="px-section" style={{ background:"rgba(4,2,12,0.85)", borderTop:"1px solid var(--border)", padding:"100px 40px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:56 }}>
            <SectionLabel>How We Operate</SectionLabel>
            <h2 className="h2">Structure that delivers.</h2>
          </Reveal>
          <StaggerContainer className="values-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"var(--border)" }}>
            {HOW_WE_OPERATE.map(({ icon, title, desc }) => (
              <StaggerItem key={title}>
                <GlassCard style={{ padding:40, height:"100%" }}>
                  <Icon name={icon} style={{ fontSize:32, color:"var(--lime)", display:"block", marginBottom:20 }} />
                  <h3 className="h3" style={{ marginBottom:12 }}>{title}</h3>
                  <p className="body-sm">{desc}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="section-grad px-section" style={{ padding:"100px 40px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:48 }}>
            <SectionLabel>Our Stack</SectionLabel>
            <h2 className="h2">Optimized for speed and scale.</h2>
          </Reveal>
          <StaggerContainer style={{ display:"flex", flexWrap:"wrap", gap:10 }} fast>
            {STACK.map(t => <StaggerItem key={t}><TechPill label={t} /></StaggerItem>)}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="px-section" style={{ background:"rgba(4,2,12,0.8)", borderTop:"1px solid var(--border)", padding:"100px 40px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:48 }}>
            <SectionLabel>What Clients Say</SectionLabel>
            <h2 className="h2">Results speak loudest.</h2>
          </Reveal>
          <StaggerContainer className="testimonials-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"var(--border)" }}>
            {[
              { q:"The engineering precision NexbeeLabs brought to our fintech platform was beyond anything we'd experienced. Pure mastery.",  name:"John Doe",    title:"CTO, FinStream"       },
              { q:"They delivered a complex SaaS dashboard in record time with zero compromise on quality. A truly rare partner.",            name:"Jane Smith",  title:"Product Lead, Velocity"},
              { q:"Working with NexbeeLabs felt like having our own elite engineering team embedded. Direct, honest, and brutally effective.",name:"Arif Rahman", title:"CEO, Dhaka Tech"       },
            ].map(({ q, name, title }) => (
              <StaggerItem key={name}>
                <div className="testimonial-card" style={{ height:"100%" }}>
                  <Stars />
                  <p style={{ color:"var(--text)", lineHeight:1.7, marginBottom:20, fontStyle:"italic", fontSize:15 }}>"{q}"</p>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:"var(--text)", fontSize:14 }}>{name}</div>
                  <div style={{ fontSize:11, color:"var(--text3)", textTransform:"uppercase", letterSpacing:".08em", marginTop:4 }}>{title}</div>
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
            <div style={{ position:"absolute", right:-40, top:-40, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,.08)" }} />
            <div>
              <h2 className="h2" style={{ color:"#000", marginBottom:12 }}>Ready to partner?</h2>
              <p style={{ color:"rgba(0,0,0,.6)", fontSize:16 }}>Tell us about your project — we respond within 24h.</p>
            </div>
            <motion.button
              className="lime-btn" style={{ background:"#000", color:"#fff", padding:"18px 44px", fontSize:15, whiteSpace:"nowrap" }}
              onClick={() => navigate("contact")}
              whileHover={{ scale:1.05 }} whileTap={{ scale:.96 }}
            >
              Get in Touch <Icon name="arrow_forward" style={{ fontSize:19 }} />
            </motion.button>
          </motion.div>
        </Reveal>
      </section>
    </div>
  );
}
