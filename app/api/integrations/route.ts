import { NextResponse } from "next/server";
import { integrations } from "@/lib/mock-data";
import { getGoogleWorkspaceSnapshot } from "@/lib/google/workspace";

export const dynamic = "force-dynamic";

export async function GET() {
  const google = getGoogleWorkspaceSnapshot();
  const now = new Date().toISOString();

  const items = integrations.map((item) => {
    if (item.provider === "gmail") {
      return { ...item, connected: google.gmail.connected, health: google.gmail.health, note: google.gmail.note, lastSyncAt: now };
    }
    if (item.provider === "calendar") {
      return {
        ...item,
        connected: google.calendar.connected,
        health: google.calendar.health,
        note: google.calendar.note,
        lastSyncAt: now,
      };
    }
    if (item.provider === "drive") {
      return { ...item, connected: google.drive.connected, health: google.drive.health, note: google.drive.note, lastSyncAt: now };
    }
    return item;
  });

  return NextResponse.json({ items, total: items.length });
}
