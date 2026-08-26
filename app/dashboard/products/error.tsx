"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full border bg-muted/40">
        <TriangleAlert
          className="size-6 text-muted-foreground"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </span>

      <div className="space-y-1">
        <h2 className="text-base font-semibold">Something went wrong</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          We couldn&apos;t load the products page. Please try again.
        </p>
      </div>

      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}