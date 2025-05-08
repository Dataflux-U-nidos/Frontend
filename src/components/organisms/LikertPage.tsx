import { LikertRow } from "../molecules/LikertRow";
import { Button } from "../../components/atoms/ui/button";

interface Item {
  key: string;
  description: string;
  options: string[];
}

interface LikertPageProps {
  /** Ítems que se renderizan en esta página */
  items: Item[];
  /** Respuestas globales */
  answers: Record<string, number | null>;
  /** Callback cuando el usuario selecciona una opción */
  onAnswer: (k: string, v: number) => void;
  /** Si la página está visible */
  active: boolean;
  /** Acción al pulsar “Submit” */
  onSubmit: () => void;
}

export const LikertPage = ({
  items,
  answers,
  onAnswer,
  active,
  onSubmit,          // 👈  nuevo prop
}: LikertPageProps) => (
  <div className={active ? "block" : "hidden"}>
    {items.map(({ key, description, options }) => (
      <LikertRow
        key={key}
        statement={description}
        options={options}
        value={answers[key] ?? null}
        onChange={(v) => onAnswer(key, v)}
        disabled={!active}
      />
    ))}

    {/* Puedes ocultarlo hasta la última página si lo prefieres */}
    <Button onClick={onSubmit} className="mt-6">
      Submit
    </Button>
  </div>
);
