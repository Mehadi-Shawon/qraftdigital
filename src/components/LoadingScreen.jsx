import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [pct, setPct]   = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPct(p => {
        if (p >= 100) { clearInterval(timer); setTimeout(() => setShow(false), 400); return 100; }
        return p + Math.floor(Math.random() * 12) + 4;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          style={{ position:"fixed", inset:0, zIndex:9999, background:"#07050f", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}
          exit={{ opacity:0, scale:1.04 }}
          transition={{ duration:.5, ease:[.2,.8,.2,1] }}
        >
          {/* Animated logo */}
          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.6, delay:.1 }}
            style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:36, fontWeight:700, textTransform:"uppercase", letterSpacing:"-.04em", color:"#fff", marginBottom:40 }}
          >
            Nexbee<span style={{ color:"#CCFF00" }}>Labs</span>
          </motion.div>

          {/* Orbiting ring */}
          <motion.div
            animate={{ rotate:360 }}
            transition={{ repeat:Infinity, duration:2, ease:"linear" }}
            style={{ width:60, height:60, border:"2px solid rgba(204,255,0,.15)", borderTopColor:"#CCFF00", borderRadius:"50%", marginBottom:32 }}
          />

          {/* Bar */}
          <div style={{ width:200, height:2, background:"rgba(255,255,255,.08)", overflow:"hidden" }}>
            <motion.div
              style={{ height:"100%", background:"#CCFF00", transformOrigin:"left" }}
              initial={{ scaleX:0 }} animate={{ scaleX: pct/100 }}
              transition={{ ease:"easeOut" }}
            />
          </div>
          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}
            style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)", marginTop:12, letterSpacing:".14em" }}
          >
            {Math.min(pct, 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
