import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ProductsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground">
          Manage your products, inventory, visibility, and product
          information.
        </p>
      </div>

      <Button asChild className="w-full sm:w-auto">
        <Link href="/products/create-product">
          <Plus className="size-4" strokeWidth={2} />
          Create Product
        </Link>
      </Button>
    </div>
  );
}