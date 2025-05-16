import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  defaultValue,
  onValueChange,
  className,
}) => {
  // Estado interno para el valor si no se proporciona externamente
  const [internalValue, setInternalValue] = useState<number[]>(
    value || defaultValue || [min, max]
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;

  // Actualizar el estado interno cuando cambia el valor externo
  useEffect(() => {
    if (isControlled && value) {
      setInternalValue(value);
    }
  }, [isControlled, value]);

  // Calcular la posición de los thumbs
  const getThumbPosition = (index: number): string => {
    const currentVal = isControlled && value ? value[index] : internalValue[index];
    const percentage = ((currentVal - min) / (max - min)) * 100;
    return `${Math.max(0, Math.min(100, percentage))}%`;
  };

  // Calcular el ancho del range
  const getRangeWidth = (): string => {
    const values = isControlled && value ? value : internalValue;
    if (values.length !== 2) return "0%";
    
    const minPercentage = ((values[0] - min) / (max - min)) * 100;
    const maxPercentage = ((values[1] - min) / (max - min)) * 100;
    return `${maxPercentage - minPercentage}%`;
  };

  // Manejar el arrastre del thumb
  const handleThumbDrag = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    const trackWidth = trackRect.width;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const relativeX = moveEvent.clientX - trackRect.left;
      const percentage = relativeX / trackWidth;
      const rawValue = min + (max - min) * percentage;
      
      // Redondear al step más cercano
      const steppedValue = Math.round(rawValue / step) * step;
      const boundedValue = Math.max(min, Math.min(max, steppedValue));
      
      // Actualizar el valor
      const newValues = [...(isControlled && value ? value : internalValue)];
      newValues[index] = boundedValue;
      
      // Asegurarse de que los valores estén en orden
      if (index === 0 && newValues[1] && newValues[0] > newValues[1]) {
        newValues[0] = newValues[1];
      } else if (index === 1 && newValues[0] && newValues[0] > newValues[1]) {
        newValues[1] = newValues[0];
      }
      
      if (!isControlled) {
        setInternalValue(newValues);
      }
      
      if (onValueChange) {
        onValueChange(newValues);
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
      <div 
        ref={trackRef}
        className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200"
      >
        <div 
          className="absolute h-full bg-orange-500"
          style={{ 
            left: getThumbPosition(0),
            width: getRangeWidth()
          }}
        />
      </div>
      
      {internalValue.map((_, i) => (
        <div
          key={i}
          className="absolute block h-5 w-5 cursor-grab rounded-full border-2 border-orange-500 bg-white transition-transform"
          style={{ 
            transform: `translateX(-50%)`,
            left: getThumbPosition(i)
          }}
          onMouseDown={(e) => handleThumbDrag(i, e)}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={internalValue[i]}
          tabIndex={0}
        />
      ))}
    </div>
  );
};

Slider.displayName = "Slider";