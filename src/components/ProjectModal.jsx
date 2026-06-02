import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./UI";

const FORMSPREE_ID = "mzdwnwjp";

const SERVICES = [
  "Web Development",
  "Brand Identity",
  "E-Commerce",
  "Mobile App",
  "Custom Software",
  "SEO & Growth",
];

/* Matches the contact hero input style exactly */
const inputStyle = {
  width:"100%", background:"rgba(255,255,255,0.04)",
  border:"1px solid rgba(255,255,255,0.08)",
  color:"var(--text)", fontSize:13, fontFamily:"'Work Sans',sans-serif",
  padding:"10px 12px", outline:"none", transition:"border-color .2s", boxSizing:"border-box",
};

const Label = ({ children }) => (
  <label style={{ display:"block", fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:"var(--lime)", marginBottom:6 }}>
    {children}
  </label>
);

export default function ProjectModal({ open, onClose }) {
  const [form, setForm]       = useState({ name:"", email:"", service:"", message:"" });
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

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSent(false); setError(null); setForm({ name:"", email:"", service:"", message:"" }); }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:.3 }}
            onClick={handleClose}
            style={{ position:"fixed", inset:0, background:"rgba(4,2,12,0.75)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", zIndex:998 }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity:0, y:40, scale:.96 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:24, scale:.97 }}
            transition={{ duration:.4, ease:[.16,1,.3,1] }}
            style={{ position:"fixed", inset:0, zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", pointerEvents:"none" }}
          >
            <div style={{ width:"min(460px, 100%)", pointerEvents:"all", position:"relative" }}>

              {/* ── Card — exact same glass as contact hero ── */}
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
                  {sent ? (
                    /* ── Success ── */
                    <motion.div
                      key="success"
                      initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }}
                      style={{ padding:"56px 36px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:16, position:"relative", zIndex:2 }}
                    >
                      <motion.div animate={{ scale:[1,1.15,1] }} transition={{ duration:.5, delay:.1 }}>
                        <Icon name="check_circle" style={{ fontSize:60, color:"var(--lime)" }} />
                      </motion.div>
                      <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:22, fontWeight:700, color:"var(--text)", letterSpacing:"-.03em" }}>Message Sent.</h3>
                      <p style={{ color:"var(--text2)", fontSize:13, lineHeight:1.8, maxWidth:280 }}>We'll review your brief and respond within 24 hours.</p>
                      <motion.button
                        onClick={handleClose}
                        whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}
                        style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:"var(--lime)", background:"rgba(204,255,0,0.07)", border:"1px solid rgba(204,255,0,0.22)", padding:"10px 28px", marginTop:8, cursor:"pointer" }}
                      >
                        Close
                      </motion.button>
                    </motion.div>

                  ) : (
                    /* ── Form ── */
                    <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ position:"relative", zIndex:2 }}>

                      {/* Header */}
                      <div style={{ padding:"28px 32px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                          <div style={{ width:40, height:40, background:"linear-gradient(135deg, rgba(204,255,0,0.15), rgba(109,40,217,0.15))", border:"1px solid rgba(204,255,0,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <Icon name="rocket_launch" style={{ fontSize:20, color:"var(--lime)" }} />
                          </div>
                          <div>
                            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:700, color:"var(--text)", letterSpacing:"-.03em" }}>Start a Project</h3>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:3 }}>
                              <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ repeat:Infinity, duration:2 }} style={{ width:6, height:6, borderRadius:"50%", background:"var(--lime)", display:"block" }} />
                              <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"rgba(204,255,0,0.65)" }}>Responds within 24 hours</span>
                            </div>
                          </div>
                        </div>

                        {/* Close button */}
                        <motion.button
                          onClick={handleClose}
                          whileHover={{ background:"rgba(255,255,255,0.08)", borderColor:"rgba(255,255,255,0.2)" }}
                          whileTap={{ scale:.88 }}
                          style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.4)", width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0, transition:"background .2s, border-color .2s" }}
                        >
                          <Icon name="close" style={{ fontSize:15 }} />
                        </motion.button>
                      </div>

                      {/* Form body */}
                      <form onSubmit={submit} style={{ padding:"24px 32px 32px" }}>

                        {/* Name + Email */}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                          <div>
                            <Label>Full Name *</Label>
                            <input
                              type="text" value={form.name} onChange={set("name")} required placeholder="John Smith"
                              style={inputStyle}
                              onFocus={e => e.target.style.borderColor = "rgba(204,255,0,0.4)"}
                              onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                            />
                          </div>
                          <div>
                            <Label>Email Address *</Label>
                            <input
                              type="email" value={form.email} onChange={set("email")} required placeholder="you@company.com"
                              style={inputStyle}
                              onFocus={e => e.target.style.borderColor = "rgba(204,255,0,0.4)"}
                              onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                            />
                          </div>
                        </div>

                        {/* Service */}
                        <div style={{ marginBottom:16 }}>
                          <Label>Service Needed</Label>
                          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                            {SERVICES.map(svc => (
                              <motion.button
                                key={svc} type="button"
                                onClick={() => setForm(p => ({ ...p, service: p.service === svc ? "" : svc }))}
                                animate={{
                                  background: form.service === svc ? "rgba(204,255,0,0.12)" : "rgba(255,255,255,0.03)",
                                  borderColor: form.service === svc ? "rgba(204,255,0,0.45)" : "rgba(255,255,255,0.07)",
                                  color: form.service === svc ? "var(--lime)" : "var(--text3)",
                                }}
                                whileHover={{ background:"rgba(255,255,255,0.07)" }}
                                whileTap={{ scale:.95 }}
                                style={{ border:"1px solid", padding:"8px 6px", fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:600, cursor:"pointer", textAlign:"center", lineHeight:1.3 }}
                                transition={{ duration:.15 }}
                              >
                                {svc}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Project Brief */}
                        <div style={{ marginBottom:16 }}>
                          <Label>Project Brief *</Label>
                          <textarea
                            rows={3} value={form.message} onChange={set("message")} required
                            placeholder="Tell us about your project, goals, and timeline…"
                            style={{ ...inputStyle, resize:"none", lineHeight:1.65 }}
                            onFocus={e => e.target.style.borderColor = "rgba(204,255,0,0.4)"}
                            onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                          />
                        </div>

                        {error && (
                          <div style={{ background:"rgba(255,60,60,.07)", border:"1px solid rgba(255,60,60,.22)", color:"#ff7b7b", padding:"10px 12px", marginBottom:14, fontSize:12, display:"flex", alignItems:"center", gap:8 }}>
                            <Icon name="error_outline" style={{ fontSize:14, flexShrink:0 }} />{error}
                          </div>
                        )}

                        <motion.button
                          type="submit" disabled={sending}
                          style={{
                            width:"100%", padding:"14px 0", fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:11,
                            textTransform:"uppercase", letterSpacing:".14em",
                            background:"linear-gradient(135deg, #CCFF00, #aadd00)",
                            color:"#000", border:"none", cursor:"pointer",
                            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                            opacity: sending ? .7 : 1, transition:"opacity .2s",
                          }}
                          whileHover={!sending ? { scale:1.02, boxShadow:"0 8px 28px rgba(204,255,0,0.35)" } : {}}
                          whileTap={!sending ? { scale:.97 } : {}}
                        >
                          {sending ? (
                            <>
                              <motion.span animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:.7, ease:"linear" }} style={{ display:"inline-block", width:13, height:13, border:"2px solid #000", borderTopColor:"transparent", borderRadius:"50%" }} />
                              Sending…
                            </>
                          ) : (
                            <><Icon name="send" style={{ fontSize:15 }} /> Send Brief</>
                          )}
                        </motion.button>

                        <p style={{ textAlign:"center", marginTop:12, fontSize:10, color:"rgba(255,255,255,0.2)", fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".06em", textTransform:"uppercase" }}>
                          Your information is kept private
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
