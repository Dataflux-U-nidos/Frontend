import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/atoms/ui/dialog";
import { JobOpportunity } from "@/types/jobOpportunityType";
import { DollarSign, Briefcase, MapPin, Building, Calendar, User } from "lucide-react";

// Imágenes quemadas para los detalles del trabajo
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

interface JobOpportunityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobOpportunity: JobOpportunity | null;
}

export function JobOpportunityDetailsModal({
  isOpen,
  onClose,
  jobOpportunity
}: JobOpportunityDetailsModalProps) {
  // Si no hay una oportunidad laboral seleccionada, no mostrar el modal
  if (!jobOpportunity) return null;

  // Formatear el salario para mostrarlo
  const formattedSalary = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(jobOpportunity.salary);

  // Obtener imagen basada en ID
  const imageUrl = getJobImage(jobOpportunity._id || jobOpportunity.id || "1");

  // Datos ficticios adicionales para el detalle
  const jobDetails = {
    location: "Bogotá, Colombia",
    company: "Tech Solutions S.A.",
    department: "Tecnología",
    jobType: "Tiempo completo",
    postedDate: "15 de Mayo, 2025",
    requiredSkills: [
      "JavaScript", "React", "Node.js", "SQL", "AWS"
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {jobOpportunity.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {jobDetails.company} • {jobDetails.location}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Imagen destacada */}
          <div className="w-full h-48 overflow-hidden rounded-lg">
            <img 
              src={imageUrl} 
              alt={jobOpportunity.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Información del salario */}
          <div className="bg-orange-50 p-4 rounded-lg flex items-start">
            <DollarSign className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-800">Salario anual</h3>
              <p className="text-gray-700 text-lg font-bold">{formattedSalary}</p>
            </div>
          </div>
          
          {/* Información adicional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg flex items-center">
              <Building className="h-4 w-4 text-gray-500 mr-3" />
              <div>
                <h4 className="text-sm font-medium">Departamento</h4>
                <p className="text-gray-700">{jobDetails.department}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg flex items-center">
              <MapPin className="h-4 w-4 text-gray-500 mr-3" />
              <div>
                <h4 className="text-sm font-medium">Ubicación</h4>
                <p className="text-gray-700">{jobDetails.location}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg flex items-center">
              <User className="h-4 w-4 text-gray-500 mr-3" />
              <div>
                <h4 className="text-sm font-medium">Tipo de contrato</h4>
                <p className="text-gray-700">{jobDetails.jobType}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-3" />
              <div>
                <h4 className="text-sm font-medium">Fecha de publicación</h4>
                <p className="text-gray-700">{jobDetails.postedDate}</p>
              </div>
            </div>
          </div>
          
          {/* Descripción del puesto */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <Briefcase className="h-4 w-4 text-gray-600 mr-2" />
              Descripción
            </h3>
            <p className="text-gray-700">{jobOpportunity.description}</p>
            
            {/* Habilidades requeridas */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-2">Habilidades requeridas:</h4>
              <div className="flex flex-wrap gap-2">
                {jobDetails.requiredSkills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}