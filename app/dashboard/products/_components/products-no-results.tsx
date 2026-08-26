"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

type ProductsNoResultsProps = {
    /** Wired up once search/filters are implemented. Optional for now. */
    onClearFilters?: () => void;
};

export function ProductsNoResults({ onClearFilters }: ProductsNoResultsProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full border bg-muted/40">
                <Search
                    className="size-6 text-muted-foreground"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
            </span>

            <div className="space-y-1">
                <h2 className="text-base font-semibold">No products found</h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                    No products match your current search or filters.
                </p>
            </div>

            <Button variant="outline" onClick={onClearFilters}>
                Clear Filters
            </Button>
        </div>
    );
}