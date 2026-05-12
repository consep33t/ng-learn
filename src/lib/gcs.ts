import { Storage } from "@google-cloud/storage";

const storageOptions: any = {
  projectId: process.env.GCS_PROJECT_ID,
};

// Only add credentials if they are provided in environment variables
// This allows the app to fallback to Application Default Credentials (ADC)
if (process.env.GCS_CLIENT_EMAIL && process.env.GCS_PRIVATE_KEY) {
  storageOptions.credentials = {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
}

const storage = new Storage(storageOptions);

export const bucket = storage.bucket(process.env.GCS_BUCKET_NAME || "ng-learn");

export async function uploadFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const blob = bucket.file(filename);

  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.type,
  });

  return new Promise((resolve, reject) => {
    blobStream.on("error", (err) => reject(err));
    blobStream.on("finish", () => {
      // The public URL can be used if the bucket is public or through a signed URL
      // For a public bucket:
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });
    blobStream.end(buffer);
  });
}
