import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function BrandDetailsLoading() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-8">
            <div className="space-y-4">
                <Skeleton className="h-8 w-32" />
                <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-9 w-32" />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-[280px_1fr]">
                <Skeleton className="aspect-4/3 w-full rounded-lg" />
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <Skeleton className="h-4 w-32" />
                <div className="space-y-4 rounded-lg border p-4">
                    <Skeleton className="h-10 w-full" />
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <Skeleton className="h-4 w-40" />
                <div className="grid gap-4 md:grid-cols-2">
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-40 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
}