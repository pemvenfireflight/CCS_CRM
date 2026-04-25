import { NextRequest, NextResponse } from "next/server";
import { hasGoogleRuntimeCredentials, listDriveFiles } from "@/lib/google/workspace";

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
  const rawQuery = req.nextUrl.searchParams.get("query") ?? undefined;
  const driveId = req.nextUrl.searchParams.get("driveId") ?? undefined;
  const sharedRaw = req.nextUrl.searchParams.get("shared");
  const includeAllDrives = sharedRaw === null ? true : sharedRaw === "1" || sharedRaw.toLowerCase() === "true";
  const useRawQuery = req.nextUrl.searchParams.get("rawQuery") === "1";

  const query = rawQuery
    ? useRawQuery
      ? rawQuery
      : `name contains '${rawQuery.replace(/'/g, "\\'")}'`
    : undefined;

  try {
    const items = await listDriveFiles(query, Number.isFinite(max) ? Math.max(1, Math.min(max, 100)) : 20, {
      includeAllDrives,
      driveId,
    });
    return NextResponse.json({
      total: items.length,
      query: rawQuery ?? null,
      appliedQuery: query ?? null,
      includeAllDrives,
      driveId: driveId ?? null,
      items,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Drive error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
