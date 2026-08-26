import { format } from "date-fns";

/**
 * Formats an ISO timestamp the way admins should read it, e.g.
 * "August 21, 2026 at 8:42 PM". Never render raw ISO strings in the UI.
 */
export function formatDateTime(iso: string): string {
  return format(new Date(iso), "MMMM d, yyyy 'at' h:mm a");
}
