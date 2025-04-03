import { NextRequest, NextResponse } from "next/server";
import { ClientService } from "@/services/clientService";

const service = new ClientService();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const success = await service.create(body);

    if (!success) throw new Error("Erreur lors de l'ajout");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API Client :", error);
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
    console.error("Erreur API Client :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const clients = await service.getAll();
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Erreur API Client :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");

    if (!clientId) throw new Error("ID client manquant");

    const success = await service.delete(clientId);

    if (!success) throw new Error("Erreur lors de la suppression");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API Client :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
