import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./UI";

export default function MobileMenu({ open, navigate, page, onClose }) {
  const links = [
    { page:"home",     label:"Home"    },
    { page:"services", label:"Services"},
    { page:"work",     label:"Work"    },
    { page:"about",    label:"About"   },
    { page:"contact",  label:"Contact" },
  ];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity:0, scale:1.04 }}
          animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0, scale:1.04 }}
          transition={{ duration:.35, ease:[.2,.8,.2,1] }}
        >
          <motion.button
            onClick={onClose}
            style={{ position:"absolute", top:32, right:40, background:"none", border:"none", color:"var(--text2)" }}
            whileHover={{ rotate:90, color:"var(--lime)" }}
            transition={{ duration:.2 }}
          >
            <Icon name="close" style={{ fontSize:32 }} />
          </motion.button>

          {links.map(({ page: p, label }, i) => (
            <motion.a
              key={p}
              className={page===p ? "active" : ""}
              onClick={() => { navigate(p); onClose(); }}
              initial={{ opacity:0, x:-30 }}
              animate={{ opacity:1, x:0 }}
              transition={{ delay: i * 0.07, duration:.4, ease:[.2,.8,.2,1] }}
              whileHover={{ x:12 }}
            >
              {label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
