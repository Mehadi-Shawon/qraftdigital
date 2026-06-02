import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "../components/UI";

const Section = ({ title, children }) => (
  <Reveal>
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(18px,2.5vw,22px)", fontWeight:700, color:"var(--text)", letterSpacing:"-.02em", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
        <span style={{ width:3, height:20, background:"var(--lime)", display:"inline-block", flexShrink:0 }} />
        {title}
      </h2>
      <div style={{ color:"var(--text2)", fontSize:15, lineHeight:1.85, paddingLeft:15 }}>
        {children}
      </div>
    </div>
  </Reveal>
);

const P = ({ children, style }) => (
  <p style={{ marginBottom:14, ...style }}>{children}</p>
);

const Li = ({ children }) => (
  <li style={{ marginBottom:8, paddingLeft:8, display:"flex", gap:10 }}>
    <span style={{ color:"var(--lime)", flexShrink:0, marginTop:2 }}>—</span>
    <span>{children}</span>
  </li>
);

export default function TermsPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ position:"relative", overflow:"hidden", background:"linear-gradient(160deg, rgba(20,10,50,0.9) 0%, rgba(4,2,12,1) 100%)", borderBottom:"1px solid var(--border)", padding:"clamp(64px,10vw,120px) clamp(20px,4vw,40px) clamp(48px,6vw,80px)" }}>
        <div style={{ position:"absolute", top:-100, right:-100, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(88,28,135,0.2) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(204,255,0,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(204,255,0,.012) 1px,transparent 1px)", backgroundSize:"80px 80px", pointerEvents:"none" }} />
        <div style={{ maxWidth:860, margin:"0 auto", position:"relative" }}>
          <Reveal>
            <SectionLabel>Legal</SectionLabel>
            <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(36px,6vw,64px)", fontWeight:700, color:"var(--text)", letterSpacing:"-.04em", lineHeight:1.1, marginBottom:20 }}>
              Terms of<br /><span style={{ color:"var(--lime)" }}>Service</span>
            </h1>
            <p style={{ color:"var(--text2)", fontSize:"clamp(14px,1.8vw,17px)", lineHeight:1.7, maxWidth:560 }}>
              Please read these terms carefully before using our services. By engaging with Qraft Digital, you agree to be bound by these terms.
            </p>
            <p style={{ color:"var(--text3)", fontSize:12, marginTop:20, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".06em", textTransform:"uppercase" }}>Last updated: June 2025</p>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth:860, margin:"0 auto", padding:"clamp(48px,6vw,80px) clamp(20px,4vw,40px) clamp(64px,10vw,120px)" }}>

        <Section title="1. Acceptance of Terms">
          <P>By accessing our website, requesting a quote, or engaging Qraft Digital for any service, you confirm that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations.</P>
          <P>If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these terms.</P>
        </Section>

        <Section title="2. Services">
          <P>Qraft Digital provides digital engineering services including, but not limited to:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li>Custom web design and development</Li>
            <Li>Mobile application development</Li>
            <Li>Brand identity and visual design</Li>
            <Li>E-commerce solutions</Li>
            <Li>SEO strategy and digital growth</Li>
            <Li>Custom software development</Li>
          </ul>
          <P>The specific scope, deliverables, timeline, and pricing for each engagement are defined in a separate Statement of Work (SOW) or project proposal agreed upon by both parties.</P>
        </Section>

        <Section title="3. Project Engagement & Payments">
          <P>All projects commence upon receipt of a signed proposal and initial deposit as specified. Standard payment terms are:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li>50% deposit required before project kickoff</Li>
            <Li>Remaining balance due upon project completion or as milestone-based per the SOW</Li>
            <Li>Invoices are due within 14 days of issuance</Li>
            <Li>Late payments beyond 30 days may incur a 2% monthly interest charge</Li>
          </ul>
          <P>All prices are quoted in USD unless otherwise specified. We reserve the right to pause work on accounts with overdue balances.</P>
        </Section>

        <Section title="4. Client Responsibilities">
          <P>To ensure timely delivery, the client agrees to:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li>Provide all required materials, content, and assets within agreed timelines</Li>
            <Li>Designate a single point of contact with authority to provide approvals</Li>
            <Li>Provide timely feedback within the review periods specified in the SOW</Li>
            <Li>Ensure all provided materials are owned by or licensed to the client</Li>
          </ul>
          <P>Project delays caused by late client feedback or missing assets may result in revised delivery timelines and/or additional fees.</P>
        </Section>

        <Section title="5. Intellectual Property">
          <P>Upon receipt of full payment, the client receives full ownership of all custom-created deliverables specific to their project, including design files and source code.</P>
          <P>Qraft Digital retains ownership of:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li>Pre-existing tools, frameworks, libraries, and methodologies used in delivery</Li>
            <Li>Internal processes, templates, and development workflows</Li>
            <Li>Any work not fully paid for under the agreed terms</Li>
          </ul>
          <P>We reserve the right to display completed projects in our portfolio and marketing materials unless a Non-Disclosure Agreement (NDA) is in place.</P>
        </Section>

        <Section title="6. Revisions & Change Requests">
          <P>Each project includes a defined number of revision rounds as outlined in the SOW. Revisions beyond the included scope will be billed at our standard hourly rate.</P>
          <P>Significant changes to project scope, direction, or requirements after kickoff constitute a change order and will be quoted and approved separately before work proceeds.</P>
        </Section>

        <Section title="7. Confidentiality">
          <P>Both parties agree to keep confidential any proprietary information shared during the engagement. We take our clients' business information seriously and will not disclose it to third parties without explicit consent, except as required by law.</P>
          <P>Where a formal NDA is required, this must be established before project kickoff.</P>
        </Section>

        <Section title="8. Limitation of Liability">
          <P>Qraft Digital's total liability to the client for any cause whatsoever shall not exceed the total fees paid by the client in the three (3) months preceding the event giving rise to the claim.</P>
          <P>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or business opportunities, even if we have been advised of the possibility of such damages.</P>
        </Section>

        <Section title="9. Warranties & Disclaimer">
          <P>We warrant that all services will be performed professionally and in accordance with industry standards. We will remedy any defects in our deliverables reported within 30 days of delivery at no additional charge.</P>
          <P>Beyond this, all services are provided "as is." We make no warranties, express or implied, regarding third-party platforms, hosting services, or software dependencies outside our direct control.</P>
        </Section>

        <Section title="10. Termination">
          <P>Either party may terminate an engagement with 14 days written notice. Upon termination:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li>The client is responsible for payment of all work completed to the date of termination</Li>
            <Li>Deposits are non-refundable once work has commenced</Li>
            <Li>Completed deliverables paid in full will be transferred to the client</Li>
          </ul>
        </Section>

        <Section title="11. Governing Law">
          <P>These terms are governed by and construed in accordance with the laws of Bangladesh. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.</P>
          <P>For international clients, both parties agree to attempt good-faith resolution before pursuing formal legal proceedings.</P>
        </Section>

        <Section title="12. Contact">
          <P>For any questions regarding these Terms of Service, please contact us:</P>
          <ul style={{ listStyle:"none" }}>
            <Li>Email: <span style={{ color:"var(--lime)" }}>hello@qraftdigital.com</span></Li>
            <Li>Location: Dhaka, Bangladesh</Li>
            <Li>Response time: Within 24 business hours</Li>
          </ul>
        </Section>

        <Reveal>
          <div style={{ borderTop:"1px solid var(--border)", paddingTop:32, marginTop:16 }}>
            <p style={{ color:"var(--text3)", fontSize:12, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".06em", textTransform:"uppercase" }}>
              Qraft Digital reserves the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the revised terms.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
