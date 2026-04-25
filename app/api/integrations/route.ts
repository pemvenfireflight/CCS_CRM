import { NextResponse } from "next/server";
import { integrations } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ items: integrations, total: integrations.length });
}
