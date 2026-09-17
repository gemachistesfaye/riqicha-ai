import React from "react";
import { FormTextarea } from "../FormTextarea";
import { FormSectionHeader } from "../FormSectionHeader";

interface SummarySectionProps {
  summary: string;
  onChange: (value: string) => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  summary,
  onChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
      <FormSectionHeader
        title="Professional Summary"
        description="Write a brief 2-4 sentence summary of your background, key strengths, and career highlights."
        optional
      />

      <FormTextarea
        label="Summary / About You"
        placeholder="e.g. Versatile Product Designer with 5+ years of experience launching mobile applications. Expert in user research, design systems, and rapid prototyping..."
        helperText="Keep it concise and focused on your highest achievements and career target."
        rows={5}
        value={summary}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
