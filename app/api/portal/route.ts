import { NextResponse } from "next/server";
import { portalTickets } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ items: portalTickets, total: portalTickets.length });
}
