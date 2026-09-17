import React from "react";
import { PersonalInfo } from "../../../types/cv";
import { AccentColor } from "../../../data/colors";

interface CVHeaderProps {
  info: PersonalInfo;
  variant?: "classic" | "modern" | "professional" | "graduate" | "minimal";
  accentColor?: AccentColor;
}

const formatHref = (val: string, type: "email" | "phone" | "url") => {
  if (!val) return "#";
  if (type === "email") return `mailto:${val}`;
  if (type === "phone") return `tel:${val.replace(/[^0-9+]/g, "")}`;
  if (val.startsWith("http://") || val.startsWith("https://")) return val;
  return `https://${val}`;
};

export const CVHeader: React.FC<CVHeaderProps> = ({
  info,
  variant = "classic",
  accentColor,
}) => {
  const hasContact =
    info.email ||
    info.phone ||
    info.location ||
    info.linkedin ||
    info.portfolio ||
    info.github;
  const hex = accentColor?.hex || "#0f2942";

  if (variant === "modern") {
    return (
      <header
        className="pb-3 mb-4 border-b-2 min-w-0 break-words"
        style={{ borderColor: hex }}
      >
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase break-words">
          {info.fullName || "Your Full Name"}
        </h1>
        {info.jobTitle && (
          <p
            className="text-base font-bold tracking-wide mt-1 uppercase break-words"
            style={{ color: hex }}
          >
            {info.jobTitle}
          </p>
        )}

        {hasContact && (
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-slate-600 break-all font-medium">
            {info.email && (
              <a
                href={formatHref(info.email, "email")}
                className="hover:underline hover:text-slate-900"
              >
                {info.email}
              </a>
            )}
            {info.phone && (
              <a
                href={formatHref(info.phone, "phone")}
                className="hover:underline hover:text-slate-900"
              >
                • {info.phone}
              </a>
            )}
            {info.location && <span>• {info.location}</span>}
            {info.linkedin && (
              <a
                href={formatHref(info.linkedin, "url")}
                target="_blank"
                rel="noreferrer"
                className="hover:underline font-semibold"
                style={{ color: hex }}
              >
                • {info.linkedin}
              </a>
            )}
            {info.portfolio && (
              <a
                href={formatHref(info.portfolio, "url")}
                target="_blank"
                rel="noreferrer"
                className="hover:underline font-semibold"
                style={{ color: hex }}
              >
                • {info.portfolio}
              </a>
            )}
            {info.github && (
              <a
                href={formatHref(info.github, "url")}
                target="_blank"
                rel="noreferrer"
                className="hover:underline hover:text-slate-900"
              >
                • {info.github}
              </a>
            )}
          </div>
        )}
      </header>
    );
  }

  if (variant === "minimal") {
    return (
      <header className="mb-6 min-w-0 break-words">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 break-words">
          {info.fullName || "Your Full Name"}
        </h1>
        {info.jobTitle && (
          <p
            className="text-sm font-medium mt-1 tracking-wide uppercase break-words"
            style={{ color: hex }}
          >
            {info.jobTitle}
          </p>
        )}

        {hasContact && (
          <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 break-all">
            {info.email && (
              <a
                href={formatHref(info.email, "email")}
                className="hover:underline hover:text-slate-900"
              >
                {info.email}
              </a>
            )}
            {info.phone && (
              <a
                href={formatHref(info.phone, "phone")}
                className="hover:underline hover:text-slate-900"
              >
                {info.phone}
              </a>
            )}
            {info.location && <span>{info.location}</span>}
            {info.linkedin && (
              <a
                href={formatHref(info.linkedin, "url")}
                target="_blank"
                rel="noreferrer"
                className="hover:underline font-medium"
                style={{ color: hex }}
              >
                {info.linkedin}
              </a>
            )}
            {info.portfolio && (
              <a
                href={formatHref(info.portfolio, "url")}
                target="_blank"
                rel="noreferrer"
                className="hover:underline font-medium"
                style={{ color: hex }}
              >
                {info.portfolio}
              </a>
            )}
            {info.github && (
              <a
                href={formatHref(info.github, "url")}
                target="_blank"
                rel="noreferrer"
                className="hover:underline hover:text-slate-900"
              >
                {info.github}
              </a>
            )}
          </div>
        )}
      </header>
    );
  }

  if (variant === "professional") {
    return (
      <header
        className="text-white p-6 -mx-8 -mt-8 mb-6 min-w-0 break-words"
        style={{ backgroundColor: hex }}
      >
        <h1 className="text-3xl font-black tracking-tight text-white uppercase break-words">
          {info.fullName || "Your Full Name"}
        </h1>
        {info.jobTitle && (
          <p className="text-base font-semibold tracking-wider mt-1 uppercase text-slate-100 break-words">
            {info.jobTitle}
          </p>
        )}

        {hasContact && (
          <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-100 break-all">
            {info.email && (
              <a
                href={formatHref(info.email, "email")}
                className="hover:underline"
              >
                {info.email}
              </a>
            )}
            {info.phone && (
              <a
                href={formatHref(info.phone, "phone")}
                className="hover:underline"
              >
                • {info.phone}
              </a>
            )}
            {info.location && <span>• {info.location}</span>}
            {info.linkedin && (
              <a
                href={formatHref(info.linkedin, "url")}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                • {info.linkedin}
              </a>
            )}
            {info.portfolio && (
              <a
                href={formatHref(info.portfolio, "url")}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                • {info.portfolio}
              </a>
            )}
            {info.github && (
              <a
                href={formatHref(info.github, "url")}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                • {info.github}
              </a>
            )}
          </div>
        )}
      </header>
    );
  }

  if (variant === "graduate") {
    return (
      <header
        className="border-l-4 pl-4 py-1 mb-6 min-w-0 break-words"
        style={{ borderColor: hex }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight break-words">
          {info.fullName || "Your Full Name"}
        </h1>
        {info.jobTitle && (
          <p
            className="text-sm font-semibold mt-0.5 break-words"
            style={{ color: hex }}
          >
            {info.jobTitle}
          </p>
        )}

        {hasContact && (
          <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 break-all">
            {info.email && (
              <a
                href={formatHref(info.email, "email")}
                className="hover:underline hover:text-slate-900"
              >
                {info.email}
              </a>
            )}
            {info.phone && (
              <a
                href={formatHref(info.phone, "phone")}
                className="hover:underline hover:text-slate-900"
              >
                | {info.phone}
              </a>
            )}
            {info.location && <span>| {info.location}</span>}
            {info.linkedin && (
              <a
                href={formatHref(info.linkedin, "url")}
                target="_blank"
                rel="noreferrer"
                className="hover:underline hover:text-slate-900"
              >
                | {info.linkedin}
              </a>
            )}
            {info.portfolio && (
              <a
                href={formatHref(info.portfolio, "url")}
                target="_blank"
                rel="noreferrer"
                className="hover:underline hover:text-slate-900"
              >
                | {info.portfolio}
              </a>
            )}
            {info.github && (
              <a
                href={formatHref(info.github, "url")}
                target="_blank"
                rel="noreferrer"
                className="hover:underline hover:text-slate-900"
              >
                | {info.github}
              </a>
            )}
          </div>
        )}
      </header>
    );
  }

  // Classic default
  return (
    <header className="text-center border-b border-slate-300 pb-4 mb-6 min-w-0 break-words">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight break-words">
        {info.fullName || "Your Full Name"}
      </h1>
      {info.jobTitle && (
        <p
          className="text-sm font-bold uppercase tracking-widest mt-1 break-words"
          style={{ color: hex }}
        >
          {info.jobTitle}
        </p>
      )}

      {hasContact && (
        <div className="mt-3 flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-slate-600 font-medium break-all">
          {info.email && (
            <a
              href={formatHref(info.email, "email")}
              className="hover:underline hover:text-slate-900"
            >
              {info.email}
            </a>
          )}
          {info.phone && (
            <a
              href={formatHref(info.phone, "phone")}
              className="hover:underline hover:text-slate-900"
            >
              • {info.phone}
            </a>
          )}
          {info.location && <span>• {info.location}</span>}
          {info.linkedin && (
            <a
              href={formatHref(info.linkedin, "url")}
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:text-slate-900"
            >
              • {info.linkedin}
            </a>
          )}
          {info.portfolio && (
            <a
              href={formatHref(info.portfolio, "url")}
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:text-slate-900"
            >
              • {info.portfolio}
            </a>
          )}
          {info.github && (
            <a
              href={formatHref(info.github, "url")}
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:text-slate-900"
            >
              • {info.github}
            </a>
          )}
        </div>
      )}
    </header>
  );
};
