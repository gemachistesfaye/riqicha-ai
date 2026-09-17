import React from "react";
import { Education } from "../../../types/cv";
import { FormInput } from "../FormInput";
import { FormTextarea } from "../FormTextarea";
import { FormSectionHeader } from "../FormSectionHeader";
import { Plus, Trash2, GraduationCap } from "lucide-react";

interface EducationSectionProps {
  educations: Education[];
  onChange: (educations: Education[]) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  educations,
  onChange,
}) => {
  const addEducation = () => {
    const newEdu: Education = {
      id: "edu-" + Date.now(),
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    };
    onChange([...educations, newEdu]);
  };

  const removeEducation = (id: string) => {
    onChange(educations.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof Education, value: any) => {
    onChange(
      educations.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
      <FormSectionHeader
        title="Education"
        description="Include your academic background, degrees, diplomas, or relevant training programs."
        optional
      />

      {educations.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-700">
            No education entries added yet
          </p>
          <p className="text-[11px] text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Add your degrees, university, college, or high school
            qualifications.
          </p>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {educations.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 relative group transition-colors hover:border-slate-300"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                    {index + 1}
                  </span>
                  {item.degree || item.institution
                    ? `${item.degree || "Degree"} - ${item.institution || "Institution"}`
                    : `Education #${index + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => removeEducation(item.id)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Degree / Field of Study"
                  placeholder="e.g. B.Sc. in Computer Science"
                  value={item.degree}
                  onChange={(e) =>
                    updateItem(item.id, "degree", e.target.value)
                  }
                />

                <FormInput
                  label="Institution / University"
                  placeholder="e.g. Stanford University"
                  value={item.institution}
                  onChange={(e) =>
                    updateItem(item.id, "institution", e.target.value)
                  }
                />

                <FormInput
                  label="Location"
                  placeholder="e.g. Stanford, CA"
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
                      label="End / Graduation Date"
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
                        Currently enrolled
                      </span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <FormTextarea
                    label="Honors, Coursework, or Achievements"
                    optional
                    placeholder="e.g. Graduated Summa Cum Laude (GPA 3.9/4.0). Specialization in Artificial Intelligence and Machine Learning."
                    rows={3}
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
            onClick={addEducation}
            className="w-full py-2.5 px-4 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Another Education
          </button>
        </div>
      )}
    </div>
  );
};
