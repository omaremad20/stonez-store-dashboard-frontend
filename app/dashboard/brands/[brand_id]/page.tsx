import { BrandDetailsView } from "@/app/dashboard/brands/[brand_id]/_components/brand-details-view";
import { getMockBrandById } from "@/app/dashboard/brands/_lib/mock/brands";

export const metadata = {
    title: "Brand Details",
};

/**
 * `getMockBrandById` stands in for a future `select * from brands where
 * id = $1`. Swap it for the real query/Server Action later — the view
 * component below already expects a plain `Brand` object either way.
 */
export default async function BrandDetails({
    params,
}: PageProps<"/brands/[brand_id]">) {
    const { brand_id } = await params;
    const brand = getMockBrandById(brand_id);

    return <BrandDetailsView brand={brand} />;
}