import type { LucideIcon } from "lucide-react";
import { Package, Eye, EyeOff, PackageX } from "lucide-react";

export type ProductStats = {
    total: number;
    active: number;
    hidden: number;
    outOfStock: number;
};

type StatCard = {
    label: string;
    value: number;
    icon: LucideIcon;
};

export function ProductStats({ stats }: { stats: ProductStats }) {
    const cards: StatCard[] = [
        { label: "Total Products", value: stats.total, icon: Package },
        { label: "Active Products", value: stats.active, icon: Eye },
        { label: "Hidden Products", value: stats.hidden, icon: EyeOff },
        { label: "Out of Stock", value: stats.outOfStock, icon: PackageX },
    ];

    return (
        <div
            className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin"
            role="list"
            aria-label="Product statistics"
        >
            {cards.map((card) => (
                <div
                    key={card.label}
                    role="listitem"
                    className="flex min-w-50 flex-1 shrink-0 flex-col gap-3 rounded-lg border bg-card p-4"
                >
                    <span className="flex size-9 items-center justify-center rounded-md border bg-muted/40">
                        <card.icon
                            className="size-4.5 text-muted-foreground"
                            strokeWidth={1.75}
                            aria-hidden="true"
                        />
                    </span>

                    <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground">{card.label}</p>
                        <p className="text-2xl font-semibold tracking-tight tabular-nums">
                            {card.value.toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}