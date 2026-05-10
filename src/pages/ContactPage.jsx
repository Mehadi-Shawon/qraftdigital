import { useState } from "react";
import { motion } from "framer-motion";
import { Icon, SectionLabel, Reveal, StaggerContainer, StaggerItem, GlassCard } from "../components/UI";

const FORMSPREE_ID = "YOUR_FORM_ID"; // Replace with your Formspree ID from formspree.io

export default function ContactPage() {
  const [form, setForm]       = useState({ name:"", email:"", company:"", service:"", budget:"", message:"" });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState(null);
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true); setError(null);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:"POST",
        headers:{ "Content-Type":"application/json", Accept:"application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
      else { const d = await res.json(); setError(d?.errors?.[0]?.message || "Something went wrong."); }
    } catch { setError("Network error — please try again."); }
    finally { setSending(false); }
  };

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="section-photo px-section" style={{ backgroundImage:"url(https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1920&h=800&fit=crop)", padding:"100px 40px 80px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
            <div style={{ borderLeft:"3px solid var(--lime)", paddingLeft:28, marginTop:16 }}>
              <h1 className="h1" style={{ marginBottom:20 }}>Let's build<br />something real.</h1>
              <p className="body-lg" style={{ maxWidth:520 }}>
                We partner with ambitious companies to engineer high-performance digital products. One conversation can change the trajectory of your product.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ MAIN ═══ */}
      <section className="px-section" style={{ maxWidth:1440, margin:"0 auto", padding:"80px 40px 120px" }}>
        <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"5fr 7fr", gap:80 }}>

          {/* Left info */}
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
                    { icon:"mail",        label:"Email",         val:"hello@nexbeelabs.com"         },
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

              {/* Process */}
              <motion.div
                style={{ background:"var(--lime)", padding:32, position:"relative", overflow:"hidden" }}
                animate={{ boxShadow:["0 0 20px rgba(204,255,0,.15)","0 0 40px rgba(204,255,0,.3)","0 0 20px rgba(204,255,0,.15)"] }}
                transition={{ repeat:Infinity, duration:3 }}
              >
                <div style={{ position:"absolute", right:-30, top:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,.1)" }} />
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:700, color:"#000", marginBottom:24, textTransform:"uppercase", letterSpacing:"-.01em", position:"relative", zIndex:1 }}>What happens next</h3>
                {[
                  "We review your brief within 24 hours",
                  "Discovery call to scope the engagement",
                  "Technical proposal + timeline in 3 days",
                  "Project kickoff and sprint planning",
                ].map((step, i) => (
                  <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom: i<3?18:0, position:"relative", zIndex:1 }}>
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, color:"rgba(0,0,0,.4)", minWidth:22, marginTop:1 }}>0{i+1}</span>
                    <p style={{ fontSize:14, color:"#000", lineHeight:1.5 }}>{step}</p>
                  </div>
                ))}
              </motion.div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.15}>
            {sent ? (
              <motion.div
                initial={{ scale:.9, opacity:0 }} animate={{ scale:1, opacity:1 }}
                style={{ background:"var(--surface)", border:"1px solid var(--lime)", padding:64, textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:480 }}
              >
                <motion.div animate={{ scale:[1,1.1,1], rotate:[0,10,-10,0] }} transition={{ duration:.6, delay:.2 }}>
                  <Icon name="check_circle" style={{ color:"var(--lime)", fontSize:72, marginBottom:24 }} />
                </motion.div>
                <h3 className="h3" style={{ fontSize:32, marginBottom:12 }}>Message Sent.</h3>
                <p className="body-sm" style={{ fontSize:16, lineHeight:1.7 }}>We'll be in touch within 24 hours. Keep an eye on your inbox.</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} style={{ background:"var(--surface)", border:"1px solid var(--border)", padding:"clamp(24px,4vw,48px)" }}>
                <h3 className="h3" style={{ marginBottom:36 }}>Tell us about your project</h3>

                <div className="form-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 28px" }}>
                  <div className="form-row">
                    <input type="text"  placeholder=" " value={form.name}  onChange={set("name")}  required />
                    <label>Full Name *</label>
                  </div>
                  <div className="form-row">
                    <input type="email" placeholder=" " value={form.email} onChange={set("email")} required />
                    <label>Email Address *</label>
                  </div>
                </div>

                <div className="form-row">
                  <input type="text" placeholder=" " value={form.company} onChange={set("company")} />
                  <label>Company / Organization</label>
                </div>

                <div className="form-row">
                  <select value={form.service} onChange={set("service")} style={{ color: form.service?"var(--text)":"var(--text3)" }}>
                    <option value="">— Select a service</option>
                    <option>Web Development</option>
                    <option>Brand Identity</option>
                    <option>E-Commerce</option>
                    <option>Mobile App</option>
                    <option>Custom Software</option>
                    <option>SEO &amp; Growth</option>
                  </select>
                  <label>Service Needed</label>
                </div>

                <div className="form-row">
                  <select value={form.budget} onChange={set("budget")} style={{ color: form.budget?"var(--text)":"var(--text3)" }}>
                    <option value="">— Select budget range</option>
                    <option>Under $5k</option>
                    <option>$5k – $15k</option>
                    <option>$15k – $50k</option>
                    <option>$50k – $100k</option>
                    <option>$100k+</option>
                  </select>
                  <label>Budget Range</label>
                </div>

                <div className="form-row">
                  <textarea rows={5} placeholder=" " value={form.message} onChange={set("message")} required />
                  <label>Project Brief *</label>
                </div>

                {error && (
                  <div style={{ background:"rgba(255,60,60,.08)", border:"1px solid rgba(255,60,60,.3)", color:"#ff6b6b", padding:"12px 16px", marginBottom:20, fontSize:14 }}>{error}</div>
                )}

                <motion.button
                  type="submit" disabled={sending} className="lime-btn"
                  style={{ width:"100%", justifyContent:"center", fontSize:15, padding:"18px 0", opacity: sending?.7:1 }}
                  whileHover={!sending ? { scale:1.02 } : {}}
                  whileTap={!sending ? { scale:.97 } : {}}
                >
                  {sending ? (
                    <>
                      <motion.span animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:.7, ease:"linear" }} style={{ display:"inline-block", width:16, height:16, border:"2px solid #000", borderTopColor:"transparent", borderRadius:"50%", marginRight:8 }} />
                      Sending…
                    </>
                  ) : (
                    <>Send Message <Icon name="send" style={{ fontSize:18 }} /></>
                  )}
                </motion.button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ═══ MAP/LOCATION CARD ═══ */}
      <section className="px-section" style={{ background:"rgba(4,2,12,0.8)", borderTop:"1px solid var(--border)", padding:"80px 40px" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <Reveal style={{ marginBottom:48 }}>
            <SectionLabel>Global Reach</SectionLabel>
            <h2 className="h2">Based in Dhaka.<br />Building for the world.</h2>
          </Reveal>
          <StaggerContainer style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"var(--border)" }} className="stats-grid">
            {[
              { num:"20+", label:"Countries Served",    icon:"public"     },
              { num:"140+",label:"Projects Delivered",  icon:"check_box"  },
              { num:"$12M",label:"Client Revenue Generated", icon:"trending_up" },
              { num:"4.9★",label:"Average Client Rating", icon:"star"     },
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
