import * as React from "react"
import {
    LayoutGrid,
    Upload,
    History,
    FileStack,
    ChartLine,
} from "lucide-react"


import { NavMain } from "../molecules/side-navigation/Nav-main"
import { NavUser } from "../molecules/side-navigation/Nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "../atoms/ui/sidebar"
import { LogoIcon } from "../atoms/ui/icons"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Programas",
            url: "/programs",
            icon: LayoutGrid,
        },
        {
            title: "Universidades",
            url: "/universities",
            icon: Upload,
        },
        {
            title: "Test vocacional",
            url: "/vocational-tes",
            icon: FileStack,
        },
        {
            title: "Test psicométrico",
            url: "/psychometric-test",
            icon: History,
        },
        {
            title: "Proyección en el mercado",
            url: "/market-projection",
            icon: ChartLine,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <LogoIcon />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
