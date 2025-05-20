import { useNavigate } from "react-router-dom";
import {
  CircleUserRound,
  ChevronsUpDown,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../atoms/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../atoms/ui/sidebar";
import { useAuthContext } from "@/context/AuthContext";
import { User } from "@/types";
import { NavItem } from "@/types/sideBar";


interface NavUserProps {
  user: User | null
  getInitials: () => string
  settingsItems: NavItem[]
}

export function NavUser({
  user,
  getInitials,
}: NavUserProps) {
  const { isMobile } = useSidebar();
  const { logout, userType } = useAuthContext();

  const navigate = useNavigate();

  const handleAccount = async () => {
    try {
      if (userType === "VIEWER") {
        navigate("/account-viewer");
      } else if (userType === "STUDENT") {
        navigate("/account-student");
      } else if (userType === "TUTOR") {
        navigate("/account-tutor");
      } else if (userType === "UNIVERSITY") {
        navigate("/account-university");
      } else if (userType === "ADMIN") {
        navigate("/account-admin");
      } else if (userType === "SUPPORT") {
        navigate("/account-support");
      } else if (userType === "MARKETING") {
        navigate("/account-marketing");
      }
      else if (userType === "FINANCES") {
        navigate("/account-finance");
      }
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("userData");
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg bg-gray-400 text-white">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
                <span className="truncate text-[10px]">{user?.userType}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-lg bg-gray-400 text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                  <span className="truncate text-[10px]">{user?.userType}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleAccount}>
                <CircleUserRound />
                Mi Cuenta
              </DropdownMenuItem>

            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
