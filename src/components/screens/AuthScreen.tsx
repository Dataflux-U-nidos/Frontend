import AuthTemplate from "@/components/templates/AuthTemplate";
import { FormField, SelectFormField } from "@/types/formTypes";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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

// LOGIN
const loginFields: FormField[] = [
  {
    type: "email",
    key: "email",
    placeholder: "Ingresa tu correo",
    required: true,
  },
  {
    type: "password",
    key: "password",
    placeholder: "Ingresa tu contraseña",
    required: true,
  },
];

const tutorFields: FormField[] = [
  {
    type: "user",
    key: "name",
    placeholder: "Ingresa tu nombre",
    required: true,
  },
  {
    type: "user",
    key: "last_name",
    placeholder: "Ingresa tu apellido",
    required: true,
  },
  {
    type: "email",
    key: "email",
    placeholder: "Ingresa tu correo electrónico",
    required: true,
  },
  {
    type: "password",
    key: "password",
    placeholder: "Ingresa tu contraseña",
    required: true,
  },
];
const studentFields: FormField[] = [
  {
    type: "user",
    key: "name",
    placeholder: "Ingresa tu nombre",
    required: true,
  },
  {
    type: "user",
    key: "last_name",
    placeholder: "Ingresa tu apellido",
    required: true,
  },
  {
    type: "number",
    key: "age",
    placeholder: "Ingresa tu edad",
    required: true,
  },
  {
    type: "email",
    key: "email",
    placeholder: "Ingresa tu correo electrónico",
    required: true,
  },
  {
    type: "password",
    key: "password",
    placeholder: "Ingresa tu contraseña",
    required: true,
  },
];

const universityFields: FormField[] = [
  {
    type: "user",
    key: "name",
    placeholder: "Ingresa nombre de la institución",
    required: true,
  },
  {
    type: "address",
    key: "address",
    placeholder: "Ingresa la dirección",
    required: true,
  },
  {
    type: "email",
    key: "email",
    placeholder: "Ingresa correo institucional",
    required: true,
  },
  {
    type: "password",
    key: "password",
    placeholder: "Ingresa tu contraseña",
    required: true,
  },
];

// Registry fields definitions for each userType
const registryFieldsMap: Record<string, FormField[]> = {
  STUDENT: studentFields,
  TUTOR: tutorFields,
};

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

export default function AuthScreen() {
  const { userType, login, registryAccount } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState<string>("STUDENT");
  const [regValues, setRegValues] = useState<Record<string, any>>({});

  useEffect(() => {
    if (userType === "STUDENT" && location.pathname !== "/student-profile") {
      navigate("/student-profile");
    } else if (
      userType === "VIEWER" &&
      location.pathname !== "/viewer-dashboard"
    ) {
      navigate("/viewer-dashboard");
    } else if (
      userType === "ADMIN" &&
      location.pathname !== "/admin-dashboard"
    ) {
      navigate("/admin-dashboard");
    } else if (
      userType === "TUTOR" &&
      location.pathname !== "/tutor-students"
    ) {
      navigate("/tutor-students");
    } else if (
      userType === "UNIVERSITY" &&
      location.pathname !== "/viewer-dashboard"
    ) {
      navigate("/viewer-dashboard");
    } else if (
      userType === "INFOMANAGER" &&
      location.pathname !== "/infomanager-majors"
    ) {
      navigate("/infomanager-majors");
    } else if (
      userType === "MARKETING" &&
      location.pathname !== "/marketing-main"
    ) {
      navigate("/marketing-main");
    } else if (
      userType === "FINANCES" &&
      location.pathname !== "/finances-partialIncome"
    ) {
      navigate("/finances-income");
    } else if (userType === "SUPPORT" && location.pathname !== "/support") {
      navigate("/support");
    }
  }, [userType, location.pathname, navigate]);

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    await login(credentials.email, credentials.password);
  };

  const handleRegister = async (data: any) => {
    const { age } = data;
    // Validation rules
    if (selectedType === "STUDENT" && age < 18) {
      alert(
        "Debes ser mayor de 18 años para registrarte como estudiante. Si eres menor de edad, un tutor debe crear la cuenta desde su sesión."
      );
      return;
    }

    const userData = {
      userType: selectedType,
      name: data.name,
      email: data.email,
      password: data.password,
      last_name: data.last_name,
      age: data.age,
      address: data.address,
      zone: data.zone,
      locality: data.locality,
    };

    await registryAccount(userData);
    await login(userData.email, userData.password);
    if (selectedType === "STUDENT") {
      navigate("/student-grades");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  let registryFields: FormField[] = registryFieldsMap[selectedType] || [];

  if (selectedType === "UNIVERSITY") {
    // anteponemos zona y localidad
    registryFields = [
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
        options: regValues.zone ? localityMap[regValues.zone] || [] : [],
        selectPlaceholder: regValues.zone
          ? "Selecciona una localidad"
          : "Primero selecciona zona",
      } as SelectFormField,
      ...universityFields,
    ];
  }
  // Determine registry fields based on selection

  return (
    <AuthTemplate
      loginFields={loginFields}
      registryFields={registryFields}
      onRegistryChange={setRegValues}
      onLogin={handleLogin}
      onRegister={handleRegister}
      onForgotPassword={handleForgotPassword}
      slides={slides}
      userTypeOptions={{
        selectedType,
        onSelectType: setSelectedType,
        options: [
          {
            value: "STUDENT",
            label: "Estudiante",
            icon: "UserCircle",
            description: "Para estudiantes que buscan oportunidades académicas",
          },
          {
            value: "TUTOR",
            label: "Tutor",
            icon: "School",
            description: "Para docentes y orientadores académicos",
          },

        ],
      }}
    />
  );
}
