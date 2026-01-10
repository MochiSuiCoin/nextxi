import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

// Helper functions for badge normalization (matching programmes page)
function normalizeSport(sport: string | null | undefined): string | null {
  if (!sport) return null;
  const normalized = sport.trim().toLowerCase();
  if (normalized === "soccer" || normalized === "football") return "Football";
  if (normalized === "futsal") return "Futsal";
  if (normalized === "both") return "Both";
  return sport.trim();
}

function normalizeLevel(level: string | null | undefined): string | null {
  if (!level) return null;
  const normalized = level.trim().toLowerCase();
  if (normalized.includes("elite")) return "Elite";
  if (normalized.includes("development") || normalized === "dev") return "Development";
  if (normalized.includes("trial")) return "Trial";
  if (normalized.includes("camp")) return "Camp";
  if (normalized.includes("academy")) return "Other";
  return "Other";
}

function normalizeBoarding(boarding: string | null | undefined): string | null {
  if (!boarding) return null;
  const normalized = boarding.trim().toLowerCase();
  if (normalized === "yes" || normalized === "y" || normalized === "true") return "Yes";
  if (normalized === "no" || normalized === "n" || normalized === "false") return "No";
  if (normalized === "optional" || normalized === "opt") return "Optional";
  return boarding.trim();
}

function isVerified(sourceConfidence: string | null | undefined): boolean {
  if (!sourceConfidence) return false;
  return sourceConfidence.trim().toLowerCase() === "high";
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const programme = await prisma.programme.findUnique({
    where: { id: parseInt(id) },
  });

  if (!programme) {
    return {
      title: "Programme Not Found | NextXI",
    };
  }

  const title = `${programme.programmeName} | NextXI`;
  const location = programme.city
    ? `${programme.city}, ${programme.country}`
    : programme.country;
  const description = `${programme.programmeName} by ${programme.providerName} in ${location}. ${programme.sportType} ${programme.programmeType} programme.`.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "NextXI",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProgrammeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const programme = await prisma.programme.findUnique({
    where: { id: parseInt(id) },
  });

  if (!programme) return notFound();

  const badgeStyle = {
    padding: "4px 12px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 500,
    height: "24px",
    display: "inline-flex",
    alignItems: "center",
  };

  const location = programme.city
    ? `${programme.city}, ${programme.country}`
    : programme.country;

  const ageRange =
    programme.agesMin || programme.agesMax
      ? `${programme.agesMin || "?"}–${programme.agesMax || "?"}`
      : null;

  const verified = isVerified(programme.sourceConfidence);
  const lastReviewed = programme.updatedAt
    ? new Date(programme.updatedAt).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: 24, fontSize: 14 }}>
        <Link href="/" style={{ color: "#666", textDecoration: "none" }}>
          Home
        </Link>
        <span style={{ margin: "0 8px", color: "#999" }}>/</span>
        <Link href="/programmes" style={{ color: "#666", textDecoration: "none" }}>
          Programmes
        </Link>
        <span style={{ margin: "0 8px", color: "#999" }}>/</span>
        <span style={{ color: "#333" }}>{programme.programmeName}</span>
      </nav>

      {/* Main Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 32,
        }}
        className="programme-detail-grid"
      >
        {/* Left Column - Main Content */}
        <div>
          {/* Programme Title */}
          <h1 style={{ marginBottom: 8, fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>
            {programme.programmeName}
          </h1>

          {/* Provider Name */}
          <h2 style={{ marginBottom: 8, fontSize: 20, fontWeight: 500, color: "#666" }}>
            {programme.providerName}
          </h2>

          {/* Location */}
          <p style={{ marginBottom: 24, fontSize: 16, color: "#666" }}>{location}</p>

          {/* Key Facts Section */}
          <div
            style={{
              padding: 20,
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              marginBottom: 32,
              backgroundColor: "#f9fafb",
            }}
          >
            <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Key Facts</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {normalizeSport(programme.sportType) && (
                <span
                  style={{
                    ...badgeStyle,
                    backgroundColor: "#e3f2fd",
                    color: "#1976d2",
                  }}
                >
                  {normalizeSport(programme.sportType)}
                </span>
              )}
              {normalizeLevel(programme.level) && (
                <span
                  style={{
                    ...badgeStyle,
                    backgroundColor: "#f3e5f5",
                    color: "#7b1fa2",
                  }}
                >
                  {normalizeLevel(programme.level)}
                </span>
              )}
              {programme.programmeType && (
                <span
                  style={{
                    ...badgeStyle,
                    backgroundColor: "#fff3e0",
                    color: "#f57c00",
                  }}
                >
                  {programme.programmeType}
                </span>
              )}
              {normalizeBoarding(programme.boarding) && (
                <span
                  style={{
                    ...badgeStyle,
                    backgroundColor: "#e8f5e9",
                    color: "#388e3c",
                  }}
                >
                  Boarding: {normalizeBoarding(programme.boarding)}
                </span>
              )}
              {ageRange && (
                <span
                  style={{
                    ...badgeStyle,
                    backgroundColor: "#fce4ec",
                    color: "#c2185b",
                  }}
                >
                  Ages {ageRange}
                </span>
              )}
              {programme.gender && (
                <span
                  style={{
                    ...badgeStyle,
                    backgroundColor: "#e0f2f1",
                    color: "#00796b",
                  }}
                >
                  {programme.gender}
                </span>
              )}
              {programme.duration && (
                <span
                  style={{
                    ...badgeStyle,
                    backgroundColor: "#f1f8e9",
                    color: "#558b2f",
                  }}
                >
                  {programme.duration}
                </span>
              )}
            </div>
          </div>

          {/* Description / Programme Details */}
          {(programme.inclusions || programme.priceRange) && (
            <div
              style={{
                padding: 24,
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                marginBottom: 32,
                backgroundColor: "white",
              }}
            >
              <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Programme Details</h3>
              {programme.inclusions && (
                <div style={{ marginBottom: 16 }}>
                  <h4 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#666" }}>
                    Inclusions
                  </h4>
                  <p style={{ margin: 0, lineHeight: 1.6, color: "#333" }}>{programme.inclusions}</p>
                </div>
              )}
              {programme.priceRange && (
                <div>
                  <h4 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#666" }}>
                    Price Range
                  </h4>
                  <p style={{ margin: 0, lineHeight: 1.6, color: "#333" }}>{programme.priceRange}</p>
                </div>
              )}
            </div>
          )}

          {/* Official Website CTA */}
          {programme.officialWebsite && (
            <div style={{ marginBottom: 16 }}>
              <a
                href={programme.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  backgroundColor: "#0070f3",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: 4,
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Official Programme Website →
              </a>
            </div>
          )}

          {/* Secondary CTA */}
          <div style={{ marginBottom: 32 }}>
            <Link
              href="/programmes"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                color: "#0070f3",
                textDecoration: "none",
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 500,
                border: "1px solid #0070f3",
              }}
            >
              ← Back to Programmes
            </Link>
          </div>
        </div>

        {/* Right Column - Trust Panel */}
        <div>
          <div
            style={{
              padding: 24,
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              backgroundColor: "white",
              position: "sticky",
              top: 20,
            }}
            className="trust-panel"
          >
            <h3 style={{ marginBottom: 20, fontSize: 18, fontWeight: 600 }}>Verification Status</h3>

            {/* Verified Status */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Review Status</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>
                {verified ? (
                  <span style={{ color: "#388e3c" }}>✓ Verified</span>
                ) : (
                  <span style={{ color: "#666" }}>Listed</span>
                )}
              </div>
            </div>

            {/* Last Reviewed */}
            {lastReviewed && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Last Reviewed</div>
                <div style={{ fontSize: 14, color: "#333" }}>{lastReviewed}</div>
              </div>
            )}

            {/* Source Confidence */}
            {programme.sourceConfidence && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Source Confidence</div>
                <div style={{ fontSize: 14, color: "#333" }}>
                  {programme.sourceConfidence.charAt(0).toUpperCase() +
                    programme.sourceConfidence.slice(1).toLowerCase()}
                </div>
              </div>
            )}

            {/* Verification Notes */}
            {programme.verificationNotes && programme.verificationNotes.trim() && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Verification Notes</div>
                <div style={{ fontSize: 14, color: "#333", lineHeight: 1.5 }}>
                  {programme.verificationNotes}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid #e0e0e0",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "#666",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                }}
              >
                NextXI provides a curated directory and verification signals. Enrolment, pricing, and
                acceptance are managed by the official provider.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Responsive Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (min-width: 768px) {
            .programme-detail-grid {
              grid-template-columns: 1fr 320px !important;
            }
          }
          @media (max-width: 767px) {
            .trust-panel {
              position: static !important;
              margin-top: 32px;
            }
          }
        `,
        }}
      />
    </main>
  );
}
