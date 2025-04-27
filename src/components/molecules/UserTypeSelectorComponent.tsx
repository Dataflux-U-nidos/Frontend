// molecules/UserTypeSelectorComponent.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { UserCircle, School, Building2 } from "lucide-react";

interface UserTypeSelectorComponentProps {
  selectedType: string;
  onSelectType: (type: string) => void;
  options: Array<{
    value: string;
    label: string;
    icon: string;
    description: string;
  }>;
  className?: string;
}

export const UserTypeSelectorComponent: React.FC<UserTypeSelectorComponentProps> = ({
  selectedType,
  onSelectType,
  options,
  className
}) => {
  // Función para obtener el icono correspondiente
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "UserCircle": return <UserCircle className="w-5 h-5" />;
      case "School": return <School className="w-5 h-5" />;
      case "Building2": return <Building2 className="w-5 h-5" />;
      default: return <UserCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className={cn("w-full mx-auto", className)}>
      <p className="text-sm font-medium text-gray-700 mb-2">Tipo de cuenta</p>
      <div className="flex gap-2 justify-between">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelectType(option.value)}
            className={cn(
              "flex-1 flex flex-col items-center p-3 rounded-lg border transition-all text-sm",
              selectedType === option.value
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 text-gray-600"
            )}
            title={option.description}
          >
            <div 
              className={cn(
                "rounded-full p-1.5 mb-1",
                selectedType === option.value ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"
              )}
            >
              {getIcon(option.icon)}
            </div>
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};