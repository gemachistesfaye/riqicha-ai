import React from "react";
import { Project } from "../../../types/cv";
import { FormInput } from "../FormInput";
import { FormTextarea } from "../FormTextarea";
import { FormSectionHeader } from "../FormSectionHeader";
import { Plus, Trash2, FolderKanban } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onChange,
}) => {
  const addProject = () => {
    const newProj: Project = {
      id: "proj-" + Date.now(),
      name: "",
      description: "",
      technologies: "",
      link: "",
    };
    onChange([...projects, newProj]);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const updateItem = (id: string, field: keyof Project, value: string) => {
    onChange(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
      <FormSectionHeader
        title="Key Projects"
        description="Showcase significant personal, open-source, or client projects."
        optional
      />

      {projects.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <FolderKanban className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-700">
            No projects added yet
          </p>
          <p className="text-[11px] text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Highlight notable applications, research papers, or portfolio
            builds.
          </p>
          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Project
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 relative group transition-colors hover:border-slate-300"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                    {index + 1}
                  </span>
                  {item.name || `Project #${index + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => removeProject(item.id)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Project Title"
                  placeholder="e.g. E-Commerce Platform Redesign"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, "name", e.target.value)}
                />

                <FormInput
                  label="Project Link / Demo URL"
                  optional
                  placeholder="e.g. github.com/user/project or mydemo.com"
                  value={item.link}
                  onChange={(e) => updateItem(item.id, "link", e.target.value)}
                />

                <div className="md:col-span-2">
                  <FormInput
                    label="Technologies Used"
                    placeholder="e.g. React, Node.js, PostgreSQL, Docker"
                    value={item.technologies}
                    onChange={(e) =>
                      updateItem(item.id, "technologies", e.target.value)
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <FormTextarea
                    label="Project Description & Impact"
                    placeholder="Describe the problem solved, your role, and key outcomes..."
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
            onClick={addProject}
            className="w-full py-2.5 px-4 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Another Project
          </button>
        </div>
      )}
    </div>
  );
};
