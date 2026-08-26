import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDetailsDialog } from "@/app/dashboard/users/_components/user-details-dialog";
import { formatDateTime } from "@/lib/format/date";
import type { Brand } from "@/app/dashboard/brands/_types/brand";

interface BrandAuditSectionProps {
    brand: Brand;
}

export function BrandAuditSection({ brand }: BrandAuditSectionProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <AuditCard
                title="Created"
                dateLabel={formatDateTime(brand.created_at)}
                emailSnapshot={brand.created_by_email_snapshot}
                userId={brand.created_by}
            />
            <AuditCard
                title="Last Updated"
                dateLabel={formatDateTime(brand.updated_at)}
                emailSnapshot={brand.last_update_by_email_snapshot}
                userId={brand.last_update_by}
            />
        </div>
    );
}

function AuditCard({
    title,
    dateLabel,
    emailSnapshot,
    userId,
}: {
    title: string;
    dateLabel: string;
    emailSnapshot: string;
    userId: string | null;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm">{dateLabel}</p>

                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Email
                    </p>
                    <p className="mt-0.5 text-sm">{emailSnapshot}</p>
                </div>

                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            User ID
                        </p>
                        <p className="mt-0.5 break-all font-mono text-xs text-muted-foreground">
                            {userId ?? "Unavailable"}
                        </p>
                    </div>
                    {userId ? (
                        <div className="shrink-0">
                            <UserDetailsDialog userId={userId} />
                        </div>
                    ) : null}
                </div>
            </CardContent>
        </Card>
    );
}