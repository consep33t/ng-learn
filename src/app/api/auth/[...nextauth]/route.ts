import { handlers } from "@/auth";
import { NextRequest } from "next/server";

// Next.js 16 requires params to be a Promise in route handlers
export async function GET(
  req: NextRequest,
  _props: { params: Promise<{ nextauth: string[] }> }
) {
  return handlers.GET(req);
}

export async function POST(
  req: NextRequest,
  _props: { params: Promise<{ nextauth: string[] }> }
) {
  return handlers.POST(req);
}
