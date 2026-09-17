import React from "react";
import { Achievement } from "../../../types/cv";
import { FormInput } from "../FormInput";
import { FormTextarea } from "../FormTextarea";
import { FormSectionHeader } from "../FormSectionHeader";
import { Plus, Trash2, Trophy } from "lucide-react";

interface AchievementsSectionProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  onChange,
}) => {
  const addAchievement = () => {
    const newAch: Achievement = {
      id: "ach-" + Date.now(),
      title: "",
      description: "",
    };
    onChange([...achievements, newAch]);
  };

  const removeAchievement = (id: string) => {
    onChange(achievements.filter((a) => a.id !== id));
  };

  const updateItem = (id: string, field: keyof Achievement, value: string) => {
    onChange(
      achievements.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
      <FormSectionHeader
        title="Key Achievements & Awards"
        description="Highlight special recognitions, awards, publications, or competitive milestones."
        optional
      />

      {achievements.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <Trophy className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
          <p className="text-xs font-semibold text-slate-700">
            No achievements added yet
          </p>
          <button
            type="button"
            onClick={addAchievement}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Achievement
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {achievements.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 relative group transition-colors hover:border-slate-300"
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                    {index + 1}
                  </span>
                  {item.title || `Achievement #${index + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => removeAchievement(item.id)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>

              <div className="space-y-3">
                <FormInput
                  label="Achievement / Award Title"
                  placeholder="e.g. Employee of the Year 2023 / Hackathon 1st Place"
                  value={item.title}
                  onChange={(e) => updateItem(item.id, "title", e.target.value)}
                />

                <FormTextarea
                  label="Details & Impact"
                  placeholder="Selected out of 200+ global participants for innovative algorithmic problem solving..."
                  rows={2}
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addAchievement}
            className="w-full py-2 px-3 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Another Achievement
          </button>
        </div>
      )}
    </div>
  );
};
