import { NextResponse } from "next/server";
import { deals } from "@/lib/mock-data";

export async function GET() {
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  return NextResponse.json({ items: deals, total: deals.length, totalValue });
}
