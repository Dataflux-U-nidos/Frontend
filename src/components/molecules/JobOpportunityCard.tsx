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

  return (
    <Card 
      className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
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
      <CardFooter className="bg-gray-50 pt-2 pb-2 border-t border-gray-100">
        <div className="flex items-center text-gray-700">
          <DollarSign className="h-4 w-4 text-green-600 mr-1" />
          <span className="font-semibold">{formattedSalary}</span>
          <span className="text-gray-500 text-sm ml-1">/ año</span>
        </div>
      </CardFooter>
    </Card>
  );
}