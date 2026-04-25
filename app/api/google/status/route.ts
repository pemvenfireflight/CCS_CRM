import { NextResponse } from "next/server";
import { getGoogleConfig, hasGoogleOAuthBaseConfig, hasGoogleRuntimeCredentials, getGoogleWorkspaceSnapshot } from "@/lib/google/workspace";

export const dynamic = "force-dynamic";

export async function GET() {
  const cfg = getGoogleConfig();
  const snapshot = getGoogleWorkspaceSnapshot();

  return NextResponse.json({
    configured: {
      oauthBase: hasGoogleOAuthBaseConfig(),
      runtimeCredentials: hasGoogleRuntimeCredentials(),
    },
    integration: snapshot,
    redirectUri: cfg.redirectUri ?? null,
    hasRefreshToken: Boolean(cfg.refreshToken),
    hasAccessToken: Boolean(cfg.accessToken),
  });
}
