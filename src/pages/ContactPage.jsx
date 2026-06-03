import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon, SectionLabel, Reveal, StaggerContainer, StaggerItem, GlassCard, LimeBtn, GhostBtn } from "../components/UI";

const FORMSPREE_CONTACT = "xdajqjlb";
const FORMSPREE_BOOKING = "mgoqgqno";

const SERVICES = [
  { id:"web",      icon:"web",          label:"Web Development"  },
  { id:"brand",    icon:"palette",      label:"Brand Identity"   },
  { id:"ecom",     icon:"shopping_cart",label:"E-Commerce"       },
  { id:"mobile",   icon:"phone_iphone", label:"Mobile App"       },
  { id:"software", icon:"code",         label:"Custom Software"  },
  { id:"seo",      icon:"trending_up",  label:"SEO & Growth"     },
];

const STEPS = ["Your Details", "Services", "Project Brief"];

const slideVariants = {
  enter: (dir) => ({ opacity:0, x: dir > 0 ? 40 : -40 }),
  center: { opacity:1, x:0 },
  exit:  (dir) => ({ opacity:0, x: dir > 0 ? -40 : 40 }),
};

/* Underline-style input */
const LineField = ({ label, children }) => (
  <div style={{ position:"relative", marginBottom:28 }}>
    {children}
    <label style={{ position:"absolute", top:0, left:0, fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:"var(--lime)" }}>
      {label}
    </label>
  </div>
);

const TIME_SLOTS = ["9:00 AM","10:00 AM","11:00 AM","2:00 PM","3:00 PM","4:00 PM"];

export default function ContactPage({ navigate }) {
  const [step, setStep]         = useState(1);
  const [dir,  setDir]          = useState(1);
  const [form, setForm]         = useState({ name:"", email:"", company:"", services:[], message:"" });
  const [sent, setSent]         = useState(false);
  const [sending, setSending]   = useState(false);
  const [error, setError]       = useState(null);

  /* Booking form state */
  const [book, setBook]           = useState({ name:"", email:"", date:"", time:"", topic:"" });
  const [bookSent, setBookSent]   = useState(false);
  const [bookSending, setBookSending] = useState(false);
  const [bookError, setBookError] = useState(null);
  const setB = (k) => (e) => setBook(p => ({ ...p, [k]: e.target.value }));

  const submitBook = async (e) => {
    e.preventDefault();
    setBookSending(true); setBookError(null);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_BOOKING}`, {
        method:"POST",
        headers:{ "Content-Type":"application/json", Accept:"application/json" },
        body: JSON.stringify({ _type:"meeting_request", ...book }),
      });
      if (res.ok) setBookSent(true);
      else { const d = await res.json(); setBookError(d?.errors?.[0]?.message || "Something went wrong."); }
    } catch { setBookError("Network error — please try again."); }
    finally { setBookSending(false); }
  };

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  const toggleService = (id) => setForm(p => ({
    ...p,
    services: p.services.includes(id) ? p.services.filter(s => s !== id) : [...p.services, id],
  }));

  const goTo = (n) => { setDir(n > step ? 1 : -1); setStep(n); };

  const canNext = () => {
    if (step === 1) return form.name.trim() && form.email.trim();
    if (step === 2) return form.services.length > 0;
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    setSending(true); setError(null);
    try {
      const payload = { ...form, services: form.services.join(", ") };
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_CONTACT}`, {
        method:"POST",
        headers:{ "Content-Type":"application/json", Accept:"application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) setSent(true);
      else { const d = await res.json(); setError(d?.errors?.[0]?.message || "Something went wrong."); }
    } catch { setError("Network error — please try again."); }
    finally { setSending(false); }
  };

  const inputStyle = {
    width:"100%", background:"transparent", border:"none",
    borderBottom:"1px solid rgba(255,255,255,0.1)",
    color:"var(--text)", fontSize:15, fontFamily:"'Work Sans',sans-serif",
    padding:"28px 0 10px", outline:"none",
    transition:"border-color .25s",
  };

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="contact-hero" style={{ position:"relative", overflow:"hidden", minHeight:"calc(100vh - 76px)", display:"flex", alignItems:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1920&h=900&fit=crop)", backgroundSize:"cover", backgroundPosition:"center", zIndex:0 }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(6,4,14,0.96) 0%, rgba(30,10,70,0.85) 50%, rgba(6,4,14,0.93) 100%)", zIndex:1 }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(204,255,0,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(204,255,0,.015) 1px,transparent 1px)", backgroundSize:"80px 80px", zIndex:2, pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:140, background:"linear-gradient(to bottom, transparent, var(--bg))", zIndex:3, pointerEvents:"none" }} />

        <div className="px-section" style={{ maxWidth:1440, margin:"0 auto", position:"relative", zIndex:4, padding:"clamp(16px,2.5vw,32px) clamp(20px,4vw,40px)", width:"100%" }}>
          <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(24px,4vw,56px)", alignItems:"center" }}>

            {/* Left: text */}
            <Reveal>
              <SectionLabel>Contact</SectionLabel>
              <h1 className="h1" style={{ marginBottom:16 }}>Let's build<br />something real.</h1>
              <p className="body-lg" style={{ maxWidth:480, marginBottom:28 }}>
                We partner with ambitious companies to engineer high-performance digital products. One conversation can change the trajectory of your product.
              </p>
              <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                <LimeBtn onClick={() => navigate("work")}>View Our Work <Icon name="arrow_forward" style={{ fontSize:17 }} /></LimeBtn>
                <GhostBtn onClick={() => navigate("services")}>Our Services</GhostBtn>
              </div>

              {/* Trust signals */}
              <div style={{ display:"flex", gap:24, marginTop:28, flexWrap:"wrap" }}>
                {[["bolt","Responds in 24h"],["shield","No commitment"],["language","20+ countries"]].map(([icon, label]) => (
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <Icon name={icon} style={{ fontSize:16, color:"var(--lime)" }} />
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, color:"var(--text3)", letterSpacing:".04em" }}>{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: booking card */}
            <Reveal delay={0.18}>
              <div style={{
                background:"linear-gradient(160deg, rgba(30,14,72,0.72) 0%, rgba(14,8,36,0.9) 45%, rgba(6,4,16,0.97) 100%)",
                backdropFilter:"blur(48px)", WebkitBackdropFilter:"blur(48px)",
                border:"1px solid rgba(255,255,255,0.09)",
                boxShadow:"0 32px 80px rgba(0,0,0,0.55), -8px 0 48px rgba(88,28,135,0.15), 0 0 0 1px rgba(255,255,255,0.03)",
                position:"relative", overflow:"hidden",
              }}>
                {/* Top shimmer */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 30%, rgba(204,255,0,0.55) 55%, rgba(255,255,255,0.08) 75%, transparent 100%)" }} />
                {/* Orbs */}
                <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%)", pointerEvents:"none" }} />
                <div style={{ position:"absolute", bottom:-40, left:-40, width:160, height:160, borderRadius:"50%", background:"radial-gradient(circle, rgba(204,255,0,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />

                <AnimatePresence mode="wait">
                  {bookSent ? (
                    <motion.div
                      key="book-success"
                      initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }}
                      style={{ padding:"48px 36px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:16, position:"relative", zIndex:2 }}
                    >
                      <motion.div animate={{ scale:[1,1.15,1] }} transition={{ duration:.5, delay:.1 }}>
                        <Icon name="event_available" style={{ fontSize:56, color:"var(--lime)" }} />
                      </motion.div>
                      <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:22, fontWeight:700, color:"var(--text)", letterSpacing:"-.03em" }}>Request Received!</h3>
                      <p style={{ color:"var(--text2)", fontSize:13, lineHeight:1.8, maxWidth:280 }}>We'll confirm your meeting slot via email within a few hours.</p>
                      <motion.button
                        onClick={() => setBookSent(false)}
                        whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}
                        style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:"var(--lime)", background:"rgba(204,255,0,0.07)", border:"1px solid rgba(204,255,0,0.22)", padding:"10px 28px", marginTop:8 }}
                      >
                        Book Another
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div key="book-form" initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ position:"relative", zIndex:2 }}>

                      {/* Card header */}
                      <div className="booking-card-header" style={{ padding:"28px 32px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:6 }}>
                          <div style={{ width:40, height:40, background:"linear-gradient(135deg, rgba(204,255,0,0.15), rgba(109,40,217,0.15))", border:"1px solid rgba(204,255,0,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <Icon name="calendar_month" style={{ fontSize:20, color:"var(--lime)" }} />
                          </div>
                          <div>
                            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:700, color:"var(--text)", letterSpacing:"-.03em" }}>Book a Meeting</h3>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:3 }}>
                              <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ repeat:Infinity, duration:2 }} style={{ width:6, height:6, borderRadius:"50%", background:"var(--lime)", display:"block" }} />
                              <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"rgba(204,255,0,0.65)" }}>30-min discovery call</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Form */}
                      <form onSubmit={submitBook} className="booking-card-form" style={{ padding:"24px 32px 32px" }}>
                        {/* Name + Email row */}
                        <div className="booking-name-email" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
                          <div style={{ position:"relative" }}>
                            <label style={{ display:"block", fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:"var(--lime)", marginBottom:6 }}>Name *</label>
                            <input
                              type="text" value={book.name} onChange={setB("name")} required placeholder="Your name"
                              style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"var(--text)", fontSize:13, fontFamily:"'Work Sans',sans-serif", padding:"10px 12px", outline:"none", transition:"border-color .2s", boxSizing:"border-box" }}
                              onFocus={e => e.target.style.borderColor = "rgba(204,255,0,0.4)"}
                              onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                            />
                          </div>
                          <div>
                            <label style={{ display:"block", fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:"var(--lime)", marginBottom:6 }}>Email *</label>
                            <input
                              type="email" value={book.email} onChange={setB("email")} required placeholder="you@company.com"
                              style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"var(--text)", fontSize:13, fontFamily:"'Work Sans',sans-serif", padding:"10px 12px", outline:"none", transition:"border-color .2s", boxSizing:"border-box" }}
                              onFocus={e => e.target.style.borderColor = "rgba(204,255,0,0.4)"}
                              onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                            />
                          </div>
                        </div>

                        {/* Date */}
                        <div style={{ marginBottom:20 }}>
                          <label style={{ display:"block", fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:"var(--lime)", marginBottom:6 }}>Preferred Date *</label>
                          <input
                            type="date" value={book.date} onChange={setB("date")} required
                            min={new Date().toISOString().split("T")[0]}
                            style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"var(--text)", fontSize:13, fontFamily:"'Work Sans',sans-serif", padding:"10px 12px", outline:"none", transition:"border-color .2s", boxSizing:"border-box", colorScheme:"dark" }}
                            onFocus={e => e.target.style.borderColor = "rgba(204,255,0,0.4)"}
                            onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                          />
                        </div>

                        {/* Time slots */}
                        <div style={{ marginBottom:20 }}>
                          <label style={{ display:"block", fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:"var(--lime)", marginBottom:10 }}>Preferred Time *</label>
                          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:8 }}>
                            {TIME_SLOTS.map(slot => (
                              <motion.button
                                key={slot} type="button"
                                onClick={() => setBook(p => ({ ...p, time: slot }))}
                                animate={{
                                  background: book.time === slot ? "rgba(204,255,0,0.12)" : "rgba(255,255,255,0.03)",
                                  borderColor: book.time === slot ? "rgba(204,255,0,0.45)" : "rgba(255,255,255,0.07)",
                                  color: book.time === slot ? "var(--lime)" : "var(--text3)",
                                }}
                                whileHover={{ background:"rgba(255,255,255,0.07)" }}
                                whileTap={{ scale:.95 }}
                                style={{ border:"1px solid", padding:"8px 0", fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:600, cursor:"pointer", transition:"color .15s" }}
                                transition={{ duration:.15 }}
                              >
                                {slot}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Topic */}
                        <div style={{ marginBottom:20 }}>
                          <label style={{ display:"block", fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:"var(--lime)", marginBottom:6 }}>What's it about? <span style={{ color:"var(--text3)", fontWeight:400, textTransform:"none", letterSpacing:0 }}>(optional)</span></label>
                          <textarea
                            rows={2} value={book.topic} onChange={setB("topic")} placeholder="Brief context about your project or question…"
                            style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"var(--text)", fontSize:13, fontFamily:"'Work Sans',sans-serif", padding:"10px 12px", outline:"none", transition:"border-color .2s", resize:"none", lineHeight:1.6, boxSizing:"border-box" }}
                            onFocus={e => e.target.style.borderColor = "rgba(204,255,0,0.4)"}
                            onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                          />
                        </div>

                        {bookError && (
                          <div style={{ background:"rgba(255,60,60,.07)", border:"1px solid rgba(255,60,60,.22)", color:"#ff7b7b", padding:"10px 12px", marginBottom:16, fontSize:12, display:"flex", alignItems:"center", gap:8 }}>
                            <Icon name="error_outline" style={{ fontSize:14, flexShrink:0 }} />{bookError}
                          </div>
                        )}

                        <motion.button
                          type="submit" disabled={bookSending || !book.name || !book.email || !book.date || !book.time}
                          style={{
                            width:"100%", padding:"14px 0", fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:11,
                            textTransform:"uppercase", letterSpacing:".14em",
                            background: (!book.name || !book.email || !book.date || !book.time) ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #CCFF00, #aadd00)",
                            color: (!book.name || !book.email || !book.date || !book.time) ? "var(--text3)" : "#000",
                            border:"none", cursor: (!book.name || !book.email || !book.date || !book.time) ? "not-allowed" : "pointer",
                            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                            opacity: bookSending ? .7 : 1,
                            transition:"background .25s, color .25s",
                          }}
                          whileHover={book.name && book.email && book.date && book.time && !bookSending ? { scale:1.02, boxShadow:"0 8px 28px rgba(204,255,0,0.3)" } : {}}
                          whileTap={book.name && book.email && book.date && book.time && !bookSending ? { scale:.97 } : {}}
                        >
                          {bookSending ? (
                            <>
                              <motion.span animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:.7, ease:"linear" }} style={{ display:"inline-block", width:13, height:13, border:"2px solid #000", borderTopColor:"transparent", borderRadius:"50%" }} />
                              Sending…
                            </>
                          ) : (
                            <><Icon name="calendar_month" style={{ fontSize:15 }} /> Request Meeting</>
                          )}
                        </motion.button>

                        <p style={{ textAlign:"center", marginTop:12, fontSize:10, color:"rgba(255,255,255,0.2)", fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".06em", textTransform:"uppercase" }}>
                          We'll confirm via email within a few hours
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ═══ MAIN ═══ */}
      <section className="px-section" style={{ maxWidth:1440, margin:"0 auto", padding:"clamp(48px,6vw,80px) clamp(20px,4vw,40px) clamp(64px,10vw,120px)" }}>
        <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"5fr 7fr", gap:80 }}>

          {/* ── Left info panel ── */}
          <div>
            <Reveal>
              <div style={{ background:"var(--surface)", border:"1px solid var(--border)", padding:40, marginBottom:24 }}>
                <h2 className="h3" style={{ fontSize:24, marginBottom:12 }}>Get in touch</h2>
                <p className="body-sm" style={{ marginBottom:32, fontSize:15, lineHeight:1.8 }}>
                  Whether you have a fully scoped RFP or just a spark of an idea, we're ready to provide real technical insight and strategic direction — no sales pitch.
                </p>
                <StaggerContainer>
                  {[
                    { icon:"location_on", label:"Location",      val:"Dhaka, Bangladesh"           },
                    { icon:"mail",        label:"Email",         val:"hello@qraftdigital.com"       },
                    { icon:"schedule",    label:"Working Hours", val:"Mon – Fri · 9:00–18:00 BST"  },
                    { icon:"bolt",        label:"Response Time", val:"Within 12–24 hours"           },
                    { icon:"language",    label:"We Serve",      val:"Clients in 20+ countries"     },
                  ].map(({ icon, label, val }) => (
                    <StaggerItem key={label}>
                      <div style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:22 }}>
                        <Icon name={icon} style={{ color:"var(--lime)", fontSize:20, flexShrink:0, marginTop:2 }} />
                        <div>
                          <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"var(--lime)", marginBottom:3 }}>{label}</p>
                          <p style={{ color:"var(--text)", fontSize:14 }}>{val}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              <motion.div
                style={{ background:"var(--lime)", padding:32, position:"relative", overflow:"hidden" }}
                animate={{ boxShadow:["0 0 20px rgba(204,255,0,.15)","0 0 40px rgba(204,255,0,.3)","0 0 20px rgba(204,255,0,.15)"] }}
                transition={{ repeat:Infinity, duration:3 }}
              >
                <div style={{ position:"absolute", right:-30, top:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,.1)" }} />
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:700, color:"#000", marginBottom:24, textTransform:"uppercase", letterSpacing:"-.01em", position:"relative", zIndex:1 }}>What happens next</h3>
                {["We review your brief within 24 hours","Discovery call to scope the engagement","Technical proposal + timeline in 3 days","Project kickoff and sprint planning"].map((step, i) => (
                  <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom: i<3?18:0, position:"relative", zIndex:1 }}>
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, color:"rgba(0,0,0,.4)", minWidth:22, marginTop:1 }}>0{i+1}</span>
                    <p style={{ fontSize:14, color:"#000", lineHeight:1.5 }}>{step}</p>
                  </div>
                ))}
              </motion.div>
            </Reveal>
          </div>

          {/* ── Right: Premium multi-step form ── */}
          <Reveal delay={0.15}>
            <>
            {/* Form heading — mobile only */}
            <div className="contact-form-heading" style={{ marginBottom:32 }}>
              <SectionLabel>Send a Message</SectionLabel>
              <h2 className="h2" style={{ fontSize:"clamp(26px,3vw,38px)", marginBottom:12, letterSpacing:"-.03em" }}>
                Tell us about<br />your project.
              </h2>
              <p style={{ fontSize:14, color:"var(--text2)", lineHeight:1.75, maxWidth:460 }}>
                Fill in the brief below and we'll come back to you within 24 hours with a tailored plan — no fluff, no obligation.
              </p>
            </div>
            {sent ? (
              /* Success state */
              <motion.div
                initial={{ scale:.9, opacity:0 }} animate={{ scale:1, opacity:1 }}
                style={{
                  background:"linear-gradient(160deg, rgba(20,10,60,0.7) 0%, rgba(8,5,20,0.95) 100%)",
                  backdropFilter:"blur(40px)", WebkitBackdropFilter:"blur(40px)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  boxShadow:"0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(204,255,0,0.1)",
                  padding:64, textAlign:"center", display:"flex", flexDirection:"column",
                  alignItems:"center", justifyContent:"center", minHeight:520, position:"relative", overflow:"hidden",
                }}
              >
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, transparent, var(--lime) 50%, transparent)" }} />
                <div style={{ position:"absolute", top:-60, left:"50%", transform:"translateX(-50%)", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(204,255,0,0.08) 0%, transparent 70%)", pointerEvents:"none" }} />
                <motion.div animate={{ scale:[1,1.1,1], rotate:[0,10,-10,0] }} transition={{ duration:.6, delay:.2 }}>
                  <Icon name="check_circle" style={{ color:"var(--lime)", fontSize:72, marginBottom:24 }} />
                </motion.div>
                <h3 className="h3" style={{ fontSize:32, marginBottom:12 }}>Message Sent.</h3>
                <p className="body-sm" style={{ fontSize:16, lineHeight:1.7 }}>We'll be in touch within 24 hours. Keep an eye on your inbox.</p>
              </motion.div>
            ) : (
              /* Multi-step form card */
              <div style={{
                background:"linear-gradient(160deg, rgba(20,10,60,0.65) 0%, rgba(12,7,32,0.88) 40%, rgba(6,4,16,0.96) 100%)",
                backdropFilter:"blur(40px)", WebkitBackdropFilter:"blur(40px)",
                border:"1px solid rgba(255,255,255,0.08)",
                boxShadow:"0 40px 100px rgba(0,0,0,0.5), -12px 0 60px rgba(88,28,135,0.1), 0 0 0 1px rgba(255,255,255,0.03)",
                position:"relative", overflow:"hidden",
              }}>

                {/* Top shimmer */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(204,255,0,0.5) 55%, rgba(255,255,255,0.08) 75%, transparent 100%)" }} />

                {/* Ambient orbs */}
                <div style={{ position:"absolute", top:-80, right:-80, width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle, rgba(109,40,217,0.2) 0%, transparent 70%)", pointerEvents:"none" }} />
                <div style={{ position:"absolute", bottom:-60, left:-60, width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />

                {/* ── Step progress header ── */}
                <div style={{ padding:"32px 36px 0", position:"relative", zIndex:2 }}>
                  {/* Step labels */}
                  <div style={{ display:"flex", alignItems:"center", gap:0, marginBottom:32 }}>
                    {STEPS.map((label, i) => {
                      const n = i + 1;
                      const active = step === n;
                      const done   = step > n;
                      return (
                        <div key={label} style={{ display:"flex", alignItems:"center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
                          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                            <motion.div
                              animate={{
                                background: done ? "var(--lime)" : active ? "rgba(204,255,0,0.15)" : "rgba(255,255,255,0.05)",
                                borderColor: done || active ? "var(--lime)" : "rgba(255,255,255,0.1)",
                              }}
                              style={{ width:32, height:32, borderRadius:"50%", border:"1px solid", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}
                              transition={{ duration:.3 }}
                            >
                              {done ? (
                                <Icon name="check" style={{ fontSize:14, color:"#000" }} />
                              ) : (
                                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, color: active ? "var(--lime)" : "var(--text3)" }}>{n}</span>
                              )}
                            </motion.div>
                            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color: active ? "var(--lime)" : done ? "rgba(204,255,0,0.5)" : "var(--text3)", whiteSpace:"nowrap" }}>
                              {label}
                            </span>
                          </div>
                          {i < STEPS.length - 1 && (
                            <div style={{ flex:1, height:1, margin:"0 8px", marginBottom:22, background: step > n ? "rgba(204,255,0,0.4)" : "rgba(255,255,255,0.07)", transition:"background .4s" }} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Step heading */}
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={`heading-${step}`}
                      custom={dir}
                      variants={slideVariants}
                      initial="enter" animate="center" exit="exit"
                      transition={{ duration:.3, ease:[.2,.8,.2,1] }}
                    >
                      <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".16em", color:"rgba(204,255,0,0.5)", marginBottom:6 }}>
                        Step {step} of {STEPS.length}
                      </p>
                      <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(20px,2.5vw,26px)", fontWeight:700, color:"var(--text)", letterSpacing:"-.03em", marginBottom:28 }}>
                        {step === 1 && "Who are you?"}
                        {step === 2 && "What do you need?"}
                        {step === 3 && "Tell us more."}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ── Step content ── */}
                <form onSubmit={submit}>
                  <div style={{ padding:"0 36px", position:"relative", zIndex:2, minHeight:260 }}>
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div
                        key={`step-${step}`}
                        custom={dir}
                        variants={slideVariants}
                        initial="enter" animate="center" exit="exit"
                        transition={{ duration:.35, ease:[.2,.8,.2,1] }}
                      >

                        {/* Step 1: Details */}
                        {step === 1 && (
                          <div>
                            <LineField label="Full Name *">
                              <input
                                type="text" value={form.name} onChange={set("name")} required
                                placeholder="John Smith"
                                style={{ ...inputStyle }}
                                onFocus={e  => e.target.style.borderBottomColor = "var(--lime)"}
                                onBlur={e   => e.target.style.borderBottomColor = "rgba(255,255,255,0.1)"}
                              />
                            </LineField>
                            <LineField label="Email Address *">
                              <input
                                type="email" value={form.email} onChange={set("email")} required
                                placeholder="john@company.com"
                                style={{ ...inputStyle }}
                                onFocus={e  => e.target.style.borderBottomColor = "var(--lime)"}
                                onBlur={e   => e.target.style.borderBottomColor = "rgba(255,255,255,0.1)"}
                              />
                            </LineField>
                            <LineField label="Company / Organization">
                              <input
                                type="text" value={form.company} onChange={set("company")}
                                placeholder="Optional"
                                style={{ ...inputStyle }}
                                onFocus={e  => e.target.style.borderBottomColor = "var(--lime)"}
                                onBlur={e   => e.target.style.borderBottomColor = "rgba(255,255,255,0.1)"}
                              />
                            </LineField>
                          </div>
                        )}

                        {/* Step 2: Service selection */}
                        {step === 2 && (
                          <div>
                            <p style={{ color:"var(--text3)", fontSize:13, marginBottom:20 }}>Select all that apply.</p>
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                              {SERVICES.map(({ id, icon, label }) => {
                                const selected = form.services.includes(id);
                                return (
                                  <motion.button
                                    key={id} type="button"
                                    onClick={() => toggleService(id)}
                                    animate={{
                                      background: selected ? "rgba(204,255,0,0.1)" : "rgba(255,255,255,0.03)",
                                      borderColor: selected ? "rgba(204,255,0,0.5)" : "rgba(255,255,255,0.08)",
                                    }}
                                    whileHover={{ background: selected ? "rgba(204,255,0,0.14)" : "rgba(255,255,255,0.06)" }}
                                    whileTap={{ scale:.97 }}
                                    style={{ border:"1px solid", padding:"14px 16px", display:"flex", alignItems:"center", gap:10, textAlign:"left", cursor:"pointer" }}
                                    transition={{ duration:.2 }}
                                  >
                                    <Icon name={icon} style={{ fontSize:18, color: selected ? "var(--lime)" : "var(--text3)", flexShrink:0, transition:"color .2s" }} />
                                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:600, color: selected ? "var(--text)" : "var(--text2)", letterSpacing:"-.01em", transition:"color .2s" }}>
                                      {label}
                                    </span>
                                    {selected && (
                                      <motion.span initial={{ scale:0 }} animate={{ scale:1 }} style={{ marginLeft:"auto", flexShrink:0 }}>
                                        <Icon name="check_circle" style={{ fontSize:14, color:"var(--lime)" }} />
                                      </motion.span>
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Step 3: Message */}
                        {step === 3 && (
                          <div>
                            <LineField label="Project Brief *">
                              <textarea
                                rows={6} value={form.message} onChange={set("message")} required
                                placeholder="Tell us about your project, goals, timeline, and any other details..."
                                style={{ ...inputStyle, resize:"vertical", paddingTop:28, lineHeight:1.7 }}
                                onFocus={e  => e.target.style.borderBottomColor = "var(--lime)"}
                                onBlur={e   => e.target.style.borderBottomColor = "rgba(255,255,255,0.1)"}
                              />
                            </LineField>
                            {error && (
                              <div style={{ background:"rgba(255,60,60,.07)", border:"1px solid rgba(255,60,60,.22)", color:"#ff7b7b", padding:"11px 14px", marginBottom:14, fontSize:12, display:"flex", alignItems:"center", gap:8 }}>
                                <Icon name="error_outline" style={{ fontSize:14, flexShrink:0 }} />{error}
                              </div>
                            )}
                          </div>
                        )}

                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* ── Navigation ── */}
                  <div style={{ padding:"24px 36px 36px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, position:"relative", zIndex:2 }}>
                    {step > 1 ? (
                      <motion.button
                        type="button" onClick={() => goTo(step - 1)}
                        style={{ background:"none", border:"1px solid rgba(255,255,255,0.1)", color:"var(--text3)", padding:"12px 20px", fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}
                        whileHover={{ borderColor:"rgba(255,255,255,0.25)", color:"var(--text)" }}
                        whileTap={{ scale:.96 }}
                      >
                        <Icon name="arrow_back" style={{ fontSize:14 }} /> Back
                      </motion.button>
                    ) : <div />}

                    {step < 3 ? (
                      <motion.button
                        type="button"
                        onClick={() => canNext() && goTo(step + 1)}
                        style={{
                          background: canNext() ? "linear-gradient(135deg, #CCFF00, #aadd00)" : "rgba(255,255,255,0.06)",
                          border:"none", color: canNext() ? "#000" : "var(--text3)",
                          padding:"14px 28px", fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700,
                          textTransform:"uppercase", letterSpacing:".12em", cursor: canNext() ? "pointer" : "not-allowed",
                          display:"flex", alignItems:"center", gap:8,
                          transition:"background .25s, color .25s",
                        }}
                        whileHover={canNext() ? { scale:1.03, boxShadow:"0 8px 28px rgba(204,255,0,0.3)" } : {}}
                        whileTap={canNext() ? { scale:.97 } : {}}
                      >
                        Next <Icon name="arrow_forward" style={{ fontSize:14 }} />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit" disabled={sending}
                        style={{
                          background: "linear-gradient(135deg, #CCFF00, #aadd00)",
                          border:"none", color:"#000",
                          padding:"14px 28px", fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700,
                          textTransform:"uppercase", letterSpacing:".12em", cursor:"pointer",
                          display:"flex", alignItems:"center", gap:8,
                          opacity: sending ? .7 : 1,
                        }}
                        whileHover={!sending ? { scale:1.03, boxShadow:"0 8px 28px rgba(204,255,0,0.35)" } : {}}
                        whileTap={!sending ? { scale:.97 } : {}}
                      >
                        {sending ? (
                          <>
                            <motion.span animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:.7, ease:"linear" }} style={{ display:"inline-block", width:13, height:13, border:"2px solid #000", borderTopColor:"transparent", borderRadius:"50%" }} />
                            Sending…
                          </>
                        ) : (
                          <>Send Brief <Icon name="send" style={{ fontSize:14 }} /></>
                        )}
                      </motion.button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* ── Testimonial card ── */}
            <motion.div
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.3, duration:.5 }}
              style={{
                marginTop:16,
                background:"linear-gradient(135deg, rgba(20,10,60,0.5) 0%, rgba(8,5,20,0.8) 100%)",
                border:"1px solid rgba(255,255,255,0.07)",
                padding:"24px 28px",
                position:"relative", overflow:"hidden",
              }}
            >
              {/* Lime left accent */}
              <div style={{ position:"absolute", top:0, left:0, bottom:0, width:2, background:"linear-gradient(to bottom, var(--lime), transparent)" }} />

              {/* Stars */}
              <div style={{ display:"flex", gap:3, marginBottom:14 }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 12 12" fill="#CCFF00" width="12" height="12">
                    <path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12 3.75 7.5 0 4.5h4.5z"/>
                  </svg>
                ))}
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, color:"var(--lime)", letterSpacing:".1em", marginLeft:6, textTransform:"uppercase" }}>Verified Client</span>
              </div>

              <p style={{ color:"var(--text2)", fontSize:13.5, lineHeight:1.85, fontStyle:"italic", marginBottom:18 }}>
                "Qraft Digital transformed our outdated platform into a high-performing product. Communication was flawless, delivery was ahead of schedule, and the results exceeded every KPI we set."
              </p>

              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg, rgba(109,40,217,0.6), rgba(204,255,0,0.3))", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:13, fontWeight:700, color:"#fff" }}>S</span>
                </div>
                <div>
                  <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:700, color:"var(--text)", letterSpacing:"-.01em" }}>Sarah Mitchell</p>
                  <p style={{ fontSize:11, color:"var(--text3)" }}>CEO · Orbis Commerce · United Kingdom</p>
                </div>
              </div>
            </motion.div>

            </>
          </Reveal>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="px-section" style={{ background:"rgba(4,2,12,0.8)", borderTop:"1px solid var(--border)", padding:"clamp(48px,6vw,80px) clamp(20px,4vw,40px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:48 }}>
            <SectionLabel>Global Reach</SectionLabel>
            <h2 className="h2">Based in Dhaka.<br />Building for the world.</h2>
          </Reveal>
          <StaggerContainer style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"transparent" }} className="stats-grid">
            {[
              { num:"20+",  label:"Countries Served",        icon:"public"      },
              { num:"140+", label:"Projects Delivered",      icon:"check_box"   },
              { num:"$12M", label:"Client Revenue Generated", icon:"trending_up" },
              { num:"4.9★", label:"Average Client Rating",   icon:"star"        },
            ].map(({ num, label, icon }) => (
              <StaggerItem key={label}>
                <GlassCard style={{ padding:40, textAlign:"center", height:"100%" }}>
                  <Icon name={icon} style={{ fontSize:32, color:"var(--lime)", display:"block", margin:"0 auto 16px" }} />
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:700, color:"var(--text)", letterSpacing:"-.04em", lineHeight:1, marginBottom:8 }}>{num}</div>
                  <p style={{ fontSize:12, color:"var(--text3)", textTransform:"uppercase", letterSpacing:".1em", fontFamily:"'Space Grotesk',sans-serif", fontWeight:600 }}>{label}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
