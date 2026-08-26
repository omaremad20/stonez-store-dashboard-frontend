import type { Metadata } from "next";

import { ProductsEmptyState } from "@/app/products/_components/products-empty-state";
import { ProductsHeader } from "@/app/products/_components/products-header";
import { ProductStats } from "@/app/products/_components/products-stats";

export const metadata: Metadata = {
    title: "Products",
};

// Temporary mock data — replace with a Supabase fetch later.
const productStats = {
    total: 128,
    active: 96,
    hidden: 20,
    outOfStock: 12,
};

export default function Products() {
    return (
        <div className="space-y-6">
            <ProductsHeader />

            <ProductStats stats={productStats} />

            {/*
        The table, search, and filters aren't implemented yet.
        ProductsEmptyState is rendered here as a placeholder so the page
        reads as complete in the meantime — swap this section out for the
        products table (and ProductsNoResults for empty search/filter
        results) once those are built.
      */}
            <ProductsEmptyState />
        </div>
    );
}