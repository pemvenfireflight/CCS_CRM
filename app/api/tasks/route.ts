import { NextResponse } from "next/server";
import { tasks } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ items: tasks, total: tasks.length });
}
