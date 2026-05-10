import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReveal, useCountUp, useTypewriter } from "../hooks";
import { Icon, SectionLabel, Reveal, StaggerContainer, StaggerItem, LimeBtn, GhostBtn, Stars, Badge, TiltCard, GlassCard } from "../components/UI";

const FEATURED = [
  {
    client:"NexaStore", num:"01", title:"High-Performance E-Commerce", tag:"Web · Commerce",
    desc:"Headless commerce platform with sub-100ms interactions, global CDN, and a 45% lift in conversion rate after launch.",
    result:"45% conversion lift", stack:["React","Node.js","AWS"],
    img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=900&fit=crop", color:"rgba(204,255,0,0.08)",
  },
  {
    client:"Orbit Analytics", num:"02", title:"Real-Time SaaS Dashboard", tag:"SaaS · Data",
    desc:"Live data visualization handling 50k+ concurrent users with PostgreSQL and Redis. Reporting now 3× faster for enterprise clients.",
    result:"3× faster reporting", stack:["Next.js","PostgreSQL","Redis"],
    img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=900&fit=crop", color:"rgba(109,40,217,0.08)",
  },
  {
    client:"HealthSync", num:"03", title:"Mobile Health Platform", tag:"Mobile · HIPAA",
    desc:"Secure React Native app with encrypted data flows and biometric auth. Rated 4.9★ on App Store in its first quarter.",
    result:"4.9★ App Store", stack:["React Native","GraphQL","AWS"],
    img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=900&fit=crop", color:"rgba(88,28,135,0.08)",
  },
];

const SERVICES = [
  { icon:"web",           title:"Web Development",  desc:"Blazing-fast, scalable applications engineered with modern frameworks and obsessive attention to performance." },
  { icon:"brush",         title:"Brand Identity",   desc:"Visual systems that communicate authority, craft, and a distinct market position that endures." },
  { icon:"monitoring",    title:"SEO & Growth",     desc:"Technical SEO and CRO strategies that compound — turning organic traffic into measurable revenue." },
  { icon:"shopping_cart", title:"E-Commerce",       desc:"High-conversion checkout flows designed for frictionless global transactions at any scale." },
  { icon:"smartphone",    title:"Mobile Apps",      desc:"Native-feel React Native apps that perform on par with platform-native solutions." },
  { icon:"terminal",      title:"Custom Software",  desc:"Bespoke SaaS platforms, APIs, and internal tools built around your exact operational needs." },
];

const HOW_WE_WORK = [
  { n:"01", icon:"search",     title:"Discovery",     desc:"We immerse ourselves in your business: goals, audience, competitors, and KPIs. No guesswork — pure clarity before a single line of code." },
  { n:"02", icon:"architecture",title:"Architecture", desc:"Technical blueprint, design system, and database schema. We build the foundation so everything above it scales without friction." },
  { n:"03", icon:"code",       title:"Engineering",   desc:"2-week agile sprints with live progress tracking. You see real builds, not slide decks. Feedback is built in, not bolted on." },
  { n:"04", icon:"rocket_launch",title:"Launch",      desc:"Staged deployment with performance benchmarking, load testing, and a 60-day post-launch support window on every project." },
];

export default function HomePage({ navigate }) {
  useReveal();
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [faqOpen, setFaqOpen]           = useState(null);
  const [activeProject, setActiveProject] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset:["start start","end start"] });
  const heroY     = useTransform(scrollYProgress, [0,1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0,.8], [1, 0]);

  const typedText = useTypewriter(["That Actually Work","That Scale Globally","With Precision","At Lightning Speed"]);
  const c1 = useCountUp(140, 1400, statsVisible);
  const c2 = useCountUp(98,  1200, statsVisible);
  const c3 = useCountUp(12,  1000, statsVisible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold:.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const faqs = [
    { q:"How long does a typical project take?",    a:"Usually 6–12 weeks depending on complexity. We work in 2-week sprints with clear milestones and full transparency." },
    { q:"Do you provide maintenance after launch?", a:"Yes. All projects include a 60-day post-launch support window. Long-term retainer plans are available for ongoing work." },
    { q:"What tech stack do you use?",              a:"React, Next.js, TypeScript, Node.js, PostgreSQL, AWS, Docker. We always choose the right tool for the job." },
    { q:"Do you work with startups?",               a:"Absolutely. From pre-seed MVPs to enterprise-scale platforms — we scale our process to match your stage and budget." },
    { q:"How do you handle NDAs and IP?",           a:"We sign NDAs before any discovery calls. All IP created during the engagement belongs 100% to you at handover." },
  ];

  return (
    <div>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section ref={heroRef} style={{ position:"relative", overflow:"hidden", minHeight:"95vh", display:"flex", alignItems:"center" }}>
        {/* Animated background orbs */}
        <motion.div style={{ y: heroY }} className="bg-orb" style={{ width:600, height:600, background:"radial-gradient(circle, rgba(88,28,135,0.35) 0%, transparent 70%)", top:-200, left:-200, position:"absolute", animation:"orb1 12s ease-in-out infinite" }} />
        <motion.div className="bg-orb" style={{ width:400, height:400, background:"radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 70%)", bottom:0, right:-100, position:"absolute", animation:"orb2 16s ease-in-out infinite" }} />

        {/* Grid pattern overlay */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(204,255,0,.025) 1px, transparent 1px),linear-gradient(90deg,rgba(204,255,0,.025) 1px,transparent 1px)", backgroundSize:"60px 60px", zIndex:0 }} />

        <motion.div style={{ opacity: heroOpacity }} className="px-section" style={{ maxWidth:1440, margin:"0 auto", padding:"80px 40px 100px", position:"relative", zIndex:2, width:"100%" }}>
          <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 500px", gap:80, alignItems:"center" }}>

            {/* Copy */}
            <div>
              <motion.div
                initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:.7, ease:[.2,.8,.2,1] }}
              >
                <div style={{ display:"inline-flex", alignItems:"center", gap:10, border:"1px solid rgba(204,255,0,.35)", padding:"6px 16px", marginBottom:32, background:"rgba(204,255,0,.04)" }}>
                  <span style={{ width:7, height:7, background:"var(--lime)", borderRadius:"50%", animation:"pulse 2s infinite", flexShrink:0 }} />
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:".12em", color:"var(--lime)" }}>Digital Agency · Dhaka</span>
                </div>

                <h1 className="h1" style={{ marginBottom:0 }}>
                  We Build<br />Digital Products
                </h1>
                <div className="h1 grad-text" style={{ marginBottom:24, minHeight:"1.05em" }}>
                  {typedText}<span style={{ animation:"blink 1s infinite", borderRight:"3px solid var(--lime)", marginLeft:2 }}>&nbsp;</span>
                </div>

                <p className="body-lg" style={{ maxWidth:520, marginBottom:44 }}>
                  High-performance engineering meets direct digital strategy. No fluff — just measurable results for leaders who demand more.
                </p>

                <div className="hero-btns" style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:56 }}>
                  <LimeBtn onClick={() => navigate("contact")}>Start a Project <Icon name="arrow_forward" style={{ fontSize:18 }} /></LimeBtn>
                  <GhostBtn onClick={() => navigate("work")}>View Our Work</GhostBtn>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.5, duration:.8 }}
                className="hero-stats" style={{ display:"flex", gap:48, paddingTop:40, borderTop:"1px solid var(--border)" }}
              >
                {[["7+","Years"],["140+","Projects"],["98%","Retention"],["24/7","Support"]].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(24px,3vw,36px)", fontWeight:700, color:"var(--text)", letterSpacing:"-.03em", lineHeight:1 }}>{n}</div>
                    <div style={{ fontSize:11, color:"var(--text3)", fontFamily:"'Space Grotesk',sans-serif", textTransform:"uppercase", letterSpacing:".1em", marginTop:6 }}>{l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dashboard hero card */}
            <motion.div
              className="hero-card"
              initial={{ opacity:0, x:60, rotateY:15 }} animate={{ opacity:1, x:0, rotateY:0 }}
              transition={{ duration:1, delay:.3, ease:[.2,.8,.2,1] }}
              style={{ animation:"floatY 5s ease-in-out infinite", animationDelay:"1s" }}
            >
              <TiltCard>
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", padding:32, position:"relative", zIndex:2, boxShadow:"0 40px 80px rgba(0,0,0,0.5)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"var(--lime)" }}>Live Build Feed</span>
                    <span style={{ width:8, height:8, borderRadius:"50%", background:"var(--lime)", boxShadow:"0 0 12px var(--lime)", animation:"pulse 2s infinite" }} />
                  </div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:80, fontWeight:700, lineHeight:1, color:"var(--text)", marginBottom:4 }}>98</div>
                  <div style={{ fontSize:12, color:"var(--text3)", marginBottom:24 }}>Lighthouse Performance Score</div>
                  {[{label:"Speed",val:98},{label:"Accessibility",val:96},{label:"SEO",val:100},{label:"Best Practices",val:95}].map(({ label, val }) => (
                    <div key={label} style={{ marginBottom:12 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                        <span style={{ fontSize:11, color:"var(--text2)" }}>{label}</span>
                        <span style={{ fontSize:11, fontFamily:"'Space Grotesk',sans-serif", color:"var(--text)", fontWeight:700 }}>{val}</span>
                      </div>
                      <div style={{ height:2, background:"var(--border)", position:"relative" }}>
                        <motion.div
                          style={{ position:"absolute", top:0, left:0, height:"100%", background:"var(--lime)" }}
                          initial={{ width:0 }} animate={{ width:`${val}%` }}
                          transition={{ duration:1.5, delay:.8, ease:[.2,.8,.2,1] }}
                        />
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop:20, paddingTop:16, borderTop:"1px solid var(--border)" }}>
                    {[{text:"Design system build",active:true,ping:true},{text:"Responsive pass",active:true,ping:false},{text:"Performance audit",active:false,ping:false}].map(({ text, active, ping }) => (
                      <div key={text} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}>
                        <div style={{ position:"relative", width:8, height:8, flexShrink:0 }}>
                          <div style={{ width:8, height:8, borderRadius:"50%", background: active?"var(--lime)":"var(--border)" }} />
                          {ping && <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"var(--lime)", animation:"ping 1.5s infinite" }} />}
                        </div>
                        <span style={{ fontSize:12, color: active?"var(--text)":"var(--text3)" }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ position:"absolute", bottom:-12, right:-12, left:12, top:12, background:"var(--surface2)", border:"1px solid var(--border)", zIndex:1 }} />
              </TiltCard>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y:[0,10,0] }} transition={{ repeat:Infinity, duration:2 }}
          style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, zIndex:2 }}
        >
          <span style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".12em", color:"var(--text3)", textTransform:"uppercase" }}>Scroll</span>
          <Icon name="arrow_downward" style={{ fontSize:18, color:"var(--lime)" }} />
        </motion.div>
      </section>

      {/* ═══════════════════ STATS BAR ═══════════════════ */}
      <div ref={statsRef} style={{ background:"rgba(4,2,12,0.9)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"56px 40px" }}>
        <StaggerContainer className="stats-grid" style={{ maxWidth:1440, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:40 }}>
          {[
            { num:c1, suffix:"+", label:"Projects Shipped" },
            { num:c2, suffix:"%", label:"Lighthouse Avg"   },
            { num:c3, suffix:"ms",label:"Avg API Latency"  },
            { num:"24/7",suffix:"",label:"System Uptime"   },
          ].map(({ num, suffix, label }) => (
            <StaggerItem key={label}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(36px,5vw,64px)", fontWeight:700, color:"var(--text)", letterSpacing:"-.04em", lineHeight:1 }}>{num}{suffix}</div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:".12em", color:"var(--text3)", marginTop:8 }}>{label}</div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* ═══════════════════ TICKER ═══════════════════ */}
      <div style={{ borderBottom:"1px solid var(--border)", padding:"18px 0", overflow:"hidden" }}>
        <div className="ticker-inner">
          {["Fintech","E-Commerce","SaaS","Healthcare","Real Estate","Logistics","Fintech","E-Commerce","SaaS","Healthcare","Real Estate","Logistics"].map((t,i) => (
            <span key={i} style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(18px,2.5vw,26px)", fontWeight:700, textTransform:"uppercase", letterSpacing:"-.02em", color:i%6===0?"var(--lime)":"var(--border)", marginRight:56 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ═══════════════════ SERVICES ═══════════════════ */}
      <section className="section-grad px-section" style={{ padding:"120px 40px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:64, textAlign:"center" }}>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="h2" style={{ maxWidth:600, margin:"0 auto 16px" }}>Everything your digital product needs</h2>
            <p className="body-lg" style={{ maxWidth:480, margin:"0 auto" }}>Specialized services focused on conversion, performance, and engineering excellence.</p>
          </Reveal>
          <StaggerContainer className="services-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"var(--border)" }}>
            {SERVICES.map(({ icon, title, desc }) => (
              <StaggerItem key={title}>
                <div className="card" style={{ padding:40, border:"none", height:"100%" }}>
                  <Icon name={icon} className="service-icon" />
                  <h3 className="h3" style={{ marginBottom:12 }}>{title}</h3>
                  <p className="body-sm">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <Reveal style={{ marginTop:48, textAlign:"center" }}>
            <LimeBtn onClick={() => navigate("services")}>All Services <Icon name="east" style={{ fontSize:17 }} /></LimeBtn>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ FEATURED PROJECTS ═══════════════════ */}
      <section className="section-photo px-section" style={{ backgroundImage:"url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=1080&fit=crop)", padding:"120px 40px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:64 }}>
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="h2">Projects that define us.</h2>
          </Reveal>

          {/* Tab selector */}
          <div style={{ display:"flex", gap:1, background:"var(--border)", marginBottom:2, overflowX:"auto" }}>
            {FEATURED.map((p, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveProject(i)}
                style={{ flex:1, minWidth:120, padding:"14px 20px", background: activeProject===i ? "var(--lime)" : "var(--surface)", border:"none", fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:".06em", color: activeProject===i ? "#000" : "var(--text3)", whiteSpace:"nowrap" }}
                whileHover={{ background: activeProject===i ? "var(--lime)" : "var(--surface2)" }}
                transition={{ duration:.2 }}
              >
                {p.num} {p.client}
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeProject}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.5, ease:[.2,.8,.2,1] }}
            className="featured-grid"
            style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"var(--border)" }}
          >
            <div style={{ overflow:"hidden", aspectRatio:"16/10" }} className="img-hover">
              <img src={FEATURED[activeProject].img} alt={FEATURED[activeProject].title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
            <div style={{ background:"var(--surface)", padding:"clamp(32px,5vw,56px)", display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <div style={{ display:"inline-flex", gap:8, marginBottom:24, flexWrap:"wrap" }}>
                <span className="lime-badge badge">{FEATURED[activeProject].tag}</span>
                <span className="badge">Client: {FEATURED[activeProject].client}</span>
              </div>
              <h3 className="h2" style={{ fontSize:"clamp(22px,3vw,36px)", marginBottom:20 }}>{FEATURED[activeProject].title}</h3>
              <p className="body-sm" style={{ marginBottom:28, fontSize:15, lineHeight:1.7 }}>{FEATURED[activeProject].desc}</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:32 }}>
                {FEATURED[activeProject].stack.map(s => <Badge key={s}>{s}</Badge>)}
              </div>
              <div style={{ paddingTop:24, borderTop:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
                <div>
                  <p style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"var(--lime)", marginBottom:4 }}>Key Result</p>
                  <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:700, color:"var(--text)" }}>{FEATURED[activeProject].result}</p>
                </div>
                <LimeBtn onClick={() => navigate("work")}>View All Work <Icon name="arrow_forward" style={{ fontSize:17 }} /></LimeBtn>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ HOW WE WORK ═══════════════════ */}
      <section className="px-section" style={{ background:"rgba(4,2,12,0.8)", borderTop:"1px solid var(--border)", padding:"120px 40px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:72 }}>
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="h2">From zero to live.<br />Every single time.</h2>
          </Reveal>
          <StaggerContainer className="how-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"var(--border)" }}>
            {HOW_WE_WORK.map(({ n, icon, title, desc }) => (
              <StaggerItem key={n}>
                <GlassCard style={{ padding:40, height:"100%" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
                    <Icon name={icon} style={{ fontSize:32, color:"var(--lime)" }} />
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:48, fontWeight:700, color:"var(--border)", letterSpacing:"-.04em", lineHeight:1 }}>{n}</span>
                  </div>
                  <div style={{ width:32, height:2, background:"var(--lime)", marginBottom:20 }} />
                  <h3 className="h3" style={{ marginBottom:12 }}>{title}</h3>
                  <p className="body-sm">{desc}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════ WHY US ═══════════════════ */}
      <section className="section-grad px-section" style={{ padding:"120px 40px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:64, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:24 }}>
            <div>
              <SectionLabel>Why NexbeeLabs</SectionLabel>
              <h2 className="h2">Built different.<br />Delivers different.</h2>
            </div>
            <GhostBtn onClick={() => navigate("about")}>Meet the Team</GhostBtn>
          </Reveal>
          <StaggerContainer className="why-grid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:1, background:"var(--border)" }}>
            {[
              { icon:"bolt",        title:"Sub-Second Speed",   desc:"Every build is optimized for 95+ Lighthouse scores and sub-100ms interactions." },
              { icon:"ads_click",   title:"Direct Results",     desc:"Every decision is tied to a KPI. We don't ship features, we ship outcomes." },
              { icon:"shield",      title:"Enterprise Security", desc:"SOC-2 aligned architecture, encrypted at rest and in transit." },
              { icon:"groups",      title:"Senior Only",        desc:"No juniors on your project. You work directly with specialists, always." },
              { icon:"bar_chart",   title:"Full Visibility",    desc:"Real-time dashboards, weekly builds, and honest status updates throughout." },
            ].map(({ icon, title, desc }) => (
              <StaggerItem key={title}>
                <div className="card" style={{ padding:32, height:"100%", border:"none" }}>
                  <Icon name={icon} style={{ fontSize:28, color:"var(--lime)", display:"block", marginBottom:20 }} />
                  <h4 className="h3" style={{ fontSize:16, marginBottom:10 }}>{title}</h4>
                  <p className="body-sm" style={{ fontSize:13 }}>{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="section-photo px-section" style={{ backgroundImage:"url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop)", padding:"120px 40px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:64 }}>
            <SectionLabel>Client Feedback</SectionLabel>
            <h2 className="h2">Trusted by leaders.</h2>
          </Reveal>
          <StaggerContainer className="testimonials-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"var(--border)" }}>
            {[
              { q:"NexbeeLabs transformed our checkout. Conversions jumped 40% in the first month after launch.", name:"Arif Ahmed",    title:"CEO, Fintech Flow"        },
              { q:"The most professional engineering team I've worked with. Direct, honest, brutally effective.", name:"Tasnim Jahan", title:"Founder, LuxeRetail"      },
              { q:"Their attention to technical depth is unmatched. Our platform finally scaled without drama.",  name:"Sadia Rahman",  title:"CTO, HealthSync"          },
              { q:"They didn't just build what we asked — they built what we actually needed. Rare.",            name:"Nusrat Karim",  title:"Director, GreenTech"      },
              { q:"Industrial minimalism that packs a punch. Our brand now feels as premium as our product.",    name:"Rezwan Kabir",  title:"VP Design, Aura Labs"     },
              { q:"Zero fluff. Just high-end delivery. The only agency we trust with our core infrastructure.", name:"Imran Hossain", title:"Founder, Urban Logistics" },
            ].map(({ q, name, title }) => (
              <StaggerItem key={name}>
                <div className="testimonial-card" style={{ height:"100%" }}>
                  <Stars />
                  <p style={{ color:"var(--text)", lineHeight:1.7, marginBottom:24, fontStyle:"italic", fontSize:15 }}>"{q}"</p>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:"var(--text)", fontSize:14 }}>{name}</div>
                  <div style={{ fontSize:11, color:"var(--text3)", textTransform:"uppercase", letterSpacing:".08em", marginTop:4 }}>{title}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="px-section" style={{ background:"rgba(4,2,12,0.7)", borderTop:"1px solid var(--border)", padding:"120px 40px" }}>
        <div style={{ maxWidth:840, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:64 }}>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="h2">Frequently asked.</h2>
          </Reveal>
          {faqs.map(({ q, a }, i) => (
            <motion.div key={q} className="faq-item" initial={false}>
              <button
                onClick={() => setFaqOpen(faqOpen===i ? null : i)}
                style={{ width:"100%", textAlign:"left", background:"none", border:"none", padding:"24px 0", display:"flex", justifyContent:"space-between", alignItems:"center", gap:20 }}
              >
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(14px,2vw,18px)", fontWeight:600, color: faqOpen===i?"var(--lime)":"var(--text)", transition:"color .2s" }}>{q}</span>
                <motion.span animate={{ rotate: faqOpen===i ? 45 : 0 }} transition={{ duration:.25 }}>
                  <Icon name="add" style={{ color:"var(--lime)", fontSize:22, flexShrink:0 }} />
                </motion.span>
              </button>
              <div className={`faq-answer ${faqOpen===i?"open":""}`}>
                <p className="body-sm" style={{ paddingBottom:24, fontSize:15, lineHeight:1.8 }}>{a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ BOTTOM CTA ═══════════════════ */}
      <section className="px-section" style={{ padding:"0 40px 120px", maxWidth:1440, margin:"0 auto" }}>
        <Reveal>
          <motion.div
            style={{ background:"var(--lime)", padding:"clamp(48px,8vw,96px) clamp(32px,6vw,80px)", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", position:"relative", overflow:"hidden" }}
            animate={{ boxShadow:["0 0 40px rgba(204,255,0,.2)","0 0 80px rgba(204,255,0,.4)","0 0 40px rgba(204,255,0,.2)"] }}
            transition={{ repeat:Infinity, duration:3 }}
          >
            <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,.08)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:-60, left:-60, width:200, height:200, borderRadius:"50%", background:"rgba(0,0,0,.06)", pointerEvents:"none" }} />
            <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:"rgba(0,0,0,.5)", marginBottom:24 }}>Ready When You Are</p>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(40px,7vw,96px)", fontWeight:700, color:"#000", letterSpacing:"-.05em", lineHeight:.95, marginBottom:32 }}>
              Ready to<br />build?
            </h2>
            <p style={{ color:"rgba(0,0,0,.65)", fontSize:"clamp(15px,2vw,18px)", maxWidth:460, lineHeight:1.6, marginBottom:44 }}>
              Tell us about your next digital product. We'll come back with a clear technical opinion — free.
            </p>
            <motion.button
              className="lime-btn" style={{ background:"#000", color:"#fff", fontSize:16, padding:"18px 52px" }}
              onClick={() => navigate("contact")}
              whileHover={{ scale:1.05, boxShadow:"0 0 40px rgba(0,0,0,0.4)" }}
              whileTap={{ scale:.96 }}
            >
              Start a Project <Icon name="arrow_forward" style={{ fontSize:20 }} />
            </motion.button>
          </motion.div>
        </Reveal>
      </section>
    </div>
  );
}
