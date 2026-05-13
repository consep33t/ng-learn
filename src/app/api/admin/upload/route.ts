import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { uploadFile } from "@/lib/gcs";

export const runtime = "nodejs"; // Force Node.js runtime (required for GCS streams)

export async function POST(req: NextRequest) {
  // 1. Auth check
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Parse multipart form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "File tidak ditemukan dalam request" }, { status: 400 });
    }

    // 3. Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Hanya file gambar yang diperbolehkan (jpg, png, webp, dll)" }, { status: 400 });
    }

    // 4. Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `Ukuran file terlalu besar. Maksimal 5MB, file Anda: ${(file.size / 1024 / 1024).toFixed(1)}MB` },
        { status: 400 }
      );
    }

    // 5. Upload to GCS
    const publicUrl = await uploadFile(file);
    
    console.log("[upload] Success:", publicUrl);
    return NextResponse.json({ url: publicUrl, ok: true });

  } catch (error: any) {
    console.error("[upload] Error:", error?.message ?? error);

    // Handle specific GCS errors
    const msg: string = error?.message ?? "";
    if (msg.includes("No such object") || msg.includes("bucket")) {
      return NextResponse.json(
        { error: "Bucket GCS tidak ditemukan. Periksa nama bucket di konfigurasi." },
        { status: 500 }
      );
    }
    if (msg.includes("credentials") || msg.includes("authentication") || msg.includes("permission")) {
      return NextResponse.json(
        { error: "Tidak ada izin akses ke Google Cloud Storage. Periksa Service Account." },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: "Gagal mengunggah gambar. Silakan coba lagi." }, { status: 500 });
  }
}
