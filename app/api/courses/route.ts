import { NextResponse } from "next/server";
import { courses, enrollments } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    courses,
    enrollments,
    courseCount: courses.length,
    enrollmentCount: enrollments.length,
  });
}
