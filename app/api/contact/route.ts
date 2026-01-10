import { NextRequest, NextResponse } from "next/server";
import { isHoneypotTriggered, checkRateLimit, getClientIP } from "@/lib/spam-protection";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Spam protection: Check honeypot field
    // If honeypot is triggered, silently return success (don't reveal protection)
    if (isHoneypotTriggered(formData)) {
      console.log("🚫 Honeypot triggered - spam submission blocked");
      return NextResponse.redirect(new URL("/contact?success=true", request.url));
    }

    // Spam protection: Check rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      console.log(`🚫 Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.redirect(
        new URL("/contact?error=rate_limit", request.url)
      );
    }

    // Extract form data
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Log payload for debugging and future processing
    console.log("📧 Contact Form Submission Received:");
    console.log(JSON.stringify(data, null, 2));

    // TODO: Future integrations:
    // - Save to database (Prisma)
    // - Send email notification to hello@nextxi.io
    // - Pipe to Notion / Airtable / CRM
    // - Webhook to external service
    
    return NextResponse.redirect(new URL("/contact?success=true", request.url));
  } catch (error) {
    console.error("❌ Error processing contact form:", error);
    return NextResponse.redirect(new URL("/contact?error=true", request.url));
  }
}

