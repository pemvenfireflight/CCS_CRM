import { NextResponse } from "next/server";
import { emailThreads } from "@/lib/mock-data";

export async function GET() {
  const unread = emailThreads.reduce((sum, thread) => sum + thread.unreadCount, 0);
  return NextResponse.json({ items: emailThreads, total: emailThreads.length, unread });
}
