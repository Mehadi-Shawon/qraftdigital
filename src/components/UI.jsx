import { useRef } from "react";
import { motion } from "framer-motion";
import { useTilt } from "../hooks";

/* ── Framer variants ── */
export const fadeUp   = { hidden:{ opacity:0, y:40 }, show:{ opacity:1, y:0, transition:{ duration:.7, ease:[.2,.8,.2,1] } } };
export const fadeLeft = { hidden:{ opacity:0, x:-40 }, show:{ opacity:1, x:0, transition:{ duration:.7, ease:[.2,.8,.2,1] } } };
export const fadeRight= { hidden:{ opacity:0, x:40  }, show:{ opacity:1, x:0, transition:{ duration:.7, ease:[.2,.8,.2,1] } } };
export const scaleIn  = { hidden:{ opacity:0, scale:.85 }, show:{ opacity:1, scale:1, transition:{ duration:.6, ease:[.2,.8,.2,1] } } };
export const stagger  = { hidden:{}, show:{ transition:{ staggerChildren:.12 } } };
export const staggerFast = { hidden:{}, show:{ transition:{ staggerChildren:.07 } } };

/* ── Icon span ── */
export function Icon({ name, style, className="" }) {
  return <span className={`icon ${className}`} style={style}>{name}</span>;
}

/* ── Section label ── */
export function SectionLabel({ children }) {
  return <p className="section-label">{children}</p>;
}

/* ── Motion reveal wrapper ── */
export function Reveal({ children, className="", style={}, delay=0, direction="up" }) {
  const variants = direction==="left" ? fadeLeft : direction==="right" ? fadeRight : direction==="scale" ? scaleIn : fadeUp;
  const v = { ...variants, show:{ ...variants.show, transition:{ ...variants.show.transition, delay } } };
  return (
    <motion.div
      className={className} style={style}
      variants={v} initial="hidden"
      whileInView="show" viewport={{ once:true, amount:0.1 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Staggered container ── */
export function StaggerContainer({ children, className="", style={}, fast=false }) {
  return (
    <motion.div className={className} style={style}
      variants={fast ? staggerFast : stagger} initial="hidden"
      whileInView="show" viewport={{ once:true, amount:0.1 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Staggered child ── */
export function StaggerItem({ children, className="", style={} }) {
  return (
    <motion.div className={className} style={style} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/* ── Lime CTA button ── */
export function LimeBtn({ children, onClick, style={}, type="button", disabled=false }) {
  return (
    <motion.button
      type={type} className="lime-btn" onClick={onClick} style={style} disabled={disabled}
      whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:.96 }}
      transition={{ type:"spring", stiffness:400, damping:20 }}
    >
      {children}
    </motion.button>
  );
}

/* ── Ghost outline button ── */
export function GhostBtn({ children, onClick }) {
  return (
    <motion.button
      className="ghost-btn" onClick={onClick}
      whileHover={{ scale:1.03 }} whileTap={{ scale:.96 }}
      transition={{ type:"spring", stiffness:400, damping:20 }}
    >
      {children}
    </motion.button>
  );
}

/* ── 3D Tilt card wrapper ── */
export function TiltCard({ children, className="", style={} }) {
  const ref = useRef(null);
  useTilt(ref);
  return (
    <div ref={ref} className={`tilt-card ${className}`} style={{ ...style, transformStyle:"preserve-3d" }}>
      {children}
    </div>
  );
}

/* ── Glass card ── */
export function GlassCard({ children, className="", style={} }) {
  return (
    <motion.div
      className={`glass-card ${className}`} style={style}
      whileHover={{ y:-6, boxShadow:"0 24px 48px rgba(0,0,0,0.3)" }}
      transition={{ type:"spring", stiffness:300, damping:20 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Star row ── */
export function Stars({ count=5 }) {
  return (
    <div style={{ display:"flex", gap:3, marginBottom:16 }}>
      {Array.from({ length:count }).map((_,i) => (
        <Icon key={i} name="star" style={{ fontSize:15, color:"var(--lime)" }} />
      ))}
    </div>
  );
}

/* ── Badge ── */
export function Badge({ children, lime=false }) {
  return <span className={lime ? "lime-badge badge" : "badge"}>{children}</span>;
}

/* ── Tech pill ── */
export function TechPill({ label }) {
  return (
    <motion.span
      className="badge"
      style={{ cursor:"default", padding:"8px 16px", fontSize:11 }}
      whileHover={{ borderColor:"var(--lime)", color:"var(--lime)", background:"var(--lime-dim)", scale:1.05 }}
      transition={{ duration:.2 }}
    >
      {label}
    </motion.span>
  );
}

/* ── Animated number ── */
export function AnimNumber({ value, suffix="" }) {
  return (
    <motion.span
      initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:.6, ease:[.2,.8,.2,1] }}
    >
      {value}{suffix}
    </motion.span>
  );
}
