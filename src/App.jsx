import { useCallback, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Header        from "./components/Header";
import MobileMenu    from "./components/MobileMenu";
import Footer        from "./components/Footer";
import HomePage      from "./pages/HomePage";
import ServicesPage  from "./pages/ServicesPage";
import WorkPage      from "./pages/WorkPage";
import AboutPage     from "./pages/AboutPage";
import ContactPage   from "./pages/ContactPage";
import TermsPage     from "./pages/TermsPage";
import PrivacyPage   from "./pages/PrivacyPage";
import NotFoundPage  from "./pages/NotFoundPage";
import "./styles/global.css";

const KEY_TO_PATH = {
  home:     "/",
  services: "/services",
  work:     "/work",
  about:    "/about",
  contact:  "/contact",
  terms:    "/terms",
  privacy:  "/privacy",
};

const pathToKey = (pathname) => {
  const seg = pathname.split("/")[1];
  return seg || "home";
};

function PageWrap({ children }) {
  return (
    <motion.main
      style={{ position:"relative", zIndex:3 }}
      initial={{ opacity:0, y:24 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, y:-16 }}
      transition={{ duration:.4, ease:[.2,.8,.2,1] }}
    >
      {children}
    </motion.main>
  );
}

function AppInner() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const rrNavigate = useNavigate();
  const page = pathToKey(location.pathname);

  const navigate = useCallback((key) => {
    rrNavigate(KEY_TO_PATH[key] ?? "/");
    setMobileOpen(false);
  }, [rrNavigate]);

  useEffect(() => {
    window.scrollTo({ top:0, behavior:"instant" });
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div style={{ minHeight:"100vh", position:"relative", zIndex:1 }}>
      <MobileMenu open={mobileOpen} navigate={navigate} page={page} onClose={() => setMobileOpen(false)} />
      <Header page={page} navigate={navigate} setMobileOpen={setMobileOpen} />

      {/* Page transitions */}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"         element={<PageWrap><HomePage     navigate={navigate} /></PageWrap>} />
          <Route path="/services" element={<PageWrap><ServicesPage navigate={navigate} /></PageWrap>} />
          <Route path="/work"     element={<PageWrap><WorkPage     navigate={navigate} /></PageWrap>} />
          <Route path="/about"    element={<PageWrap><AboutPage    navigate={navigate} /></PageWrap>} />
          <Route path="/contact"  element={<PageWrap><ContactPage  navigate={navigate} /></PageWrap>} />
          <Route path="/terms"    element={<PageWrap><TermsPage    navigate={navigate} /></PageWrap>} />
          <Route path="/privacy"  element={<PageWrap><PrivacyPage  navigate={navigate} /></PageWrap>} />
          <Route path="*"         element={<PageWrap><NotFoundPage navigate={navigate} /></PageWrap>} />
        </Routes>
      </AnimatePresence>

      <Footer navigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <>
      <LoadingScreen />
      <AppInner />
    </>
  );
}
