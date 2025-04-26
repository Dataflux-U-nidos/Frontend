import AccountTemplate from "@/components/templates/AccountTemplate";
import { FormField } from "@/types/formTypes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetMyUser } from "@/hooks/user/useGetMyUserHook";
import LoadingTemplate from "../templates/LoadingTemplate";
import { useUpdateMyUser } from "@/hooks/user/useUpdateMyUserHook";
import { useDeleteMyUser } from "@/hooks/user/useDeleteMyUserHook";

const accountFields: FormField[] = [
  { type: "user", key: "name", placeholder: "Nombre", required: true },
  { type: "user", key: "last_name", placeholder: "Apellido", required: true },
  {
    type: "email",
    key: "email",
    placeholder: "Correo electrónico",
    required: true,
  },
];

export default function AccountScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const { mutateAsync: updateUser } = useUpdateMyUser();
  const { mutateAsync: deleteUser } = useDeleteMyUser();

  const { mutateAsync: fetchUser } = useGetMyUser();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchUser();
        const userData = {
          name: user.name,
          last_name: user.last_name,
          email: user.email,
        };
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    loadUser();
  }, []);

  const handleUpdateAccount = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await updateUser(data);
      setSuccess("Perfil actualizado correctamente");
      // console to show the updated data
      console.log("Perfil actualizado:", data);
    } catch (err) {
      setError("Error al actualizar el perfil. Intenta nuevamente.");
      console.error("Error actualizando perfil:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setError(null);

    // Simulamos un proceso de eliminación
    setTimeout(() => {
      console.log("Eliminando cuenta del usuario...");
      setDeleteLoading(false);

      // Redirigir al usuario a la página de inicio o login después de eliminar la cuenta
      navigate("/login", { replace: true });
    }, 1500);

    // ALREADY IMPLEMENTED
    // Uncomment this block to enable the delete account functionality
    /*
    try {
      // Llamar a la función para eliminar la cuenta
      await deleteUser();
      // Redirigir al usuario a la página de inicio o login
      navigate("/login", { replace: true });
    } catch (err) {
      setError("Error al eliminar la cuenta. Intenta nuevamente.");
      console.error("Error eliminando cuenta:", err);
      setDeleteLoading(false);
    }
    */
  };

  const handleCancel = () => {
    navigate("/student-profile");
  };

  return userData ? (
    <AccountTemplate
      accountFields={accountFields}
      initialValues={userData}
      onSubmit={handleUpdateAccount}
      onCancel={handleCancel}
      onDeleteAccount={handleDeleteAccount}
      loading={loading}
      deleteLoading={deleteLoading}
      error={error}
      success={success}
    />
  ) : (
    <div>
      <LoadingTemplate />
    </div>
  );
}
