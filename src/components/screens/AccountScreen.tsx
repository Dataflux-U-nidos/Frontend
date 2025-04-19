import AccountTemplate from "@/components/templates/AccountTemplate"
import { FormField } from "@/types/formTypes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useAuthContext } from "@/context/AuthContext";
// import { User } from "@/types";

// Campos del formulario para editar la cuenta
const accountFields: FormField[] = [
  { type: "user", key: "name", placeholder: "Nombre", required: true },
  { type: "user", key: "last_name", placeholder: "Apellido", required: true },
  { type: "email", key: "email", placeholder: "Correo electrónico", required: true },
];

// Datos quemados para simular un usuario
const mockUser = {
  name: "Juanita",
  last_name: "Pérez",
  email: "juana_perez@gmail.com",
  // No incluimos contraseña en los datos iniciales
};

export default function AccountScreen() {
  // const { userType, user, updateUserProfile } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Función para actualizar la cuenta (vacía por ahora, para implementar después)
  const handleUpdateAccount = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    // Simulamos un proceso
    setTimeout(() => {
      console.log("Datos que se enviarían al backend:", data);
      setSuccess("Perfil actualizado correctamente");
      setLoading(false);
    }, 1000);
    
    // TODO: Implementar la conexión con el backend
    /*
    try {
      // Crear objeto con solo los campos que se van a actualizar
      const updateData = {
        name: data.name,
        last_name: data.last_name,
        email: data.email,
      };
      
      // Si se proporcionó una nueva contraseña, añadirla al objeto de actualización
      if (data.new_password && data.current_password) {
        // Aquí podrías añadir lógica para verificar la contraseña actual
        updateData.password = data.new_password;
      }
      
      await updateUserProfile(updateData);
      setSuccess("Perfil actualizado correctamente");
    } catch (err) {
      setError("Error al actualizar el perfil. Intenta nuevamente.");
      console.error("Error actualizando perfil:", err);
    } finally {
      setLoading(false);
    }
    */
  };

  const handleCancel = () => {
    // Por ahora, simplemente volvemos a la raíz
    navigate("/");
    
    // TODO: Implementar redirección según tipo de usuario
    /*
    if (userType === "STUDENT") {
      navigate("/student-profile");
    } else if (userType === "VIEWER") {
      navigate("/viewer-dashboard");
    } else if (userType === "ADMIN") {
      navigate("/admin-dashboard");
    }
    */
  };

  return (
    <AccountTemplate
      accountFields={accountFields}
      initialValues={mockUser}
      onSubmit={handleUpdateAccount}
      onCancel={handleCancel}
      loading={loading}
      error={error}
      success={success}
    />
  );
}