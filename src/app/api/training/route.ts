import { NextRequest, NextResponse } from "next/server";
import { DrizzleTrainingSessionRepository } from "@/repositories/drizzleTrainingRepository";
import { TrainingSessionService } from "@/services/training/trainingService";
import { TrainingSessionModel } from "@/models/training";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const session = new TrainingSessionModel(
      body.coach_id,
      body.client_id,
      new Date(body.start_date),
      new Date(body.end_date),
      body.session_type,
    );

    const repo = new DrizzleTrainingSessionRepository();
    const service = new TrainingSessionService(repo);

    const result = await service.create(session);

    return NextResponse.json({ success: result });
  } catch (error) {
    console.error("❌ Erreur création session :", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const repo = new DrizzleTrainingSessionRepository();
    const service = new TrainingSessionService(repo);

    const sessions = await service.getAll();

    return NextResponse.json(sessions);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des sessions :", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const session = new TrainingSessionModel(
      body.coach_id,
      body.client_id,
      new Date(body.start_date),
      new Date(body.end_date),
      body.session_type,
      body.id, // Assuming the ID is part of the request body
    );

    const repo = new DrizzleTrainingSessionRepository();
    const service = new TrainingSessionService(repo);

    const result = await service.update(session);

    return NextResponse.json({ success: result });
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour de la session :", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    const repo = new DrizzleTrainingSessionRepository();
    const service = new TrainingSessionService(repo);

    const result = await service.delete(id);

    return NextResponse.json({ success: result });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de la session :", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
