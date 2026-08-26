/**
 * Central place to translate backend/Supabase/Postgres errors into
 * messages that are safe to show an admin. Nothing raw (stack traces,
 * SQL, error codes) should ever reach the form-level Alert directly —
 * it should always be routed through this function first.
 *
 * When real backend integration is added, throw errors from the
 * mutation and pass them straight into `getFriendlyErrorMessage`.
 */

export const DEFAULT_ERROR_MESSAGE =
  "Something went wrong while creating the brand.";

// Keyed by Postgres/Supabase error codes or custom backend error codes.
const KNOWN_ERROR_MESSAGES: Record<string, string> = {
  "23505": "A brand with this name already exists.",
  PGRST301: "Your session has expired. Please sign in again.",
  PERMISSION_DENIED: "You don't have permission to create brands.",
  UNAUTHENTICATED: "Your session has expired. Please sign in again.",
  STORAGE_UPLOAD_FAILED:
    "We couldn't upload the brand image. Please try again.",
  NETWORK_ERROR:
    "We couldn't reach the server. Check your connection and try again.",
};

interface BackendErrorShape {
  code?: string;
  message?: string;
}

function isBackendErrorShape(error: unknown): error is BackendErrorShape {
  return typeof error === "object" && error !== null;
}

export function getFriendlyErrorMessage(error: unknown): string {
  if (!error) return DEFAULT_ERROR_MESSAGE;

  if (isBackendErrorShape(error)) {
    const code = error.code;
    if (code && KNOWN_ERROR_MESSAGES[code]) {
      return KNOWN_ERROR_MESSAGES[code];
    }
  }

  // Deliberately never fall back to `error.message` — raw backend text
  // (Postgres constraint names, storage bucket paths, etc.) is not
  // something an admin should see.
  return DEFAULT_ERROR_MESSAGE;
}
