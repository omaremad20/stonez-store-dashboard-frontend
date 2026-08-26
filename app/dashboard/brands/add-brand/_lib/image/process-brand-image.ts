import imageCompression from "browser-image-compression";
import type { ProcessedBrandImage } from "@/app/dashboard/brands/add-brand/_lib/validations/brand";

export const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
] as const;

export const ACCEPTED_IMAGE_EXTENSIONS_LABEL = "PNG, JPG, JPEG, or WebP";

export const MAX_ORIGINAL_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const MAX_ORIGINAL_FILE_SIZE_LABEL = "10 MB";

export type ImageValidationError = "unsupported-type" | "too-large";

/** Validates the *original* file before any processing happens. */
export function validateBrandImageFile(
  file: File,
): ImageValidationError | null {
  const isAcceptedType = (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(
    file.type,
  );
  if (!isAcceptedType) return "unsupported-type";
  if (file.size > MAX_ORIGINAL_FILE_SIZE_BYTES) return "too-large";
  return null;
}

/**
 * Compresses an accepted image, resizes it if needed, and converts it to
 * WebP entirely on the client. Nothing is uploaded — the result is kept
 * in local form state until the real backend integration lands.
 */
export async function processBrandImage(
  file: File,
): Promise<ProcessedBrandImage> {
  // Settings tuned for brand logos/marks rather than photography:
  // small target size, a sensible max dimension, and a quality floor
  // high enough that logos don't get muddy.
  const compressed = await imageCompression(file, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.85,
  });

  // Some browsers keep the original extension in the compressed file's
  // name even though the bytes are already WebP — normalize both.
  const webpFile =
    compressed.type === "image/webp"
      ? compressed
      : new File([compressed], renameToWebp(compressed.name), {
          type: "image/webp",
        });

  const previewUrl = URL.createObjectURL(webpFile);

  return {
    file: webpFile,
    previewUrl,
    originalName: file.name,
    sizeBytes: webpFile.size,
    mimeType: "image/webp",
  };
}

function renameToWebp(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^./\\]+$/, "");
  return `${withoutExtension || "brand-image"}.webp`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
