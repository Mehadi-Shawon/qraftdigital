import { Fragment } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./UI";

const SocialIcons = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.977 1.977 0 01-1.972-1.972 1.977 1.977 0 011.972-1.972 1.977 1.977 0 011.972 1.972 1.977 1.977 0 01-1.972 1.972zm1.97 13.019H3.364V9h3.943v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
};

const LEGAL_LINKS = [
  { label:"Terms of Service", page:"terms"   },
  { label:"Privacy Policy",   page:"privacy" },
];

const COLS = [
  {
    title: "Services",
    items: [
      ["Web Development",  "services"],
      ["Brand Identity",   "services"],
      ["Mobile Apps",      "services"],
      ["SEO Strategy",     "services"],
      ["Custom Software",  "services"],
    ],
  },
  {
    title: "Company",
    items: [
      ["Work",    "work"   ],
      ["About",   "about"  ],
      ["Contact", "contact"],
      ["Terms",   "terms"  ],
      ["Privacy", "privacy"],
    ],
  },
  {
    title: "Contact",
    items: [
      ["write.shawon@gmail.com", "mailto"],
      ["Dhaka, Bangladesh",       null   ],
    ],
  },
];

export default function Footer({ navigate }) {
  return (
    <footer style={{ background:"rgba(4,2,12,0.97)", borderTop:"1px solid var(--border)", position:"relative", overflow:"hidden" }}>

      {/* Top lime accent line */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg, transparent 0%, rgba(204,255,0,0.35) 35%, rgba(204,255,0,0.6) 55%, transparent 100%)", zIndex:2 }} />

      {/* Ambient orbs */}
      <div style={{ position:"absolute", bottom:-120, left:-80, width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle, rgba(88,28,135,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:-60, right:-60, width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(204,255,0,0.05) 0%, transparent 70%)", pointerEvents:"none" }} />

      {/* Subtle grid texture */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(204,255,0,.008) 1px,transparent 1px),linear-gradient(90deg,rgba(204,255,0,.008) 1px,transparent 1px)", backgroundSize:"80px 80px", pointerEvents:"none" }} />

      {/* Large wordmark watermark */}
      <div style={{ position:"absolute", bottom:-10, left:"50%", transform:"translateX(-50%)", whiteSpace:"nowrap", fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"-.05em", fontSize:"clamp(80px,14vw,180px)", lineHeight:1, color:"transparent", WebkitTextStroke:"1px rgba(255,255,255,0.04)", userSelect:"none", pointerEvents:"none", zIndex:0 }}>
        Qraft<span style={{ WebkitTextStroke:"1px rgba(204,255,0,0.07)" }}>Digital</span>
      </div>

      <div className="px-section" style={{ maxWidth:1440, margin:"0 auto", padding:"clamp(56px,7vw,88px) clamp(20px,4vw,40px) clamp(28px,4vw,40px)", position:"relative", zIndex:1 }}>

        {/* ── Main grid ── */}
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2.2fr 1fr 1fr 1fr", gap:"clamp(32px,5vw,72px)", marginBottom:56 }}>

          {/* Brand column */}
          <Reveal>
            <div>
              <button
                onClick={() => navigate("home")}
                style={{ background:"none", border:"none", fontFamily:"'Space Grotesk',sans-serif", fontSize:24, fontWeight:700, textTransform:"uppercase", letterSpacing:"-.04em", color:"var(--text)", marginBottom:8, display:"block", padding:0 }}
              >
                Qraft<span style={{ color:"var(--lime)" }}>Digital</span>
              </button>

              {/* Availability badge */}
              <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(204,255,0,0.06)", border:"1px solid rgba(204,255,0,0.18)", padding:"5px 12px", marginBottom:20 }}>
                <motion.span
                  animate={{ opacity:[1, 0.3, 1] }}
                  transition={{ repeat:Infinity, duration:2 }}
                  style={{ width:6, height:6, borderRadius:"50%", background:"var(--lime)", display:"block", flexShrink:0 }}
                />
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:"var(--lime)" }}>
                  Accepting new projects
                </span>
              </div>

              <p style={{ color:"var(--text2)", fontSize:13, lineHeight:1.8, maxWidth:280, marginBottom:28 }}>
                We design and develop websites, automate your workflows with AI, and provide ongoing support. Based in Dhaka{" "}
                <svg viewBox="0 0 20 12" width="16" height="10" style={{ display:"inline-block", verticalAlign:"middle", borderRadius:2 }}>
                  <rect width="20" height="12" fill="#006a4e" />
                  <circle cx="9" cy="6" r="4" fill="#f42a41" />
                </svg>
                , operating globally.
              </p>

              {/* Social icons */}
              <div style={{ display:"flex", gap:8 }}>
                {["LinkedIn","Twitter","Instagram","Facebook","GitHub"].map((label) => (
                  <motion.button
                    key={label}
                    aria-label={label}
                    style={{
                      width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center",
                      background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
                      color:"var(--text3)", cursor:"pointer", flexShrink:0,
                      transition:"background .2s, border-color .2s, color .2s",
                    }}
                    whileHover={{ background:"rgba(204,255,0,0.1)", borderColor:"rgba(204,255,0,0.4)", color:"var(--lime)", scale:1.08 }}
                    whileTap={{ scale:.9 }}
                    transition={{ duration:.15 }}
                  >
                    {SocialIcons[label]}
                  </motion.button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Link columns */}
          {COLS.map((col, ci) => (
            <Reveal key={col.title} delay={ci * 0.08}>
              <div>
                {/* Column heading with lime underline accent */}
                <div style={{ marginBottom:20 }}>
                  <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".16em", color:"var(--lime)", marginBottom:8 }}>
                    {col.title}
                  </p>
                  <div style={{ width:20, height:1, background:"rgba(204,255,0,0.4)" }} />
                </div>

                <ul style={{ listStyle:"none" }}>
                  {col.items.map(([label, pg]) => (
                    <li key={label} style={{ marginBottom:11 }}>
                      {pg === "mailto" ? (
                        <a
                          href={`mailto:${label}`}
                          style={{ color:"var(--text3)", fontSize:13, fontFamily:"'Work Sans',sans-serif", textDecoration:"none", transition:"color .2s" }}
                          onMouseEnter={e => e.target.style.color = "var(--lime)"}
                          onMouseLeave={e => e.target.style.color = "var(--text3)"}
                        >
                          {label}
                        </a>
                      ) : pg ? (
                        <motion.button
                          onClick={() => navigate(pg)}
                          style={{ background:"none", border:"none", color:"var(--text3)", fontSize:13, fontFamily:"'Work Sans',sans-serif", padding:0, cursor:"pointer", display:"flex", alignItems:"center", gap:0 }}
                          whileHover={{ x:5, color:"var(--text)" }}
                          transition={{ duration:.2 }}
                        >
                          {label}
                        </motion.button>
                      ) : (
                        <span style={{ color:"var(--text3)", fontSize:13 }}>{label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14 }}>
          <p style={{ color:"rgba(255,255,255,0.2)", fontSize:11, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".08em" }}>
            © 2025 QRAFT DIGITAL. ALL RIGHTS RESERVED.
          </p>

          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            {LEGAL_LINKS.map(({ label, page }, i) => (
              <Fragment key={label}>
                <motion.button
                  onClick={() => navigate(page)}
                  style={{ background:"none", border:"none", color:"rgba(255,255,255,0.2)", fontSize:11, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".08em", textTransform:"uppercase", padding:0, cursor:"pointer" }}
                  whileHover={{ color:"var(--lime)" }}
                  transition={{ duration:.2 }}
                >
                  {label}
                </motion.button>
                {i < LEGAL_LINKS.length - 1 && (
                  <span style={{ color:"rgba(255,255,255,0.1)", fontSize:11 }}>·</span>
                )}
              </Fragment>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
