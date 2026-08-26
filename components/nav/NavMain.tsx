"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { navMainItems } from "@/components/nav/NavData";

export function NavMain() {
    const pathname = usePathname();

    return (
        <SidebarGroup className="px-2">
            <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                    {navMainItems.map((item) => {
                        const isActive =
                            pathname === item.url || pathname?.startsWith(`${item.url}/`);

                        return (
                            <SidebarMenuItem key={item.url}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    tooltip={item.title}
                                    className="h-10 rounded-md text-[13px] font-medium tracking-wide text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground data-[active=true]:font-semibold"
                                >
                                    <Link href={item.url}>
                                        <item.icon
                                            className="size-4.5 shrink-0"
                                            strokeWidth={1.75}
                                        />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}