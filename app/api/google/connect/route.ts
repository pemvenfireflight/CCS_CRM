import { NextResponse } from "next/server";
import { buildGoogleAuthUrl, hasGoogleOAuthBaseConfig } from "@/lib/google/workspace";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasGoogleOAuthBaseConfig()) {
    return NextResponse.json(
      {
        error: "Missing Google OAuth base config",
        required: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REDIRECT_URI"],
      },
      { status: 400 }
    );
  }

  const authUrl = buildGoogleAuthUrl();
  return NextResponse.json({ authUrl });
}
