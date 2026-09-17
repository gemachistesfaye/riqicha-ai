import React from "react";
import { AccentColor } from "../../../data/colors";

interface CVSummaryProps {
  summary: string;
  variant?: "classic" | "modern" | "professional" | "graduate" | "minimal";
  accentColor?: AccentColor;
}

export const CVSummary: React.FC<CVSummaryProps> = ({
  summary,
  variant = "classic",
  accentColor,
}) => {
  if (!summary || !summary.trim()) return null;
  const hex = accentColor?.hex || "#0f2942";

  const sectionHeadings: Record<string, string> = {
    classic: "Professional Summary",
    modern: "Executive Summary",
    professional: "About Me",
    graduate: "Career Objective & Summary",
    minimal: "Summary",
  };

  return (
    <section className="mb-3.5 sm:mb-4 break-inside-avoid">
      <h2
        className={`text-xs font-bold uppercase tracking-wider mb-2 ${
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
          variant === "modern"
            ? { color: hex, borderColor: hex }
            : variant === "graduate"
              ? { color: hex, borderColor: hex }
              : variant === "professional"
                ? { color: hex }
                : variant === "classic"
                  ? { color: hex }
                  : undefined
        }
      >
        {sectionHeadings[variant] || "Professional Summary"}
      </h2>
      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
        {summary}
      </p>
    </section>
  );
};
