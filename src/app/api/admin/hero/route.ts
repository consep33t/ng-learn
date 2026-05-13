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
    const result = await query("SELECT * FROM hero_slides ORDER BY sort_order ASC");
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("[hero GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const { title, subtitle, image_url, cta_text, cta_link, sort_order } = await req.json();
    if (!title) {
      return NextResponse.json({ error: "Judul wajib diisi" }, { status: 400 });
    }
    const result = await query(
      "INSERT INTO hero_slides (title, subtitle, image_url, cta_text, cta_link, sort_order) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, subtitle ?? "", image_url ?? "", cta_text ?? "Daftar Sekarang", cta_link ?? "#contact", sort_order ?? 0]
    );
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("[hero POST]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const { id, title, subtitle, image_url, cta_text, cta_link, sort_order, is_active } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const result = await query(
      "UPDATE hero_slides SET title = $1, subtitle = $2, image_url = $3, cta_text = $4, cta_link = $5, sort_order = $6, is_active = $7 WHERE id = $8 RETURNING *",
      [title, subtitle ?? "", image_url ?? "", cta_text ?? "Daftar Sekarang", cta_link ?? "#contact", sort_order ?? 0, is_active ?? true, id]
    );
    return NextResponse.json(result.rows[0] ?? { ok: true });
  } catch (err) {
    console.error("[hero PUT]", err);
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
    await query("DELETE FROM hero_slides WHERE id = $1", [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[hero DELETE]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
