import React from "react";
import { Achievement } from "../../../types/cv";
import { AccentColor } from "../../../data/colors";

interface CVAchievementsProps {
  achievements: Achievement[];
  variant?: "classic" | "modern" | "professional" | "graduate" | "minimal";
  accentColor?: AccentColor;
}

export const CVAchievements: React.FC<CVAchievementsProps> = ({
  achievements,
  variant = "classic",
  accentColor,
}) => {
  if (!achievements || achievements.length === 0) return null;
  const hex = accentColor?.hex || "#0f2942";

  return (
    <section className="mb-2.5 sm:mb-3 break-inside-avoid">
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
        Key Achievements
      </h2>

      <div className="space-y-1.5">
        {achievements.map((ach) => (
          <div key={ach.id} className="text-xs">
            <h3 className="font-bold text-slate-900">{ach.title}</h3>
            {ach.description && (
              <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">
                {ach.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
