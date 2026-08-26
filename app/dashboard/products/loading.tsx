import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-4 w-72 max-w-full" />
                </div>
                <Skeleton className="h-9 w-full sm:w-36" />
            </div>

            <div className="flex gap-3 overflow-x-hidden">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex min-w-50 flex-1 shrink-0 flex-col gap-3 rounded-lg border bg-card p-4"
                    >
                        <Skeleton className="size-9 rounded-md" />
                        <div className="space-y-2">
                            <Skeleton className="h-3.5 w-24" />
                            <Skeleton className="h-6 w-14" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}