import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BrandHeaderProps {
    brandId: string;
}

export function BrandHeader({ brandId }: BrandHeaderProps) {
    return (
        <div className="space-y-4 print:hidden">
            <Button variant="ghost" size="sm" className="-ml-2" asChild>
                <Link href="/brands">
                    <ArrowLeft className="size-4" aria-hidden />
                    Back to brands
                </Link>
            </Button>

            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-semibold tracking-tight">Brand Details</h1>
                <Button asChild>
                    <Link href={`/brands/update-brand/${brandId}`}>
                        <Pencil className="size-4" aria-hidden />
                        Update Brand
                    </Link>
                </Button>
            </div>
        </div>
    );
}