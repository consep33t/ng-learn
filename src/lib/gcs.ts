import { Storage } from "@google-cloud/storage";
 
const storageOptions: any = {
  projectId: process.env.GCS_PROJECT_ID,
};
 
if (process.env.GCS_CLIENT_EMAIL && process.env.GCS_PRIVATE_KEY) {
  storageOptions.credentials = {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
}
 
const storage = new Storage(storageOptions);
export const bucket = storage.bucket(process.env.GCS_BUCKET_NAME || "ng-learn");
 
export async function uploadFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const blob = bucket.file(filename);
 
  return new Promise((resolve, reject) => {
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.type,
    });
 
    blobStream.on("error", (err) => reject(err));
    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });
    blobStream.end(buffer);
  });
}
