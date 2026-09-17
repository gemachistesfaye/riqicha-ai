import React from "react";
import { WorkExperience } from "../../../types/cv";
import { FormInput } from "../FormInput";
import { FormTextarea } from "../FormTextarea";
import { FormSectionHeader } from "../FormSectionHeader";
import { Plus, Trash2, Briefcase } from "lucide-react";

interface WorkSectionProps {
  workExperiences: WorkExperience[];
  onChange: (experiences: WorkExperience[]) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  workExperiences,
  onChange,
}) => {
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: "work-" + Date.now(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    };
    onChange([...workExperiences, newExp]);
  };

  const removeExperience = (id: string) => {
    onChange(workExperiences.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(
      workExperiences.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
      <FormSectionHeader
        title="Work Experience"
        description="Detail your relevant work experience starting with your most recent position."
        optional
      />

      {workExperiences.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-700">
            No work experience added yet
          </p>
          <p className="text-[11px] text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Add your previous roles, internships, or freelance positions. You
            can also skip this section if not applicable.
          </p>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Work Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {workExperiences.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 relative group transition-colors hover:border-slate-300"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                    {index + 1}
                  </span>
                  {item.jobTitle || item.company
                    ? `${item.jobTitle || "Role"} at ${item.company || "Company"}`
                    : `Experience #${index + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => removeExperience(item.id)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Remove experience"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Job Title"
                  placeholder="e.g. Lead Product Designer"
                  value={item.jobTitle}
                  onChange={(e) =>
                    updateItem(item.id, "jobTitle", e.target.value)
                  }
                />

                <FormInput
                  label="Company Name"
                  placeholder="e.g. Acme Corp"
                  value={item.company}
                  onChange={(e) =>
                    updateItem(item.id, "company", e.target.value)
                  }
                />

                <FormInput
                  label="Location"
                  placeholder="e.g. New York, NY (Hybrid)"
                  value={item.location}
                  onChange={(e) =>
                    updateItem(item.id, "location", e.target.value)
                  }
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormInput
                    label="Start Date"
                    type="month"
                    value={item.startDate}
                    onChange={(e) =>
                      updateItem(item.id, "startDate", e.target.value)
                    }
                  />

                  <div>
                    <FormInput
                      label="End Date"
                      type="month"
                      disabled={item.isCurrent}
                      value={item.isCurrent ? "" : item.endDate}
                      onChange={(e) =>
                        updateItem(item.id, "endDate", e.target.value)
                      }
                    />
                    <label className="inline-flex items-center gap-1.5 mt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.isCurrent}
                        onChange={(e) =>
                          updateItem(item.id, "isCurrent", e.target.checked)
                        }
                        className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 text-xs"
                      />
                      <span className="text-[11px] text-slate-600">
                        Currently work here
                      </span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <FormTextarea
                    label="Key Responsibilities & Accomplishments"
                    placeholder="• Led a cross-functional team of 6 engineers to launch the main customer portal.&#10;• Increased user engagement by 28% through UX refactoring.&#10;• Reduced churn rate by 15%."
                    helperText="Tip: Start with strong action verbs and quantitative metrics where possible."
                    rows={4}
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="w-full py-2.5 px-4 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Another Experience
          </button>
        </div>
      )}
    </div>
  );
};
