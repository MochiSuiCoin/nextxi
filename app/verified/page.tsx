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
          Verified listings are reviewed and confirmed with official operators (clubs, academies, or authorised programme providers).
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
        <h2 style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>Benefits</h2>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li style={{ marginBottom: 8 }}>Verified badge on programme cards</li>
          <li style={{ marginBottom: 8 }}>Higher trust for families and players</li>
          <li style={{ marginBottom: 8 }}>Priority placement in results</li>
          <li style={{ marginBottom: 8 }}>Direct enquiry routing (manual for now)</li>
          <li>Basic performance insights (coming soon)</li>
        </ul>
      </div>

      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 32,
          backgroundColor: "#fff3e0",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>Not a guarantee</h2>
        <p style={{ lineHeight: 1.6, margin: 0 }}>
          Verified does not guarantee selection, trials, visas, or outcomes.
        </p>
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
        <h2 style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>What we need to verify</h2>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li style={{ marginBottom: 8 }}>Official website URL</li>
          <li style={{ marginBottom: 8 }}>Official contact email</li>
          <li style={{ marginBottom: 8 }}>
            Proof of affiliation (e.g., club letter, staff role, or authorised documentation)
          </li>
          <li>Programme dates/structure and inclusions (if applicable)</li>
        </ul>
      </div>

      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 32,
          backgroundColor: "#e3f2fd",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>Request verification</h2>
        <p style={{ marginBottom: 20, lineHeight: 1.6 }}>
          Ready to get verified? Send us your details and we'll review your programme.
        </p>
        <a
          href="mailto:info@nextxi.com?subject=NextXI Verified Listing Request"
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
          Request Verification
        </a>
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
        <span style={{ color: "#ccc" }}>|</span>
        <Link
          href="/submit"
          style={{
            color: "#0070f3",
            textDecoration: "underline",
          }}
        >
          Submit a programme →
        </Link>
      </div>
    </main>
  );
}

