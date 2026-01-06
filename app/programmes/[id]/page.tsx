import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

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

  return (
    <main style={{ padding: 40 }}>
      <h1>{programme.programmeName}</h1>
      <h3>{programme.providerName}</h3>

      <p>
        {programme.city ? `${programme.city}, ` : ""}
        {programme.country}
      </p>

      <ul>
        <li>Sport: {programme.sportType}</li>
        <li>Level: {programme.level}</li>
        <li>
          Ages: {programme.agesMin || "N/A"}
          {programme.agesMax ? `–${programme.agesMax}` : ""}
        </li>
        <li>Boarding: {programme.boarding}</li>
        <li>Duration: {programme.duration}</li>
      </ul>

      {programme.officialWebsite && (
        <div style={{ marginTop: 24 }}>
          <a
            href={programme.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Official Website →
          </a>
        </div>
      )}
      <div style={{ marginTop: 24 }}>
        <a href="/programmes" style={{ color: "blue", textDecoration: "underline" }}>
          ← Back to Programmes
        </a>
      </div>
    </main>
  );
}
