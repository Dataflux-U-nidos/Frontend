import { useRef } from "react"
import { DynamicForm, DynamicFormHandles } from "@/components/molecules/Dynamic-form"
import type { FormField } from "@/types/formTypes"
import { Button } from "../atoms/ui/button";

interface Props {
  fields: FormField[];
  onSubmit: (data: any) => void;
  buttonText: string;
}

export const RetrievePassword = ({ fields, onSubmit, buttonText }: Props) => {
  const formRef = useRef<DynamicFormHandles>(null);

  const handleRetrieveSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
      formRef.current.handleSubmit((data) => {
        onSubmit(data);
      })();
    }
  };

  return (
    <form onSubmit={handleRetrieveSubmit} className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Recuperar contraseña</h1>
      <DynamicForm ref={formRef} formDataConfig={fields} />
      <Button type="submit" className="w-full mb-4">
        {buttonText}
      </Button>
    </form>
  );
};
