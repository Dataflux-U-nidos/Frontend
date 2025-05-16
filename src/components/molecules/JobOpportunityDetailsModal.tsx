import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/atoms/ui/dialog";
import { JobOpportunity } from "@/types/jobOpportunityType";
import { Button } from "@/components/atoms/ui/button";
import { DollarSign, Briefcase, MapPin, Calendar, Building } from "lucide-react";

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {jobOpportunity.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Detalles de la salida laboral
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Información del salario */}
          <div className="bg-orange-50 p-4 rounded-lg flex items-start">
            <DollarSign className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-800">Salario anual</h3>
              <p className="text-gray-700 text-lg font-bold">{formattedSalary}</p>
            </div>
          </div>
          
          {/* Descripción del puesto */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <Briefcase className="h-4 w-4 text-gray-600 mr-2" />
              Descripción
            </h3>
            <p className="text-gray-700">{jobOpportunity.description}</p>
          </div>
          
          {/* Botón de aplicar */}
          <div className="pt-4">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">
              Aplicar a esta posición
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}