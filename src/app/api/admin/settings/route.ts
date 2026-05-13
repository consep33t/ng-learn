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
    const result = await query("SELECT * FROM site_settings ORDER BY id");
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("[settings GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const guard = await getAuthGuard();
  if (guard) return guard;
  try {
    const { key, value } = await req.json();
    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }
    await query(
      "UPDATE site_settings SET value = $1, updated_at = NOW() WHERE key = $2",
      [value ?? "", key]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[settings PUT]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
