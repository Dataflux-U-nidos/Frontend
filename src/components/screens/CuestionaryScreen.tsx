import { FormField } from "@/types/formTypes";
import SendEmailTemplate from "@/components/templates/CuestionaryTemplate";
import { useEffect, useState } from "react";
import { useGetMyUser } from "@/hooks/user/useGetMyUserHook";
import LoadingTemplate from "../templates/LoadingTemplate";
import { sendCuestionaryEmail } from "@/services/emailService";



const sendCuestionaryEmailFields: FormField[] = [
  {
    type: "email",
    key: "email",
    placeholder: "Correo electrónico",
    required: true,
  },
];

export default function SendCuestionarytEmailScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { mutateAsync: fetchUser } = useGetMyUser();
  const [userData, setUserData] = useState<any | null>(null);

    const handleSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await sendCuestionaryEmail(data.email);
      setSuccess("Correo enviado correctamente. Revisa tu bandeja de entrada.");
    } catch (err) {
      console.error(err);
      setError("Hubo un error al enviar el correo. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };


useEffect(() => {
  const loadUser = async () => {
    try {
      const user = await fetchUser();
      const mappedUser = {
        email: user.email,
      };
      setUserData(mappedUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  loadUser();
}, []);


    return userData ? (
        <SendEmailTemplate
          fields={sendCuestionaryEmailFields}
          initialValues={userData}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          success={success}
        />
      ) : (
        <div>
          <LoadingTemplate />
        </div>
      );
}
