import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/atoms/ui/card";
import { Badge } from "@/components/atoms/ui/badge";
import { DollarSign, BookOpen, GraduationCap } from "lucide-react";
import type { Major } from "@/types/majorType";

// Imágenes genéricas de carreras/programas académicos
const careerImages = [
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1581092795442-62d25b2b5e4e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop"
];

// Función para obtener una imagen basada en el ID de la carrera
const getCareerImage = (id: string): string => {
  const numericId = parseInt(id.replace(/[^0-9]/g, ''), 10) || 0;
  const index = numericId % careerImages.length;
  return careerImages[index];
};

/** Colores por dificultad */
const difficultyClasses: Record<Major["difficulty"], string> = {
  EASY: "bg-emerald-100 text-emerald-800",
  MEDIUM: "bg-amber-100 text-amber-800",
  HARD: "bg-rose-100 text-rose-800",
};

// Formatear precio en pesos colombianos
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

interface Props {
  major: Major;
  onClick?: () => void;
}

export function CareerCard({ major, onClick }: Props) {
  const { _id, id, name, difficulty, price, focus, description } = major;
  
  // Obtener imagen basada en ID
  const imageUrl = getCareerImage(_id || id || "1");
  
  // Formatear la dificultad para mostrar
  const difficultyText = {
    EASY: "Fácil",
    MEDIUM: "Media", 
    HARD: "Difícil"
  }[difficulty];

  return (
    <Card
      className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      {/* Imagen de cabecera */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl text-gray-800 group-hover:text-orange-600 transition-colors">
              {name}
            </CardTitle>
          </div>
          <div className="p-2 bg-orange-100 rounded-full">
            <GraduationCap className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        {/* Badges de información */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={difficultyClasses[difficulty]}>{difficultyText}</Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            {formatPrice(price)}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {focus}
          </Badge>
        </div>

        {/* Descripción truncada */}
        <CardDescription className="text-gray-500 text-sm line-clamp-3">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}