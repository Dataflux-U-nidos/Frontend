import { RetrievePasswordTemplate } from "@/components/templates/RetrievePasswordTemplate";
import { RetrievePassword } from "@/components/organisms/RetrievePassword";
import { BaseFormField } from "@/types/formTypes";

const resetPasswordFields: BaseFormField[]  = [
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

  export default function ResetPasswordScreen() {
    const handleResetPassword = (data: any) => {
      if (data.newPassword !== data.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
  
      console.log("restablishing password:", data);
      // lógica para restablecer la contraseña
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
  };
