import React from "react";
import { AppStep } from "../../types/cv";
import {
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  FileText,
} from "lucide-react";

interface NavbarProps {
  activeStep: AppStep;
  setActiveStep: (step: AppStep) => void;
  onLoadSampleData?: () => void;
  onClearData?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeStep,
  setActiveStep,
  onLoadSampleData,
  onClearData,
}) => {
  const steps: { id: AppStep; label: string; number: number }[] = [
    { id: "templates", label: "Template", number: 1 },
    { id: "form", label: "Information", number: 2 },
    { id: "preview", label: "Preview", number: 3 },
  ];

  const showStepProgress = activeStep !== "landing";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-subtle print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => setActiveStep("landing")}
            className="flex items-center gap-2.5 group text-left focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1"
          >
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white shadow-sm group-hover:from-brand-700 group-hover:to-brand-900 transition-all">
              <FileText className="w-5 h-5 text-white" />
              <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-lg tracking-tight flex items-center gap-1.5">
                Riqicha{" "}
                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                  AI
                </span>
              </span>
              <p className="text-[11px] text-slate-500 hidden sm:block -mt-0.5">
                Professional CV Builder
              </p>
            </div>
          </button>

          {/* Progress Indicator (visible in flow) */}
          {showStepProgress && (
            <nav
              aria-label="Progress"
              className="hidden md:flex items-center gap-2"
            >
              {steps.map((step, idx) => {
                const isCurrent = activeStep === step.id;
                const isCompleted =
                  (step.id === "templates" &&
                    (activeStep === "form" || activeStep === "preview")) ||
                  (step.id === "form" && activeStep === "preview");

                return (
                  <React.Fragment key={step.id}>
                    <button
                      onClick={() => setActiveStep(step.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        isCurrent
                          ? "bg-brand-50 text-brand-700 border border-brand-200 font-semibold"
                          : isCompleted
                            ? "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                            : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                          isCurrent
                            ? "bg-brand-700 text-white"
                            : isCompleted
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          step.number
                        )}
                      </span>
                      <span>{step.label}</span>
                    </button>
                    {idx < steps.length - 1 && (
                      <span className="text-slate-300 text-xs">/</span>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {activeStep === "form" && (
              <>
                {onLoadSampleData && (
                  <button
                    onClick={onLoadSampleData}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 text-[11px] sm:text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-200 transition-colors shadow-xs whitespace-nowrap"
                    title="Pre-fill with sample professional CV data"
                  >
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-600" />
                    <span className="hidden sm:inline">Fill Sample Data</span>
                    <span className="sm:hidden">Sample</span>
                  </button>
                )}
                {onClearData && (
                  <button
                    onClick={onClearData}
                    className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-md transition-colors"
                    title="Clear current form draft"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                )}
              </>
            )}

            {activeStep === "landing" ? (
              <button
                onClick={() => setActiveStep("templates")}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-white bg-brand-700 hover:bg-brand-800 rounded-md shadow-sm transition-colors whitespace-nowrap"
              >
                <span>Create My CV</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() =>
                  setActiveStep(
                    activeStep === "templates"
                      ? "form"
                      : activeStep === "form"
                        ? "preview"
                        : "form",
                  )
                }
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-700 hover:bg-brand-800 rounded-md shadow-sm transition-colors whitespace-nowrap"
              >
                {activeStep === "templates" && "Continue to Form"}
                {activeStep === "form" && "Preview CV"}
                {activeStep === "preview" && "Edit Information"}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Step Indicator Bar */}
        {showStepProgress && (
          <div className="md:hidden py-2 border-t border-slate-100 flex items-center justify-around bg-slate-50/50 text-xs">
            {steps.map((step) => {
              const isCurrent = activeStep === step.id;
              const handleClick = () => {
                setActiveStep(step.id);
              };
              return (
                <button
                  key={step.id}
                  onClick={handleClick}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded ${
                    isCurrent
                      ? "font-bold text-brand-700 bg-brand-50"
                      : "text-slate-500"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
                      isCurrent
                        ? "bg-brand-700 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
