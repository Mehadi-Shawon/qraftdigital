import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "../components/UI";
import { useSEO } from "../hooks";

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

export default function PrivacyPage() {
  useSEO({
    title: "Privacy Policy",
    description: "How Qraft Digital collects, uses, and protects your personal data.",
    path: "/privacy",
  });
  return (
    <div>
      {/* Hero */}
      <section style={{ position:"relative", overflow:"hidden", background:"linear-gradient(160deg, rgba(20,10,50,0.9) 0%, rgba(4,2,12,1) 100%)", borderBottom:"1px solid var(--border)", padding:"clamp(64px,10vw,120px) clamp(20px,4vw,40px) clamp(48px,6vw,80px)" }}>
        <div style={{ position:"absolute", top:-100, left:-100, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(204,255,0,0.1) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(204,255,0,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(204,255,0,.012) 1px,transparent 1px)", backgroundSize:"80px 80px", pointerEvents:"none" }} />
        <div style={{ maxWidth:860, margin:"0 auto", position:"relative" }}>
          <Reveal>
            <SectionLabel>Legal</SectionLabel>
            <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(36px,6vw,64px)", fontWeight:700, color:"var(--text)", letterSpacing:"-.04em", lineHeight:1.1, marginBottom:20 }}>
              Privacy<br /><span style={{ color:"var(--lime)" }}>Policy</span>
            </h1>
            <p style={{ color:"var(--text2)", fontSize:"clamp(14px,1.8vw,17px)", lineHeight:1.7, maxWidth:560 }}>
              Your privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have.
            </p>
            <p style={{ color:"var(--text3)", fontSize:12, marginTop:20, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".06em", textTransform:"uppercase" }}>Last updated: June 2025</p>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth:860, margin:"0 auto", padding:"clamp(48px,6vw,80px) clamp(20px,4vw,40px) clamp(64px,10vw,120px)" }}>

        <Section title="1. Who We Are">
          <P>Qraft Digital is a digital engineering agency based in Dhaka, Bangladesh, operating globally. We build websites, mobile applications, brand identities, and custom software for clients worldwide.</P>
          <P>For any privacy-related enquiries, contact us at <span style={{ color:"var(--lime)" }}>write.shawon@gmail.com</span>.</P>
        </Section>

        <Section title="2. Information We Collect">
          <P>We collect information you provide directly to us when you:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li>Submit an enquiry or contact form on our website</Li>
            <Li>Start a project or respond to a proposal</Li>
            <Li>Communicate with us via email, phone, or messaging platforms</Li>
            <Li>Subscribe to any communications from us</Li>
          </ul>
          <P>This information may include your name, email address, company name, phone number, and details about your project or business.</P>
          <P>We also automatically collect certain technical information when you visit our website, including IP address, browser type, pages visited, time spent on pages, and referring URLs — via standard web analytics tools.</P>
        </Section>

        <Section title="3. How We Use Your Information">
          <P>We use the information we collect to:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li>Respond to your enquiries and deliver our services</Li>
            <Li>Send project updates, proposals, and invoices</Li>
            <Li>Improve our website, services, and user experience</Li>
            <Li>Comply with legal obligations</Li>
            <Li>Send relevant updates or newsletters (only where you have opted in)</Li>
          </ul>
          <P>We will never sell, rent, or trade your personal information to third parties for their marketing purposes.</P>
        </Section>

        <Section title="4. Legal Framework">
          <P>Bangladesh does not yet have a single, comprehensive data protection statute. We process personal data in line with the Information and Communication Technology Act, 2006, the Cyber Security Act, 2023, applicable directives of the Bangladesh Telecommunication Regulatory Commission (BTRC), and the following general principles:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li><strong style={{ color:"var(--text)" }}>Contractual necessity</strong> — to fulfil a project or service agreement</Li>
            <Li><strong style={{ color:"var(--text)" }}>Legitimate interests</strong> — to respond to enquiries and improve our services</Li>
            <Li><strong style={{ color:"var(--text)" }}>Consent</strong> — for marketing communications, which you may withdraw at any time</Li>
            <Li><strong style={{ color:"var(--text)" }}>Legal obligation</strong> — where disclosure is required by a competent Bangladeshi court or authority</Li>
          </ul>
        </Section>

        <Section title="5. Cookies & Tracking">
          <P>Our website uses cookies and similar tracking technologies to enhance your experience and analyse site traffic. Types of cookies we use:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li><strong style={{ color:"var(--text)" }}>Essential cookies</strong> — required for the website to function correctly</Li>
            <Li><strong style={{ color:"var(--text)" }}>Analytics cookies</strong> — help us understand how visitors interact with our site (e.g., Google Analytics)</Li>
            <Li><strong style={{ color:"var(--text)" }}>Preference cookies</strong> — remember your settings such as theme preference</Li>
          </ul>
          <P>You can control or disable cookies through your browser settings. Disabling certain cookies may affect website functionality.</P>
        </Section>

        <Section title="6. Third-Party Services">
          <P>We use a limited number of trusted third-party services to operate our business:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li><strong style={{ color:"var(--text)" }}>Formspree</strong> — to process contact and project enquiry forms</Li>
            <Li><strong style={{ color:"var(--text)" }}>Google Analytics</strong> — for website traffic analysis</Li>
            <Li><strong style={{ color:"var(--text)" }}>Stripe / payment processors</strong> — for invoicing and payment processing</Li>
          </ul>
          <P>Each third-party provider is bound by their own privacy policy and data processing agreements. We only share data necessary for them to perform their function.</P>
        </Section>

        <Section title="7. Data Retention">
          <P>We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li>Enquiry data: up to 12 months if no project is initiated</Li>
            <Li>Project and client records: 7 years for legal and accounting purposes</Li>
            <Li>Analytics data: aggregated and anonymised after 26 months</Li>
          </ul>
          <P>You may request deletion of your data at any time, subject to legal retention obligations.</P>
        </Section>

        <Section title="8. Data Security">
          <P>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, destruction, or alteration. These include:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li>HTTPS encryption across all web communications</Li>
            <Li>Access controls limiting data to authorised personnel only</Li>
            <Li>Regular review of data handling practices</Li>
          </ul>
          <P>While we take all reasonable precautions, no method of transmission over the internet is completely secure. We cannot guarantee absolute security.</P>
          <P>In the event of a data breach affecting your personal information, we will take necessary remedial action and, where required, notify affected users and relevant authorities in accordance with the Cyber Security Act, 2023.</P>
        </Section>

        <Section title="9. Your Rights">
          <P>While Bangladeshi law does not currently mandate the full set of data-subject rights found in other jurisdictions, we voluntarily extend the following rights to our clients and users as a matter of good practice:</P>
          <ul style={{ listStyle:"none", marginBottom:14 }}>
            <Li><strong style={{ color:"var(--text)" }}>Access</strong> — request a copy of the data we hold about you</Li>
            <Li><strong style={{ color:"var(--text)" }}>Rectification</strong> — request correction of inaccurate or incomplete data</Li>
            <Li><strong style={{ color:"var(--text)" }}>Erasure</strong> — request deletion of your personal data</Li>
            <Li><strong style={{ color:"var(--text)" }}>Portability</strong> — request your data in a structured, machine-readable format</Li>
            <Li><strong style={{ color:"var(--text)" }}>Objection</strong> — object to processing based on legitimate interests</Li>
            <Li><strong style={{ color:"var(--text)" }}>Withdraw consent</strong> — for any processing based on your prior consent</Li>
          </ul>
          <P>To exercise any of these rights, email us at <span style={{ color:"var(--lime)" }}>write.shawon@gmail.com</span>. We will respond within 30 days.</P>
        </Section>

        <Section title="10. International Data Transfers">
          <P>As we operate globally, your data may be processed or stored on servers located outside Bangladesh, including through third-party hosting and cloud providers. Where this occurs, we take reasonable steps to ensure a comparable standard of protection, consistent with the safeguards expected under the Information and Communication Technology Act, 2006 and the Cyber Security Act, 2023.</P>
        </Section>

        <Section title="11. Children's Privacy">
          <P>Our services are not directed at individuals under the age of 18, the age of majority under the Majority Act, 1875. We do not knowingly collect personal data from minors without verified parental or guardian consent. If you believe we have inadvertently collected such data, please contact us immediately so we can delete it.</P>
        </Section>

        <Section title="12. Changes to This Policy">
          <P>We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. For significant changes, we will make reasonable efforts to notify affected clients directly.</P>
          <P>Continued use of our website or services after any changes constitutes acceptance of the updated policy.</P>
        </Section>

        <Section title="13. Contact Us">
          <P>For any questions, requests, or concerns about this Privacy Policy or your personal data:</P>
          <ul style={{ listStyle:"none" }}>
            <Li>Email: <span style={{ color:"var(--lime)" }}>write.shawon@gmail.com</span></Li>
            <Li>Location: Dhaka, Bangladesh</Li>
            <Li>Response time: Within 24 business hours</Li>
          </ul>
        </Section>

        <Reveal>
          <div style={{ borderTop:"1px solid var(--border)", paddingTop:32, marginTop:16 }}>
            <p style={{ color:"var(--text3)", fontSize:12, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:".06em", textTransform:"uppercase" }}>
              This policy applies to qraftdigital.com and all services provided by Qraft Digital. We are committed to protecting your privacy and handling your data with transparency and care.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
