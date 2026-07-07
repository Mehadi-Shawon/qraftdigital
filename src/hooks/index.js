import { useState, useEffect } from "react";

/* ── Per-page SEO: title, description, canonical, Open Graph, Twitter card ── */
const SITE_URL   = "https://qraftdigital.com";
const SITE_NAME  = "Qraft Digital";
const DEFAULT_OG_IMAGE = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=630&fit=crop";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({ title, description, path = "/", noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Websites, AI Automation & Maintenance`;
    const desc = description || "Qraft Digital designs and builds websites, automates workflows with AI, and keeps it all running — based in Dhaka, working worldwide.";
    const url  = `${SITE_URL}${path === "/" ? "" : path}`;

    document.title = fullTitle;
    upsertMeta("name", "description", desc);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:image", DEFAULT_OG_IMAGE);
    upsertMeta("property", "og:site_name", SITE_NAME);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", desc);
    upsertMeta("name", "twitter:image", DEFAULT_OG_IMAGE);
  }, [title, description, path]);
}

/* ── Scroll reveal (vanilla, for non-framer sections) ── */
export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    const t = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    }, 50);
    return () => { clearTimeout(t); obs.disconnect(); };
  });
}

/* ── Animated counter ── */
export function useCountUp(target, duration = 1400, inView) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let val = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      val += step;
      if (val >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(val));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

/* ── Typewriter ── */
export function useTypewriter(words, typingSpeed = 80, deletingSpeed = 40, pause = 1600) {
  const [text, setText]       = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const speed = deleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setWordIdx(p => (p + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, wordIdx, words, typingSpeed, deletingSpeed, pause]);

  return text;
}

/* ── 3D tilt on mouse move ── */
export function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      el.style.transform = `perspective(1200px) rotateX(${y * -12}deg) rotateY(${x * 12}deg) translateZ(10px)`;
    };
    const handleLeave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => { el.removeEventListener("mousemove", handleMove); el.removeEventListener("mouseleave", handleLeave); };
  }, [ref]);
}
