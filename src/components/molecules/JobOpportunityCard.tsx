import React from "react";
import { JobOpportunity } from "@/types/jobOpportunityType";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/atoms/ui/card";
import { DollarSign, BriefcaseBusiness } from "lucide-react";

// Imágenes quemadas para las tarjetas de trabajo
const jobImages = [
  "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010136.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-photo/close-up-image-programer-working-his-desk-office_1098-18707.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-photo/data-center-with-server-racks-room-generative-ai_188544-12101.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-photo/businessman-using-digital-tablet_53876-101933.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-photo/woman-working-call-center_23-2149269342.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-photo/business-concept-with-team-close-up_23-2149151159.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-photo/business-people-meeting_53876-15194.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-photo/young-woman-working-laptop-isolated-white-background_231208-1604.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-photo/medium-shot-woman-working-laptop_23-2150280947.jpg?size=626&ext=jpg",
];

// Función para obtener una imagen aleatoria o basada en ID
const getJobImage = (id: string): string => {
  const numericId = parseInt(id.replace(/[^0-9]/g, ''), 10) || 0;
  const index = numericId % jobImages.length;
  return jobImages[index];
};

interface JobOpportunityCardProps {
  jobOpportunity: JobOpportunity;
  onClick?: () => void;
}

export function JobOpportunityCard({ jobOpportunity, onClick }: JobOpportunityCardProps) {
  // Formato de moneda para mostrar el salario
  const formattedSalary = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(jobOpportunity.salary);

  // Obtener imagen basada en ID
  const imageUrl = getJobImage(jobOpportunity._id || jobOpportunity.id || "1");

  return (
    <Card 
      className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Imagen de cabecera */}
      <div className="w-full h-40 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={jobOpportunity.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-gray-800">{jobOpportunity.name}</CardTitle>
          </div>
          <div className="p-2 bg-orange-100 rounded-full">
            <BriefcaseBusiness className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="text-gray-600 mb-2 line-clamp-3">
          {jobOpportunity.description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="bg-gray-50 pt-3 pb-3 border-t border-gray-100">
        <div className="flex items-center text-gray-700">
          <DollarSign className="h-4 w-4 text-green-600 mr-1" />
          <span className="font-semibold">{formattedSalary}</span>
          <span className="text-gray-500 text-sm ml-1">/ año</span>
        </div>
      </CardFooter>
    </Card>
  );
}