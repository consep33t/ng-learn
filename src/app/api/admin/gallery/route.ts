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
    const result = await query("SELECT * FROM gallery ORDER BY sort_order ASC, created_at DESC");
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("[gallery GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const { title, image_url, category, sort_order } = await req.json();
    if (!image_url) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }
    const result = await query(
      "INSERT INTO gallery (title, image_url, category, sort_order) VALUES ($1, $2, $3, $4) RETURNING *",
      [title ?? "", image_url, category ?? "umum", sort_order ?? 0]
    );
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("[gallery POST]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const { id, title, image_url, category, sort_order, is_active } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const result = await query(
      "UPDATE gallery SET title = $1, image_url = $2, category = $3, sort_order = $4, is_active = $5 WHERE id = $6 RETURNING *",
      [title ?? "", image_url ?? "", category ?? "umum", sort_order ?? 0, is_active ?? true, id]
    );
    return NextResponse.json(result.rows[0] ?? { ok: true });
  } catch (err) {
    console.error("[gallery PUT]", err);
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
    await query("DELETE FROM gallery WHERE id = $1", [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[gallery DELETE]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
