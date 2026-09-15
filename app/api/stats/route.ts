import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await dbService.getStats();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: stats,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve stats" },
      { status: 500 }
    );
  }
}
