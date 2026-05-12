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
    const result = await query("SELECT * FROM gallery ORDER BY sort_order ASC, created_at DESC");
    return NextResponse.json(result.rows);
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const { title, image_url, category, sort_order } = await req.json();
    const result = await query(
      "INSERT INTO gallery (title, image_url, category, sort_order) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, image_url, category || 'umum', sort_order || 0]
    );
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAuth();
    const { id, title, image_url, category, sort_order, is_active } = await req.json();
    const result = await query(
      "UPDATE gallery SET title = $1, image_url = $2, category = $3, sort_order = $4, is_active = $5 WHERE id = $6 RETURNING *",
      [title, image_url, category, sort_order, is_active, id]
    );
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAuth();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await query("DELETE FROM gallery WHERE id = $1", [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
