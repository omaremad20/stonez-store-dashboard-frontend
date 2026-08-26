import { BrandAuditSection } from "@/app/dashboard/brands/[brand_id]/_components/brand-audit-section";
import { BrandHeader } from "@/app/dashboard/brands/[brand_id]/_components/brand-header";
import { BrandIdActions } from "@/app/dashboard/brands/[brand_id]/_components/brand-id-actions";
import { BrandImage } from "@/app/dashboard/brands/[brand_id]/_components/brand-image";
import { BrandStatusBadge } from "@/app/dashboard/brands/[brand_id]/_components/brand-status-badge";
import type { Brand } from "@/app/dashboard/brands/_types/brand";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/format/date";

interface BrandDetailsViewProps {
    brand: Brand;
}

export function BrandDetailsView({ brand }: BrandDetailsViewProps) {
    return (
        <div className="space-y-6">
            <BrandHeader brandId={brand.id} />

            <div className="grid gap-6 md:grid-cols-[280px_1fr]">
                <BrandImage imageUrl={brand.image_url} brandName={brand.name} />

                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-semibold tracking-tight">{brand.name}</h2>
                        <BrandStatusBadge isActive={brand.is_active} />
                    </div>

                    {brand.description ? (
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Description
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-foreground">
                                {brand.description}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No description available.</p>
                    )}
                </div>
            </div>

            <Separator className="print:hidden" />

            <section className="space-y-4 print:hidden">
                <h3 className="text-sm font-medium text-muted-foreground">Brand Information</h3>

                <div className="space-y-4 rounded-lg border p-4">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Brand ID
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-3">
                            <p className="min-w-0 break-all font-mono text-sm">{brand.id}</p>
                            <BrandIdActions brandId={brand.id} />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Created
                            </p>
                            <p className="mt-1 text-sm">{formatDateTime(brand.created_at)}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Last Updated
                            </p>
                            <p className="mt-1 text-sm">{formatDateTime(brand.updated_at)}</p>
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="print:hidden" />

            <section className="space-y-4 print:hidden">
                <h3 className="text-sm font-medium text-muted-foreground">Audit Information</h3>
                <BrandAuditSection brand={brand} />
            </section>
        </div>
    );
}