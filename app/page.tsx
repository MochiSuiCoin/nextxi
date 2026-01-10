import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Search,
  PlusCircle,
  Compass,
  SlidersHorizontal,
  Handshake,
  ClipboardList,
  Globe,
  CheckCircle,
} from "lucide-react";
import EmailCapture from "@/components/EmailCapture";

export default async function Home() {
  // Fetch stats for trust section
  const [programmeCount, countryCount] = await Promise.all([
    prisma.programme.count(),
    prisma.programme.findMany({
      select: { country: true },
      distinct: ["country"],
    }),
  ]);

  const uniqueCountries = countryCount.length;

  return (
    <main style={{ padding: 0 }}>
      {/* Hero Section */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 40px",
        }}
      >
        <div
          style={{
            maxWidth: 600,
            padding: "48px",
            backgroundColor: "#f9fafb",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            borderRadius: 10,
          }}
        >
          <h1
            style={{
              fontSize: 50,
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 24,
              color: "#000",
            }}
          >
            NextXI
          </h1>
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.6,
              color: "#666",
              marginBottom: 40,
            }}
          >
            A global platform connecting players and families with elite football and futsal academies, camps, and development programmes worldwide.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link
              href="/programmes"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                backgroundColor: "#0070f3",
                color: "white",
                textDecoration: "none",
                borderRadius: 6,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              <Search size={18} />
              Browse Programmes
            </Link>
            <Link
              href="/submit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                backgroundColor: "transparent",
                color: "#0070f3",
                textDecoration: "none",
                borderRadius: 6,
                fontSize: 16,
                fontWeight: 500,
                border: "1px solid #0070f3",
              }}
            >
              <PlusCircle size={18} />
              Submit a Programme
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 40px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .how-it-works-card {
            transition: all 0.2s ease;
          }
          .how-it-works-card:hover {
            border-color: #0070f3;
            box-shadow: 0 2px 8px rgba(0, 112, 243, 0.1);
            transform: translateY(-2px);
          }
        `}} />
        <h2
          style={{
            fontSize: 32,
            fontWeight: 600,
            marginBottom: 48,
            textAlign: "center",
            color: "#000",
          }}
        >
          How it works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 40,
          }}
        >
          <div
            className="how-it-works-card"
            style={{
              padding: 32,
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              backgroundColor: "white",
              minHeight: "220px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 32,
                color: "#0070f3",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Compass size={28} />
              <span style={{ fontSize: 20, fontWeight: 600 }}>01</span>
            </div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 12,
                color: "#000",
              }}
            >
              Discover
            </h3>
            <p style={{ lineHeight: 1.6, color: "#666", margin: 0, flex: 1 }}>
              Browse our curated platform of verified football and futsal programmes across multiple countries and levels.
            </p>
          </div>
          <div
            className="how-it-works-card"
            style={{
              padding: 32,
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              backgroundColor: "white",
              minHeight: "220px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 32,
                color: "#0070f3",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <SlidersHorizontal size={28} />
              <span style={{ fontSize: 20, fontWeight: 600 }}>02</span>
            </div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 12,
                color: "#000",
              }}
            >
              Compare
            </h3>
            <p style={{ lineHeight: 1.6, color: "#666", margin: 0, flex: 1 }}>
              Filter by country, level, boarding options, and more to find programmes that match your requirements.
            </p>
          </div>
          <div
            className="how-it-works-card"
            style={{
              padding: 32,
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              backgroundColor: "white",
              minHeight: "220px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 32,
                color: "#0070f3",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Handshake size={28} />
              <span style={{ fontSize: 20, fontWeight: 600 }}>03</span>
            </div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 12,
                color: "#000",
              }}
            >
              Connect
            </h3>
            <p style={{ lineHeight: 1.6, color: "#666", margin: 0, flex: 1 }}>
              Access official programme websites and contact information to reach out directly to academies and providers.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 40px",
          borderTop: "1px solid rgba(0, 0, 0, 0.08)",
          marginTop: 0,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 48,
            textAlign: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 32,
                color: "#0070f3",
                marginBottom: 12,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ClipboardList size={32} />
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#000",
                marginBottom: 8,
              }}
            >
              {programmeCount}+
            </div>
            <p style={{ fontSize: 16, color: "#666", margin: 0 }}>
              Programmes listed
            </p>
          </div>
          <div>
            <div
              style={{
                fontSize: 32,
                color: "#0070f3",
                marginBottom: 12,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Globe size={32} />
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#000",
                marginBottom: 8,
              }}
            >
              {uniqueCountries}+
            </div>
            <p style={{ fontSize: 16, color: "#666", margin: 0 }}>
              Countries represented
            </p>
          </div>
          <div>
            <div
              style={{
                fontSize: 32,
                color: "#0070f3",
                marginBottom: 12,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CheckCircle size={32} />
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#000",
                marginBottom: 8,
              }}
            >
              100%
            </div>
            <p style={{ fontSize: 16, color: "#666", margin: 0 }}>
              Manually reviewed
            </p>
          </div>
        </div>
      </section>

      {/* Email Capture Module */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px 40px",
        }}
      >
        <EmailCapture />
      </section>

      {/* Footer */}
      <footer
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px",
          borderTop: "1px solid rgba(0, 0, 0, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ color: "#666", fontSize: 14 }}>© NextXI</div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Link
            href="/submit"
            style={{
              color: "#666",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Submit a Programme
          </Link>
          <Link
            href="/verified"
            style={{
              color: "#666",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Verified
          </Link>
        </div>
      </footer>
    </main>
  );
}
