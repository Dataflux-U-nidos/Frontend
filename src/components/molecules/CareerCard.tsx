import { Link } from "react-router-dom";
import { Badge } from "@/components/atoms/ui/badge";
import { Button } from "@/components/atoms/ui/button";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from "@/components/atoms/ui/tooltip";
import type { Major } from "@/types/majorType";

/** Colores por dificultad */
const difficultyClasses: Record<Major["difficulty"], string> = {
    EASY: "bg-emerald-100 text-emerald-800",
    MEDIUM: "bg-amber-100 text-amber-800",
    HARD: "bg-rose-100 text-rose-800",
};

const difficultyLabels: Record<Major["difficulty"], string> = {
    EASY: "FÁCIL",
    MEDIUM: "MEDIA",
    HARD: "DIFÍCIL",
};

const money = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
});

interface Props {
    major: Major;
}

export function CareerCard({ major }: Props) {
    const { id, name, difficulty, price, focus, description } = major;

    return (
        <article className="relative flex flex-col rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Imagen provisional */}
            <img
                src="https://picsum.photos/600/400?random=12"
                alt={name}
                className="h-48 w-full rounded-t-2xl object-cover"
            />

            <div className="flex flex-col gap-3 p-4">
                <h3 className="text-lg font-semibold">{name}</h3>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                    <Badge className={difficultyClasses[difficulty]}>
                        {difficultyLabels[difficulty]}
                    </Badge>
                    <Badge variant="secondary">{money.format(price)}</Badge>
                    <Badge variant="secondary">{focus}</Badge>
                </div>

                {/* Descripción truncada con tooltip */}
                <TooltipProvider>
                    <Tooltip delayDuration={150}>
                        <TooltipTrigger asChild>
                            <p className="text-sm text-gray-600 line-clamp-3 cursor-help select-none">
                                {description}
                            </p>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="start" className="max-w-xs">
                            {description}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <Button asChild className="mt-auto">
                    {/* Link con animación (la animación real la controla Framer Motion) */}
                    <Link to={`/universidad/${id}`}>Ver más información</Link>
                </Button>
            </div>
        </article>
    );
}
