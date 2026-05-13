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
    const result = await query("SELECT * FROM programs ORDER BY sort_order, id");
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("[programs GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const { title, description, icon, level, price, duration, is_active, sort_order, color } = await req.json();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const result = await query(
      "INSERT INTO programs (title, description, icon, level, price, duration, is_active, sort_order, color) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [title, description ?? "", icon ?? "📚", level ?? "SD - SMA", price ?? 0, duration ?? "90 menit/sesi", is_active ?? true, sort_order ?? 0, color ?? "primary"]
    );
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("[programs POST]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const body = await req.json();
    const { id, created_at, updated_at, ...fields } = body;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const keys = Object.keys(fields);
    if (keys.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }
    const sets = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
    const result = await query(
      `UPDATE programs SET ${sets}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...Object.values(fields)]
    );
    return NextResponse.json(result.rows[0] ?? { ok: true });
  } catch (err) {
    console.error("[programs PUT]", err);
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
    await query("DELETE FROM programs WHERE id = $1", [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[programs DELETE]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
