import { NextRequest, NextResponse } from "next/server";
import { hasGoogleRuntimeCredentials, listCalendarEvents } from "@/lib/google/workspace";

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

  const max = Number(req.nextUrl.searchParams.get("max") ?? "20");

  try {
    const items = await listCalendarEvents(Number.isFinite(max) ? Math.max(1, Math.min(max, 100)) : 20);
    return NextResponse.json({ total: items.length, items });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Calendar error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
