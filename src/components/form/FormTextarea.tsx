import React from "react";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
  optional?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  helperText,
  error,
  optional = false,
  className = "",
  id,
  rows = 4,
  ...props
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-slate-800"
        >
          {label}
        </label>
        {optional && (
          <span className="text-[11px] text-slate-400 font-normal">
            Optional
          </span>
        )}
      </div>

      <textarea
        id={inputId}
        rows={rows}
        className={`w-full px-3 py-2 text-xs text-slate-900 bg-white border rounded-lg shadow-xs transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 ${
          error
            ? "border-red-400 bg-red-50/20"
            : "border-slate-300 hover:border-slate-400"
        } ${className}`}
        {...props}
      />

      {helperText && !error && (
        <p className="mt-1 text-[11px] text-slate-500 leading-normal">
          {helperText}
        </p>
      )}

      {error && (
        <p className="mt-1 text-[11px] font-medium text-red-600">{error}</p>
      )}
    </div>
  );
};
