import { CheckCircle2, CircleSlash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BrandStatusBadgeProps {
    isActive: boolean;
}

export function BrandStatusBadge({ isActive }: BrandStatusBadgeProps) {
    return (
        <Badge
            variant={isActive ? "default" : "secondary"}
            className={cn("gap-1.5", !isActive && "text-muted-foreground")}
        >
            {isActive ? (
                <CheckCircle2 className="size-3.5" aria-hidden />
            ) : (
                <CircleSlash className="size-3.5" aria-hidden />
            )}
            {isActive ? "Active" : "Inactive"}
        </Badge>
    );
}