import React from "react";
import { cn } from "@/lib/utils";
import { UserCircle, School, Building2 } from "lucide-react";

export type UserType = "STUDENT" | "TUTOR" | "UNIVERSITY";

interface UserTypeOption {
  value: UserType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface UserTypeSelectorProps {
  value: UserType;
  onChange: (value: UserType) => void;
  className?: string;
}

const userTypeOptions: UserTypeOption[] = [
  {
    value: "STUDENT",
    label: "Estudiante",
    icon: <UserCircle className="w-8 h-8" />,
    description: "Para estudiantes que buscan oportunidades académicas"
  },
  {
    value: "TUTOR",
    label: "Tutor",
    icon: <School className="w-8 h-8" />,
    description: "Para docentes y orientadores académicos"
  },
  {
    value: "UNIVERSITY",
    label: "Universidad",
    icon: <Building2 className="w-8 h-8" />,
    description: "Para instituciones educativas"
  }
];

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  value,
  onChange,
  className
}) => {
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <h2 className="text-lg font-semibold text-center mb-4">Selecciona tipo de cuenta</h2>
      <div className="grid gap-4">
        {userTypeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center p-4 rounded-xl border-2 transition-all",
              value === option.value
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
            )}
          >
            <div 
              className={cn(
                "rounded-full p-2 mr-4",
                value === option.value ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"
              )}
            >
              {option.icon}
            </div>
            <div className="text-left">
              <div className="font-medium">{option.label}</div>
              <div className="text-sm text-gray-500">{option.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};