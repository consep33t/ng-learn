import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, grade, message } = body;
    if (!name || !message) {
      return NextResponse.json({ error: "Name and message required" }, { status: 400 });
    }
    await query(
      "INSERT INTO contact_messages (name, phone, message) VALUES ($1, $2, $3)",
      [name, `${grade ? grade + " | " : ""}${phone || ""}`, message]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
