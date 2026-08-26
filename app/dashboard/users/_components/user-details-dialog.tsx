"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchMockUserById } from "@/app/dashboard/users/_lib/mock/users";
import type { UserProfile } from "@/app/dashboard/users/_types/user";

interface UserDetailsDialogProps {
    userId: string;
    triggerLabel?: string;
}

export function UserDetailsDialog({
    userId,
    triggerLabel = "Show",
}: UserDetailsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    const handleOpenChange = async (open: boolean) => {
        setIsOpen(open);
        if (open && !hasLoaded) {
            setIsLoading(true);
            try {
                const result = await fetchMockUserById(userId);
                setUser(result);
            } finally {
                setIsLoading(false);
                setHasLoaded(true);
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                    {triggerLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                ) : user ? (
                    <dl className="space-y-4">
                        <DetailRow label="Full Name" value={user.full_name} />
                        <DetailRow label="Email" value={user.email} />
                        <DetailRow label="Phone" value={user.phone ?? "Unavailable"} />
                        <DetailRow label="Role" value={user.role} />
                        <DetailRow label="Profile ID" value={user.id} breakAll />
                    </dl>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        We couldn&apos;t find details for this user.
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
}

function DetailRow({
    label,
    value,
    breakAll,
}: {
    label: string;
    value: string;
    breakAll?: boolean;
}) {
    return (
        <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
            </dt>
            <dd className={breakAll ? "mt-1 font-mono text-sm break-all" : "mt-1 text-sm"}>
                {value}
            </dd>
        </div>
    );
}