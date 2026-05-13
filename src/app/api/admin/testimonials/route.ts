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
    const result = await query("SELECT * FROM testimonials ORDER BY created_at DESC");
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("[testimonials GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const { student_name, student_grade, content, rating, is_active, avatar_url } = await req.json();
    if (!student_name || !content) {
      return NextResponse.json({ error: "Nama dan isi testimoni wajib diisi" }, { status: 400 });
    }
    const result = await query(
      "INSERT INTO testimonials (student_name, student_grade, content, rating, is_active, avatar_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [student_name, student_grade ?? "", content, rating ?? 5, is_active ?? true, avatar_url ?? null]
    );
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("[testimonials POST]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const body = await req.json();
    const { id, created_at, ...fields } = body;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const keys = Object.keys(fields);
    if (keys.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }
    const sets = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
    const result = await query(
      `UPDATE testimonials SET ${sets} WHERE id = $1 RETURNING *`,
      [id, ...Object.values(fields)]
    );
    return NextResponse.json(result.rows[0] ?? { ok: true });
  } catch (err) {
    console.error("[testimonials PUT]", err);
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
    await query("DELETE FROM testimonials WHERE id = $1", [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[testimonials DELETE]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
