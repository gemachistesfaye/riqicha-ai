import React from "react";
import { Language } from "../../../types/cv";
import { AccentColor } from "../../../data/colors";

interface CVLanguagesProps {
  languages: Language[];
  variant?: "classic" | "modern" | "professional" | "graduate" | "minimal";
  accentColor?: AccentColor;
}

export const CVLanguages: React.FC<CVLanguagesProps> = ({
  languages,
  variant = "classic",
  accentColor,
}) => {
  if (!languages || languages.length === 0) return null;
  const hex = accentColor?.hex || "#0f2942";

  return (
    <section className="mb-2.5 sm:mb-3 break-inside-avoid min-w-0">
      <h2
        className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
          variant === "minimal"
            ? "text-slate-900 border-b border-slate-200 pb-1"
            : variant === "modern"
              ? "border-b-2 pb-0.5"
              : variant === "professional"
                ? "bg-slate-100 px-2 py-1 rounded-xs"
                : variant === "graduate"
                  ? "font-extrabold border-b pb-1"
                  : "border-b border-slate-300 pb-1"
        }`}
        style={
          variant === "modern" || variant === "graduate"
            ? { color: hex, borderColor: hex }
            : variant === "professional" || variant === "classic"
              ? { color: hex }
              : undefined
        }
      >
        Languages
      </h2>

      <div className="space-y-0.5 min-w-0">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="text-[11px] flex justify-between items-center gap-1.5 min-w-0"
          >
            <span className="font-semibold text-slate-800 min-w-0 break-words">
              {lang.name}
            </span>
            <span className="text-[10px] text-slate-500 font-medium shrink-0">
              {lang.proficiency}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
