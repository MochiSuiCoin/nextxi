"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const formData = new FormData(e.currentTarget);

      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      style={{
        backgroundColor: "#F8F9FA",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        padding: "40px",
        margin: "0 auto",
        maxWidth: 600,
        borderRadius: 8,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 8,
            color: "#000",
          }}
        >
          Stay Updated on New Programmes
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "#666",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Get notified when elite academies and camps are added to our platform
        </p>
      </div>

      {status === "success" ? (
        <div
          style={{
            padding: 16,
            backgroundColor: "#e8f5e9",
            border: "1px solid #4caf50",
            borderRadius: 4,
            color: "#2e7d32",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontWeight: 500 }}>
            ✓ Thank you! You'll be notified when new programmes are added.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === "loading"}
              style={{
                flex: 1,
                minWidth: 200,
                padding: "12px 16px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading" || !email}
              style={{
                padding: "12px 24px",
                backgroundColor: status === "loading" ? "#ccc" : "#0070f3",
                color: "white",
                border: "none",
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 500,
                cursor: status === "loading" ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {status === "loading" ? "Subscribing..." : "Notify Me"}
            </button>
          </div>

          {status === "error" && errorMessage && (
            <div
              style={{
                padding: 12,
                backgroundColor: "#ffebee",
                border: "1px solid #f44336",
                borderRadius: 4,
                color: "#c62828",
                fontSize: 14,
              }}
            >
              {errorMessage}
            </div>
          )}

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

          <p
            style={{
              fontSize: 12,
              color: "#999",
              textAlign: "center",
              margin: 0,
            }}
          >
            We respect your inbox. Unsubscribe anytime.
          </p>
        </form>
      )}
    </section>
  );
}
