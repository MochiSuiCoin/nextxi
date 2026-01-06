import Link from "next/link";

export default function VerifiedPage() {
  return (
    <main style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ marginBottom: 8 }}>Verified Listings</h1>
        <Link href="/programmes" style={{ color: "blue", textDecoration: "underline" }}>
          ← Back to Programmes
        </Link>
      </div>

      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 32,
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>What Verified means</h2>
        <p style={{ lineHeight: 1.6, margin: 0 }}>
          Verified listings on NextXI are programmes that have been reviewed and confirmed with official operators—clubs, academies, or authorised programme providers. This designation indicates that the programme information has been validated through direct contact with the organisation.
        </p>
      </div>

      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 32,
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>Benefits of verification</h2>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li style={{ marginBottom: 12 }}>
            <strong>Trust:</strong> Verified programmes display a badge that signals legitimacy and authenticity to families and players searching for opportunities.
          </li>
          <li style={{ marginBottom: 12 }}>
            <strong>Visibility:</strong> Verified listings receive priority placement in search results, increasing exposure to potential participants.
          </li>
          <li style={{ marginBottom: 12 }}>
            <strong>Credibility:</strong> The verification process confirms official affiliation and operational status, establishing credibility within the NextXI directory.
          </li>
        </ul>
      </div>

      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 32,
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>Verification process</h2>
        <p style={{ lineHeight: 1.6, marginBottom: 12 }}>
          To become verified, programmes must provide:
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li style={{ marginBottom: 8 }}>Official website URL</li>
          <li style={{ marginBottom: 8 }}>Official contact email address</li>
          <li style={{ marginBottom: 8 }}>
            Documentation confirming affiliation (club letter, staff credentials, or authorised documentation)
          </li>
          <li>Programme structure and operational details</li>
        </ul>
      </div>

      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 32,
          backgroundColor: "#f9f9f9",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>Get started</h2>
        <p style={{ marginBottom: 24, lineHeight: 1.6 }}>
          Submit your programme for review. Once accepted, you can request verification status.
        </p>
        <Link
          href="/submit"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Submit Programme
        </Link>
      </div>

      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <Link
          href="/programmes"
          style={{
            color: "#0070f3",
            textDecoration: "underline",
          }}
        >
          Browse all programmes →
        </Link>
      </div>
    </main>
  );
}

