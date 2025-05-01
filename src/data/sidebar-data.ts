import {
  Presentation,
  House,
  University,
  BookOpenCheck,
  ChartSpline,
} from "lucide-react";
import type { SidebarData } from "../types/sideBar";

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "Menú",
      
      items: [
        // Viewer
        { title: "Dashboard", url: "/viewer-dashboard", icon: Presentation, roles: ["VIEWER"] },

        // Student
        { title: "Programas", url: "/student-programs", icon: House, roles: ["STUDENT"] },
        { title: "Universidades", url: "/student-universities", icon: University, roles: ["STUDENT"] },
        { title: "Test vocacional", url: "/student-vocationalTest", icon: BookOpenCheck, roles: ["STUDENT"] },
        { title: "Test psicométrico", url: "/student-psychometricTest", icon: BookOpenCheck, roles: ["STUDENT"] },
        { title: "Proyección en el mercado laboral", url: "/student-carrerProspects", icon: ChartSpline, roles: ["STUDENT"] },

        // Tutor
        { title: "Estudiantes", url: "/tutor-students", icon: University, roles: ["TUTOR"] },

        // University
        { title: "Visualizadores", url: "/university-viewers", icon: Presentation, roles: ["UNIVERSITY"] },
        { title: "Gestores de información", url: "/university-managers", icon: House, roles: ["UNIVERSITY"] },

        // Admin
        { title: "Soporte", url: "/admin-support", icon: University, roles: ["ADMIN"] },
        { title: "Finanzas", url: "/admin-finances", icon: BookOpenCheck, roles: ["ADMIN"] },
        { title: "Marketing", url: "/admin-marketing", icon: ChartSpline, roles: ["ADMIN"] },
      ],
    },
  ],
};
