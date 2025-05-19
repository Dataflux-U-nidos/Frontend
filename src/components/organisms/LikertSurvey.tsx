import { useState, useEffect, useMemo } from "react";
import { Progress } from "@/components/atoms/ui/progress";
import {
    Pagination, PaginationContent, PaginationItem, PaginationLink,
} from "@/components/atoms/ui/pagination"
import { useSurveyStore } from "@/lib/Likert/useSurveyStore";
import { LikertPage } from "./LikertPage";
import { itemsSchema } from "@/lib/Likert/surveySchema";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils";

const HEADER_OFFSET = 320; // px: título + margen superior

interface LikertSurveyProps {
    data: any;
    onSubmit: () => void;
}
const flattenItems = (data: any) => {
  // Aseguramos que data.tests exista (puedes adaptar según tu estructura)
  const tests = data.tests;

  if (!tests) return [];

  // Detectar si tests es plano (satisfaction) o anidado (vocational)
  // Ejemplo: si tests tiene keys que apuntan a objetos con descripción => plano
  // o si tests tiene keys que apuntan a objetos que a su vez tienen keys con descripción => anidado

  // Tomamos un valor cualquiera de tests
  const firstValue = Object.values(tests)[0];

  // Si firstValue es objeto y tiene keys que a su vez son objetos con 'description', es anidado
  if (
    firstValue &&
    typeof firstValue === "object" &&
    !Array.isArray(firstValue) &&
    Object.values(firstValue).every(
      (item) =>
        item && typeof item === "object" && "description" in item && "options" in item
    )
  ) {
    // Vocational: aplanar todos los dominios y sus preguntas
    return Object.values(tests).flatMap((domain: any) =>
      Object.entries(domain).map(([k, v]: any) => ({
        key: k,
        description: v.description,
        options: v.options.map((o: any) => o.text),
      }))
    );
  }

  // Si no es anidado, asumir que es plano (satisfaction)
  // Cada key apunta directamente a una pregunta con description y options
  return Object.entries(tests).map(([k, v]: any) => ({
    key: k,
    description: v.description,
    options: v.options.map((o: any) => o.text),
  }));
};

export const LikertSurvey = ({ data, onSubmit }: LikertSurveyProps) => {
    const flatItems = useMemo(() => flattenItems(data), [data]);

    // validación opcional
    itemsSchema.parse(
        flatItems.map(({ key, description }) => ({ key, description }))
    );

    /* ---------- filas por página ---------- */
    const [rowsPerPage, setRowsPerPage] = useState(1);
    useEffect(() => {
        const calc = () => {
            const avail = window.innerHeight - HEADER_OFFSET;
            const rowH = 120; // ≈ 2 rem space + 80 px contenido
            setRowsPerPage(Math.max(1, Math.floor(avail / rowH)));
        };
        calc();
        window.addEventListener("resize", calc);
        return () => window.removeEventListener("resize", calc);
    }, []);

    /* ---------- páginas ---------- */
    const pages = useMemo(() => {
        const out: typeof flatItems[] = [];
        for (let i = 0; i < flatItems.length; i += rowsPerPage) {
            out.push(flatItems.slice(i, i + rowsPerPage));
        }
        return out;
    }, [flatItems, rowsPerPage]);

    /* ---------- store ---------- */
    const { answers, currentPage, setAnswer, nextPage, prevPage } =
        useSurveyStore();

    const answered = Object.values(answers).filter(Boolean).length;
    const progress = Math.round((answered / flatItems.length) * 100);

    const canNext =
        pages[currentPage]?.every((it) => answers[it.key] !== null) ?? false;

    /* ---------- keyboard ---------- */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" && canNext && currentPage < pages.length - 1)
                nextPage();
            if (e.key === "ArrowLeft" && currentPage > 0) prevPage();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    /* ---------- render ---------- */
    return (
        <div className="h-screen flex flex-col justify-between">
            {/* páginas */}
            <div className="flex-1">
                {pages.map((page, idx) => (
                    <div key={idx} className={idx === currentPage ? "block" : "hidden"}>
                        <LikertPage
                            items={page}
                            answers={answers}
                            onAnswer={setAnswer}
                            active={idx === currentPage}
                            onSubmit={onSubmit}
                        />
                    </div>
                ))}
            </div>

            {/* controles: barra (60 %) + paginación (botones numerados) */}
            <div className="mt-8 flex w-full items-center justify-center gap-6">
                <span className="text-xs">{progress}%</span>
                <Progress value={progress} className="h-2 w-[60%] flex-shrink-0" />

                <Pagination>
                    <PaginationContent>
                        {/* FLECHA PREVIA */}
                        <PaginationItem>
                            <PaginationLink
                                size="icon"
                                onClick={prevPage}
                                aria-label="Ir a página anterior"
                                className={cn(
                                    currentPage === 0 && "opacity-50 pointer-events-none"
                                )}
                                aria-disabled={currentPage === 0}
                            >
                                <ChevronLeftIcon className="size-4" />
                            </PaginationLink>
                        </PaginationItem>

                        

                        {/* FLECHA SIGUIENTE */}
                        <PaginationItem>
                            <PaginationLink
                                size="icon"
                                onClick={() => {
                                    if (currentPage < pages.length - 1 && canNext) nextPage()
                                }}
                                aria-label="Ir a página siguiente"
                                aria-disabled={currentPage >= pages.length - 1 || !canNext}
                                className={cn(
                                    (currentPage >= pages.length - 1 || !canNext) &&
                                    "opacity-50 pointer-events-none"
                                )}
                            >
                                <ChevronRightIcon className="size-4" />
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

