import React from "react";
import { ACCENT_COLORS, AccentColor } from "../../data/colors";
import { Check } from "lucide-react";

interface ColorPickerProps {
  selectedColorId: string;
  onSelectColor: (colorId: string) => void;
  size?: "sm" | "md";
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColorId,
  onSelectColor,
  size = "md",
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">
        Accent Color:
      </span>
      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
        {ACCENT_COLORS.map((color: AccentColor) => {
          const isSelected = selectedColorId === color.id;
          const dimension = size === "sm" ? "w-5 h-5" : "w-6 h-6";

          return (
            <button
              key={color.id}
              onClick={() => onSelectColor(color.id)}
              title={`${color.name} (${color.hex})`}
              className={`${dimension} rounded-full flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-400 ${
                isSelected
                  ? "ring-2 ring-offset-1 ring-slate-800 scale-105 shadow-xs"
                  : "opacity-85 hover:opacity-100"
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {isSelected && (
                <Check className="w-3 h-3 text-white stroke-[3]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
