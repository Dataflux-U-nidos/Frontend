import { RetrievePasswordTemplate } from "@/components/templates/RetrievePasswordTemplate";
import { RetrievePassword } from "@/components/organisms/RetrievePassword";
import { BaseFormField } from "@/types/formTypes";
import { sendPasswordRecoveryEmail } from "@/services/emailService";


const forgotPasswordFields: BaseFormField[] = [
  {
    type: "email",
    key: "email",
    placeholder: "Ingresa tu correo",   
    required: true,
  },
];

export default function ForgotPasswordScreen(){
  const handleForgotPassword = async (data: any) => {
    console.log("Iniciando recuperación para:", data);

    try {
      await sendPasswordRecoveryEmail(data.email);
      alert("Si el correo existe, recibirás un email de recuperación");
    } catch (error) {
      console.error("Error en recuperación de contraseña", error);
      alert("Ocurrió un error, intenta nuevamente");
    }
  };

  return (
    <RetrievePasswordTemplate>
      <RetrievePassword 
        fields={forgotPasswordFields} 
        onSubmit={handleForgotPassword} 
        buttonText="Enviar"/>
    </RetrievePasswordTemplate>
  );
};
