import * as React from "react"

import { NavMain } from "../molecules/side-navigation/Nav-main"
import { NavUser } from "../molecules/side-navigation/Nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "../atoms/ui/sidebar"
import { LogoIcon } from "../atoms/icons"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    navMain: Parameters<typeof NavMain>[0]["items"]
    user: {
      name: string
      email: string
      userType: string
      avatar: string
    }
  }
  
  export function AppSidebar({ navMain, user, ...props }: AppSidebarProps) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader className="flex justify-center items-center">
          <div className="max-w-26 max-h-9.5 w-full h-auto">
            <LogoIcon />
          </div>
        </SidebarHeader>
  
        <SidebarContent>
          <NavMain items={navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }