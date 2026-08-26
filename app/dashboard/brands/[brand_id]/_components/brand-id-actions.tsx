"use client";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface BrandIdActionsProps {
    brandId: string;
}

export function BrandIdActions({ brandId }: BrandIdActionsProps) {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(brandId);
            toast.success("Brand ID copied successfully.");
        } catch {
            toast.error("Failed to copy the brand ID. Please try again.");
        }
    };

    return (
        <div className="flex min-w-0 items-center gap-1.5 print:hidden">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleCopy}
                        aria-label="Copy brand ID"
                    >
                        <Copy className="size-4" aria-hidden />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Copy ID</TooltipContent>
            </Tooltip>
        </div>
    );
}