import React, { useRef } from "react";
import { Button } from "@/components/atoms/ui/button";
import { DynamicForm, DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import type { FormField } from "@/types/formTypes";
import { useNotify } from "@/hooks/useNotify";
import { LogoIcon } from "../atoms/icons"
import { cn } from "@/lib/utils";

interface AuthFormProps {
  registryFields: FormField[];
  onRegister: (values: any) => void;
  onRegistryChange?: (values: Record<string, any>) => void;
}

export default function AuthForm({ registryFields, onRegister, onRegistryChange }: Readonly<AuthFormProps>) {
  const formRef = useRef<DynamicFormHandles>(null);
  const { notifySuccess, notifyError } = useNotify();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    formRef.current.handleSubmit(async (data) => {
      try {
        onRegister(data);
        notifySuccess({
          title: "Cuenta creada",
          description: "Te has registrado exitosamente.",
          icon: "✅",
          closeButton: true,
        });
      } catch (err: any) {
        notifyError({
          title: "Error al registrarse",
          description: err.response?.data?.message ?? "No se pudo completar el registro.",
          icon: "🚫",
          closeButton: true,
        });
      }
    })();
  };

  return (
    <div className={cn("flex flex-col h-full min-h-0")}>
    <div className="h-auto w-auto max-h-[250px] max-w-[250px] self-center rounded-xl mb-5">
      <LogoIcon />
    </div>
    <div className="flex flex-col flex-1 min-h-0 space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 space-y-6">
        <DynamicForm
          ref={formRef}
          formDataConfig={registryFields}
          onChange={onRegistryChange}
        />
        <Button type="submit" className="w-full">
          Registrarse
        </Button>
      </form>
    </div>
    </div>
  );
}
