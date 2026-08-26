import {
    LayoutGrid,
    FolderTree,
    Tag,
    Package,
    ShoppingCart,
    Ticket,
    Users,
    Image as ImageIcon,
    Store,
    type LucideIcon,
    Folders,
    Settings,
    ShoppingBag,
    Heart,
} from "lucide-react";

export type NavItem = {
    title: string;
    url: string;
    icon: LucideIcon;
};

export const navMainItems: NavItem[] = [
    { title: "Overview", url: "/overview", icon: LayoutGrid },
    { title: "Brands", url: "/brands", icon: Tag },
    { title: "Categories", url: "/categories", icon: FolderTree },
    { title: "Collections", url: "/collections", icon: Folders },
    { title: "Products", url: "/products", icon: Package },
    { title: "Users Carts", url: "/carts", icon: ShoppingBag },
    { title: "Users Favorites", url: "/carts", icon: Heart },
    { title: "Orders", url: "/orders", icon: ShoppingCart },
    { title: "Promo Codes", url: "/promocodes", icon: Ticket },
    { title: "Users", url: "/users", icon: Users },
    { title: "Gallery", url: "/gallery", icon: ImageIcon },
    { title: "POS", url: "/pos", icon: Store },
    { title: "Profile & Settings", url: "/profile", icon: Settings },
];

export type MockUser = {
    name: string;
    role: string;
    email: string;
};

export const mockUser: MockUser = {
    name: "Omar Emad",
    role: "Administrator",
    email: "omar@example.com",
};