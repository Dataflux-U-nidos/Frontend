import AuthTemplate from "@/components/templates/AuthTemplate"
import { FormField } from "@/components/molecules/Dynamic-form"
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";

//LOGIN
const loginFields: FormField[] = [
    { type: "email", key: "email", placeholder: "Enter your email" },
    { type: "password", key: "password", placeholder: "Enter your password" },
]

// REGISTRY
const registryFields: FormField[] = [
    { type: "user", key: "username", placeholder: "Enter your username" },
    { type: "email", key: "email", placeholder: "Enter your email" },
    { type: "password", key: "password", placeholder: "Choose a strong password" },
]


  // Inicia sesión y deja que el useEffect haga la navegación
export default function AuthScreen() {
    const { userType, login, createAccount } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      // Si ya estás en la ruta correspondiente, no navegues de nuevo (para evitar bucles)
      if (userType === "EVALUADOR" && location.pathname !== "/estadisticas") {
        navigate("/estadisticas");
      } else if (userType === "INVESTIGADOR" && location.pathname !== "/evaluacion") {
        navigate("/evaluacion");
      }
    }, [userType, location.pathname, navigate]);
  
    // Inicia sesión y deja que el useEffect haga la navegación
    const handleLogin = async (credentials: { email: string; password: string }) => {
      await login(credentials.email, credentials.password);
    };
  
    const handleRegister = async (data: {
      name: string;
      last_name: string;
      email: string;
      password: string;
    }) => {
      await createAccount(data);
      await login(data.email, data.password);
    };
  
    return (
      <AuthTemplate
        loginFields={loginFields}
        registryFields={registryFields}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }