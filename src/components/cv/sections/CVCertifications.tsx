import React from "react";
import { Certification } from "../../../types/cv";
import { AccentColor } from "../../../data/colors";

interface CVCertificationsProps {
  certifications: Certification[];
  variant?: "classic" | "modern" | "professional" | "graduate" | "minimal";
  accentColor?: AccentColor;
}

const formatHref = (val: string) => {
  if (!val) return "#";
  if (val.startsWith("http://") || val.startsWith("https://")) return val;
  return `https://${val}`;
};

export const CVCertifications: React.FC<CVCertificationsProps> = ({
  certifications,
  variant = "classic",
  accentColor,
}) => {
  if (!certifications || certifications.length === 0) return null;
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
        Certifications
      </h2>

      <div className="space-y-1.5">
        {certifications.map((cert) => (
          <div key={cert.id} className="text-xs min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-1.5">
              <span className="font-bold text-slate-900 break-words">
                {cert.name || "Certification"}
              </span>
              {cert.date && (
                <span className="text-[10px] font-medium text-slate-500 shrink-0">
                  {cert.date}
                </span>
              )}
            </div>
            {(cert.issuer || cert.link) && (
              <div className="text-[11px] text-slate-600 mt-0.5 break-all">
                {cert.issuer && <span>{cert.issuer}</span>}
                {cert.link && (
                  <a
                    href={formatHref(cert.link)}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline ml-1 font-medium"
                    style={{ color: hex }}
                  >
                    ({cert.link})
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
