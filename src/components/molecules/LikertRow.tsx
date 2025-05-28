import { Label } from "@/components/atoms/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/ui/tooltip";
import { RadioDot } from "../atoms/RadioDot";
import { cn } from "@/lib/utils";

interface LikertRowProps {
    statement: string;
    options: string[];
    value: number | null;
    onChange: (v: number) => void;
    disabled?: boolean;
}

export const LikertRow = ({
    statement,
    options,
    value,
    onChange,
    disabled,
}: LikertRowProps) => {
    const sizeFor = (v: number) => (v === 3 ? "sm" : v === 2 || v === 4 ? "md" : "lg");

    return (
        <div className="py-3">
            <p className={cn(
                "text-center font-semibold md:text-2xl transition-colors", "text-slate-700"
            )}>
                {statement}
            </p>

            <div className="mt-6 grid grid-cols-[auto_1fr_auto]">
                <Label className={cn("text-2xl font-medium", disabled ? "text-orange-300" : "text-orange-600")}>
                    En  desacuerdo
                </Label>

                <div className="flex items-center justify-center gap-15">
                    {options.map((opt, i) => (
                        <Tooltip key={i} delayDuration={80}>
                            <TooltipTrigger asChild>
                                <RadioDot
                                    key={i}
                                    value={i + 1}
                                    selected={value === i + 1}
                                    disabled={disabled}
                                    color={i + 1 <= 2 ? "orange" : i + 1 === 3 ? "gray" : "green"}
                                    size={sizeFor(i + 1)}
                                    onSelect={onChange}
                                    layoutId={`dot-${statement}-${i}`}
                                />
                            </TooltipTrigger>
                            {/* Solo 2‑4 muestran tooltip */}
                            {i > 0 && i < options.length - 1 && !disabled && (
                                <TooltipContent side="top">{opt}</TooltipContent>
                            )}
                        </Tooltip>
                    ))}
                </div>

                <Label className={cn("text-2xl font-medium", "text-green-600")}>
                    De acuerdo
                </Label>
            </div>

            {/* separador */}
            <hr className="mt-8 border-t border-gray-200" />
        </div>
    );
};
