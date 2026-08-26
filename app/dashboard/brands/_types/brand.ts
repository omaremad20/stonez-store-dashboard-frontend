/**
 * Mirrors `public.brands`. Nullable columns stay nullable here so the UI
 * is forced to handle the NULL states the schema actually allows
 * (missing image, missing display_order, ON DELETE SET NULL audit refs).
 */
export interface Brand {
  id: string;
  created_at: string;
  updated_at: string;
  display_order: number | null;
  is_active: boolean;
  name: string;
  image_url: string | null;
  description: string | null;
  created_by: string | null;
  last_update_by: string | null;
  last_update_by_email_snapshot: string;
  created_by_email_snapshot: string;
  storage_path: string | null;
}

/**
 * The shape the real backend/Server Action will eventually receive when
 * creating a brand. `display_order`, `id`, timestamps, and audit fields
 * are owned by the backend / DB, or (for `display_order`) by the Brands
 * listing drag & drop UI.
 */
export interface CreateBrandPayload {
  name: string;
  description: string | null;
  image: File;
  is_active: boolean;
}
