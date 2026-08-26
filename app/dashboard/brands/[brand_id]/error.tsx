"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BrandDetailsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Send to your logging/monitoring provider here later.
        console.error(error);
    }, [error]);

    return (
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center py-16">
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
                    <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
                        <AlertTriangle className="size-6 text-destructive" aria-hidden />
                    </div>
                    <h2 className="text-lg font-semibold">Something went wrong</h2>
                    <p className="text-sm text-muted-foreground">
                        We couldn&apos;t load this brand.
                    </p>
                    <Button onClick={reset} className="mt-2">
                        Try again
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}