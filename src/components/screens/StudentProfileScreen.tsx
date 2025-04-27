import { StudentProfileTemplate } from "../templates/ProfileTemplate";
import collegeStudentImg from "../../assets/college-student.jpg";
import { useEffect, useState } from "react";
import { useGetMyUser } from "@/hooks/user/useGetMyUserHook";
import LoadingTemplate from "../templates/LoadingTemplate";

const studentProfileExtras = {
  avatar: collegeStudentImg,
  // TODO: Put a real image
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
  ],
};

export default function StudentProfileScreen() {
  const [userData, setUserData] = useState<any | null>(null);
  const { mutateAsync: fetchUser } = useGetMyUser();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchUser();
        const userData = {
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          age: user.age,
          school: user.school,
        };

        const mappedUser = {
          ...userData,
          location: user.locality
            };
        setUserData(mappedUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    loadUser();
  }, []);

  const mockStudentData = {
    ...userData,
    ...studentProfileExtras,
  };

  return userData ? (
    <StudentProfileTemplate {...mockStudentData} />
  ) : (
    <div>
      <LoadingTemplate />
    </div>
  );
}
