import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Icon } from "./UI";

export default function Header({ page, navigate, setMobileOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useTheme();
  const links = ["home","services","work","about","contact"];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
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
      <div style={{ maxWidth:1440, margin:"0 auto", padding:"0 40px", height:76, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        {/* Logo */}
        <motion.button
          onClick={() => navigate("home")}
          style={{ background:"none", border:"none", fontFamily:"'Space Grotesk',sans-serif", fontSize:22, fontWeight:700, textTransform:"uppercase", letterSpacing:"-.04em", color:"var(--text)", lineHeight:1 }}
          whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}
          transition={{ type:"spring", stiffness:400, damping:20 }}
        >
          Nexbee<span style={{ color:"var(--lime)" }}>Labs</span>
        </motion.button>

        {/* Desktop nav */}
        <nav className="hide-mobile" style={{ display:"flex", gap:32 }}>
          {links.map(l => (
            <button key={l} className={`nav-link ${page===l?"active":""}`} onClick={() => navigate(l)}>{l}</button>
          ))}
        </nav>

        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          {/* Theme toggle */}
          <motion.button
            onClick={toggle}
            className="icon-btn"
            whileHover={{ scale:1.1, borderColor:"var(--lime)" }}
            whileTap={{ scale:.9, rotate:15 }}
            transition={{ type:"spring", stiffness:400, damping:15 }}
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={dark ? "moon" : "sun"}
                initial={{ rotate:-90, opacity:0, scale:.5 }}
                animate={{ rotate:0, opacity:1, scale:1 }}
                exit={{ rotate:90, opacity:0, scale:.5 }}
                transition={{ duration:.3 }}
                style={{ display:"flex" }}
              >
                <Icon name={dark ? "light_mode" : "dark_mode"} style={{ fontSize:20 }} />
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* CTA */}
          <motion.button
            className="lime-btn nav-cta hide-mobile"
            style={{ padding:"10px 22px", fontSize:12 }}
            onClick={() => navigate("contact")}
            whileHover={{ scale:1.04, y:-1 }} whileTap={{ scale:.96 }}
            transition={{ type:"spring", stiffness:400, damping:20 }}
          >
            Start a Project
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
  );
}
