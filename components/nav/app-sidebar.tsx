import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/components/ui/sidebar";

import { mockUser } from "@/components/nav/NavData";
import { NavMain } from "@/components/nav/NavMain";
import stonez_logo from "@/public/stonez_logo.png";
import Image from "next/image";

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className="border-r border-sidebar-border">
            <SidebarHeader className="p-0">
                <Link
                    href="/profile"
                    className="flex items-center relative gap-3 px-2 py-3 transition-colors hover:bg-sidebar-accent"
                >
                    <Image src={stonez_logo} alt="Stonez Store" width={48} height={48} />
                    <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
                        <span className="truncate text-[13px] font-semibold tracking-wide">
                            {mockUser.name}
                        </span>
                        <span className="truncate text-[11px] uppercase tracking-widest text-sidebar-foreground/50">
                            {mockUser.role}
                        </span>
                    </div>
                </Link>
                <Separator className="bg-sidebar-border" />
            </SidebarHeader>

            <SidebarContent className="py-2">
                <NavMain />
            </SidebarContent>

            <Separator className="bg-sidebar-border" />
        </Sidebar>
    );
}