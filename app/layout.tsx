import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nextxi.io"),
  title: {
    default: "NextXI – Football & Futsal Academy Directory",
    template: "%s – NextXI",
  },
  description: "A curated directory of elite football and futsal academies, camps, and development programmes worldwide.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "32x32" }],
  },
  openGraph: {
    title: "NextXI – Football & Futsal Academy Directory",
    description: "A curated directory of elite football and futsal academies, camps, and development programmes worldwide.",
    siteName: "NextXI",
    type: "website",
    images: [
      {
        url: "/brand/nextxi-logo.svg",
        width: 400,
        height: 100,
        alt: "NextXI Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextXI – Football & Futsal Academy Directory",
    description: "A curated directory of elite football and futsal academies, camps, and development programmes worldwide.",
    images: ["/brand/nextxi-logo.svg"],
  },
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
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                marginRight: "auto",
                height: 32,
              }}
            >
              <img
                src="/brand/nextxi-logo.svg"
                alt="NextXI"
                height={30}
                style={{
                  height: "30px",
                  width: "auto",
                }}
              />
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
                color: "#000",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
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
              href="/contact"
              style={{
                color: "#666",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              Contact
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
