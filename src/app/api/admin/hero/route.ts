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
    const result = await query("SELECT * FROM hero_slides ORDER BY sort_order ASC");
    return NextResponse.json(result.rows);
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const { title, subtitle, image_url, cta_text, cta_link, sort_order } = await req.json();
    const result = await query(
      "INSERT INTO hero_slides (title, subtitle, image_url, cta_text, cta_link, sort_order) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, subtitle, image_url, cta_text || 'Daftar Sekarang', cta_link || '#contact', sort_order || 0]
    );
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAuth();
    const { id, title, subtitle, image_url, cta_text, cta_link, sort_order, is_active } = await req.json();
    const result = await query(
      "UPDATE hero_slides SET title = $1, subtitle = $2, image_url = $3, cta_text = $4, cta_link = $5, sort_order = $6, is_active = $7 WHERE id = $8 RETURNING *",
      [title, subtitle, image_url, cta_text, cta_link, sort_order, is_active, id]
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
    await query("DELETE FROM hero_slides WHERE id = $1", [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
