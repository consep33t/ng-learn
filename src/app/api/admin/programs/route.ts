import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { auth } from "@/auth";

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function GET() {
  try {
    await requireAuth();
    const result = await query("SELECT * FROM programs ORDER BY sort_order, id");
    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const { title, description, icon, level, price, duration, is_active, sort_order, color } = await req.json();
    await query(
      "INSERT INTO programs (title, description, icon, level, price, duration, is_active, sort_order, color) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [title, description, icon, level, price, duration, is_active, sort_order, color || 'primary']
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAuth();
    const body = await req.json();
    const { id, created_at, updated_at, ...fields } = body;
    const keys = Object.keys(fields);
    const sets = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
    await query(
      `UPDATE programs SET ${sets}, updated_at = NOW() WHERE id = $1`,
      [id, ...Object.values(fields)]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAuth();
    const id = req.nextUrl.searchParams.get("id");
    await query("DELETE FROM programs WHERE id = $1", [id]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
