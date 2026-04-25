import { NextRequest, NextResponse } from "next/server";
import { listGmailMessages, hasGoogleRuntimeCredentials } from "@/lib/google/workspace";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!hasGoogleRuntimeCredentials()) {
    return NextResponse.json(
      {
        error: "Google runtime credentials missing",
        required: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REDIRECT_URI", "GOOGLE_REFRESH_TOKEN"],
      },
      { status: 400 }
    );
  }

  const query = req.nextUrl.searchParams.get("query") ?? "in:inbox";
  const max = Number(req.nextUrl.searchParams.get("max") ?? "10");

  try {
    const items = await listGmailMessages(query, Number.isFinite(max) ? Math.max(1, Math.min(max, 50)) : 10);
    return NextResponse.json({ query, total: items.length, items });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Gmail error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
