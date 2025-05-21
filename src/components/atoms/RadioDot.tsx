// atoms/RadioDot.tsx
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RadioDotProps {
  value: number;
  selected: boolean;
  color: "orange" | "gray" | "green";
  disabled?: boolean;
  onSelect: (v: number) => void;
  size: "sm" | "md" | "lg";
  layoutId: string;
}

const SIZE_MAP: Record<RadioDotProps["size"], string> = {
  sm: "h-8 w-8  md:h-10 md:w-10 2xl:h-12 2xl:w-12",   // 32 → 48px
  md: "h-12 w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16",   // 48 → 64px
  lg: "h-16 w-16 md:h-[72px] md:w-[72px] 2xl:h-20 2xl:w-20", // 64 → 80px
};

export const RadioDot = ({
  value,
  selected,
  color,
  disabled,
  onSelect,
  size,  
  layoutId,
}: RadioDotProps) => (
  <button
    aria-label={`Valor ${value}`}
    disabled={disabled}
    onClick={() => onSelect(value)}
    className={cn(
      "relative rounded-full border-2 transition-colors duration-100 ease-out cursor-pointer",
      SIZE_MAP[size],
      color === "orange" && "border-orange-500",
      color === "gray" && "border-gray-400",
      color === "green" && "border-green-600",
      selected && "border-transparent"
    )}
  >
    {selected && (
      <motion.div
        layoutId={layoutId}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 20 }}
        className={cn(
          "absolute inset-0 rounded-full",
          color === "orange" && "bg-orange-500",
          color === "gray" && "bg-gray-400",
          color === "green" && "bg-green-600"
        )}
      />
    )}
  </button>
);
