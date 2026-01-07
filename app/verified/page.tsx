import Link from "next/link";

export default function VerifiedPage() {
  return (
    <main style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ marginBottom: 8 }}>Verified Programmes</h1>
        <Link href="/programmes" style={{ color: "blue", textDecoration: "underline" }}>
          ← Back to Programmes
        </Link>
      </div>

      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 24,
          backgroundColor: "#f9fafb",
        }}
      >
        <p style={{ marginBottom: 12, lineHeight: 1.6 }}>
          NextXI verifies selected programmes to help families identify legitimate, established football and futsal opportunities with confidence.
        </p>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Verification is an additional review process that confirms key programme details directly with the academy or operator.
        </p>
      </div>

      {/* What verification means */}
      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 24,
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>What verification means</h2>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li style={{ marginBottom: 8 }}>
            Programme details have been reviewed for accuracy
          </li>
          <li style={{ marginBottom: 8 }}>
            The academy or operator has been directly contacted
          </li>
          <li style={{ marginBottom: 8 }}>
            Official websites and contact information are confirmed
          </li>
          <li>Information is kept up to date where possible</li>
        </ul>
      </div>

      {/* Why verification matters for families */}
      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 24,
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Why verification matters for families</h2>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Families researching international programmes often rely on limited or inconsistent information. Verification provides an added layer of confidence that a programme is legitimate, active, and accurately represented.
        </p>
      </div>

      {/* For academies and programme operators */}
      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 24,
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>For academies and programme operators</h2>
        <p style={{ marginBottom: 12, lineHeight: 1.6 }}>
          Verification allows academies and operators to present their programmes with greater credibility and visibility on NextXI.
        </p>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Verified programmes are clearly marked and may be prioritised in listings or featured in future platform updates.
        </p>
      </div>

      {/* Request verification */}
      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 24,
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Request verification</h2>
        <p style={{ marginBottom: 24, lineHeight: 1.6 }}>
          If you represent an academy or programme listed on NextXI and would like to request verification, you can contact us below. Verification is optional and subject to review.
        </p>
        <a
          href="mailto:verified@nextxi.io"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Request Verification
        </a>
        <p
          style={{
            marginTop: 20,
            marginBottom: 0,
            fontSize: 13,
            color: "#666",
            fontStyle: "italic",
          }}
        >
          Verification is offered at NextXI's discretion and does not imply endorsement or guarantee of placement.
        </p>
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Link href="/programmes" style={{ color: "#0070f3", textDecoration: "underline" }}>
          Browse all programmes →
        </Link>
      </div>
    </main>
  );
}

