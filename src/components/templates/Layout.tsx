import { Outlet } from "react-router-dom"

import { AppSidebar } from "../organisms/Side-bar"

import { Separator } from "../atoms/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../atoms/ui/sidebar"

type LayoutProps = {
  navMain: Parameters<typeof AppSidebar>[0]["navMain"]
  user: {
    name: string
    email: string
    userType: string
    avatar: string
  }
}

export default function Layout({ navMain, user }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar navMain={navMain} user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
