import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ─────────────────────────────────────────────
// Mock auth and DB
// ─────────────────────────────────────────────
vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  query: vi.fn(),
}));

import { auth } from "@/auth";
import { query } from "@/lib/db";

// Helper to create fake requests
function makeReq(body?: object, searchParams?: Record<string, string>) {
  const url = new URL("http://localhost/api/admin/test");
  if (searchParams) {
    Object.entries(searchParams).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  return new NextRequest(url, {
    method: body ? "POST" : "GET",
    body: body ? JSON.stringify(body) : undefined,
    headers: body ? { "Content-Type": "application/json" } : undefined,
  });
}

// ═══════════════════════════════════════════════
// SETTINGS API
// ═══════════════════════════════════════════════
describe("Admin Settings API", () => {
  const { GET, PUT } = require("@/app/api/admin/settings/route");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET returns 401 when not authenticated", async () => {
    (auth as any).mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe("Unauthorized");
  });

  it("GET returns settings when authenticated", async () => {
    (auth as any).mockResolvedValue({ user: { email: "admin@test.com" } });
    (query as any).mockResolvedValue({ rows: [{ key: "site_name", value: "NG.LEARN" }] });
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body[0].key).toBe("site_name");
  });

  it("PUT returns 401 when not authenticated", async () => {
    (auth as any).mockResolvedValue(null);
    const req = makeReq({ key: "site_name", value: "Test" });
    const res = await PUT(req);
    expect(res.status).toBe(401);
  });

  it("PUT returns 400 when key is missing", async () => {
    (auth as any).mockResolvedValue({ user: { email: "admin@test.com" } });
    const req = makeReq({ value: "Test" });
    const res = await PUT(req);
    expect(res.status).toBe(400);
  });

  it("PUT updates setting when authenticated", async () => {
    (auth as any).mockResolvedValue({ user: { email: "admin@test.com" } });
    (query as any).mockResolvedValue({ rows: [] });
    const req = makeReq({ key: "site_name", value: "NG.LEARN Baru" });
    const res = await PUT(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});

// ═══════════════════════════════════════════════
// PROGRAMS API
// ═══════════════════════════════════════════════
describe("Admin Programs API", () => {
  const { GET, POST, PUT, DELETE } = require("@/app/api/admin/programs/route");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET returns 401 when not authenticated", async () => {
    (auth as any).mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("POST returns 400 when title is missing", async () => {
    (auth as any).mockResolvedValue({ user: {} });
    const req = makeReq({ description: "Test" });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Title");
  });

  it("POST creates program when data is valid", async () => {
    (auth as any).mockResolvedValue({ user: {} });
    (query as any).mockResolvedValue({ rows: [{ id: 1, title: "Matematika" }] });
    const req = makeReq({ title: "Matematika", price: 150000 });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.title).toBe("Matematika");
  });

  it("PUT returns 400 when id is missing", async () => {
    (auth as any).mockResolvedValue({ user: {} });
    const req = new NextRequest("http://localhost/api/admin/programs", {
      method: "PUT",
      body: JSON.stringify({ title: "Test" }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await PUT(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("ID");
  });

  it("DELETE returns 400 when id is missing", async () => {
    (auth as any).mockResolvedValue({ user: {} });
    const req = makeReq(undefined, {});
    const res = await DELETE(req);
    expect(res.status).toBe(400);
  });

  it("DELETE removes program when id is provided", async () => {
    (auth as any).mockResolvedValue({ user: {} });
    (query as any).mockResolvedValue({ rows: [] });
    const req = makeReq(undefined, { id: "1" });
    const res = await DELETE(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});

// ═══════════════════════════════════════════════
// CONTACT API (public)
// ═══════════════════════════════════════════════
describe("Contact API", () => {
  const { POST } = require("@/app/api/contact/route");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("POST returns 400 when name or message is missing", async () => {
    const req = makeReq({ name: "Budi" }); // no message
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("POST submits message when data is valid", async () => {
    (query as any).mockResolvedValue({ rows: [] });
    const req = makeReq({ name: "Budi", message: "Halo, saya ingin bertanya!", phone: "08123" });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});

// ═══════════════════════════════════════════════
// GALLERY API
// ═══════════════════════════════════════════════
describe("Admin Gallery API", () => {
  const { POST: GalleryPOST } = require("@/app/api/admin/gallery/route");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("POST returns 400 when image_url is missing", async () => {
    (auth as any).mockResolvedValue({ user: {} });
    const req = makeReq({ title: "Photo" });
    const res = await GalleryPOST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Image URL");
  });

  it("POST creates gallery item when image_url is provided", async () => {
    (auth as any).mockResolvedValue({ user: {} });
    (query as any).mockResolvedValue({ rows: [{ id: 1, image_url: "https://gcs.com/photo.jpg" }] });
    const req = makeReq({ title: "Kegiatan Belajar", image_url: "https://gcs.com/photo.jpg" });
    const res = await GalleryPOST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.image_url).toBe("https://gcs.com/photo.jpg");
  });
});
