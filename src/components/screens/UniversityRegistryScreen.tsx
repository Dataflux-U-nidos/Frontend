import UniversityRegistryTemplate from "@/components/templates/UniversityRegistryTemplate";
import { FormField, SelectFormField, TextAreaFormField } from "@/types/formTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { Slide } from "../molecules/Carousel";

const zoneOptions = [
  { value: "Norte", label: "Norte" },
  { value: "Sur", label: "Sur" },
  { value: "Occidente", label: "Occidente" },
  { value: "Oriente", label: "Oriente" },
  { value: "Noroccidente", label: "Noroccidente" },
  { value: "Nororiente", label: "Nororiente" },
  { value: "Suroccidente", label: "Suroccidente" },
  { value: "Suroriente", label: "Suroriente" },
];

const localityMap: Record<string, { value: string; label: string }[]> = {
  Norte: [
    { value: "Usaquén", label: "Usaquén" },
    { value: "Suba", label: "Suba" },
    { value: "Barrios Unidos", label: "Barrios Unidos" },
  ],
  Sur: [
    { value: "Ciudad Bolívar", label: "Ciudad Bolívar" },
    { value: "Usme", label: "Usme" },
    { value: "Tunjuelito", label: "Tunjuelito" },
    { value: "Sumapaz", label: "Sumapaz" },
  ],
  Occidente: [
    { value: "Engativá", label: "Engativá" },
    { value: "Fontibón", label: "Fontibón" },
  ],
  Oriente: [
    { value: "Santa Fe", label: "Santa Fe" },
    { value: "La Candelaria", label: "La Candelaria" },
  ],
  Noroccidente: [
    { value: "Suba", label: "Suba" },
    { value: "Engativá", label: "Engativá" },
  ],
  Nororiente: [
    { value: "Chapinero", label: "Chapinero" },
    { value: "Usaquén", label: "Usaquén" },
  ],
  Suroccidente: [
    { value: "Kennedy", label: "Kennedy" },
    { value: "Bosa", label: "Bosa" },
  ],
  Suroriente: [
    { value: "Rafael Uribe Uribe", label: "Rafael Uribe Uribe" },
    { value: "Ciudad Bolívar", label: "Ciudad Bolívar" },
  ],
};

const universityFields: FormField[] = [
  { type: "user", key: "name", placeholder: "Ingresa nombre de la institución", required: true },
  { type: "address", key: "address", placeholder: "Ingresa la dirección", required: true },
  { type: "email", key: "email", placeholder: "Ingresa correo institucional", required: true },
  { type: "password", key: "password", placeholder: "Ingresa tu contraseña", required: true },
  {
    key: "aceptation_difficulty",
    type: "select",
    placeholder: "Nivel de dificultad de admisión",
    required: true,
    options: [
      { value: "EASY", label: "Fácil" },
      { value: "MEDIUM", label: "Media" },
      { value: "HARD", label: "Difícil" },
    ],
    selectPlaceholder: "Selecciona nivel",
  } as SelectFormField,
  {
    key: "price_range",
    type: "select",
    placeholder: "Rango de precios",
    required: true,
    options: [
      { value: "LOW", label: "Bajo" },
      { value: "MEDIUM", label: "Medio" },
      { value: "HIGH", label: "Alto" },
    ],
    selectPlaceholder: "Selecciona rango",
  } as SelectFormField,
  {
    type: "user",
    key: "link",
    placeholder: "Ingresa la URL de la universidad",
    required: true,
  },
  {
    type: "textarea",
    key: "description",
    placeholder: "Descripción de la universidad",
    required: true,
  } as TextAreaFormField,
];

const slides: Slide[] = [
  {
    imageUrl:
      "https://cea.javeriana.edu.co/documents/1578131/9621979/lineas-plan-estrategico.jpg/9dce9b93-1aaa-2293-6814-490446a139c1?t=1689284414781",
    title: "Bienvenido",
    description: "A U-nidos",
  },
  {
    imageUrl:
      "https://facartes.uniandes.edu.co/wp-content/uploads/2020/04/campus-2.jpg",
    title: "Conectándote con la universidad de tus sueños",
    description: "Información relevante para el usuario",
  },
  {
    imageUrl:
      "https://universidadesyprofesiones.com/images/universidades/campus/universidad-nacional-de-colombia-banner.jpg",
    title: "U-nidos por tu futuro",
    description: "Y para tu futuro",
  },
];

export default function UniversityRegistryScreen() {
  const { registryAccount, login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const subscriptionPlanId = location.state?.subscriptionPlanId as string | undefined;  const [regValues, setRegValues] = useState<Record<string, any>>({});

  const handleRegister = async (data: any) => {
    const userData = {
      userType: "UNIVERSITY",
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address,
      zone: data.zone,
      locality: data.locality,
      link: data.link,
      description: data.description,
      aceptation_difficulty: data.aceptation_difficulty,
      price_range: data.price_range,
      subscriptionPlanId,
    };
    await registryAccount(userData);
    await login(userData.email, userData.password);
    navigate("/university-viewers");
  };

  return (
    <UniversityRegistryTemplate
      registryFields={[
        {
          key: "zone",
          type: "select",
          placeholder: "Zona",
          required: true,
          options: zoneOptions,
          selectPlaceholder: "Selecciona una zona",
        } as SelectFormField,
        {
          key: "locality",
          type: "select",
          placeholder: "Localidad",
          required: true,
          options: regValues.zone ? localityMap[regValues.zone] : [],
          selectPlaceholder: regValues.zone
            ? "Selecciona una localidad"
            : "Primero selecciona zona",
        } as SelectFormField,
        ...universityFields,
      ]}
      onRegister={handleRegister}
      onRegistryChange={setRegValues}
      slides={slides}
    />
  );
}
