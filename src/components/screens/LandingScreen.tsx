import { LandingTemplate } from "@/components/templates/LandingTemplate";
import { FeatureProps } from "@/components/organisms/Features";
import featureProfileImage from "../../assets/feature-profile.svg";
import featureReviewImage from "../../assets/feature-reviews.svg";
import featureWageImage from "../../assets/feature-wage.svg";
import { useNavigate } from "react-router-dom";
import { Plan } from "@/components/organisms/Pricing";

const features: FeatureProps[] = [
  {
    title: "Recomendaciones basadas en tu perfil",
    description:
      "Encuentra programas que se ajusten a tus intereses y habilidades.",
    image: featureProfileImage,
  },
  {
    title: "Visión del mercado laboral",
    description:
      "Mira el salario esperado de los egresados de las carreras de tu interes.",
    image: featureWageImage,
  },
  {
    title: "Conoce la experiencia de los demás",
    description:
      "Lee y comparte las experiencias y opiniones de otros estudiantes.",
    image: featureReviewImage,
  },
];

export const pricingList: Plan[] = [
  {
    title: "Mensual",
    popular: 0,
    price: 50000, // $50.000 COP/mes
    description:
      "Acceso completo a la plataforma durante un mes para tu institución.",
    buttonText: "Suscripción mensual",
    benefitList: [
      "Panel de control de postulaciones",
      "Reportes básicos de rendimiento estudiantil",
      "Acceso a módulos de prueba de admisión",
      "Soporte estándar 24/7",
    ],
  },
  {
    title: "Trimestral",
    popular: 0,
    price: 140000,
    description:
      "3 meses con un 6.7 % de descuento frente al plan mensual.",
    buttonText: "Suscripción trimestral",
    benefitList: [
      "Reportes avanzados de seguimiento académico",
      "Integración con sistemas internos (API)",
      "Webinars trimestrales de reclutamiento",
      "Soporte prioritario 24/7",
      "Acceso a pruebas personalizadas",
    ],
  },
  {
    title: "Anual",
    popular: 0,
    price: 520000, // 4×140.000 = 560.000 – 7.1% ≈ 520.000
    description:
      "12 meses con un 7.1 % de descuento frente al plan trimestral.",
    buttonText: "Suscripción anual",
    benefitList: [
      "Asesoría exclusiva de admisiones",
      "Reportes detallados de cohortes",
      "Sesiones de capacitación 1:1",
      "Acceso al portal VIP de universidades",
      "Soporte personalizado",
    ],
  },
];

const reviews = [
  //comentar el primero en caso de fallas
  {
    name: "Jack",
    username: "@jack",
    body: "Me encanta esta página. Es increíble lo fácil que es de usar.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jack",
    username: "@jack",
    body: "Me encanta esta página. Es increíble lo fácil que es de usar.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "U-nidos me ha ayudado a encontrar la carrera perfecta para mí. Gracias!",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "Estoy en una nube. Esta página es increíble. Me encanta.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "Lo que más me gusta de esta página es lo fácil que es de usar. Me encanta.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "Recibí una recomendación de carrera que se ajusta perfectamente a mis intereses.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "Recomendaré esta página a todos mis amigos. Es increíble.",
    img: "https://avatar.vercel.sh/james",
  },
];

const featureList: string[] = [
  "test vocacional/psicometrico",
  "Información de carreras/universidades",
];
export default function LandingScreen() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/auth");
  };

  const handlePartialTest = () => {
    navigate("/student-vocationalTest-partial");
  };

  return (
    <LandingTemplate
      features={features}
      featureList={featureList}
      reviews={reviews}
      onCreateAccount={handleCreateAccount}
      pricingList={pricingList}
      onPartialTest={handlePartialTest}
    />
  );
};
