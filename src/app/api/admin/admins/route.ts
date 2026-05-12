import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function GET() {
  try {
    await requireAuth();
    const result = await query("SELECT id, name, email, role, created_at FROM admin_users ORDER BY id");
    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const { name, email, password, role } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await query(
      "INSERT INTO admin_users (name, email, password, role) VALUES ($1, $2, $3, $4)",
      [name, email, hashedPassword, role]
    );
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server error";
    if (msg.includes("unique")) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAuth();
    const id = req.nextUrl.searchParams.get("id");
    // Prevent deleting superadmin
    const admin = await query("SELECT role FROM admin_users WHERE id = $1", [id]);
    if (admin.rows[0]?.role === "superadmin") {
      return NextResponse.json({ error: "Tidak bisa hapus superadmin" }, { status: 400 });
    }
    await query("DELETE FROM admin_users WHERE id = $1", [id]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
