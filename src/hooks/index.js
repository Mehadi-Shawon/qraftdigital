import { useState, useEffect, useRef } from "react";

/* ── Cursor ── */
export function useCursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX + "px"; cursorRef.current.style.top = e.clientY + "px"; }
      if (ringRef.current)   { ringRef.current.style.left  = e.clientX + "px"; ringRef.current.style.top  = e.clientY + "px"; }
    };
    const over = (e) => {
      if (e.target.closest("a,button,[data-cursor]")) {
        cursorRef.current?.classList.add("hovered");
        ringRef.current?.classList.add("hovered");
      }
    };
    const out = () => { cursorRef.current?.classList.remove("hovered"); ringRef.current?.classList.remove("hovered"); };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); };
  }, []);
  return { cursorRef, ringRef };
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
