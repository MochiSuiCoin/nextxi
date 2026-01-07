import { NextRequest, NextResponse } from "next/server";
import { isHoneypotTriggered, checkRateLimit, getClientIP } from "@/lib/spam-protection";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Spam protection: Check honeypot field
    // If honeypot is triggered, silently return success (don't reveal protection)
    if (isHoneypotTriggered(formData)) {
      console.log("🚫 Honeypot triggered - spam submission blocked");
      return NextResponse.redirect(new URL("/submit?success=true", request.url));
    }

    // Spam protection: Check rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      console.log(`🚫 Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.redirect(
        new URL("/submit?error=rate_limit", request.url)
      );
    }

    // Extract form data
    const data = {
      provider: formData.get("provider"),
      programme: formData.get("programme"),
      sport: formData.get("sport"),
      type: formData.get("type"),
      country: formData.get("country"),
      city: formData.get("city"),
      agesMin: formData.get("agesMin"),
      agesMax: formData.get("agesMax"),
      boarding: formData.get("boarding"),
      website: formData.get("website"),
      email: formData.get("email"),
      notes: formData.get("notes"),
    };

    // Log payload for debugging and future processing
    console.log("📝 Programme Submission Received:");
    console.log(JSON.stringify(data, null, 2));

    // TODO: Future integrations:
    // - Save to database (Prisma)
    // - Send email notification
    // - Pipe to Notion / Airtable / CRM
    // - Webhook to external service
    
    return NextResponse.redirect(new URL("/submit?success=true", request.url));
  } catch (error) {
    console.error("❌ Error processing submission:", error);
    return NextResponse.redirect(new URL("/submit?error=true", request.url));
  }
}

