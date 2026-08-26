import type { Brand } from "@/app/dashboard/brands/_types/brand";

/**
 * Realistic fixtures for UI development. Replace `getMockBrandById` with
 * a real Supabase query later — callers already treat this as async-shaped
 * data flowing from a `page.tsx` fetch, so the swap is a one-line change.
 */
export const mockBrands: Brand[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    created_at: "2026-08-21T18:42:00.000Z",
    updated_at: "2026-08-21T19:15:00.000Z",
    display_order: 1,
    is_active: true,
    name: "Prada",
    image_url:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    description:
      "Italian luxury fashion brand known for its leather goods, footwear, and ready-to-wear collections.",
    created_by: "550e8400-e29b-41d4-a716-446655440001",
    last_update_by: "550e8400-e29b-41d4-a716-446655440002",
    last_update_by_email_snapshot: "editor@example.com",
    created_by_email_snapshot: "admin@example.com",
    storage_path: "brands/prada/logo.webp",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440010",
    created_at: "2026-07-02T09:05:00.000Z",
    updated_at: "2026-07-02T09:05:00.000Z",
    display_order: 2,
    is_active: false,
    name: "Aldebaran",
    image_url: null,
    description: null,
    created_by: null,
    last_update_by: "550e8400-e29b-41d4-a716-446655440002",
    last_update_by_email_snapshot: "editor@example.com",
    created_by_email_snapshot: "admin@example.com",
    storage_path: null,
  },
];

const fallbackBrand = mockBrands[0];

/** Looks up a mock brand by id, falling back to a demo brand so any route param renders. */
export function getMockBrandById(brandId: string): Brand {
  const found = mockBrands.find((brand) => brand.id === brandId);
  if (found) return found;
  return { ...fallbackBrand, id: brandId };
}
