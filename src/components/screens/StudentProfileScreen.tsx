
import { StudentProfileTemplate } from "../templates/ProfileTemplate";
import collegeStudentImg from "../../assets/college-student.jpg";

export const mockStudentData = {
    name: "Juanita Pérez",
    email: "Juana_perez@gmail.com",
    age: 20,
    school: "Colegio Naval Santa Fé",
    location: "Chapinero",
    avatar: collegeStudentImg, 
    // FALTA PONER IMAGEN BUENA 
    personality: [
      { trait: "Extrovertido", value: 70, color: "green" },
      { trait: "Lógico", value: 60, color: "blue" },
      { trait: "Directo", value: 90, color: "purple" },
    ],
    preferences: [
      { label: "Actividades deportivas", icon: "Dumbbell", color: "orange" },
      { label: "Creatividad", icon: "Lightbulb", color: "yellow" },
      { label: "Arte", icon: "Brush", color: "pink" },
    ],
    topCareers: [
      { name: "Ingeniería de Sistemas", color: "indigo" },
      { name: "Ingeniería Industrial", color: "green" },
      { name: "Comunicación Social", color: "red" },
    ]
  }
  

export default function StudentProfileScreen() {
  return <StudentProfileTemplate {...mockStudentData} />
}
