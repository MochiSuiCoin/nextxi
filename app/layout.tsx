import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NextXI - Football & Futsal Academy Directory",
  description: "Find football and futsal academy programmes across Europe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header
          style={{
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: "white",
            padding: "16px 40px",
          }}
        >
          <nav
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              gap: 24,
              alignItems: "center",
            }}
          >
            <Link
              href="/"
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#000",
                textDecoration: "none",
                marginRight: "auto",
              }}
            >
              NextXI
            </Link>
            <Link
              href="/"
              style={{
                color: "#666",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              Home
            </Link>
            <Link
              href="/programmes"
              style={{
                color: "#666",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              Programmes
            </Link>
            <Link
              href="/submit"
              style={{
                color: "#666",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              Submit
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
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
