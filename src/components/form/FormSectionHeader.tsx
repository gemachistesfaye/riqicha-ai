import React from "react";

interface FormSectionHeaderProps {
  title: string;
  description: string;
  optional?: boolean;
}

export const FormSectionHeader: React.FC<FormSectionHeaderProps> = ({
  title,
  description,
  optional = false,
}) => {
  return (
    <div className="pb-4 mb-6 border-b border-slate-200 flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          {optional && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
              Optional
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
};
