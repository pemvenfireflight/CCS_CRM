import { NextRequest, NextResponse } from "next/server";
import { exchangeGoogleCode, getGoogleConfig } from "@/lib/google/workspace";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing code query parameter" }, { status: 400 });
  }

  try {
    const tokens = await exchangeGoogleCode(code);
    const cfg = getGoogleConfig();

    return NextResponse.json({
      message:
        "Google OAuth callback succeeded. Save the refresh_token into GOOGLE_REFRESH_TOKEN, then redeploy.",
      redirectUriUsed: cfg.redirectUri ?? null,
      hasRefreshToken: Boolean(tokens.refresh_token),
      hasAccessToken: Boolean(tokens.access_token),
      expiryDate: tokens.expiry_date ?? null,
      scope: tokens.scope ?? null,
      refreshToken: tokens.refresh_token ?? null,
      accessTokenPreview: tokens.access_token ? `${tokens.access_token.slice(0, 12)}...` : null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown OAuth callback error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
