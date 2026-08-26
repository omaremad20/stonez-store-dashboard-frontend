import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function AddBrandLoading() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6 p-4 md:p-8">
            <div className="space-y-2">
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-4 w-80" />
            </div>

            <Card>
                <CardContent className="space-y-8 pt-6">
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-9 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-28 w-full" />
                            </div>
                            <Skeleton className="h-16 w-full rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-40 w-full rounded-lg" />
                        </div>
                    </div>
                    <div className="flex justify-end border-t pt-6">
                        <Skeleton className="h-9 w-28" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}