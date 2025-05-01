import * as React from "react"

import { NavGroup } from "../molecules/side-navigation/NavGroup"
import { NavUser } from "../molecules/side-navigation/Nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "../atoms/ui/sidebar"
import { LogoIcon } from "../atoms/icons"
import { User } from "@/types"
import { SidebarData } from "@/types/sideBar"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    navMain: SidebarData
    user: User |null
    getInitials: () => string
  }
  

  export function AppSidebar({ navMain, user, getInitials, ...props }: AppSidebarProps) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader className="flex justify-center items-center">
          <div className="max-w-26 max-h-9.5 w-full h-auto">
            <LogoIcon />
          </div>
        </SidebarHeader>
  
        <SidebarContent>
          {navMain.navGroups.map((group) => (
                    <NavGroup key={group.title} title={group.title} items={group.items} />
                ))}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} getInitials = {getInitials} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }