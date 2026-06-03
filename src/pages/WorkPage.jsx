import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon, SectionLabel, Reveal, StaggerContainer, StaggerItem, LimeBtn, GhostBtn, Badge } from "../components/UI";

const PROJECTS = [
  { num:"01", color:"#60a5fa", client:"Orbit",              title:"Real-Time SaaS Analytics Dashboard",    tag:"SaaS · Data",    filter:"SaaS",       result:"3× faster reporting",    desc:"Live data visualization for 50k+ concurrent users with Redis caching, PostgreSQL partitioning, and real-time WebSocket feeds.",                                                  stack:["Next.js","PostgreSQL","Redis"],       img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=700&fit=crop",   wide:false },
  { num:"02", color:"#c084fc", client:"Aura Labs",          title:"Complete Brand Identity System",        tag:"Branding",       filter:"Brand",      result:"Brand recognition +80%", desc:"Full rebrand: logo, typography system, motion guidelines, brand book, and an interactive component library for their design team.",                                               stack:["Figma","Motion","Print"],             img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=700&fit=crop",   wide:false },
  { num:"03", color:"#4ade80", client:"GreenTech",          title:"Sustainability Reporting Platform",      tag:"SaaS",           filter:"SaaS",       result:"60% time saved",         desc:"ESG data aggregation platform used by 40+ enterprise clients. Automated reporting workflows replaced 3 FTE of manual data work.",                                                  stack:["Python","PostgreSQL","Docker"],       img:"https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=900&h=700&fit=crop", wide:false },
  { num:"04", color:"#fb923c", client:"LuxeRetail",         title:"Luxury Brand E-Commerce Experience",    tag:"Commerce",       filter:"Commerce",   result:"$2M+ first-month GMV",   desc:"Premium headless Shopify storefront with AR try-on integration, curated editorial layouts, and an invite-only checkout flow.",                                                    stack:["Next.js","Shopify","Framer"],         img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&h=700&fit=crop", wide:false },
  { num:"05", color:"#fb7185", client:"Bistro Dhaka",       title:"Restaurant Brand & Booking System",     tag:"Restaurant",     filter:"Restaurant", result:"60% repeat visits",      desc:"Full digital presence for a premium Dhaka restaurant — online menu, live table reservation, and a loyalty program that drove 60% repeat visits within 3 months.",                stack:["Next.js","Node.js","Stripe"],         img:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=700&fit=crop", wide:false },
  { num:"06", color:"#38bdf8", client:"MediCare Plus",      title:"Healthcare Patient Portal",             tag:"Healthcare",     filter:"Healthcare", result:"10k+ active patients",   desc:"HIPAA-compliant patient management portal with appointment scheduling, teleconsultation, and secure medical record access serving 10,000+ active patients.",                       stack:["React","Node.js","PostgreSQL"],       img:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=700&fit=crop", wide:false },
  { num:"07", color:"#a78bfa", client:"SwiftNet ISP",       title:"Local ISP Management Platform",         tag:"ISP · SaaS",     filter:"Local ISP",  result:"35% churn reduction",    desc:"Customer self-service portal for a local ISP — billing automation, live usage tracking, and support ticketing reduced churn by 35%.",                                            stack:["React","Node.js","AWS"],              img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&h=900&fit=crop",  wide:true  },
  { num:"08", color:"#fbbf24", client:"LocalMart BD",       title:"Local Business Digital Presence",       tag:"Local Business", filter:"Local Business",result:"3× online orders",       desc:"End-to-end digital transformation for a multi-branch retailer — website, inventory management, and WhatsApp-integrated ordering that tripled online orders.",                     stack:["Next.js","Firebase","Stripe"],        img:"https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900&h=700&fit=crop",   wide:false },
  { num:"09", color:"#f472b6", client:"Lumière Beauty",     title:"Luxury Beauty Salon Platform",          tag:"Beauty",         filter:"Beauty",     result:"50% fewer no-shows",     desc:"Online booking, service catalog, and loyalty program for a premium salon chain. Automated reminders cut no-shows by 50% and lifted monthly revenue 38%.",                        stack:["Next.js","Stripe","Twilio"],          img:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&h=700&fit=crop", wide:false },
  { num:"10", color:"#86efac", client:"ShopZone BD",        title:"Multi-Vendor E-Commerce Platform",      tag:"Marketplace",    filter:"Marketplace",result:"4.2% conversion rate",   desc:"Scalable marketplace handling 500+ sellers and 20,000+ SKUs with a frictionless checkout flow that pushed site-wide conversion to 4.2%.",                                       stack:["Next.js","Node.js","PostgreSQL"],     img:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=900&fit=crop",wide:true  },
  { num:"11", color:"#94a3b8", client:"Vertex Corp",        title:"Corporate Business Website",            tag:"Corporate",      filter:"Business",   result:"3× inbound leads",       desc:"High-authority B2B corporate website — SEO-optimised architecture and conversion-tuned landing pages tripled inbound enquiries in 90 days.",                                     stack:["Next.js","Sanity CMS","Vercel"],      img:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=700&fit=crop", wide:false },
  { num:"12", color:"#fcd34d", client:"EduVision Institute",title:"Institutional Academic Portal",         tag:"Education",      filter:"Institutional",result:"5k+ students onboarded", desc:"Comprehensive academic portal for a private university — course management, student dashboard, online admissions, and faculty tools serving 5,000+ enrolled students.",             stack:["React","Node.js","PostgreSQL"],       img:"https://images.unsplash.com/photo-1562774053-701939374585?w=900&h=700&fit=crop",   wide:false },
  { num:"13", color:"#e879f9", client:"Aryan Malik",        title:"Creative Portfolio Website",            tag:"Portfolio",      filter:"Portfolio",  result:"3 F500 interviews",      desc:"Immersive personal portfolio with custom scroll animations, 3D project showcases, and a case study layout that landed 3 Fortune 500 interview invites within a week of launch.",  stack:["Next.js","Framer Motion","Vercel"],   img:"https://images.unsplash.com/photo-1545665277-5937489579f2?w=1400&h=900&fit=crop",  wide:true  },
  { num:"14", color:"#fdba74", client:"DhakaThreads Export",title:"RMG Export B2B Platform",              tag:"Garments · B2B", filter:"Garments B2B",result:"40+ intl. buyers",       desc:"B2B buyer portal for a Dhaka-based readymade garments exporter — product catalogue, sampling request system, and shipment tracking that onboarded 40+ international buyers.",   stack:["Next.js","Node.js","AWS"],            img:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&h=700&fit=crop",   wide:false },
  { num:"15", color:"#2dd4bf", client:"BashaBari BD",       title:"Dhaka Property Listing Platform",       tag:"Real Estate",    filter:"Real Estate",result:"4hr lead response",      desc:"Full-stack property listing and lead platform — location-based search, virtual tour embeds, and an agent CRM that cut lead response time from 48 hours to under 4.",             stack:["Next.js","PostgreSQL","Google Maps"], img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=700&fit=crop",   wide:false },
  { num:"16", color:"#CCFF00", client:"NexaStore",          title:"High-Performance E-Commerce Engine",    tag:"E-Commerce",     filter:"Commerce",   result:"45% conversion lift",    desc:"Headless commerce with sub-100ms interactions, global CDN edge caching, and a checkout flow that reduced abandonment by 32%.",                                                stack:["React","Node.js","AWS"],              img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=900&fit=crop",  wide:true  },
];

const FILTERS = ["All","Restaurant","Healthcare","Local ISP","Local Business","Beauty","Marketplace","Business","Institutional","Portfolio","Garments B2B","Real Estate","Brand","SaaS","Commerce"];

export default function WorkPage({ navigate }) {
  const [active, setActive] = useState("All");
  const [filterScroll, setFilterScroll] = useState({ left:0, max:0, ratio:1 });
  const filterRef = useRef(null);
  const filtered = active==="All" ? PROJECTS : PROJECTS.filter(p => p.filter===active);

  useEffect(() => {
    const el = filterRef.current;
    if (!el) return;
    setFilterScroll({ left:0, max: el.scrollWidth - el.clientWidth, ratio: el.clientWidth / el.scrollWidth });
  }, []);

  const onFilterScroll = () => {
    const el = filterRef.current;
    if (!el) return;
    setFilterScroll({ left: el.scrollLeft, max: el.scrollWidth - el.clientWidth, ratio: el.clientWidth / el.scrollWidth });
  };

  return (
    <div>
      {/* â•â•â• HERO â•â•â• */}
      <section style={{ position:"relative", overflow:"hidden", minHeight:"68vh", display:"flex", alignItems:"center" }}>

        {/* Background image */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=900&fit=crop)", backgroundSize:"cover", backgroundPosition:"center", zIndex:0 }} />

        {/* Layered dark overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(6,4,14,0.93) 0%, rgba(20,8,55,0.80) 55%, rgba(6,4,14,0.92) 100%)", zIndex:1 }} />

        {/* Subtle grid texture */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(204,255,0,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(204,255,0,.015) 1px,transparent 1px)", backgroundSize:"80px 80px", zIndex:2, pointerEvents:"none" }} />

        {/* Bottom fade */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:120, background:"linear-gradient(to bottom, transparent, var(--bg))", zIndex:3, pointerEvents:"none" }} />

        <div className="px-section" style={{ maxWidth:1440, margin:"0 auto", position:"relative", zIndex:4, padding:"clamp(64px,10vw,120px) clamp(20px,4vw,40px) clamp(56px,8vw,100px)", width:"100%" }}>
          <Reveal>
            <SectionLabel>Our Work</SectionLabel>
            <h1 className="h1" style={{ marginBottom:24, maxWidth:680 }}>Selected<br />projects.</h1>
            <p className="body-lg" style={{ maxWidth:520, marginBottom:44 }}>
              A showcase of high-performance digital products built with technical precision and deliberate aesthetic restraint.
            </p>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
              <LimeBtn onClick={() => navigate("contact")}>Start a Project <Icon name="arrow_forward" style={{ fontSize:17 }} /></LimeBtn>
              <GhostBtn onClick={() => navigate("services")}>Our Services</GhostBtn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* â•â•â• FILTERS â•â•â• */}
      <div style={{ position:"relative" }}>
        <div
          ref={filterRef}
          className="px-section filter-bar"
          onScroll={onFilterScroll}
          style={{ maxWidth:1440, margin:"0 auto", padding:"20px clamp(20px,4vw,40px)", display:"flex", gap:10, flexWrap:"nowrap", overflowX:"auto" }}
        >
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

        {/* Left fade */}
        <div style={{ position:"absolute", top:0, left:0, bottom:0, width:48, background:"linear-gradient(to right, rgba(4,2,12,0.9), transparent)", pointerEvents:"none", opacity: filterScroll.left > 4 ? 1 : 0, transition:"opacity .2s", zIndex:2 }} />
        {/* Right fade */}
        <div style={{ position:"absolute", top:0, right:0, bottom:0, width:48, background:"linear-gradient(to left, rgba(4,2,12,0.9), transparent)", pointerEvents:"none", opacity: filterScroll.max - filterScroll.left > 4 ? 1 : 0, transition:"opacity .2s", zIndex:2 }} />

        {/* Thumb scrollbar */}
        <div style={{ height:8, background:"rgba(255,255,255,0.06)", position:"relative", borderRadius:4 }}>
          <motion.div
            style={{ position:"absolute", top:2, bottom:2, background:"var(--lime)", borderRadius:3 }}
            animate={{
              width: `${Math.max(filterScroll.ratio * 100, 12)}%`,
              left:  `${filterScroll.max > 0 ? (filterScroll.left / filterScroll.max) * (100 - Math.max(filterScroll.ratio * 100, 12)) : 0}%`,
            }}
            transition={{ duration:.12, ease:"easeOut" }}
          />
        </div>
      </div>

      {/* â•â•â• GRID â•â•â• */}
      <div className="px-section" style={{ maxWidth:1440, margin:"0 auto", padding:"clamp(36px,5vw,64px) clamp(20px,4vw,40px) clamp(56px,8vw,100px)" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="work-grid"
            style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:3 }}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-20 }} transition={{ duration:.4, ease:[.2,.8,.2,1] }}
          >
            {filtered.map(({ num, color, client, title, tag, result, stack, img, wide }) => (
              <motion.div
                key={title}
                className="work-card"
                style={{ gridColumn: wide ? "1 / -1" : "span 1", position:"relative", overflow:"hidden", height: wide ? "clamp(300px,38vw,540px)" : "clamp(260px,30vw,440px)", cursor:"pointer" }}
                whileHover={{ y:-3 }}
                transition={{ type:"spring", stiffness:280, damping:22 }}
              >
                {/* Background image */}
                <div style={{ position:"absolute", inset:0 }}>
                  <img src={img} alt={title} className="work-img" style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .8s cubic-bezier(.2,.8,.2,1)" }} />
                </div>

                {/* Colour accent overlay — top-left corner */}
                <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 70% 60% at 0% 0%, ${color}28 0%, transparent 60%)`, zIndex:1 }} />

                {/* Dark vignette — bottom */}
                <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top, rgba(4,2,12,0.97) 0%, rgba(4,2,12,0.55) 40%, rgba(4,2,12,0.1) 100%)`, zIndex:1 }} />

                {/* Content */}
                <div style={{ position:"absolute", inset:0, padding: wide ? "36px 44px" : "28px 32px", display:"flex", flexDirection:"column", justifyContent:"space-between", zIndex:2 }}>

                  {/* Top row — number + tag */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:`${color}bb` }}>{num}</span>
                    <span style={{ background:`${color}1a`, border:`1px solid ${color}55`, color, padding:"5px 14px", fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em" }}>{tag}</span>
                  </div>

                  {/* Bottom row — client, title, meta */}
                  <div>
                    <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, color:`${color}cc`, textTransform:"uppercase", letterSpacing:".14em", marginBottom:10 }}>{client}</p>
                    <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize: wide ? "clamp(22px,2.8vw,40px)" : "clamp(17px,1.8vw,26px)", color:"var(--text)", letterSpacing:"-.03em", lineHeight:1.1, marginBottom:24 }}>{title}</h3>

                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:14 }}>
                      {/* Stack pills */}
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                        {stack.map(s => (
                          <span key={s} style={{ padding:"4px 11px", border:"1px solid rgba(255,255,255,0.14)", fontSize:9, color:"rgba(255,255,255,0.65)", fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:".1em" }}>{s}</span>
                        ))}
                      </div>

                      {/* Result */}
                      <div style={{ textAlign:"right" }}>
                        <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color, marginBottom:4 }}>Key Result</p>
                        <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize: wide ? 18 : 14, fontWeight:700, color:"var(--text)" }}>{result}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover colour border */}
                <motion.div
                  style={{ position:"absolute", inset:0, border:`2px solid ${color}`, opacity:0, zIndex:3, pointerEvents:"none" }}
                  whileHover={{ opacity:.55 }}
                  transition={{ duration:.25 }}
                />
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
