
//import { mockStudentData } from "../data/mockStudentData"
import { ProfileCard } from "../organisms/ProfileCard"
import { PersonalityCard } from "../organisms/PersonalityCard"
import { PreferencesCard } from "../organisms/PreferencesCard"
import { TopCareersCard } from "../organisms/TopCareersCard"
import collegeStudentImg from "../../assets/college-student.jpg";

export const mockStudentData = {
    name: "Juanita Pérez",
    email: "Juana_perez@gmail.com",
    age: 20,
    school: "Colegio Naval Santa Fé",
    location: "Chapinero",
    avatar: collegeStudentImg, 
    // FALTA PONER IMAGEN BUENA XD
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
  const {
    name,
    email,
    age,
    school,
    location,
    avatar,
    personality,
    preferences,
    topCareers,
  } = mockStudentData

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <ProfileCard
        name={name}
        email={email}
        age={age}
        school={school}
        location={location}
        avatar={avatar}
      />
      <div className="grid md:grid-cols-2 gap-6">
        <PersonalityCard personality={personality} />
        <PreferencesCard preferences={preferences} />
      </div>
      <TopCareersCard careers={topCareers} />
    </div>
  )
}
