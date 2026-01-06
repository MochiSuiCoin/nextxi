import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>NextXI</h1>
      <p>A curated directory of elite football and futsal academies, camps, and development programmes worldwide.</p>
      <Link href="/programmes" style={{ display: "inline-block", marginTop: 16 }}>
        View Programmes →
      </Link>
    </main>
  );
}
