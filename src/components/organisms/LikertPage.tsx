import { LikertRow } from "../molecules/LikertRow";

interface Item {
    key: string;
    description: string;
    options: string[];
}

export const LikertPage = ({ items, answers, onAnswer, active }: {
    items: Item[];
    answers: Record<string, number | null>;
    onAnswer: (k: string, v: number) => void;
    active: boolean;
}) => (
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
    </div>
);