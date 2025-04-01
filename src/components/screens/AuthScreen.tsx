import AuthTemplate from "@/components/templates/AuthTemplate"
import { FormField } from "@/components/molecules/Dynamic-form"
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { User } from "@/types";

//LOGIN
const loginFields: FormField[] = [
    { type: "email", key: "email", placeholder: "Enter your email" },
    { type: "password", key: "password", placeholder: "Enter your password" },
]

// REGISTRY
const registryFields: FormField[] = [
  { type: "user", key: "last_name", placeholder: "Enter your last name" },
    { type: "user", key: "username", placeholder: "Enter your username" },
    { type: "email", key: "email", placeholder: "Enter your email" },
    { type: "password", key: "password", placeholder: "Choose a strong password" }]


export default function AuthScreen() {
    const { userType, login, createAccount } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      if (userType === "STUDENT" && location.pathname !== "/dashboard") {
        navigate("/dashboard");
      } else if (userType === "VIEWER" && location.pathname !== "/dashboard") {
        navigate("/dashboard");
      } else if (userType === "ADMIN" && location.pathname !== "/dashboard") {
        navigate("/dashboard");
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
  
    return (
      <AuthTemplate
        loginFields={loginFields}
        registryFields={registryFields}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }