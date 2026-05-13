import { Storage } from "@google-cloud/storage";

// Build storage options - supports both Service Account JSON key and ADC
const storageOptions: ConstructorParameters<typeof Storage>[0] = {
  projectId: process.env.GCS_PROJECT_ID,
};

// Only add explicit credentials if provided (for local dev or non-GCP environments)
// When running on Cloud Run, ADC (Application Default Credentials) is used automatically
if (process.env.GCS_CLIENT_EMAIL && process.env.GCS_PRIVATE_KEY) {
  storageOptions.credentials = {
    client_email: process.env.GCS_CLIENT_EMAIL,
    // Replace literal \n with actual newlines (common issue when storing in env vars)
    private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
}

const storage = new Storage(storageOptions);

const bucketName = process.env.GCS_BUCKET_NAME || "ng-learn";
export const bucket = storage.bucket(bucketName);

/**
 * Uploads a file to Google Cloud Storage.
 * Returns the public URL of the uploaded file.
 * The bucket must be set to public read access.
 */
export async function uploadFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Sanitize filename: remove spaces, special chars, preserve extension
  const ext = file.name.split(".").pop() ?? "jpg";
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")           // remove extension
    .replace(/[^a-zA-Z0-9-_]/g, "-")   // replace unsafe chars
    .replace(/-+/g, "-")               // collapse multiple dashes
    .toLowerCase()
    .slice(0, 50);                      // limit length

  const filename = `uploads/${Date.now()}-${safeName}.${ext}`;
  const blob = bucket.file(filename);

  return new Promise((resolve, reject) => {
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.type,
      // Note: Do NOT set predefinedAcl here.
      // This bucket uses uniform IAM access control (allUsers = objectViewer),
      // so per-object ACLs are disabled. Public access is set at bucket level.
    });

    blobStream.on("error", (err) => {
      console.error("[gcs] Upload stream error:", err);
      reject(err);
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
      resolve(publicUrl);
    });

    blobStream.end(buffer);
  });
}
