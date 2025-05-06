import { LandingTemplate } from "@/components/templates/LandingTemplate";
import { FeatureProps } from "@/components/organisms/Features";
import featureProfileImage from "../../assets/feature-profile.svg";
import featureReviewImage from "../../assets/feature-reviews.svg";
import featureWageImage from "../../assets/feature-wage.svg";
import { useNavigate } from "react-router-dom";
import { Plan, PopularPlanType } from "@/components/organisms/Pricing";
import { useGetAllSubscriptions } from "@/hooks";
import { useEffect, useState } from "react";

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

  // 1) Traer planes del backend
  const { data: apiPlans, isLoading, error } = useGetAllSubscriptions();

  // 2) Transformarlos al shape que espera <Pricing>
  const [plans, setPlans] = useState<Plan[]>([]);
  useEffect(() => {
    if (apiPlans) {
      setPlans(
        apiPlans.map((p) => ({
          title: p.name,
          popular: p.type === "STANDARD" ? PopularPlanType.YES : PopularPlanType.NO,
          price: p.cost,
          description: p.description ?? "", // add a default value if description is undefined
          buttonText: `Suscribirme (${p.name})`,
          benefitList: p.benefits,
        }))
      );
    }
  }, [apiPlans]);

  const handleCreateAccount = () => {
    navigate("/auth");
  };

  const handlePartialTest = () => {
    navigate("/student-vocationalTest-partial");
  };

  const pricingList = isLoading || error ? [] : plans;
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
