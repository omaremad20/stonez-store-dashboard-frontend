import { AppSidebar } from "@/components/nav/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Stonez Store",
        template: "%s · Stonez Store Dashboard",
    },
    description: "Stonez Store management dashboard",
};

export default function DashboardLayout({ children }: LayoutProps<"/">) {
    return (
        <div className="flex min-h-svh flex-col">
            <TooltipProvider>
                <SidebarProvider>
                    <AppSidebar />

                    <SidebarInset className="min-w-0">
                        <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4 md:px-6">
                            <SidebarTrigger className="-ml-1 size-7" />

                            <Separator orientation="vertical" className="h-4" />

                            <span className="text-sm font-medium tracking-wide text-muted-foreground">
                                Good Morning, Omar Emad!
                            </span>
                        </header>

                        <main className="min-w-0 flex-1">
                            <div className="p-4 md:p-6">
                                {children}
                            </div>
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </TooltipProvider>
        </div>
    );
}