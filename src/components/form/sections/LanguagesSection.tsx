import React from "react";
import { Language } from "../../../types/cv";
import { FormSectionHeader } from "../FormSectionHeader";
import { Plus, Trash2, Languages as LangIcon } from "lucide-react";

interface LanguagesSectionProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  languages,
  onChange,
}) => {
  const addLanguage = () => {
    const newLang: Language = {
      id: "lang-" + Date.now(),
      name: "",
      proficiency: "Fluent",
    };
    onChange([...languages, newLang]);
  };

  const removeLanguage = (id: string) => {
    onChange(languages.filter((l) => l.id !== id));
  };

  const updateItem = (id: string, field: keyof Language, value: string) => {
    onChange(
      languages.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
      <FormSectionHeader
        title="Languages"
        description="Add languages you speak along with your proficiency level."
        optional
      />

      {languages.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <LangIcon className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
          <p className="text-xs font-semibold text-slate-700">
            No languages added yet
          </p>
          <button
            type="button"
            onClick={addLanguage}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Language
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {languages.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              <input
                type="text"
                placeholder="Language (e.g. English, Spanish, French)"
                value={item.name}
                onChange={(e) => updateItem(item.id, "name", e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />

              <select
                value={item.proficiency}
                onChange={(e) =>
                  updateItem(item.id, "proficiency", e.target.value)
                }
                className="w-36 sm:w-44 px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 shrink-0"
              >
                <option value="Native / Bilingual">Native / Bilingual</option>
                <option value="Fluent">Fluent</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic / Elementary">Basic / Elementary</option>
              </select>

              <button
                type="button"
                onClick={() => removeLanguage(item.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Remove language"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addLanguage}
            className="w-full py-2 px-3 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Another Language
          </button>
        </div>
      )}
    </div>
  );
};
