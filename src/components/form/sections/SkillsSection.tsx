import React, { useState } from "react";
import { Skill } from "../../../types/cv";
import { FormSectionHeader } from "../FormSectionHeader";
import { Plus, X, Wrench } from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onChange,
}) => {
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Advanced");

  const addSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSkillName.trim()) return;

    const skillObj: Skill = {
      id: "skill-" + Date.now(),
      name: newSkillName.trim(),
      level: newSkillLevel,
    };

    onChange([...skills, skillObj]);
    setNewSkillName("");
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter((s) => s.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
      <FormSectionHeader
        title="Skills & Technical Competencies"
        description="List key technical, professional, or soft skills relevant to your target role."
        optional
      />

      {/* Input area */}
      <form
        onSubmit={addSkill}
        className="flex flex-col sm:flex-row gap-2 mb-6"
      >
        <div className="flex-1">
          <input
            type="text"
            placeholder="e.g. React.js, Financial Analysis, Project Management..."
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
          />
        </div>

        <select
          value={newSkillLevel}
          onChange={(e) => setNewSkillLevel(e.target.value)}
          className="px-3 py-2 text-xs text-slate-700 bg-white border border-slate-300 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>

        <button
          type="submit"
          disabled={!newSkillName.trim()}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-700 hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Skill
        </button>
      </form>

      {/* Added Skills List Badges */}
      {skills.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <Wrench className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
          <p className="text-xs text-slate-600">
            No skills added yet. Type a skill above and press Add.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-medium text-slate-800 transition-colors group"
            >
              <span>{skill.name}</span>
              {skill.level && (
                <span className="text-[10px] text-slate-500 font-normal border-l border-slate-300 pl-1.5">
                  {skill.level}
                </span>
              )}
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-slate-400 hover:text-red-600 focus:outline-none ml-0.5"
                title="Remove skill"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
