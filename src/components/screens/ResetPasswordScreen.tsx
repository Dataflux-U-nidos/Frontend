import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { RetrievePasswordTemplate } from "@/components/templates/RetrievePasswordTemplate";
import { RetrievePassword } from "@/components/organisms/RetrievePassword";
import { BaseFormField } from "@/types/formTypes";
import { useUpdateUserByEmail } from "@/hooks/user/useUpdateUserByEmailHook";


const resetPasswordFields: BaseFormField[] = [
  {
    type: "create-password",
    key: "newPassword",
    placeholder: "Ingresa tu nueva contraseña",
    required: true,
  },
  {
    type: "create-password",
    key: "confirmPassword",
    placeholder: "Confirma tu nueva contraseña",
    required: true,
  },
];


// JWT payload type definition
type JwtPayload = {
  sub?: string;
};


// decoding the JWT token and extracting the email from the 'sub' field
const getEmailFromToken = (token: string): string | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded?.sub || null;
  } 
  catch (error) {
    return null;
  }
};

export default function ResetPasswordScreen() {

  // allows us to get the search parameters from the URL
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromURL = searchParams.get("token");

    setToken(tokenFromURL);

    if (tokenFromURL) {
      const decodedEmail = getEmailFromToken(tokenFromURL);
      setEmail(decodedEmail);
    }
  }, [location.search]);

  const { mutate: updateUser } = useUpdateUserByEmail();

  const handleResetPassword = (data: Record<string, string>) => {
    const { newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!token || !email) {
      alert("No se pudo verificar el token o el correo electrónico.");
      return;
    }
    updateUser({
      email,
      password: data.newPassword,
    });

  };

  return (
    <RetrievePasswordTemplate>
      <RetrievePassword
        fields={resetPasswordFields}
        onSubmit={handleResetPassword}
        buttonText="Restablecer contraseña"
      />
    </RetrievePasswordTemplate>
  );
}