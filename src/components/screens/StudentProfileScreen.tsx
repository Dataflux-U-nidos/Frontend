import { StudentProfileTemplate } from "../templates/ProfileTemplate";
import { useEffect, useState } from "react";
import { useGetMyUser } from "@/hooks/user/useGetMyUserHook";
import { getAllRecomendations } from "@/services/userService";
import { RecommendationWithUniversity } from "@/types/recomendationType";
import LoadingTemplate from "../templates/LoadingTemplate";

const studentProfileExtras = {
  avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
  // TODO: Put a real image
  preferences: [
    { label: "Actividades deportivas", icon: "Dumbbell", color: "orange" },
    { label: "Creatividad", icon: "Lightbulb", color: "yellow" },
    { label: "Arte", icon: "Brush", color: "pink" },
  ],
};

// Colores para las carreras
const careerColors = ["indigo", "green", "red", "blue", "purple", "orange", "yellow", "pink"];

// Mapeo de competencias del usuario a formato display
const mapUserCompetenciesToPersonality = (userData: any) => {
  if (!userData) return [];
  
  const competencies = [
    { trait: "Matemáticas", value: userData.ma, color: "green" },
    { trait: "Competencia Lectora", value: userData.le, color: "blue" },
    { trait: "Ciencias Naturales", value: userData.ci, color: "purple" },
    { trait: "Ciencias Sociales", value: userData.cc, color: "orange" },
    { trait: "Idiomas", value: userData.idi, color: "red" },
    { trait: "Arte", value: userData.ar, color: "pink" },
  ];
  
  // Filtrar y mapear solo las competencias que tienen un valor válido
  return competencies
    .filter(competency => 
      competency.value !== null && 
      competency.value !== undefined && 
      !isNaN(competency.value) &&
      competency.value >= 0 // Asegurar que el valor sea positivo
    )
    .map(competency => ({
      ...competency,
      // Convertir de escala 0-5 a porcentaje 0-100%
      value: Math.round((competency.value / 5) * 100)
    }));
};

export default function StudentProfileScreen() {
  const [userData, setUserData] = useState<any | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationWithUniversity[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setHasRecommendationsError] = useState(false);
  const { mutateAsync: fetchUser } = useGetMyUser();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setHasRecommendationsError(false);
      
      try {
        // Cargar usuario (obligatorio)
        const user = await fetchUser();
        const userData = {
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          age: user.age,
          school: user.school,
          le: user.le,   // Competencia Lectora
          ma: user.ma,   // Matemáticas
          ci: user.ci,   // Ciencias Naturales
          cc: user.cc,   // Ciencias Sociales
          idi: user.idi, // Idiomas
          ar: user.ar,   // Arte
        };
        
        const mappedUser = {
          ...userData,
          location: user.locality
        };
        setUserData(mappedUser);

        // Cargar recomendaciones (opcional)
        try {
          const recommendationsData = await getAllRecomendations();
          setRecommendations(recommendationsData || []);
        } catch (recommendationsError) {
          console.error("Error fetching recommendations:", recommendationsError);
          setHasRecommendationsError(true);
          setRecommendations([]); // Array vacío para mostrar el estado empty
        }
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Si falla el usuario, es un error crítico
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Procesar las recomendaciones para el formato esperado - MANTENER DATOS COMPLETOS
  const processedRecommendations = recommendations?.map((recommendation: RecommendationWithUniversity, index: number) => ({
    // Mantener todos los datos originales del backend
    ...recommendation,
    // Solo agregar el color para la UI
    color: careerColors[index % careerColors.length],
  })) || [];

  // Usar recomendaciones reales si están disponibles, sino array vacío
  const topCareers = processedRecommendations.length > 0
    ? processedRecommendations
    : [];

  // Mapear competencias reales del usuario
  const personalityTraits = mapUserCompetenciesToPersonality(userData);
  
  // Debug: Log para ver qué datos tenemos
  console.log('userData competencies:', {
    le: userData?.le,
    ma: userData?.ma,
    ci: userData?.ci,
    cc: userData?.cc,
    idi: userData?.idi,
    ar: userData?.ar
  });
  console.log('personalityTraits converted:', personalityTraits);

  const mockStudentData = {
    ...userData,
    ...studentProfileExtras,
    personality: personalityTraits, // Usar competencias reales
    topCareers,
  };

  // Debug: Log del objeto final
  console.log('mockStudentData:', mockStudentData);

  return isLoading ? (
    <div>
      <LoadingTemplate />
    </div>
  ) : (
    <StudentProfileTemplate {...mockStudentData} />
  );
}