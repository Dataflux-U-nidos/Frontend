import { LucideIcon } from "lucide-react";

interface BaseNavItem {
    title: string;
    badge?: string;
    icon?: React.ElementType;
    roles?: string[];
}

export type NavLink = BaseNavItem & {
    url: string;
    items?: never;
};

export type NavCollapsible = BaseNavItem & {
    items: (BaseNavItem & { url: string })[];
    url?: never;
};

export type NavItem = NavLink | NavCollapsible;

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface SidebarData {
    navGroups: NavGroup[];
}
export type SidebarItem = {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    roles: string[]; // Puedes filtrar por roles si es necesario
};


