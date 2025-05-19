import { StudentProfileTemplate } from "../templates/ProfileTemplate";
import collegeStudentImg from "../../assets/college-student.jpg";
import { useEffect, useState } from "react";
import { useGetMyUser } from "@/hooks/user/useGetMyUserHook";
import { getAllRecomendations } from "@/services/userService"; // Importar el servicio directamente
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
};

// Colores para las carreras
const careerColors = ["indigo", "green", "red", "blue", "purple", "orange", "yellow", "pink"];

export default function StudentProfileScreen() {
  const [userData, setUserData] = useState<any | null>(null);
  const [recommendations, setRecommendations] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { mutateAsync: fetchUser } = useGetMyUser();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // Ejecutar ambas consultas en paralelo
        const [user, recommendationsData] = await Promise.all([
          fetchUser(),
          getAllRecomendations()
        ]);

        // Procesar datos del usuario
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

        // Actualizar estados
        setUserData(mappedUser);
        setRecommendations(recommendationsData || []);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        // En caso de error, establecer valores por defecto
        setRecommendations([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Procesar las recomendaciones para el formato esperado
  const processedRecommendations = recommendations?.map((recommendation: any, index: number) => ({
    name: recommendation.name || recommendation.career || recommendation.title,
    color: careerColors[index % careerColors.length]
  })) || [];

  // Usar recomendaciones reales si están disponibles, sino array vacío
  const topCareers = processedRecommendations.length > 0
    ? processedRecommendations.slice(0, 3)
    : [];

  const mockStudentData = {
    ...userData,
    ...studentProfileExtras,
    topCareers,
  };

  return isLoading ? (
    <div>
      <LoadingTemplate />
    </div>
  ) : (
    <StudentProfileTemplate {...mockStudentData} />
  );
}