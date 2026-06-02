import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReveal, useCountUp } from "../hooks";
import { Icon, SectionLabel, Reveal, StaggerContainer, StaggerItem, LimeBtn, GhostBtn, Stars, Badge, TiltCard, GlassCard } from "../components/UI";

const FEATURED = [
  {
    client:"NexaStore", num:"01", tabLabel:"E-Commerce", title:"High-Performance E-Commerce", tag:"Web · Commerce",
    desc:"Headless commerce platform with sub-100ms interactions, global CDN, and a 45% lift in conversion rate after launch.",
    result:"45% conversion lift", stack:["React","Node.js","AWS"],
    img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=900&fit=crop", color:"rgba(204,255,0,0.08)",
  },
  {
    client:"Bistro Dhaka", num:"02", tabLabel:"Restaurant", title:"Restaurant Brand & Booking System", tag:"Web · Restaurant",
    desc:"Full digital presence for a premium Dhaka restaurant — online menu, live table reservation, and a loyalty program that drove 60% repeat visits within 3 months.",
    result:"60% repeat visits", stack:["Next.js","Node.js","Stripe"],
    img:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&h=900&fit=crop", color:"rgba(251,146,60,0.08)",
  },
  {
    client:"MediCare Plus", num:"03", tabLabel:"Healthcare", title:"Healthcare Patient Portal", tag:"Web · Healthcare",
    desc:"HIPAA-compliant patient management portal with appointment scheduling, teleconsultation, and secure medical record access serving 10,000+ active patients.",
    result:"10k+ active patients", stack:["React","Node.js","PostgreSQL"],
    img:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&h=900&fit=crop", color:"rgba(96,165,250,0.08)",
  },
  {
    client:"SwiftNet ISP", num:"04", tabLabel:"Local ISP", title:"Local ISP Management Platform", tag:"Web · ISP · SaaS",
    desc:"Customer self-service portal and backend management system for a local ISP — billing automation, live usage tracking, and support ticketing reduced churn by 35%.",
    result:"35% churn reduction", stack:["React","Node.js","AWS"],
    img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&h=900&fit=crop", color:"rgba(139,92,246,0.08)",
  },
  {
    client:"LocalMart BD", num:"05", tabLabel:"Local Business", title:"Local Business Digital Presence", tag:"Web · Local Business",
    desc:"End-to-end digital transformation for a multi-branch retailer — website, inventory management, and WhatsApp-integrated ordering that tripled online orders.",
    result:"3× online orders", stack:["Next.js","Firebase","Stripe"],
    img:"https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1400&h=900&fit=crop", color:"rgba(52,211,153,0.08)",
  },
  {
    client:"Lumière Beauty", num:"06", tabLabel:"Beauty Shop", title:"Luxury Beauty Salon Platform", tag:"Web · Beauty",
    desc:"Online booking, service catalog, and loyalty program for a premium salon chain. Automated reminders cut no-shows by 50% and lifted monthly revenue 38%.",
    result:"50% fewer no-shows", stack:["Next.js","Stripe","Twilio"],
    img:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&h=900&fit=crop", color:"rgba(244,114,182,0.08)",
  },
  {
    client:"ShopZone BD", num:"07", tabLabel:"Marketplace", title:"Multi-Vendor E-Commerce Platform", tag:"Web · Commerce",
    desc:"Scalable marketplace handling 500+ sellers and 20,000+ SKUs with a frictionless checkout flow that pushed site-wide conversion to 4.2%.",
    result:"4.2% conversion rate", stack:["Next.js","Node.js","PostgreSQL"],
    img:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=900&fit=crop", color:"rgba(204,255,0,0.08)",
  },
  {
    client:"Vertex Corp", num:"08", tabLabel:"Business", title:"Corporate Business Website", tag:"Web · Corporate",
    desc:"High-authority B2B corporate website with a lead-generation focus — SEO-optimised architecture and conversion-tuned landing pages tripled inbound enquiries in 90 days.",
    result:"3× inbound leads", stack:["Next.js","Sanity CMS","Vercel"],
    img:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=900&fit=crop", color:"rgba(148,163,184,0.08)",
  },
  {
    client:"EduVision Institute", num:"09", tabLabel:"Institutional", title:"Institutional Academic Portal", tag:"Web · Education",
    desc:"Comprehensive academic portal for a private university — course management, student dashboard, online admissions, and faculty tools serving 5,000+ enrolled students.",
    result:"5k+ students onboarded", stack:["React","Node.js","PostgreSQL"],
    img:"https://images.unsplash.com/photo-1562774053-701939374585?w=1400&h=900&fit=crop", color:"rgba(251,191,36,0.08)",
  },
  {
    client:"Aryan Malik", num:"10", tabLabel:"Portfolio", title:"Creative Portfolio Website", tag:"Web · Portfolio",
    desc:"Immersive personal portfolio for a senior product designer — custom scroll animations, 3D project showcases, and a case study layout that landed 3 Fortune 500 interview invites within a week of launch.",
    result:"3 F500 interviews in a week", stack:["Next.js","Framer Motion","Vercel"],
    img:"https://images.unsplash.com/photo-1545665277-5937489579f2?w=1400&h=900&fit=crop", color:"rgba(168,85,247,0.08)",
  },
  {
    client:"DhakaThreads Export", num:"11", tabLabel:"Garments B2B", title:"RMG Export B2B Platform", tag:"Web · Garments · B2B",
    desc:"B2B buyer portal for a Dhaka-based readymade garments exporter — product catalogue, sampling request system, and shipment tracking that onboarded 40+ international buyers within two months of launch.",
    result:"40+ international buyers", stack:["Next.js","Node.js","AWS"],
    img:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&h=900&fit=crop", color:"rgba(251,146,60,0.08)",
  },
  {
    client:"BashaBari BD", num:"12", tabLabel:"Real Estate", title:"Dhaka Property Listing Platform", tag:"Web · Real Estate",
    desc:"Full-stack property listing and lead platform for a Dhaka real estate firm — advanced location-based search, virtual tour embeds, and an agent CRM that cut lead response time from 48 hours to under 4.",
    result:"4hr lead response time", stack:["Next.js","PostgreSQL","Google Maps API"],
    img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&h=900&fit=crop", color:"rgba(52,211,153,0.08)",
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
  const heroY = useTransform(scrollYProgress, [0,1], [0, 80]);

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
      <section ref={heroRef} style={{ position:"relative", overflow:"hidden", minHeight:"100vh", display:"flex", alignItems:"center" }}>

        {/* Deep atmospheric background */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 130% 90% at 10% -5%, rgba(88,28,135,0.55) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 90% 105%, rgba(109,40,217,0.22) 0%, transparent 55%)", zIndex:0, pointerEvents:"none" }} />

        {/* Subtle grid */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(204,255,0,.018) 1px, transparent 1px),linear-gradient(90deg,rgba(204,255,0,.018) 1px,transparent 1px)", backgroundSize:"80px 80px", zIndex:1, pointerEvents:"none" }} />

        {/* Animated orbs */}
        <motion.div animate={{ x:[0,28,-18,0], y:[0,-18,28,0] }} transition={{ repeat:Infinity, duration:20, ease:"linear" }} style={{ position:"absolute", width:800, height:800, borderRadius:"50%", background:"radial-gradient(circle, rgba(88,28,135,0.25) 0%, transparent 70%)", top:"-25%", left:"-12%", zIndex:0, filter:"blur(70px)", pointerEvents:"none" }} />
        <motion.div animate={{ x:[0,-24,16,0], y:[0,16,-24,0] }} transition={{ repeat:Infinity, duration:15, ease:"linear" }} style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(204,255,0,0.05) 0%, transparent 70%)", bottom:"5%", right:"-8%", zIndex:0, filter:"blur(50px)", pointerEvents:"none" }} />

        {/* Parallax + fade wrapper */}
        <motion.div style={{ y: heroY, width:"100%", position:"relative", zIndex:2 }}>
          <div className="px-section" style={{ maxWidth:1440, margin:"0 auto", padding:"72px 40px 48px", width:"100%" }}>
            <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 440px", gap:60, alignItems:"center" }}>

              {/* LEFT — copy */}
              <div>
                {/* Agency tag */}
                <motion.div
                  initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
                  transition={{ duration:.6, ease:[.2,.8,.2,1] }}
                  style={{ display:"inline-flex", alignItems:"center", gap:12, marginBottom:24 }}
                >
                  <div style={{ width:28, height:1, background:"var(--lime)" }} />
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:".16em", color:"var(--lime)" }}>Digital Agency · Dhaka</span>
                </motion.div>

                {/* Mega headline — line-by-line clip reveal */}
                {[
                  { text:"WE BUILD",   color:"var(--text)",  gradient:false },
                  { text:"DIGITAL",    color:"",             gradient:true  },
                  { text:"PRODUCTS.",  color:"var(--text3)", gradient:false },
                ].map(({ text, color, gradient }, i) => (
                  <div key={text} style={{ overflow:"hidden", marginBottom: i < 2 ? 2 : 0 }}>
                    <motion.div
                      initial={{ y:"110%" }} animate={{ y:0 }}
                      transition={{ duration:.95, ease:[.16,1,.3,1], delay:.08 + i * .14 }}
                    >
                      <div style={{
                        fontFamily:"'Space Grotesk',sans-serif",
                        fontSize:"clamp(36px,5.2vw,78px)",
                        fontWeight:700, lineHeight:.9, letterSpacing:"-.04em",
                        color: gradient ? "transparent" : color,
                        background: gradient ? "linear-gradient(135deg, var(--lime) 0%, #88ffaa 100%)" : "none",
                        WebkitBackgroundClip: gradient ? "text" : "unset",
                        WebkitTextFillColor: gradient ? "transparent" : "unset",
                        backgroundClip: gradient ? "text" : "unset",
                      }}>{text}</div>
                    </motion.div>
                  </div>
                ))}

                {/* Animated divider */}
                <motion.div
                  initial={{ scaleX:0 }} animate={{ scaleX:1 }}
                  transition={{ duration:1, ease:[.2,.8,.2,1], delay:.56 }}
                  style={{ height:1, background:"linear-gradient(90deg, var(--border2) 0%, transparent 75%)", margin:"18px 0 16px", transformOrigin:"left" }}
                />

                <motion.p
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:.7, delay:.72, ease:[.2,.8,.2,1] }}
                  style={{ maxWidth:460, marginBottom:22, color:"var(--text2)", lineHeight:1.65, fontSize:"clamp(14px,1.2vw,15px)" }}
                >
                  High-performance engineering meets direct digital strategy. No fluff — just measurable results for leaders who demand more.
                </motion.p>

                <motion.div
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:.7, delay:.88, ease:[.2,.8,.2,1] }}
                  style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:28 }}
                >
                  <LimeBtn onClick={() => navigate("contact")}>Start a Project <Icon name="arrow_forward" style={{ fontSize:17 }} /></LimeBtn>
                  <GhostBtn onClick={() => navigate("work")}>View Our Work</GhostBtn>
                </motion.div>

                {/* Stats strip */}
                <motion.div
                  initial={{ opacity:0 }} animate={{ opacity:1 }}
                  transition={{ delay:1.05, duration:.8 }}
                  style={{ display:"flex", paddingTop:20, borderTop:"1px solid var(--border)" }}
                >
                  {[["7+","Years Active"],["140+","Projects"],["98%","Retention"],["24/7","Support"]].map(([n,l], i) => (
                    <div key={l} style={{ flex:1, paddingLeft:i===0?0:20, borderLeft:i===0?"none":"1px solid var(--border)" }}>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(18px,1.8vw,26px)", fontWeight:700, color:"var(--text)", letterSpacing:"-.03em", lineHeight:1 }}>{n}</div>
                      <div style={{ fontSize:9, color:"var(--text3)", fontFamily:"'Space Grotesk',sans-serif", textTransform:"uppercase", letterSpacing:".1em", marginTop:4 }}>{l}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT — premium project card */}
              <motion.div
                initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:1.1, delay:.38, ease:[.16,1,.3,1] }}
                style={{ position:"relative" }}
              >
                {/* Floating badge — top right */}
                <motion.div
                  animate={{ y:[0,-9,0] }} transition={{ repeat:Infinity, duration:3.5, ease:"easeInOut" }}
                  style={{ position:"absolute", top:-20, right:-14, zIndex:10, background:"var(--surface2)", border:"1px solid var(--border2)", padding:"10px 14px", display:"flex", alignItems:"center", gap:8, boxShadow:"0 16px 40px rgba(0,0,0,0.5)" }}
                >
                  <Icon name="trending_up" style={{ fontSize:20, color:"var(--lime)" }} />
                  <div>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:16, color:"var(--lime)", lineHeight:1 }}>+45%</div>
                    <div style={{ fontSize:8, color:"var(--text3)", textTransform:"uppercase", letterSpacing:".1em", marginTop:2 }}>Conv. Rate</div>
                  </div>
                </motion.div>

                <TiltCard>
                  <div style={{ position:"relative" }}>

                    {/* Browser chrome */}
                    <div style={{ background:"var(--surface2)", border:"1px solid var(--border2)", borderBottom:"none", padding:"10px 16px", display:"flex", alignItems:"center", gap:6 }}>
                      <div style={{ display:"flex", gap:5 }}>
                        {["rgba(255,95,87,.75)","rgba(254,188,46,.75)","rgba(40,200,64,.75)"].map(c => (
                          <div key={c} style={{ width:9, height:9, borderRadius:"50%", background:c }} />
                        ))}
                      </div>
                      <div style={{ flex:1, background:"var(--surface3)", height:18, borderRadius:3, marginLeft:6, display:"flex", alignItems:"center", paddingLeft:8, gap:5 }}>
                        <div style={{ width:8, height:8, borderRadius:"50%", border:"1px solid var(--border2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <div style={{ width:3, height:3, borderRadius:"50%", background:"var(--lime)" }} />
                        </div>
                        <span style={{ fontSize:9, color:"var(--text3)", fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".03em" }}>qraftdigital.com/orbit-analytics</span>
                      </div>
                      <div style={{ display:"flex", gap:4, alignItems:"center", marginLeft:8 }}>
                        <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--lime)", boxShadow:"0 0 6px var(--lime)", animation:"pulse 2s infinite" }} />
                        <span style={{ fontSize:9, color:"var(--lime)", fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, letterSpacing:".06em" }}>LIVE</span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ background:"var(--surface)", border:"1px solid var(--border2)", padding:18 }}>

                      {/* Project image */}
                      <div style={{ position:"relative", height:110, overflow:"hidden", marginBottom:14 }}>
                        <img
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop"
                          alt="Orbit Analytics"
                          style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(.6) saturate(1.3)" }}
                        />
                        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(88,28,135,0.45) 0%, transparent 55%), linear-gradient(to bottom, transparent 25%, var(--surface) 100%)" }} />
                        <div style={{ position:"absolute", bottom:12, left:14 }}>
                          <div style={{ fontSize:9, color:"rgba(204,255,0,.65)", fontFamily:"'Space Grotesk',sans-serif", textTransform:"uppercase", letterSpacing:".12em", marginBottom:3 }}>Active Project</div>
                          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:15, color:"var(--text)", lineHeight:1 }}>Orbit Analytics</div>
                        </div>
                        <div style={{ position:"absolute", top:10, right:10, background:"var(--lime)", padding:"3px 9px" }}>
                          <span style={{ fontSize:8, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"#000" }}>Live</span>
                        </div>
                      </div>

                      {/* 2×2 metrics */}
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:14 }}>
                        {[
                          { label:"Performance", val:"98",   note:"/100", color:"var(--lime)" },
                          { label:"SEO Score",   val:"100",  note:"/100", color:"#4ade80" },
                          { label:"Uptime",      val:"99.9", note:"%",    color:"#60a5fa" },
                          { label:"Load Time",   val:"0.8",  note:"s",    color:"var(--text2)" },
                        ].map(({ label, val, note, color }) => (
                          <div key={label} style={{ background:"var(--surface2)", border:"1px solid var(--border)", padding:"8px 10px" }}>
                            <div style={{ fontSize:8, color:"var(--text3)", fontFamily:"'Space Grotesk',sans-serif", textTransform:"uppercase", letterSpacing:".1em", marginBottom:4 }}>{label}</div>
                            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:17, color, lineHeight:1 }}>
                              {val}<span style={{ fontSize:9, opacity:.6, fontWeight:500 }}>{note}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Build log */}
                      <div style={{ borderTop:"1px solid var(--border)", paddingTop:10 }}>
                        <div style={{ fontSize:9, fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, textTransform:"uppercase", letterSpacing:".12em", color:"var(--text3)", marginBottom:8 }}>Build Log</div>
                        {[
                          { text:"Deploy successful · production", ping:true,  time:"2s ago" },
                          { text:"Lighthouse audit · 98/100",      ping:true,  time:"1m ago" },
                          { text:"CDN cache · 14 edge regions",    ping:false, time:"4m ago" },
                        ].map(({ text, ping, time }) => (
                          <div key={text} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:7 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                              <div style={{ position:"relative", width:7, height:7, flexShrink:0 }}>
                                <div style={{ width:7, height:7, borderRadius:"50%", background:ping?"var(--lime)":"var(--border)" }} />
                                {ping && <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"var(--lime)", animation:"ping 1.5s infinite" }} />}
                              </div>
                              <span style={{ fontSize:10, color:ping?"var(--text2)":"var(--text3)" }}>{text}</span>
                            </div>
                            <span style={{ fontSize:9, color:"var(--text3)", fontFamily:"'Space Grotesk',sans-serif", flexShrink:0, marginLeft:8 }}>{time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Depth shadow layer */}
                    <div style={{ position:"absolute", bottom:-10, right:-10, left:10, top:10, background:"var(--surface2)", border:"1px solid var(--border)", zIndex:-1 }} />
                  </div>
                </TiltCard>

                {/* Floating badge — bottom left */}
                <motion.div
                  animate={{ y:[0,9,0] }} transition={{ repeat:Infinity, duration:4, ease:"easeInOut", delay:1.5 }}
                  style={{ position:"absolute", bottom:-16, left:-16, zIndex:10, background:"var(--lime)", padding:"8px 14px", display:"flex", alignItems:"center", gap:6, boxShadow:"0 12px 30px rgba(204,255,0,0.25)" }}
                >
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"#000", flexShrink:0 }} />
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:11, color:"#000", textTransform:"uppercase", letterSpacing:".08em" }}>140+ Projects Shipped</span>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </motion.div>

      </section>

      {/* ═══════════════════ STATS BAR ═══════════════════ */}
      <div ref={statsRef} style={{ position:"relative", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", overflow:"hidden" }}>

        {/* Full-width lime top edge */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg, transparent 0%, var(--lime) 25%, rgba(136,255,170,0.7) 50%, var(--lime) 75%, transparent 100%)", zIndex:2 }} />

        {/* Background */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(10,6,22,0.98) 0%, rgba(6,4,14,0.95) 100%)" }} />

        <StaggerContainer style={{ maxWidth:1440, margin:"0 auto", padding:"0 40px", display:"grid", gridTemplateColumns:"repeat(4,1fr)", position:"relative", zIndex:1 }}>
          {[
            { num:c1,     suffix:"+",  label:"Projects Shipped", sub:"End-to-end delivered",         icon:"rocket_launch", color:"var(--lime)" },
            { num:c2,     suffix:"%",  label:"Lighthouse Avg",   sub:"Across all production builds",  icon:"speed",         color:"#86efac"     },
            { num:c3,     suffix:"ms", label:"Avg API Latency",  sub:"P95 server response time",      icon:"bolt",          color:"#93c5fd"     },
            { num:"24/7", suffix:"",   label:"System Uptime",    sub:"Monitored infrastructure",      icon:"shield",        color:"var(--lime)" },
          ].map(({ num, suffix, label, sub, icon, color }, i) => (
            <StaggerItem key={label}>
              <motion.div
                whileHover={{ background:"rgba(255,255,255,0.025)" }}
                transition={{ duration:.25 }}
                style={{ padding:"52px 36px", borderRight: i < 3 ? "1px solid var(--border)" : "none", position:"relative", height:"100%" }}
              >
                {/* Per-column top accent */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${color} 0%, transparent 65%)`, opacity:.75 }} />

                {/* Icon */}
                <Icon name={icon} style={{ fontSize:22, color, display:"block", marginBottom:20, opacity:.9 }} />

                {/* Number + suffix */}
                <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:12 }}>
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(40px,4vw,64px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1, color:"var(--text)" }}>{num}</span>
                  {suffix && <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(18px,1.8vw,26px)", fontWeight:700, letterSpacing:"-.02em", lineHeight:1, color }}>{suffix}</span>}
                </div>

                {/* Label */}
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"var(--text)", marginBottom:8 }}>{label}</div>

                {/* Context */}
                <div style={{ fontSize:13, color:"var(--text3)", lineHeight:1.55 }}>{sub}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* ═══════════════════ SERVICES ═══════════════════ */}
      <section className="section-grad px-section" style={{ padding:"clamp(64px,10vw,120px) clamp(20px,4vw,40px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:64, textAlign:"center" }}>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="h2" style={{ maxWidth:600, margin:"0 auto 16px" }}>Everything your digital product needs</h2>
            <p className="body-lg" style={{ maxWidth:480, margin:"0 auto" }}>Specialized services focused on conversion, performance, and engineering excellence.</p>
          </Reveal>
          <StaggerContainer className="services-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"transparent" }}>
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
      <section className="section-photo px-section" style={{ backgroundImage:"url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=1080&fit=crop)", padding:"clamp(64px,10vw,120px) clamp(20px,4vw,40px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:64 }}>
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="h2">Projects that define us.</h2>
          </Reveal>

          {/* Tab selector */}
          <div className="featured-tabs" style={{ display:"flex", gap:1, background:"var(--border)", marginBottom:2, overflowX:"auto" }}>
            {FEATURED.map((p, i) => (
              <motion.button
                key={i}
                className="featured-tab"
                onClick={() => setActiveProject(i)}
                style={{ flex:1, padding:"14px 28px", background: activeProject===i ? "var(--lime)" : "var(--surface)", border:"none", fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".06em", color: activeProject===i ? "#000" : "var(--text3)", whiteSpace:"nowrap" }}
                whileHover={{ background: activeProject===i ? "var(--lime)" : "var(--surface2)" }}
                transition={{ duration:.2 }}
              >
                {p.tabLabel}
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
      <section className="px-section" style={{ background:"rgba(4,2,12,0.8)", borderTop:"1px solid var(--border)", padding:"clamp(64px,10vw,120px) clamp(20px,4vw,40px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:72 }}>
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="h2">From zero to live.<br />Every single time.</h2>
          </Reveal>
          <StaggerContainer className="how-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"transparent" }}>
            {HOW_WE_WORK.map(({ n, icon, title, desc }) => (
              <StaggerItem key={n}>
                <GlassCard style={{ padding:0, height:"100%", position:"relative", overflow:"hidden", background:"linear-gradient(145deg, rgba(60,20,120,0.28) 0%, rgba(12,8,26,0.97) 60%, rgba(6,4,14,1) 100%)" }}>

                  {/* Top lime accent */}
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, var(--lime) 0%, transparent 70%)", zIndex:2 }} />

                  {/* Watermark step number */}
                  <div style={{ position:"absolute", bottom:-16, right:-8, fontFamily:"'Space Grotesk',sans-serif", fontSize:148, fontWeight:700, letterSpacing:"-.06em", lineHeight:1, background:"linear-gradient(135deg, rgba(204,255,0,0.35) 0%, rgba(109,40,217,0.25) 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", pointerEvents:"none", userSelect:"none", zIndex:0 }}>{n}</div>

                  <div style={{ padding:40, position:"relative", zIndex:1 }}>

                    {/* Icon left · Step badge right */}
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
                      <div style={{ width:50, height:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(204,255,0,0.06)", border:"1px solid rgba(204,255,0,0.14)" }}>
                        <Icon name={icon} style={{ fontSize:26, color:"var(--lime)" }} />
                      </div>
                      <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(204,255,0,0.07)", border:"1px solid rgba(204,255,0,0.14)", padding:"5px 12px" }}>
                        <div style={{ width:5, height:5, borderRadius:"50%", background:"var(--lime)", flexShrink:0 }} />
                        <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".16em", color:"var(--lime)" }}>Step {n}</span>
                      </div>
                    </div>

                    <h3 className="h3" style={{ marginBottom:14, fontSize:18 }}>{title}</h3>
                    <p className="body-sm">{desc}</p>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════ WHY US ═══════════════════ */}
      <section className="section-grad px-section" style={{ padding:"clamp(64px,10vw,120px) clamp(20px,4vw,40px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:64, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:24 }}>
            <div>
              <SectionLabel>Why Qraft Digital</SectionLabel>
              <h2 className="h2">Built different.<br />Delivers different.</h2>
            </div>
            <GhostBtn onClick={() => navigate("about")}>Meet the Team</GhostBtn>
          </Reveal>
          <StaggerContainer className="why-grid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:1, background:"transparent" }}>
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
      <section className="section-photo px-section" style={{ backgroundImage:"url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop)", padding:"clamp(64px,10vw,120px) clamp(20px,4vw,40px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:64 }}>
            <SectionLabel>Client Feedback</SectionLabel>
            <h2 className="h2">Trusted by leaders.</h2>
          </Reveal>
          <StaggerContainer className="testimonials-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"transparent" }}>
            {[
              { q:"Qraft Digital transformed our checkout. Conversions jumped 40% in the first month after launch.", name:"Arif Ahmed",    title:"CEO, Fintech Flow"        },
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
      <section className="px-section" style={{ background:"rgba(4,2,12,0.7)", borderTop:"1px solid var(--border)", padding:"clamp(64px,10vw,120px) clamp(20px,4vw,40px)" }}>
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
