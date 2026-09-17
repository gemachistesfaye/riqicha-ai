import React from "react";
import { Skill } from "../../../types/cv";
import { AccentColor } from "../../../data/colors";

interface CVSkillsProps {
  skills: Skill[];
  variant?: "classic" | "modern" | "professional" | "graduate" | "minimal";
  accentColor?: AccentColor;
}

export const CVSkills: React.FC<CVSkillsProps> = ({
  skills,
  variant = "classic",
  accentColor,
}) => {
  if (!skills || skills.length === 0) return null;
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
        Skills
      </h2>

      {variant === "minimal" ? (
        <p className="text-xs text-slate-700 leading-normal break-words">
          {skills.map((s) => s.name).join(" • ")}
        </p>
      ) : variant === "modern" ? (
        <div className="space-y-0.5 min-w-0">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="text-[11px] flex justify-between items-center gap-1.5 min-w-0"
            >
              <span className="font-semibold text-slate-800 min-w-0 break-words">
                {skill.name}
              </span>
              {skill.level && (
                <span className="text-[10px] text-slate-500 font-medium shrink-0">
                  {skill.level}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1 min-w-0">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="text-[11px] bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded font-medium break-words"
            >
              {skill.name} {skill.level ? `(${skill.level})` : ""}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};
