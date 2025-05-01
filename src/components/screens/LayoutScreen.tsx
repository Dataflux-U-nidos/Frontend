import { useAuthContext } from "@/context/AuthContext"
import LayoutTemplate from "@/components/templates/Layout"
import { sidebarData } from "@/data/sidebar-data"
import type { NavItem, SidebarData } from "@/types/sideBar"

export default function LayoutScreen() {
    const { user, logout } = useAuthContext()

    function filterSidebarDataByRole(data: SidebarData, userRole: string): SidebarData {
        return {
            navGroups: data.navGroups.map(group => ({
                ...group,
                items: group.items
                    .map(item => {
                        if ("items" in item) {
                            const filteredSubItems = item.items?.filter(sub => {
                                if (!sub.roles) return true
                                return sub.roles.includes(userRole)
                            }) ?? []

                            return {
                                title: item.title,
                                badge: item.badge,
                                icon: item.icon,
                                roles: item.roles,
                                items: filteredSubItems
                            }
                        } else {
                            if (item.roles && !item.roles.includes(userRole)) {
                                return null
                            }
                            return {
                                title: item.title,
                                badge: item.badge,
                                icon: item.icon,
                                roles: item.roles,
                                url: item.url
                            }
                        }
                    })
                    .filter(Boolean) as NavItem[] 
            }))
        }
    }

    
    const filteredData =
        user && user.userType
            ? filterSidebarDataByRole(sidebarData, user.userType)
            : sidebarData
    
    async function handleLogout() {
        try {
            await logout()
        } catch (error) {
            console.error("Error cerrando sesión:", error)
        }
    }

    function getInitials() {
        if (!user) return ""
        const firstInitial = user.name?.charAt(0)?.toUpperCase() || ""
        const lastInitial = user.last_name?.charAt(0)?.toUpperCase() || ""
        return `${firstInitial}${lastInitial}`
    }
    return (
        <LayoutTemplate
            user={user}
            navMain={filteredData}
            // onLogout={handleLogout}
            getInitials={getInitials}
        />
    )
}