import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const project = await dbService.getProjectByIdOrSlug(id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: `Project with ID or slug '${id}' not found.` },
        { status: 404 }
      );
    }

    const reviews = await dbService.getReviews(project._id);

    return NextResponse.json({
      success: true,
      data: {
        ...project,
        reviews,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const deleted = await dbService.deleteProject(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: `Project '${id}' not found or could not be deleted.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Project '${id}' was deleted successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (body.action === "upvote") {
      const updated = await dbService.upvoteProject(id);
      return NextResponse.json({
        success: true,
        message: "Project upvoted successfully",
        data: updated,
      });
    }

    return NextResponse.json(
      { success: false, error: "Unsupported update action" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Error processing request" },
      { status: 500 }
    );
  }
}
