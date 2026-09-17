import React from "react";
import { Education } from "../../../types/cv";
import { AccentColor } from "../../../data/colors";

interface CVEducationProps {
  educations: Education[];
  variant?: "classic" | "modern" | "professional" | "graduate" | "minimal";
  accentColor?: AccentColor;
}

export const CVEducation: React.FC<CVEducationProps> = ({
  educations,
  variant = "classic",
  accentColor,
}) => {
  if (!educations || educations.length === 0) return null;
  const hex = accentColor?.hex || "#0f2942";

  return (
    <section className="mb-3.5 sm:mb-4">
      <h2
        className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
          variant === "minimal"
            ? "text-slate-900 border-b border-slate-200 pb-1"
            : variant === "modern"
              ? "border-b-2 pb-1"
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
        Education
      </h2>

      <div className="space-y-2.5">
        {educations.map((edu) => (
          <div key={edu.id} className="break-inside-avoid min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-x-3 gap-y-0.5 min-w-0">
              <div className="min-w-0 flex-1 break-words">
                <h3 className="text-xs font-bold text-slate-900">
                  {edu.degree || "Degree / Field of Study"}
                </h3>
                <p className="text-xs font-semibold text-slate-700">
                  {edu.institution} {edu.location ? `— ${edu.location}` : ""}
                </p>
              </div>

              {(edu.startDate || edu.endDate || edu.isCurrent) && (
                <span className="text-[11px] font-medium text-slate-500 shrink-0">
                  {edu.startDate}{" "}
                  {edu.startDate && (edu.endDate || edu.isCurrent) ? "–" : ""}{" "}
                  {edu.isCurrent ? "Present" : edu.endDate}
                </span>
              )}
            </div>

            {edu.description && (
              <p className="text-xs text-slate-600 mt-1 whitespace-pre-line leading-relaxed break-words">
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
