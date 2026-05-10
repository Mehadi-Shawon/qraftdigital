import { motion } from "framer-motion";
import { Icon, Reveal, StaggerContainer, StaggerItem } from "./UI";

export default function Footer({ navigate }) {
  return (
    <footer style={{ background:"rgba(4,2,12,0.9)", borderTop:"1px solid var(--border)", position:"relative", overflow:"hidden" }}>
      {/* Ambient orb */}
      <div style={{ position:"absolute", bottom:-100, left:-100, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(88,28,135,0.15) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div className="px-section" style={{ maxWidth:1440, margin:"0 auto", padding:"80px 40px 40px", position:"relative", zIndex:1 }}>
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:64, marginBottom:64 }}>
          <Reveal>
            <div>
              <button onClick={() => navigate("home")} style={{ background:"none", border:"none", fontFamily:"'Space Grotesk',sans-serif", fontSize:26, fontWeight:700, textTransform:"uppercase", letterSpacing:"-.04em", color:"var(--text)", marginBottom:20, display:"block" }}>
                Nexbee<span style={{ color:"var(--lime)" }}>Labs</span>
              </button>
              <p style={{ color:"var(--text2)", fontSize:14, lineHeight:1.7, maxWidth:300, marginBottom:28 }}>
                A premier digital engineering agency focused on performance, precision, and direct results. Based in Dhaka, operating globally.
              </p>
              <div style={{ display:"flex", gap:10 }}>
                {[{icon:"work",label:"LinkedIn"},{icon:"public",label:"Twitter"},{icon:"code",label:"GitHub"}].map(({ icon, label }) => (
                  <motion.button
                    key={label} aria-label={label} className="icon-btn"
                    whileHover={{ scale:1.1, borderColor:"var(--lime)", color:"var(--lime)" }}
                    whileTap={{ scale:.9 }}
                  >
                    <Icon name={icon} style={{ fontSize:18 }} />
                  </motion.button>
                ))}
              </div>
            </div>
          </Reveal>

          {[
            { title:"Services", items:[["Web Development","services"],["Brand Identity","services"],["Mobile Apps","services"],["SEO Strategy","services"]] },
            { title:"Company",  items:[["Work","work"],["About","about"],["Contact","contact"]] },
            { title:"Contact",  items:[["hello@nexbeelabs.com",null],["Dhaka, Bangladesh",null],["Mon–Fri, 9–18 BST",null]] },
          ].map((col, ci) => (
            <Reveal key={col.title} delay={ci*0.1}>
              <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:"var(--lime)", marginBottom:20 }}>{col.title}</p>
              <ul style={{ listStyle:"none" }}>
                {col.items.map(([label, pg]) => (
                  <li key={label} style={{ marginBottom:12 }}>
                    {pg ? (
                      <motion.button
                        onClick={() => navigate(pg)}
                        style={{ background:"none", border:"none", color:"var(--text2)", fontSize:14, fontFamily:"'Work Sans',sans-serif", padding:0 }}
                        whileHover={{ x:4, color:"var(--text)" }}
                        transition={{ duration:.2 }}
                      >
                        {label}
                      </motion.button>
                    ) : <span style={{ color:"var(--text3)", fontSize:14 }}>{label}</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div style={{ borderTop:"1px solid var(--border)", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <p style={{ color:"var(--text3)", fontSize:11, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".08em" }}>© 2025 NEXBEELABS. ALL RIGHTS RESERVED.</p>
          <p style={{ color:"var(--text3)", fontSize:11, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".08em" }}>BUILT FOR PERFORMANCE.</p>
        </div>
      </div>
    </footer>
  );
}
