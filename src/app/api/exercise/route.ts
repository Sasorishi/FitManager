import { NextRequest, NextResponse } from "next/server";
import { ExerciseService } from "@/services/exercise/exerciseService";

const service = new ExerciseService();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const success = await service.create(body);

    if (!success) throw new Error("Erreur lors de l'ajout");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API Exercise :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      const exercises = await service.getAll();
      return NextResponse.json(exercises);
    }

    const exercises = await service.findBySessionId(sessionId);
    return NextResponse.json(exercises);
  } catch (error) {
    console.error("Erreur API Exercise :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const success = await service.update(body);

    if (!success) throw new Error("Erreur lors de la mise à jour");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API Exercise :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    const success = await service.delete(id);

    if (!success) throw new Error("Erreur lors de la suppression");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API Exercise :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
