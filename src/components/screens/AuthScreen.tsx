import AuthTemplate from "@/components/templates/AuthTemplate"
import { FormField } from "@/types/formTypes";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { User } from "@/types";
import { Slide } from "../molecules/Carousel";


//LOGIN
const loginFields: FormField[] = [
  { type: "email", key: "email", placeholder: "Ingresa tu correo", required: true },
  { type: "password", key: "password", placeholder: "Ingresa tu contraseña", required: true },
]

// REGISTRY
const registryFields: FormField[] = [
  { type: "user", key: "name", placeholder: "Ingresa tu nombre", required: true },
  { type: "user", key: "last_name", placeholder: "Ingresa tu apeliido", required: true },
  { type: "email", key: "email", placeholder: "Ingresa tu correo institucional", required: true },
  { type: "create-password", key: "password", placeholder: "Ingresa tu contraseña", required: true },
];

const slides: Slide[] = [
  {
    imageUrl: "https://cea.javeriana.edu.co/documents/1578131/9621979/lineas-plan-estrategico.jpg/9dce9b93-1aaa-2293-6814-490446a139c1?t=1689284414781",
    title: "Bienvenido",
    description: "A U-nidos",
  },
  {
    imageUrl: "https://facartes.uniandes.edu.co/wp-content/uploads/2020/04/campus-2.jpg",
    title: "Conectándote con la universidad de tus sueños",
    description: "Información relevante para el usuario",
  },
  {
    imageUrl: "https://universidadesyprofesiones.com/images/universidades/campus/universidad-nacional-de-colombia-banner.jpg",
    title: "U-nidos por tu futuro",
    description: "Y para tu futuro",
  },
]

export default function AuthScreen() {
  const { userType, login, createAccount } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userType === "STUDENT" && location.pathname !== "/student-dashboard") {
      navigate("/student-dashboard");
    } else if (userType === "VIEWER" && location.pathname !== "/viewer-dashboard") {
      navigate("/viewer-dashboard");
    } else if (userType === "ADMIN" && location.pathname !== "/admin-dashboard") {
      navigate("/admin-dashboard");
    } else if (userType === "TUTOR" && location.pathname !== "/tutor-students") {
      navigate("/tutor-students");
    }
  }, [userType, location.pathname, navigate]);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    await login(credentials.email, credentials.password);
  };

  const handleRegister = async (data: User) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      last_name: data.last_name,
      age: 25,
    };

    console.log("Enviando:", userData);
    await createAccount(userData);
    await login(userData.email, userData.password);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <AuthTemplate
      loginFields={loginFields}
      registryFields={registryFields}
      onLogin={handleLogin}
      onRegister={handleRegister}
      onForgotPassword={handleForgotPassword}
      slides={slides}
    />
  );
}