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
    const result = await query("SELECT * FROM site_settings ORDER BY id");
    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAuth();
    const { key, value } = await req.json();
    await query(
      "UPDATE site_settings SET value = $1, updated_at = NOW() WHERE key = $2",
      [value, key]
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
