import { RetrievePasswordTemplate } from "@/components/templates/RetrievePasswordTemplate";
import { RetrievePassword } from "@/components/organisms/RetrievePassword";
import { BaseFormField } from "@/types/formTypes";

const forgotPasswordFields: BaseFormField[] = [
  {
    type: "email",
    key: "email",
    placeholder: "Ingresa tu correo",   
    required: true,
  },
];

export default function ForgotPasswordScreen(){
  const handleForgotPassword = (data: any) => {
    console.log("sending email:", data);
    // lógica para enviar el email
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
