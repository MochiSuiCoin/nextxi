import { prisma } from "@/lib/prisma";
import React from "react";

interface SearchParams {
  q?: string;
  sport?: string;
  country?: string;
  boarding?: string;
  level?: string;
  sort?: string;
}

// Badge normalization helpers (display-only, no database mutation)
function normalizeSport(sport: string | null | undefined): string | null {
  if (!sport) return null;
  const normalized = sport.trim().toLowerCase();
  if (normalized === "soccer" || normalized === "football") return "Football";
  if (normalized === "futsal") return "Futsal";
  if (normalized === "both") return "Both";
  return sport.trim(); // Return original if no match
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
  return boarding.trim(); // Return original if no match
}

function isVerified(sourceConfidence: string | null | undefined): boolean {
  if (!sourceConfidence) return false;
  return sourceConfidence.trim().toLowerCase() === "high";
}

export default async function ProgrammesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { q, sport, country, boarding, level, sort } = params;

  // Get distinct values for dropdowns
  const [countries, levels, programmes] = await Promise.all([
    prisma.programme.findMany({
      select: { country: true },
      distinct: ["country"],
      orderBy: { country: "asc" },
    }),
    prisma.programme.findMany({
      select: { level: true },
      distinct: ["level"],
      orderBy: { level: "asc" },
    }),
    (async () => {
      // Build where clause dynamically
      const where: any = {};

      // Search query - case-insensitive search across multiple fields
      if (q && q.trim()) {
        const searchTerm = q.trim();
        where.OR = [
          { programmeName: { contains: searchTerm } },
          { providerName: { contains: searchTerm } },
          { city: { contains: searchTerm } },
          { country: { contains: searchTerm } },
        ];
      }

      // Sport filter
      if (sport && sport !== "Both") {
        where.sportType = sport;
      }

      // Country filter
      if (country) {
        where.country = country;
      }

      // Boarding filter
      if (boarding) {
        where.boarding = boarding;
      }

      // Level filter
      if (level) {
        where.level = level;
      }

      // Build orderBy clause
      let orderBy: any = { country: "asc" }; // default
      
      if (sort) {
        if (sort === "country") {
          orderBy = { country: "asc" };
        } else if (sort === "provider") {
          orderBy = { providerName: "asc" };
        } else if (sort === "level") {
          orderBy = { level: "asc" };
        } else if (sort === "relevance" && q && q.trim()) {
          // For relevance, we'll keep the default order (which works well with search)
          // In a more advanced implementation, you might want to use full-text search
          orderBy = { country: "asc" };
        }
      }

      return prisma.programme.findMany({
        where,
        orderBy,
      });
    })(),
  ]);

  const countryList = countries.map((c: { country: string }) => c.country);
  const levelList = levels.map((l: { level: string }) => l.level);

  // Check if any filters are active
  const hasActiveFilters = !!(q || (sport && sport !== "Both") || country || boarding || level);

  // Helper function to build URL with params
  const buildUrl = (newParams: Record<string, string | undefined>) => {
    const currentParams = new URLSearchParams();
    if (q) currentParams.set("q", q);
    if (sport && sport !== "Both") currentParams.set("sport", sport);
    if (country) currentParams.set("country", country);
    if (boarding) currentParams.set("boarding", boarding);
    if (level) currentParams.set("level", level);
    if (sort) currentParams.set("sort", sort);

    // Merge with new params
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === "" || (key === "sport" && value === "Both")) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    });

    const queryString = currentParams.toString();
    return `/programmes${queryString ? `?${queryString}` : ""}`;
  };

  return (
    <main style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ marginBottom: 8 }}>Programmes</h1>
        <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
          ← Back to Home
        </a>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          padding: 20,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 32,
          backgroundColor: "#f9f9f9",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .filtersGrid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
          @media (max-width: 768px) {
            .filtersGrid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 480px) {
            .filtersGrid {
              grid-template-columns: 1fr;
            }
          }
          .field {
            display: flex;
            flex-direction: column;
          }
          .label {
            display: block;
            margin-bottom: 4px;
            font-size: 14px;
            font-weight: 500;
            color: #333;
          }
          .control {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            height: 42px;
            box-sizing: border-box;
            background-color: white;
          }
          .control:focus {
            outline: none;
            border-color: #0070f3;
          }
          .buttonRow {
            display: flex;
            gap: 12px;
            align-items: flex-end;
            margin-top: 16px;
          }
          @media (max-width: 768px) {
            .buttonRow {
              flex-direction: column;
            }
            .buttonRow button,
            .buttonRow a {
              width: 100%;
            }
          }
        `}} />
        <form method="GET" action="/programmes">
          <div className="filtersGrid">
            {/* Search Input */}
            <div className="field">
              <label htmlFor="q" className="label">
                Search
              </label>
              <input
                type="text"
                id="q"
                name="q"
                className="control"
                defaultValue={q || ""}
                placeholder="Search programmes..."
              />
            </div>

            {/* Sport Dropdown */}
            <div className="field">
              <label htmlFor="sport" className="label">
                Sport
              </label>
              <select
                id="sport"
                name="sport"
                className="control"
                defaultValue={sport || "Both"}
              >
                <option value="Both">Both</option>
                <option value="Football">Football</option>
                <option value="Futsal">Futsal</option>
              </select>
            </div>

            {/* Country Dropdown */}
            <div className="field">
              <label htmlFor="country" className="label">
                Country
              </label>
              <select
                id="country"
                name="country"
                className="control"
                defaultValue={country || ""}
              >
                <option value="">All Countries</option>
                {countryList.map((c: string) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Boarding Dropdown */}
            <div className="field">
              <label htmlFor="boarding" className="label">
                Boarding
              </label>
              <select
                id="boarding"
                name="boarding"
                className="control"
                defaultValue={boarding || ""}
              >
                <option value="">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Optional">Optional</option>
              </select>
            </div>

            {/* Level Dropdown */}
            <div className="field">
              <label htmlFor="level" className="label">
                Level
              </label>
              <select
                id="level"
                name="level"
                className="control"
                defaultValue={level || ""}
              >
                <option value="">All Levels</option>
                {levelList.map((l: string) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="field">
              <label htmlFor="sort" className="label">
                Sort by
              </label>
              <select
                id="sort"
                name="sort"
                className="control"
                defaultValue={sort || (q && q.trim() ? "relevance" : "country")}
              >
                {q && q.trim() && <option value="relevance">Relevance</option>}
                <option value="country">Country</option>
                <option value="provider">Provider</option>
                <option value="level">Level</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="buttonRow">
            <button
              type="submit"
              style={{
                padding: "10px 24px",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                height: "42px",
              }}
            >
              Apply Filters
            </button>
            {hasActiveFilters && (
              <a
                href="/programmes"
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "42px",
                  boxSizing: "border-box",
                }}
              >
                Clear All
              </a>
            )}
          </div>
        </form>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div style={{ marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          {q && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                backgroundColor: "#e3f2fd",
                borderRadius: 16,
                fontSize: 14,
              }}
            >
              <span>Search: &quot;{q}&quot;</span>
              <a
                href={buildUrl({ q: undefined })}
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontSize: 18,
                  lineHeight: 1,
                  fontWeight: "bold",
                }}
              >
                ×
              </a>
            </div>
          )}
          {sport && sport !== "Both" && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                backgroundColor: "#f3e5f5",
                borderRadius: 16,
                fontSize: 14,
              }}
            >
              <span>Sport: {sport}</span>
              <a
                href={buildUrl({ sport: "Both" })}
                style={{
                  color: "#7b1fa2",
                  textDecoration: "none",
                  fontSize: 18,
                  lineHeight: 1,
                  fontWeight: "bold",
                }}
              >
                ×
              </a>
            </div>
          )}
          {country && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                backgroundColor: "#e8f5e9",
                borderRadius: 16,
                fontSize: 14,
              }}
            >
              <span>Country: {country}</span>
              <a
                href={buildUrl({ country: undefined })}
                style={{
                  color: "#388e3c",
                  textDecoration: "none",
                  fontSize: 18,
                  lineHeight: 1,
                  fontWeight: "bold",
                }}
              >
                ×
              </a>
            </div>
          )}
          {boarding && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                backgroundColor: "#fff3e0",
                borderRadius: 16,
                fontSize: 14,
              }}
            >
              <span>Boarding: {boarding}</span>
              <a
                href={buildUrl({ boarding: undefined })}
                style={{
                  color: "#f57c00",
                  textDecoration: "none",
                  fontSize: 18,
                  lineHeight: 1,
                  fontWeight: "bold",
                }}
              >
                ×
              </a>
            </div>
          )}
          {level && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                backgroundColor: "#fce4ec",
                borderRadius: 16,
                fontSize: 14,
              }}
            >
              <span>Level: {level}</span>
              <a
                href={buildUrl({ level: undefined })}
                style={{
                  color: "#c2185b",
                  textDecoration: "none",
                  fontSize: 18,
                  lineHeight: 1,
                  fontWeight: "bold",
                }}
              >
                ×
              </a>
            </div>
          )}
          <a
            href="/programmes"
            style={{
              padding: "6px 12px",
              color: "#666",
              textDecoration: "underline",
              fontSize: 14,
            }}
          >
            Clear all
          </a>
        </div>
      )}

      {/* Results Count */}
      <p style={{ marginBottom: 24, color: "#666", fontSize: 14 }}>
        {programmes.length} programme{programmes.length !== 1 ? "s" : ""} found
      </p>

      {/* Programme Cards */}
      {programmes.length === 0 ? (
        <div
          style={{
            padding: 40,
            textAlign: "center",
            color: "#999",
            border: "1px dashed #ddd",
            borderRadius: 8,
          }}
        >
          No programmes found. Try adjusting your filters.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          <style dangerouslySetInnerHTML={{ __html: `
            .programme-card {
              padding: 20px;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              color: inherit;
              display: block;
              background-color: white;
              transition: box-shadow 0.2s;
            }
            .programme-card:hover {
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .programme-card a {
              text-decoration: none;
              color: inherit;
            }
          `}} />
          {programmes.map((p: any) => (
            <div
              key={p.id}
              className="programme-card"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <a
                  href={`/programmes/${p.id}`}
                  style={{ flex: 1, textDecoration: "none", color: "inherit" }}
                >
                  <h2 style={{ margin: "0 0 8px 0", fontSize: 20, fontWeight: 600, color: "#000" }}>
                    {p.programmeName}
                  </h2>
                  <div style={{ marginBottom: 12, color: "#666", fontSize: 14 }}>{p.providerName}</div>
                  <div style={{ marginBottom: 16, color: "#888", fontSize: 14 }}>
                    {p.city ? `${p.city}, ` : ""}
                    {p.country}
                  </div>

                  {/* Badges - Max 4 badges in order: Sport, Level, Boarding, Verified */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {(() => {
                      const badges: React.ReactElement[] = [];
                      const badgeStyle = {
                        padding: "4px 12px",
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 500,
                        height: "24px",
                        display: "inline-flex",
                        alignItems: "center",
                      };

                      // 1. Sport badge (always if present)
                      const normalizedSport = normalizeSport(p.sportType);
                      if (normalizedSport && badges.length < 4) {
                        badges.push(
                          <span
                            key="sport"
                            style={{
                              ...badgeStyle,
                              backgroundColor: "#e3f2fd",
                              color: "#1976d2",
                            }}
                          >
                            {normalizedSport}
                    </span>
                        );
                      }

                      // 2. Level badge (if present)
                      const normalizedLevel = normalizeLevel(p.level);
                      if (normalizedLevel && badges.length < 4) {
                        badges.push(
                    <span
                            key="level"
                      style={{
                              ...badgeStyle,
                        backgroundColor: "#f3e5f5",
                        color: "#7b1fa2",
                      }}
                    >
                            {normalizedLevel}
                    </span>
                        );
                      }

                      // 3. Boarding badge (if present)
                      const normalizedBoarding = normalizeBoarding(p.boarding);
                      if (normalizedBoarding && badges.length < 4) {
                        badges.push(
                      <span
                            key="boarding"
                        style={{
                              ...badgeStyle,
                          backgroundColor: "#e8f5e9",
                          color: "#388e3c",
                        }}
                      >
                            Boarding: {normalizedBoarding}
                          </span>
                        );
                      }

                      // 4. Trust badge (if verified)
                      if (isVerified(p.sourceConfidence) && badges.length < 4) {
                        badges.push(
                          <span
                            key="verified"
                            style={{
                              ...badgeStyle,
                              backgroundColor: "#fff3e0",
                              color: "#f57c00",
                            }}
                          >
                            Verified
                      </span>
                        );
                      }

                      return badges;
                    })()}
                  </div>
                </a>

                {/* Official Site Link */}
                {p.officialWebsite && (
                  <div style={{ flexShrink: 0 }}>
                    <a
                      href={p.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        padding: "6px 12px",
                        color: "#0070f3",
                        fontSize: 12,
                        textDecoration: "none",
                        border: "1px solid #0070f3",
                        borderRadius: 4,
                      }}
                    >
                      Official site
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
