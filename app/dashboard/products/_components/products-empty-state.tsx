import Link from "next/link";
import { Package, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ProductsEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full border bg-muted/40">
                <Package
                    className="size-6 text-muted-foreground"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
            </span>

            <div className="space-y-1">
                <h2 className="text-base font-semibold">No products yet</h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                    Create your first product and get started!
                </p>
            </div>

            <Button asChild>
                <Link href="/create-product">
                    <Plus className="size-4" strokeWidth={2} />
                    Create Product
                </Link>
            </Button>
        </div>
    );
}