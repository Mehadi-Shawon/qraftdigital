import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { useCursor } from "./hooks";
import LoadingScreen from "./components/LoadingScreen";
import Header        from "./components/Header";
import MobileMenu    from "./components/MobileMenu";
import Footer        from "./components/Footer";
import HomePage      from "./pages/HomePage";
import ServicesPage  from "./pages/ServicesPage";
import WorkPage      from "./pages/WorkPage";
import AboutPage     from "./pages/AboutPage";
import ContactPage   from "./pages/ContactPage";
import "./styles/global.css";

const PAGES = {
  home:     HomePage,
  services: ServicesPage,
  work:     WorkPage,
  about:    AboutPage,
  contact:  ContactPage,
};

function AppInner() {
  const [page, setPage]             = useState("home");
  const [pageKey, setPageKey]       = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cursorRef, ringRef }      = useCursor();

  const navigate = useCallback((p) => {
    setPage(p);
    setPageKey(k => k + 1);
    setMobileOpen(false);
    window.scrollTo({ top:0, behavior:"instant" });
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const PageComponent = PAGES[page];

  return (
    <div style={{ minHeight:"100vh", position:"relative", zIndex:1 }}>
      {/* Ambient */}
      <div className="grain-overlay" />
      <div className="scanline" />
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef}   className="cursor-ring" />

      <MobileMenu open={mobileOpen} navigate={navigate} page={page} onClose={() => setMobileOpen(false)} />
      <Header page={page} navigate={navigate} setMobileOpen={setMobileOpen} />

      {/* Page transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pageKey}
          style={{ position:"relative", zIndex:3 }}
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-16 }}
          transition={{ duration:.4, ease:[.2,.8,.2,1] }}
        >
          <PageComponent navigate={navigate} />
        </motion.main>
      </AnimatePresence>

      <Footer navigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <AppInner />
    </ThemeProvider>
  );
}
