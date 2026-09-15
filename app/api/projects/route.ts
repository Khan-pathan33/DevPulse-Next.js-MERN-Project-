import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stack = searchParams.get("stack") || undefined;
    const search = searchParams.get("search") || undefined;
    const featuredParam = searchParams.get("featured");
    const featured = featuredParam !== null ? featuredParam === "true" : undefined;

    const projects = await dbService.getProjects({ stack, search, featured });

    return NextResponse.json(
      {
        success: true,
        count: projects.length,
        data: projects,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=59",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.description || !body.githubUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title, description, and githubUrl are required.",
        },
        { status: 400 }
      );
    }

    const newProject = await dbService.createProject(body);

    return NextResponse.json(
      {
        success: true,
        message: "Project successfully created via API Route Handler",
        data: newProject,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Invalid JSON payload" },
      { status: 400 }
    );
  }
}
