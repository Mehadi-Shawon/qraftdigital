import { useSEO } from "../hooks";
import { Icon, LimeBtn, GhostBtn } from "../components/UI";

export default function NotFoundPage({ navigate }) {
  useSEO({ title:"Page Not Found", path:"/404", noindex:true });

  return (
    <section style={{ minHeight:"70vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"clamp(64px,10vw,120px) clamp(20px,4vw,40px)" }}>
      <div style={{ textAlign:"center", maxWidth:520 }}>
        <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(64px,10vw,120px)", fontWeight:700, color:"var(--lime)", lineHeight:1, marginBottom:16 }}>404</p>
        <h1 className="h2" style={{ marginBottom:16 }}>Page not found.</h1>
        <p className="body-sm" style={{ marginBottom:36 }}>The page you're looking for doesn't exist or may have moved.</p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <LimeBtn onClick={() => navigate("home")}>Back Home <Icon name="arrow_forward" style={{ fontSize:17 }} /></LimeBtn>
          <GhostBtn onClick={() => navigate("contact")}>Contact Us</GhostBtn>
        </div>
      </div>
    </section>
  );
}
