import { NextRequest, NextResponse } from "next/server";
import { emailThreads } from "@/lib/mock-data";
import { hasGoogleRuntimeCredentials, listGmailMessages } from "@/lib/google/workspace";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const live = req.nextUrl.searchParams.get("live") === "1";

  if (!live || !hasGoogleRuntimeCredentials()) {
    const unread = emailThreads.reduce((sum, thread) => sum + thread.unreadCount, 0);
    return NextResponse.json({ items: emailThreads, total: emailThreads.length, unread, source: "mock" });
  }

  try {
    const query = req.nextUrl.searchParams.get("query") ?? "in:inbox";
    const max = Number(req.nextUrl.searchParams.get("max") ?? "10");
    const items = await listGmailMessages(query, Number.isFinite(max) ? Math.max(1, Math.min(max, 50)) : 10);
    return NextResponse.json({ items, total: items.length, source: "google" });
  } catch (error) {
    const unread = emailThreads.reduce((sum, thread) => sum + thread.unreadCount, 0);
    const message = error instanceof Error ? error.message : "Unknown Gmail error";
    return NextResponse.json(
      { items: emailThreads, total: emailThreads.length, unread, source: "mock", warning: message },
      { status: 200 }
    );
  }
}
