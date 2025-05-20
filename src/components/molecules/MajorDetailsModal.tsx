import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent as BaseContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/ui/dialog";
import { Button } from "@/components/atoms/ui/button";
import { Textarea } from "@/components/atoms/ui/textarea";
import { ScrollArea } from "@/components/atoms/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Building,
  GraduationCap,
  Target,
} from "lucide-react";

import { Major } from "@/types/majorType";
import type { Comment as MajorComment } from "@/types/commentTypes";
import {
  useGetMajorComments,
  useCreateComment,
} from "@/hooks/major/useMajorCommentsHook";

/* ---------- helpers imagen ---------- */
const imgs = [
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1581092795442-62d25b2b5e4e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
];
const imgById = (id: string) =>
  imgs[(parseInt(id.replace(/[^0-9]/g, ""), 10) || 0) % imgs.length];

/* ---------- DialogContent animable ---------- */
const MotionContent = motion(BaseContent);

/* ---------- Variantes de anchura ---------- */
const contentVariants = {
  closed: { maxWidth: "50rem" }, // ≈ sm:max-w-2xl
  open: { maxWidth: "50rem" },   // +30 % aprox.
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  major: Major | null;
}

export function MajorDetailsModal({ isOpen, onClose, major }: Props) {
  if (!major) return null;

  /* UI state */
  const [showComments, setShowComments] = useState(false);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  /* data */
  const { data: comments = [] } =
    (useGetMajorComments(major.id!) as unknown as { data: MajorComment[] });
  const createComment = useCreateComment(major.id!);

  /* auto-scroll al final cuando cambia lista */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [comments.length]);

  const publish = () => {
    if (text.trim().length < 3) return;
    createComment.mutate(text.trim());
    setText("");
  };

  /* helpers visuales */
  const img = imgById(major.id!);
  const price = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(major.price);

  const diffTxt = { EASY: "Fácil", MEDIUM: "Media", HARD: "Difícil" }[
    major.difficulty
  ];
  const diffColor = {
    EASY: "text-green-600",
    MEDIUM: "text-yellow-600",
    HARD: "text-red-600",
  }[major.difficulty];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <MotionContent
        variants={contentVariants}
        animate={showComments ? "open" : "closed"}
        initial={false}
        className="flex w-full max-h-[90vh] overflow-hidden"
      >
        {/* ─────────── Panel de detalles ─────────── */}
        <div
          className={`overflow-y-auto pr-4 transition-all
                      ${showComments ? "lg:basis-2/3" : "flex-1"}`}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {major.name}
            </DialogTitle>
            <DialogDescription>
              {major.focus} • Acreditación de Alta Calidad
            </DialogDescription>
          </DialogHeader>

          {/* Imagen */}
          <div className="w-full h-64 rounded-lg overflow-hidden my-4">
            <img
              src={img}
              alt={major.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info programa */}
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Building className="h-5 w-5 text-orange-500 mr-2" />
              <h3 className="font-semibold">Información del Programa</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Modalidad:</span>
                <span className="font-medium">Presencial</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dificultad:</span>
                <span className={`font-medium ${diffColor}`}>{diffTxt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Precio semestral:</span>
                <span className="font-medium">{price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Enfoque:</span>
                <span className="font-medium">{major.focus}</span>
              </div>
            </div>

            {/* Botón toggle comentarios */}
            <div className="flex justify-end mt-4">
              <Button
                variant="secondary"
                onClick={() => setShowComments((v) => !v)}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                {showComments ? "Ocultar" : "Comentarios"}
              </Button>
            </div>
          </div>

          {/* Descripción */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <h3 className="font-semibold flex items-center mb-2">
              <GraduationCap className="h-4 w-4 mr-2" />
              Descripción del Programa
            </h3>
            <p className="text-sm leading-relaxed">{major.description}</p>
          </div>

          {/* Skills */}
          <div className="bg-blue-50 rounded-lg p-4 mt-6">
            <h3 className="font-semibold flex items-center mb-3">
              <Target className="h-4 w-4 mr-2" />
              Habilidades que Desarrollarás
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Redacción y Escritura",
                "Comunicación Digital",
                "Manejo de Redes Sociales",
                "Producción Audiovisual",
                "Investigación Periodística",
              ].map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ─────────── Panel de comentarios ─────────── */}
        <AnimatePresence>
          {showComments && (
            <motion.aside
              key="comments"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "33%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{
                width: { duration: 0.35, ease: "easeInOut" },
                opacity: { duration: 0.35, ease: "easeInOut" }
              }}
              className="hidden lg:flex flex-col border-l pl-4"
            >
              <h3 className="font-semibold mb-2">Comentarios</h3>

              <ScrollArea className="flex-1 mb-3" ref={scrollRef}>
                <div className="flex flex-col space-y-2">
                  {comments.map((c: MajorComment) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-lg bg-gray-100 p-2 text-sm"
                    >
                      <p>{c.text}</p>
                      <span className="block text-[10px] text-gray-500 mt-1">
                        {new Date(c.createdAt).toLocaleString("es-CO")}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Nuevo comentario */}
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                maxLength={300}
                placeholder="Escribe tu comentario..."
                className="mb-2"
              />
              <Button
                onClick={publish}
                disabled={text.trim().length < 3}
                className="self-end"
              >
                Publicar
              </Button>
            </motion.aside>
          )}
        </AnimatePresence>
      </MotionContent>
    </Dialog>
  );
}
