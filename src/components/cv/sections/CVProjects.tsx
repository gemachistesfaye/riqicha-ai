import React from "react";
import { Project } from "../../../types/cv";
import { AccentColor } from "../../../data/colors";

interface CVProjectsProps {
  projects: Project[];
  variant?: "classic" | "modern" | "professional" | "graduate" | "minimal";
  accentColor?: AccentColor;
}

export const CVProjects: React.FC<CVProjectsProps> = ({
  projects,
  variant = "classic",
  accentColor,
}) => {
  if (!projects || projects.length === 0) return null;
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
        Projects
      </h2>

      <div className="space-y-2.5">
        {projects.map((proj) => (
          <div key={proj.id} className="break-inside-avoid min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-x-3 gap-y-0.5 min-w-0">
              <h3 className="text-xs font-bold text-slate-900 min-w-0 flex-1 break-words">
                {proj.name || "Project Name"}
              </h3>
              {proj.link && (
                <span
                  className="text-[11px] font-medium underline shrink-0 break-all"
                  style={{ color: hex }}
                >
                  {proj.link}
                </span>
              )}
            </div>

            {proj.technologies && (
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5 break-words">
                Technologies: {proj.technologies}
              </p>
            )}

            {proj.description && (
              <p className="text-xs text-slate-600 mt-1 whitespace-pre-line leading-relaxed break-words">
                {proj.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
