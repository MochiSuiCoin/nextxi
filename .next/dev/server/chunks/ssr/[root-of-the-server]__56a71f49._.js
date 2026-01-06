module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/prisma.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$better$2d$sqlite3$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-better-sqlite3/dist/index.mjs [app-rsc] (ecmascript)");
;
;
const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$better$2d$sqlite3$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrismaBetterSqlite3"]({
    url: process.env.DATABASE_URL || "file:./dev.db"
});
const prisma = global.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    adapter
});
if ("TURBOPACK compile-time truthy", 1) global.prisma = prisma;
}),
"[project]/app/programmes/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProgrammesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
;
;
// Badge normalization helpers (display-only, no database mutation)
function normalizeSport(sport) {
    if (!sport) return null;
    const normalized = sport.trim().toLowerCase();
    if (normalized === "soccer" || normalized === "football") return "Football";
    if (normalized === "futsal") return "Futsal";
    if (normalized === "both") return "Both";
    return sport.trim(); // Return original if no match
}
function normalizeLevel(level) {
    if (!level) return null;
    const normalized = level.trim().toLowerCase();
    if (normalized.includes("elite")) return "Elite";
    if (normalized.includes("development") || normalized === "dev") return "Development";
    if (normalized.includes("trial")) return "Trial";
    if (normalized.includes("camp")) return "Camp";
    if (normalized.includes("academy")) return "Other";
    return "Other";
}
function normalizeBoarding(boarding) {
    if (!boarding) return null;
    const normalized = boarding.trim().toLowerCase();
    if (normalized === "yes" || normalized === "y" || normalized === "true") return "Yes";
    if (normalized === "no" || normalized === "n" || normalized === "false") return "No";
    if (normalized === "optional" || normalized === "opt") return "Optional";
    return boarding.trim(); // Return original if no match
}
function isVerified(sourceConfidence) {
    if (!sourceConfidence) return false;
    return sourceConfidence.trim().toLowerCase() === "high";
}
async function ProgrammesPage({ searchParams }) {
    const params = await searchParams;
    const { q, sport, country, boarding, level, sort } = params;
    // Get distinct values for dropdowns
    const [countries, levels, programmes] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].programme.findMany({
            select: {
                country: true
            },
            distinct: [
                "country"
            ],
            orderBy: {
                country: "asc"
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].programme.findMany({
            select: {
                level: true
            },
            distinct: [
                "level"
            ],
            orderBy: {
                level: "asc"
            }
        }),
        (async ()=>{
            // Build where clause dynamically
            const where = {};
            // Search query - case-insensitive search across multiple fields
            if (q && q.trim()) {
                const searchTerm = q.trim();
                where.OR = [
                    {
                        programmeName: {
                            contains: searchTerm
                        }
                    },
                    {
                        providerName: {
                            contains: searchTerm
                        }
                    },
                    {
                        city: {
                            contains: searchTerm
                        }
                    },
                    {
                        country: {
                            contains: searchTerm
                        }
                    }
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
            let orderBy = {
                country: "asc"
            }; // default
            if (sort) {
                if (sort === "country") {
                    orderBy = {
                        country: "asc"
                    };
                } else if (sort === "provider") {
                    orderBy = {
                        providerName: "asc"
                    };
                } else if (sort === "level") {
                    orderBy = {
                        level: "asc"
                    };
                } else if (sort === "relevance" && q && q.trim()) {
                    // For relevance, we'll keep the default order (which works well with search)
                    // In a more advanced implementation, you might want to use full-text search
                    orderBy = {
                        country: "asc"
                    };
                }
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].programme.findMany({
                where,
                orderBy
            });
        })()
    ]);
    const countryList = countries.map((c)=>c.country);
    const levelList = levels.map((l)=>l.level);
    // Check if any filters are active
    const hasActiveFilters = !!(q || sport && sport !== "Both" || country || boarding || level);
    // Helper function to build URL with params
    const buildUrl = (newParams)=>{
        const currentParams = new URLSearchParams();
        if (q) currentParams.set("q", q);
        if (sport && sport !== "Both") currentParams.set("sport", sport);
        if (country) currentParams.set("country", country);
        if (boarding) currentParams.set("boarding", boarding);
        if (level) currentParams.set("level", level);
        if (sort) currentParams.set("sort", sort);
        // Merge with new params
        Object.entries(newParams).forEach(([key, value])=>{
            if (value === undefined || value === "" || key === "sport" && value === "Both") {
                currentParams.delete(key);
            } else {
                currentParams.set(key, value);
            }
        });
        const queryString = currentParams.toString();
        return `/programmes${queryString ? `?${queryString}` : ""}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            padding: 40,
            maxWidth: 1200,
            margin: "0 auto"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 32
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            marginBottom: 8
                        },
                        children: "Programmes"
                    }, void 0, false, {
                        fileName: "[project]/app/programmes/page.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/",
                        style: {
                            color: "blue",
                            textDecoration: "underline"
                        },
                        children: "← Back to Home"
                    }, void 0, false, {
                        fileName: "[project]/app/programmes/page.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/programmes/page.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: 20,
                    border: "1px solid #e0e0e0",
                    borderRadius: 8,
                    marginBottom: 32,
                    backgroundColor: "#f9f9f9"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        dangerouslySetInnerHTML: {
                            __html: `
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
        `
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/programmes/page.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        method: "GET",
                        action: "/programmes",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "filtersGrid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "q",
                                                className: "label",
                                                children: "Search"
                                            }, void 0, false, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 236,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                id: "q",
                                                name: "q",
                                                className: "control",
                                                defaultValue: q || "",
                                                placeholder: "Search programmes..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 239,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programmes/page.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "sport",
                                                className: "label",
                                                children: "Sport"
                                            }, void 0, false, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "sport",
                                                name: "sport",
                                                className: "control",
                                                defaultValue: sport || "Both",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "Both",
                                                        children: "Both"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "Football",
                                                        children: "Football"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "Futsal",
                                                        children: "Futsal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 254,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programmes/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "country",
                                                className: "label",
                                                children: "Country"
                                            }, void 0, false, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 268,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "country",
                                                name: "country",
                                                className: "control",
                                                defaultValue: country || "",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "All Countries"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 17
                                                    }, this),
                                                    countryList.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: c,
                                                            children: c
                                                        }, c, false, {
                                                            fileName: "[project]/app/programmes/page.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 19
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programmes/page.tsx",
                                        lineNumber: 267,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "boarding",
                                                className: "label",
                                                children: "Boarding"
                                            }, void 0, false, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 288,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "boarding",
                                                name: "boarding",
                                                className: "control",
                                                defaultValue: boarding || "",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "All"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "Yes",
                                                        children: "Yes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "No",
                                                        children: "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "Optional",
                                                        children: "Optional"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 291,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programmes/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "level",
                                                className: "label",
                                                children: "Level"
                                            }, void 0, false, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "level",
                                                name: "level",
                                                className: "control",
                                                defaultValue: level || "",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "All Levels"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 17
                                                    }, this),
                                                    levelList.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: l,
                                                            children: l
                                                        }, l, false, {
                                                            fileName: "[project]/app/programmes/page.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 19
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 309,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programmes/page.tsx",
                                        lineNumber: 305,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "sort",
                                                className: "label",
                                                children: "Sort by"
                                            }, void 0, false, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 326,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "sort",
                                                name: "sort",
                                                className: "control",
                                                defaultValue: sort || (q && q.trim() ? "relevance" : "country"),
                                                children: [
                                                    q && q.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "relevance",
                                                        children: "Relevance"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 35
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "country",
                                                        children: "Country"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "provider",
                                                        children: "Provider"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 337,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "level",
                                                        children: "Level"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programmes/page.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 329,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programmes/page.tsx",
                                        lineNumber: 325,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "buttonRow",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        style: {
                                            padding: "10px 24px",
                                            backgroundColor: "#0070f3",
                                            color: "white",
                                            border: "none",
                                            borderRadius: 4,
                                            fontSize: 14,
                                            fontWeight: 500,
                                            cursor: "pointer",
                                            height: "42px"
                                        },
                                        children: "Apply Filters"
                                    }, void 0, false, {
                                        fileName: "[project]/app/programmes/page.tsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, this),
                                    hasActiveFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/programmes",
                                        style: {
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
                                            boxSizing: "border-box"
                                        },
                                        children: "Clear All"
                                    }, void 0, false, {
                                        fileName: "[project]/app/programmes/page.tsx",
                                        lineNumber: 362,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/programmes/page.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/programmes/page.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            hasActiveFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 24,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    alignItems: "center"
                },
                children: [
                    q && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "6px 12px",
                            backgroundColor: "#e3f2fd",
                            borderRadius: 16,
                            fontSize: 14
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    'Search: "',
                                    q,
                                    '"'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 402,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: buildUrl({
                                    q: undefined
                                }),
                                style: {
                                    color: "#1976d2",
                                    textDecoration: "none",
                                    fontSize: 18,
                                    lineHeight: 1,
                                    fontWeight: "bold"
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 403,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/programmes/page.tsx",
                        lineNumber: 391,
                        columnNumber: 13
                    }, this),
                    sport && sport !== "Both" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "6px 12px",
                            backgroundColor: "#f3e5f5",
                            borderRadius: 16,
                            fontSize: 14
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Sport: ",
                                    sport
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 429,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: buildUrl({
                                    sport: "Both"
                                }),
                                style: {
                                    color: "#7b1fa2",
                                    textDecoration: "none",
                                    fontSize: 18,
                                    lineHeight: 1,
                                    fontWeight: "bold"
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 430,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/programmes/page.tsx",
                        lineNumber: 418,
                        columnNumber: 13
                    }, this),
                    country && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "6px 12px",
                            backgroundColor: "#e8f5e9",
                            borderRadius: 16,
                            fontSize: 14
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Country: ",
                                    country
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 456,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: buildUrl({
                                    country: undefined
                                }),
                                style: {
                                    color: "#388e3c",
                                    textDecoration: "none",
                                    fontSize: 18,
                                    lineHeight: 1,
                                    fontWeight: "bold"
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 457,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/programmes/page.tsx",
                        lineNumber: 445,
                        columnNumber: 13
                    }, this),
                    boarding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "6px 12px",
                            backgroundColor: "#fff3e0",
                            borderRadius: 16,
                            fontSize: 14
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Boarding: ",
                                    boarding
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 483,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: buildUrl({
                                    boarding: undefined
                                }),
                                style: {
                                    color: "#f57c00",
                                    textDecoration: "none",
                                    fontSize: 18,
                                    lineHeight: 1,
                                    fontWeight: "bold"
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 484,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/programmes/page.tsx",
                        lineNumber: 472,
                        columnNumber: 13
                    }, this),
                    level && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "6px 12px",
                            backgroundColor: "#fce4ec",
                            borderRadius: 16,
                            fontSize: 14
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Level: ",
                                    level
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 510,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: buildUrl({
                                    level: undefined
                                }),
                                style: {
                                    color: "#c2185b",
                                    textDecoration: "none",
                                    fontSize: 18,
                                    lineHeight: 1,
                                    fontWeight: "bold"
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 511,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/programmes/page.tsx",
                        lineNumber: 499,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/programmes",
                        style: {
                            padding: "6px 12px",
                            color: "#666",
                            textDecoration: "underline",
                            fontSize: 14
                        },
                        children: "Clear all"
                    }, void 0, false, {
                        fileName: "[project]/app/programmes/page.tsx",
                        lineNumber: 525,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/programmes/page.tsx",
                lineNumber: 389,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    marginBottom: 24,
                    color: "#666",
                    fontSize: 14
                },
                children: [
                    programmes.length,
                    " programme",
                    programmes.length !== 1 ? "s" : "",
                    " found"
                ]
            }, void 0, true, {
                fileName: "[project]/app/programmes/page.tsx",
                lineNumber: 540,
                columnNumber: 7
            }, this),
            programmes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: 40,
                    textAlign: "center",
                    color: "#999",
                    border: "1px dashed #ddd",
                    borderRadius: 8
                },
                children: "No programmes found. Try adjusting your filters."
            }, void 0, false, {
                fileName: "[project]/app/programmes/page.tsx",
                lineNumber: 546,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gap: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        dangerouslySetInnerHTML: {
                            __html: `
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
          `
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/programmes/page.tsx",
                        lineNumber: 559,
                        columnNumber: 11
                    }, this),
                    programmes.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "programme-card",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    gap: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `/programmes/${p.id}`,
                                        style: {
                                            flex: 1,
                                            textDecoration: "none",
                                            color: "inherit"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    margin: "0 0 8px 0",
                                                    fontSize: 20,
                                                    fontWeight: 600,
                                                    color: "#000"
                                                },
                                                children: p.programmeName
                                            }, void 0, false, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 587,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: 12,
                                                    color: "#666",
                                                    fontSize: 14
                                                },
                                                children: p.providerName
                                            }, void 0, false, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 590,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: 16,
                                                    color: "#888",
                                                    fontSize: 14
                                                },
                                                children: [
                                                    p.city ? `${p.city}, ` : "",
                                                    p.country
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 591,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: 8
                                                },
                                                children: (()=>{
                                                    const badges = [];
                                                    const badgeStyle = {
                                                        padding: "4px 12px",
                                                        borderRadius: 12,
                                                        fontSize: 12,
                                                        fontWeight: 500,
                                                        height: "24px",
                                                        display: "inline-flex",
                                                        alignItems: "center"
                                                    };
                                                    // 1. Sport badge (always if present)
                                                    const normalizedSport = normalizeSport(p.sportType);
                                                    if (normalizedSport && badges.length < 4) {
                                                        badges.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                ...badgeStyle,
                                                                backgroundColor: "#e3f2fd",
                                                                color: "#1976d2"
                                                            },
                                                            children: normalizedSport
                                                        }, "sport", false, {
                                                            fileName: "[project]/app/programmes/page.tsx",
                                                            lineNumber: 614,
                                                            columnNumber: 27
                                                        }, this));
                                                    }
                                                    // 2. Level badge (if present)
                                                    const normalizedLevel = normalizeLevel(p.level);
                                                    if (normalizedLevel && badges.length < 4) {
                                                        badges.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                ...badgeStyle,
                                                                backgroundColor: "#f3e5f5",
                                                                color: "#7b1fa2"
                                                            },
                                                            children: normalizedLevel
                                                        }, "level", false, {
                                                            fileName: "[project]/app/programmes/page.tsx",
                                                            lineNumber: 631,
                                                            columnNumber: 27
                                                        }, this));
                                                    }
                                                    // 3. Boarding badge (if present)
                                                    const normalizedBoarding = normalizeBoarding(p.boarding);
                                                    if (normalizedBoarding && badges.length < 4) {
                                                        badges.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                ...badgeStyle,
                                                                backgroundColor: "#e8f5e9",
                                                                color: "#388e3c"
                                                            },
                                                            children: [
                                                                "Boarding: ",
                                                                normalizedBoarding
                                                            ]
                                                        }, "boarding", true, {
                                                            fileName: "[project]/app/programmes/page.tsx",
                                                            lineNumber: 648,
                                                            columnNumber: 27
                                                        }, this));
                                                    }
                                                    // 4. Trust badge (if verified)
                                                    if (isVerified(p.sourceConfidence) && badges.length < 4) {
                                                        badges.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                ...badgeStyle,
                                                                backgroundColor: "#fff3e0",
                                                                color: "#f57c00"
                                                            },
                                                            children: "Verified"
                                                        }, "verified", false, {
                                                            fileName: "[project]/app/programmes/page.tsx",
                                                            lineNumber: 664,
                                                            columnNumber: 27
                                                        }, this));
                                                    }
                                                    return badges;
                                                })()
                                            }, void 0, false, {
                                                fileName: "[project]/app/programmes/page.tsx",
                                                lineNumber: 597,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programmes/page.tsx",
                                        lineNumber: 583,
                                        columnNumber: 17
                                    }, this),
                                    p.officialWebsite && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flexShrink: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: p.officialWebsite,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            style: {
                                                display: "inline-block",
                                                padding: "6px 12px",
                                                color: "#0070f3",
                                                fontSize: 12,
                                                textDecoration: "none",
                                                border: "1px solid #0070f3",
                                                borderRadius: 4
                                            },
                                            children: "Official site"
                                        }, void 0, false, {
                                            fileName: "[project]/app/programmes/page.tsx",
                                            lineNumber: 685,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/programmes/page.tsx",
                                        lineNumber: 684,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/programmes/page.tsx",
                                lineNumber: 582,
                                columnNumber: 15
                            }, this)
                        }, p.id, false, {
                            fileName: "[project]/app/programmes/page.tsx",
                            lineNumber: 578,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/programmes/page.tsx",
                lineNumber: 558,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/programmes/page.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/programmes/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/programmes/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__56a71f49._.js.map