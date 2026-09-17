import React from "react";
import { TemplateId } from "../../types/cv";
import { TEMPLATES } from "../../data/templates";
import { ColorPicker } from "../common/ColorPicker";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

interface TemplateSelectionProps {
  selectedTemplate: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
  selectedColorId: string;
  onSelectColor: (colorId: string) => void;
  onBack: () => void;
}

export const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  selectedTemplate,
  onSelectTemplate,
  selectedColorId,
  onSelectColor,
  onBack,
}) => {
  return (
    <div className="flex-1 bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-slate-200 mb-8 gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Landing
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Choose Your CV Layout & Accent Color
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Select one of our 5 clean, recruiter-approved templates and choose
            your preferred accent color.
          </p>
        </div>

        {/* Accent Color Selection Bar */}
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-subtle shrink-0">
          <ColorPicker
            selectedColorId={selectedColorId}
            onSelectColor={onSelectColor}
          />
        </div>
      </div>

      {/* Grid of 5 Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((template) => {
          const isSelected = selectedTemplate === template.id;

          return (
            <div
              key={template.id}
              className={`bg-white rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-subtle ${
                isSelected
                  ? "border-brand-600 ring-2 ring-brand-600/20 shadow-card"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-card"
              }`}
            >
              {/* Template Miniature Layout Preview */}
              <div className="p-4 bg-slate-100/70 border-b border-slate-200 flex justify-center">
                <TemplateMiniaturePreview id={template.id} />
              </div>

              {/* Template Content details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {template.category}
                    </span>
                    {template.badge && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                        {template.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {template.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {template.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">
                      Best for:{" "}
                    </span>
                    {template.recommendedFor}
                  </div>
                </div>

                <div className="mt-5 pt-3">
                  <button
                    onClick={() => onSelectTemplate(template.id)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-brand-700 text-white shadow-sm hover:bg-brand-800"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        Selected — Use This Layout
                      </>
                    ) : (
                      <>
                        Select {template.name}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const TemplateMiniaturePreview: React.FC<{ id: TemplateId }> = ({
  id,
}) => {
  switch (id) {
    case "classic":
      return (
        <div className="w-full max-w-[180px] aspect-[1/1.3] bg-white rounded-md border border-slate-300 p-2.5 shadow-sm flex flex-col justify-between font-mono text-[6px]">
          {/* Classic Header */}
          <div className="text-center border-b border-slate-300 pb-1">
            <div className="h-2 w-28 bg-slate-900 mx-auto rounded-xs mb-0.5"></div>
            <div className="h-1 w-20 bg-brand-700 mx-auto rounded-xs mb-0.5"></div>
            <div className="h-0.5 w-32 bg-slate-400 mx-auto rounded-xs"></div>
          </div>
          {/* Summary */}
          <div className="space-y-0.5">
            <div className="h-1.5 w-16 bg-slate-900 rounded-xs mb-0.5"></div>
            <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
            <div className="h-0.5 w-11/12 bg-slate-200 rounded-xs"></div>
          </div>
          {/* Experience */}
          <div className="space-y-0.5">
            <div className="h-1.5 w-20 bg-slate-900 rounded-xs mb-0.5"></div>
            <div className="h-1 w-24 bg-slate-700 rounded-xs"></div>
            <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
            <div className="h-0.5 w-4/5 bg-slate-200 rounded-xs"></div>
          </div>
          {/* Projects */}
          <div className="space-y-0.5">
            <div className="h-1.5 w-14 bg-slate-900 rounded-xs mb-0.5"></div>
            <div className="h-1 w-20 bg-slate-700 rounded-xs"></div>
            <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
          </div>
          {/* Education */}
          <div className="space-y-0.5">
            <div className="h-1.5 w-16 bg-slate-900 rounded-xs mb-0.5"></div>
            <div className="h-1 w-28 bg-slate-700 rounded-xs"></div>
          </div>
          {/* Skills */}
          <div className="space-y-0.5">
            <div className="h-1.5 w-12 bg-slate-900 rounded-xs mb-0.5"></div>
            <div className="flex flex-wrap gap-0.5">
              <div className="h-1 w-8 bg-slate-200 rounded-xs"></div>
              <div className="h-1 w-10 bg-slate-200 rounded-xs"></div>
              <div className="h-1 w-6 bg-slate-200 rounded-xs"></div>
            </div>
          </div>
        </div>
      );

    case "modern":
      return (
        <div className="w-full max-w-[180px] aspect-[1/1.3] bg-white rounded-md border border-slate-300 p-2.5 shadow-sm flex flex-col justify-between font-mono text-[6px]">
          {/* Modern Header */}
          <div className="border-b-2 border-brand-700 pb-1">
            <div className="h-2.5 w-28 bg-slate-900 rounded-xs mb-0.5"></div>
            <div className="h-1 w-20 bg-brand-700 rounded-xs mb-0.5"></div>
            <div className="h-0.5 w-full bg-slate-400 rounded-xs"></div>
          </div>
          {/* Layout Body */}
          <div className="space-y-1.5 flex-1 flex flex-col justify-between pt-1">
            <div className="space-y-0.5">
              <div className="h-1.5 w-20 bg-brand-700 rounded-xs"></div>
              <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
              <div className="h-0.5 w-11/12 bg-slate-200 rounded-xs"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-24 bg-brand-700 rounded-xs"></div>
              <div className="h-1 w-28 bg-slate-800 rounded-xs"></div>
              <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-16 bg-brand-700 rounded-xs"></div>
              <div className="h-1 w-24 bg-slate-700 rounded-xs"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-14 bg-brand-700 rounded-xs"></div>
              <div className="flex flex-wrap gap-0.5">
                <div className="h-1 w-9 bg-brand-50 border border-brand-200 rounded-xs"></div>
                <div className="h-1 w-11 bg-brand-50 border border-brand-200 rounded-xs"></div>
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-18 bg-brand-700 rounded-xs"></div>
              <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
            </div>
          </div>
        </div>
      );

    case "professional":
      return (
        <div className="w-full max-w-[180px] aspect-[1/1.3] bg-white rounded-md border border-slate-300 p-2 shadow-sm flex flex-col justify-between font-mono text-[6px]">
          {/* Professional Header */}
          <div className="bg-brand-800 text-white p-1.5 rounded-xs">
            <div className="h-2.5 w-28 bg-white rounded-xs mb-0.5"></div>
            <div className="h-1 w-20 bg-brand-200 rounded-xs mb-0.5"></div>
            <div className="h-0.5 w-full bg-brand-300/40 rounded-xs"></div>
          </div>
          {/* Body */}
          <div className="space-y-1.5 flex-1 flex flex-col justify-between pt-1">
            <div className="space-y-0.5">
              <div className="h-1.5 w-24 bg-slate-900 rounded-xs"></div>
              <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
              <div className="h-0.5 w-5/6 bg-slate-200 rounded-xs"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-20 bg-slate-900 rounded-xs"></div>
              <div className="h-1 w-28 bg-slate-800 rounded-xs"></div>
              <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-16 bg-slate-900 rounded-xs"></div>
              <div className="h-1 w-24 bg-slate-700 rounded-xs"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-14 bg-slate-900 rounded-xs"></div>
              <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
            </div>
          </div>
        </div>
      );

    case "graduate":
      return (
        <div className="w-full max-w-[180px] aspect-[1/1.3] bg-white rounded-md border border-slate-300 p-2.5 shadow-sm flex flex-col justify-between font-mono text-[6px]">
          {/* Graduate Header */}
          <div className="border-l-4 border-brand-700 pl-2 py-0.5">
            <div className="h-2.5 w-28 bg-slate-900 rounded-xs"></div>
            <div className="h-1 w-20 bg-brand-700 rounded-xs mt-0.5"></div>
          </div>
          {/* Body */}
          <div className="space-y-1.5 flex-1 flex flex-col justify-between pt-1">
            <div className="space-y-0.5">
              <div className="h-1.5 w-20 bg-slate-900 rounded-xs"></div>
              <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
              <div className="h-0.5 w-4/5 bg-slate-200 rounded-xs"></div>
            </div>
            <div className="space-y-0.5 bg-slate-50 p-1 rounded border border-slate-200">
              <div className="h-1.5 w-24 bg-brand-800 rounded-xs"></div>
              <div className="h-0.5 w-full bg-slate-300 rounded-xs"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-16 bg-slate-900 rounded-xs"></div>
              <div className="h-1 w-28 bg-slate-800 rounded-xs"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-14 bg-slate-900 rounded-xs"></div>
              <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
            </div>
          </div>
        </div>
      );

    case "minimal":
    default:
      return (
        <div className="w-full max-w-[180px] aspect-[1/1.3] bg-white rounded-md border border-slate-300 p-2.5 shadow-sm flex flex-col justify-between font-mono text-[6px]">
          {/* Minimal Header */}
          <div>
            <div className="h-2.5 w-28 bg-slate-950 rounded-xs"></div>
            <div className="h-1 w-20 bg-slate-500 rounded-xs mt-1"></div>
          </div>
          <div className="h-px bg-slate-200 w-full my-0.5"></div>
          {/* Body */}
          <div className="space-y-1.5 flex-1 flex flex-col justify-between pt-1">
            <div className="space-y-0.5">
              <div className="h-1.5 w-16 bg-slate-900 rounded-xs"></div>
              <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
              <div className="h-0.5 w-5/6 bg-slate-200 rounded-xs"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-20 bg-slate-900 rounded-xs"></div>
              <div className="h-1 w-28 bg-slate-800 rounded-xs"></div>
              <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-14 bg-slate-900 rounded-xs"></div>
              <div className="h-0.5 w-3/4 bg-slate-300 rounded-xs"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-12 bg-slate-900 rounded-xs"></div>
              <div className="h-0.5 w-full bg-slate-200 rounded-xs"></div>
            </div>
          </div>
        </div>
      );
  }
};
