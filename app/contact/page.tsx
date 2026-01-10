import Link from "next/link";

interface SearchParams {
  success?: string;
  error?: string;
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const isSuccess = params.success === "true";
  const isError = params.error === "true";

  return (
    <main style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ marginBottom: 8 }}>Contact Us</h1>
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
          backgroundColor: "#f9fafb",
        }}
      >
        <p style={{ marginBottom: 12, lineHeight: 1.6 }}>
          Have a question about NextXI or need support? We're here to help.
        </p>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Email us at{" "}
          <a
            href="mailto:hello@nextxi.io"
            style={{ color: "#0070f3", textDecoration: "underline" }}
          >
            hello@nextxi.io
          </a>{" "}
          or use the form below.
        </p>
      </div>

      {isSuccess && (
        <div
          style={{
            padding: 20,
            border: "1px solid #4caf50",
            borderRadius: 8,
            marginBottom: 32,
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
          }}
        >
          <p style={{ margin: 0, fontWeight: 500 }}>
            ✓ Thank you! Your message has been received. We'll respond within 24 hours.
          </p>
        </div>
      )}

      {isError && (
        <div
          style={{
            padding: 20,
            border: "1px solid #f44336",
            borderRadius: 8,
            marginBottom: 32,
            backgroundColor: "#ffebee",
            color: "#c62828",
          }}
        >
          <p style={{ margin: 0, fontWeight: 500 }}>
            {params.error === "rate_limit"
              ? "Too many submissions. Please try again later."
              : "There was an error sending your message. Please try again."}
          </p>
        </div>
      )}

      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 32,
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: 20, fontSize: 20, fontWeight: 600 }}>Send us a message</h2>
        <form
          action="/api/contact"
          method="post"
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div>
            <label htmlFor="name" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
              Name <span style={{ color: "#d32f2f" }}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
              Email <span style={{ color: "#d32f2f" }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label htmlFor="subject" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
              Subject <span style={{ color: "#d32f2f" }}>*</span>
            </label>
            <select
              id="subject"
              name="subject"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 14,
                backgroundColor: "white",
                boxSizing: "border-box",
              }}
            >
              <option value="">Select a subject...</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Programme Submission">Programme Submission</option>
              <option value="Verification Request">Verification Request</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Partnership">Partnership</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
              Message <span style={{ color: "#d32f2f" }}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 14,
                fontFamily: "inherit",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Honeypot field - hidden from users, traps bots */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              opacity: 0,
              pointerEvents: "none",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            Send Message
          </button>
        </form>
      </div>

      <div
        style={{
          padding: 20,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          backgroundColor: "#f9f9f9",
        }}
      >
        <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
          <strong>Expected response time:</strong> We'll respond within 24 hours.
        </p>
      </div>
    </main>
  );
}

