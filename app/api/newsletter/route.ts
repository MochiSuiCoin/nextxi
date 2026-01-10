import { NextRequest, NextResponse } from "next/server";
import { isHoneypotTriggered, checkRateLimit, getClientIP } from "@/lib/spam-protection";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Spam protection: Check honeypot field
    if (isHoneypotTriggered(formData)) {
      console.log("🚫 Honeypot triggered - newsletter spam blocked");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Spam protection: Check rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      console.log(`🚫 Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { error: "rate_limit", message: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // Extract email
    const email = formData.get("email");

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "invalid_email", message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Log payload for debugging and future processing
    console.log("📧 Newsletter Subscription Received:");
    console.log({ email, timestamp: new Date().toISOString() });

    // TODO: Future integrations:
    // - Save to database (Prisma Newsletter table)
    // - Send confirmation email
    // - Integrate with email service (SendGrid, Mailchimp, Resend, etc.)
    // - Add to CRM/notifications

    return NextResponse.json({ success: true, message: "Thank you for subscribing!" });
  } catch (error) {
    console.error("❌ Error processing newsletter subscription:", error);
    return NextResponse.json(
      { error: "server_error", message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
