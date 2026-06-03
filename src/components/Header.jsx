import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "./UI";
import ProjectModal from "./ProjectModal";

export default function Header({ page, navigate, setMobileOpen }) {
  const [scrolled, setScrolled]     = useState(false);
  const [modalOpen, setModalOpen]   = useState(false);
  const links = [
    { page:"home",     label:"Home"    },
    { page:"services", label:"Services"},
    { page:"work",     label:"Work"    },
    { page:"about",    label:"About"   },
    { page:"contact",  label:"Contact" },
  ];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
    <motion.header
      initial={{ y:-80, opacity:0 }}
      animate={{ y:0, opacity:1 }}
      transition={{ duration:.6, ease:[.2,.8,.2,1] }}
      style={{
        position:"sticky", top:0, zIndex:100,
        background: scrolled ? "rgba(7,5,15,.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition:"background .4s ease, border-color .4s ease",
      }}
    >
      <div style={{ maxWidth:1440, margin:"0 auto", padding:"0 clamp(16px,4vw,40px)", height:76, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        {/* Logo */}
        <motion.button
          onClick={() => navigate("home")}
          style={{ background:"none", border:"none", fontFamily:"'Space Grotesk',sans-serif", fontSize:22, fontWeight:700, textTransform:"uppercase", letterSpacing:"-.04em", color:"var(--text)", lineHeight:1 }}
          whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}
          transition={{ type:"spring", stiffness:400, damping:20 }}
        >
          Qraft<span style={{ color:"var(--lime)" }}>Digital</span>
        </motion.button>

        {/* Desktop nav */}
        <nav className="hide-mobile" style={{ display:"flex", gap:32 }}>
          {links.map(({ page: p, label }) => (
            <button key={p} className={`nav-link ${page===p?"active":""}`} onClick={() => navigate(p)}>{label}</button>
          ))}
        </nav>

        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          {/* Desktop CTA */}
          <motion.button
            className="lime-btn nav-cta hide-mobile"
            style={{ padding:"10px 22px", fontSize:12 }}
            onClick={() => setModalOpen(true)}
            whileHover={{ scale:1.04, y:-1 }} whileTap={{ scale:.96 }}
            transition={{ type:"spring", stiffness:400, damping:20 }}
          >
            Let's Talk
          </motion.button>

          {/* Mobile CTA — left of hamburger */}
          <motion.button
            className="show-mobile"
            onClick={() => setModalOpen(true)}
            style={{ display:"none", alignItems:"center", gap:6, padding:"8px 14px", background:"var(--lime)", border:"none", fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"#000", cursor:"pointer", whiteSpace:"nowrap" }}
            whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}
            transition={{ type:"spring", stiffness:400, damping:20 }}
          >
            Let's Talk
          </motion.button>

          {/* Hamburger */}
          <motion.button
            onClick={() => setMobileOpen(true)}
            style={{ background:"none", border:"1px solid var(--border)", color:"var(--text)", padding:"9px 11px", display:"flex", alignItems:"center" }}
            whileHover={{ borderColor:"var(--lime)", color:"var(--lime)" }}
            whileTap={{ scale:.9 }}
          >
            <Icon name="menu" style={{ fontSize:20 }} />
          </motion.button>
        </div>
      </div>
    </motion.header>

    <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
