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
        { title: "Soporte", url: "/admin-support", icon: University, roles: ["ADMIN"] },
        { title: "Finanzas", url: "/admin-finances", icon: BookOpenCheck, roles: ["ADMIN"] },
        { title: "Marketing", url: "/admin-marketing", icon: ChartSpline, roles: ["ADMIN"] },
        { title: "Dashboard", url: "/admin-dashboard", icon: Presentation, roles: ["ADMIN"] },
        { title: "Salidas laborales", url: "/admin-job-opportunities", icon: FileUser, roles: ["ADMIN"] },

        // Financiero
        { title: "Ingresos", url: "/finances-income", icon: HandCoins, roles: ["FINANCES"] },
        { title: "Costos de las campañas", url: "/finances-campaings", icon: Headset, roles: ["FINANCES"] },
        { title: "suscripciones", url: "/finances-subscriptions", icon: BookOpenCheck, roles: ["FINANCES"] },
        
        // Marketing
        { title: "Campañas Universitarias", url: "/marketing-university", icon: University, roles: ["MARKETING"] },
        { title: "Campañas Escolares", url: "/marketing-scholar", icon: School, roles: ["MARKETING"] },
      ],
    },
  ],
};