import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { auth } from "@/auth";

async function getAuthGuard(): Promise<NextResponse | null> {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const result = await query("SELECT * FROM faqs ORDER BY sort_order, id");
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("[faqs GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const { question, answer, is_active, sort_order } = await req.json();
    if (!question || !answer) {
      return NextResponse.json({ error: "Pertanyaan dan jawaban wajib diisi" }, { status: 400 });
    }
    const result = await query(
      "INSERT INTO faqs (question, answer, is_active, sort_order) VALUES ($1,$2,$3,$4) RETURNING *",
      [question, answer, is_active ?? true, sort_order ?? 0]
    );
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("[faqs POST]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const body = await req.json();
    const { id, ...fields } = body;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const keys = Object.keys(fields);
    if (keys.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }
    const sets = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
    const result = await query(
      `UPDATE faqs SET ${sets} WHERE id = $1 RETURNING *`,
      [id, ...Object.values(fields)]
    );
    return NextResponse.json(result.rows[0] ?? { ok: true });
  } catch (err) {
    console.error("[faqs PUT]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    await query("DELETE FROM faqs WHERE id = $1", [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[faqs DELETE]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
