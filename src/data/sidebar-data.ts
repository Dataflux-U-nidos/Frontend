import {
  Presentation,
  House,
  University,
  BookOpenCheck,
  ChartSpline,
  HandCoins,
  Headset,
  School,
  FileUser,
  BookCopy,
  Glasses,
} from "lucide-react";
import type { SidebarData } from "../types/sideBar";

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "Menú",
      
      items: [
        // Viewer
        { title: "Dashboard", url: "/viewer-dashboard", icon: ChartSpline, roles: ["VIEWER", "UNIVERSITY"] },

        // Student
        { title: "Mi perfil", url: "/student-profile", icon: House, roles: ["STUDENT"] },
        { title: "Programas", url: "/student-programs", icon: BookCopy, roles: ["STUDENT"] },
        { title: "Universidades", url: "/student-universities", icon: University, roles: ["STUDENT"] },
        { title: "Salidas laborales", url: "/student-carrerProspects", icon: ChartSpline, roles: ["STUDENT"] },
        { title: "Encuesta de satisfacción", url: "/student-survey", icon: Headset, roles: ["STUDENT"] },
        { title: "Tests", url: "/student-grades", icon: BookOpenCheck, roles: ["STUDENT"] },
  
        // Tutor
        { title: "Estudiantes", url: "/tutor-students", icon: University, roles: ["TUTOR"] },

        // University
        { title: "Visualizadores", url: "/university-viewers", icon: Presentation, roles: ["UNIVERSITY"] },
        { title: "Gestores de información", url: "/university-managers", icon: House, roles: ["UNIVERSITY"] },

        // Admin
        { title: "Dashboard", url: "/admin-dashboard", icon: Presentation, roles: ["ADMIN"] },
        { title: "Soporte", url: "/admin-support", icon: University, roles: ["ADMIN"] },
        { title: "Finanzas", url: "/admin-finances", icon: BookOpenCheck, roles: ["ADMIN"] },
        { title: "Marketing", url: "/admin-marketing", icon: ChartSpline, roles: ["ADMIN"] },
        { title: "Salidas laborales", url: "/admin-job-opportunities", icon: FileUser, roles: ["ADMIN"] },

        // Financiero
        { title: "Ingresos", url: "/finances-income", icon: HandCoins, roles: ["FINANCES", "ADMIN"] },
        { title: "Costos de las campañas", url: "/finances-campaings", icon: Headset, roles: ["FINANCES", "ADMIN"] },
        { title: "Suscripciones", url: "/finances-subscriptions", icon: BookOpenCheck, roles: ["FINANCES", "ADMIN"] },
        
        // Marketing
        { title: "Campañas Universitarias", url: "/marketing-university", icon: University, roles: ["MARKETING", "ADMIN"] },
        { title: "Campañas Escolares", url: "/marketing-scholar", icon: School, roles: ["MARKETING", "ADMIN"] },

        // Info Manager
        { title: "Gestión de Carreras", url: "/infomanager-majors", icon: Glasses, roles: ["INFOMANAGER", "UNIVERSITY"] },
        { title: "Gestión de Universidad", url: "/infomanager-university", icon: University, roles: ["INFOMANAGER", "UNIVERSITY"] },
        { title: "Gestión de Eventos", url: "/infomanager-events", icon: BookOpenCheck, roles: ["INFOMANAGER", "UNIVERSITY"] },
        
        //support
        { title: "Support Spoofing", url: "/support", icon: Headset, roles: ["SUPPORT", "ADMIN"] },
      ],
    },
  ],
};