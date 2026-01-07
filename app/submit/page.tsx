import Link from "next/link";

interface SearchParams {
  success?: string;
  error?: string;
}

export default async function SubmitPage({
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
        <h1 style={{ marginBottom: 8 }}>Submit a Programme</h1>
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
          NextXI curates elite football and futsal academies, camps, and development programmes for international players and families.
        </p>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          If you represent an academy or programme and would like to be considered for inclusion, you can submit your details below for review.
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
            ✓ Thank you! Your submission has been received. We'll review it and get back to you soon.
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
              : "There was an error submitting your form. Please try again."}
          </p>
        </div>
      )}

      {/* What happens after submission */}
      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 24,
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>What happens after submission</h2>
        <ul style={{ margin: "0 0 12px 0", paddingLeft: 20, lineHeight: 1.8 }}>
          <li style={{ marginBottom: 8 }}>
            We review the information provided for accuracy and relevance
          </li>
          <li style={{ marginBottom: 8 }}>
            We may verify details via your official website or contact email
          </li>
          <li style={{ marginBottom: 8 }}>
            If approved, your programme will be listed on NextXI
          </li>
          <li>We may contact you if clarification or updates are required</li>
        </ul>
        <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
          There is no cost to submit a programme.
        </p>
      </div>

      {/* What we list */}
      <div
        style={{
          padding: 24,
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          marginBottom: 24,
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>What we list</h2>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li style={{ marginBottom: 8 }}>
            Run by established academies, clubs, or recognised operators
          </li>
          <li style={{ marginBottom: 8 }}>
            Open to international or non-local players
          </li>
          <li style={{ marginBottom: 8 }}>
            Structured development (academy, camp, or trial format)
          </li>
          <li>Official website or verifiable contact details</li>
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
        <h2 style={{ marginBottom: 20, fontSize: 20, fontWeight: 600 }}>Programme Information</h2>
        <form
          action="/api/submit"
          method="post"
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div>
            <label htmlFor="provider" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
              Organisation / Provider name <span style={{ color: "#d32f2f" }}>*</span>
            </label>
            <input
              type="text"
              id="provider"
              name="provider"
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
            <label htmlFor="programme" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
              Programme name <span style={{ color: "#d32f2f" }}>*</span>
            </label>
            <input
              type="text"
              id="programme"
              name="programme"
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label htmlFor="sport" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
                Sport type
              </label>
              <select
                id="sport"
                name="sport"
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
                <option value="Football">Football</option>
                <option value="Futsal">Futsal</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div>
              <label htmlFor="type" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
                Programme type
              </label>
              <select
                id="type"
                name="type"
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
                <option value="Academy">Academy</option>
                <option value="Camp">Camp</option>
                <option value="Trial">Trial</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label htmlFor="country" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
                Country
              </label>
              <select
                id="country"
                name="country"
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
                <option value="">Select...</option>
                <option value="Portugal">Portugal</option>
                <option value="Spain">Spain</option>
                <option value="England">England</option>
                <option value="Italy">Italy</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Belgium">Belgium</option>
                <option value="Greece">Greece</option>
                <option value="Turkey">Turkey</option>
                <option value="Brazil">Brazil</option>
                <option value="Argentina">Argentina</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
                <option value="UAE">UAE</option>
                <option value="Qatar">Qatar</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Japan">Japan</option>
                <option value="South Korea">South Korea</option>
                <option value="Australia">Australia</option>
                <option value="South Africa">South Africa</option>
                <option value="Morocco">Morocco</option>
                <option value="Egypt">Egypt</option>
                <option value="Poland">Poland</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Austria">Austria</option>
                <option value="Sweden">Sweden</option>
                <option value="Norway">Norway</option>
                <option value="Denmark">Denmark</option>
                <option value="Finland">Finland</option>
                <option value="Ireland">Ireland</option>
                <option value="Scotland">Scotland</option>
                <option value="Wales">Wales</option>
                <option value="Croatia">Croatia</option>
                <option value="Serbia">Serbia</option>
                <option value="Romania">Romania</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Hungary">Hungary</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Ukraine">Ukraine</option>
                <option value="Russia">Russia</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="city" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
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
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label htmlFor="agesMin" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
                Ages min
              </label>
              <input
                type="number"
                id="agesMin"
                name="agesMin"
                min="0"
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
              <label htmlFor="agesMax" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
                Ages max
              </label>
              <input
                type="number"
                id="agesMax"
                name="agesMax"
                min="0"
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
          </div>

          <div>
            <label htmlFor="boarding" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
              Boarding
            </label>
            <select
              id="boarding"
              name="boarding"
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
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Optional">Optional</option>
            </select>
          </div>

          <div>
            <label htmlFor="website" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
              Official website URL
            </label>
            <input
              type="url"
              id="website"
              name="website"
              placeholder="https://example.com"
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
              Contact email <span style={{ color: "#d32f2f" }}>*</span>
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
            <label htmlFor="notes" style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
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

          <p
            style={{
              marginBottom: 20,
              fontSize: 13,
              color: "#666",
              fontStyle: "italic",
            }}
          >
            Selected programmes may be eligible for optional verification or enhanced listing features in the future. Submission does not imply any obligation.
          </p>

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
            Submit Programme for Review
          </button>
        </form>
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Link href="/programmes" style={{ color: "#0070f3", textDecoration: "underline" }}>
          Browse all programmes →
        </Link>
      </div>
    </main>
  );
}

