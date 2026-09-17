import { TemplateId } from "../../types/cv";
import { TEMPLATES } from "../../data/templates";
import { TemplateMiniaturePreview } from "../templates/TemplateSelection";
import {
  ArrowRight,
  LayoutTemplate,
  ShieldCheck,
  Zap,
  FileText,
  UserCheck,
} from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
  onViewTemplates: () => void;
  onSelectTemplate: (templateId: TemplateId) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onViewTemplates,
  onSelectTemplate,
}) => {
  return (
    <div className="flex-1 bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 mb-6">
          <UserCheck className="w-3.5 h-3.5 text-brand-600" />
          <span>No sign-up or registration required</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight max-w-3xl mx-auto">
          Create a CV that represents you professionally.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Riqicha AI helps you craft clear, structured, and recruiter-ready CVs
          in minutes. Choose a professional layout, enter your information, and
          preview your document instantly.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-brand-700 hover:bg-brand-800 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-brand-700"
          >
            Create My CV
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewTemplates}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 shadow-subtle transition-colors"
          >
            <LayoutTemplate className="w-4 h-4 text-slate-500" />
            View Templates
          </button>
        </div>

        {/* Key Highlights Banner */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-white border border-slate-200 text-brand-700 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Instant Access
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Start filling your CV right away without creating an account or
                logging in.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-white border border-slate-200 text-brand-700 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Private & Local
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Your data stays saved in your browser storage. Refresh anytime
                without losing progress.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-white border border-slate-200 text-brand-700 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Structured Form
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Clear input fields for personal details, work history,
                education, skills, and accomplishments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview Overview Section */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              5 Professional Layouts Built for Impact
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Designed with clean spacing, human readable fonts, and
              recruiter-focused visual hierarchy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => onSelectTemplate(tmpl.id)}
                className="group cursor-pointer p-4 bg-slate-50 hover:bg-white rounded-lg border border-slate-200 hover:border-brand-500 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3 rounded overflow-hidden shadow-xs border border-slate-200 group-hover:border-brand-300 transition-colors">
                    <TemplateMiniaturePreview id={tmpl.id} />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-700 transition-colors">
                      {tmpl.name}
                    </h3>
                    {tmpl.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-brand-50 text-brand-700 rounded border border-brand-200">
                        {tmpl.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {tmpl.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-brand-700 group-hover:text-brand-800">
                  <span>Select layout</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center sm:flex sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Riqicha AI. Fast, clean CV creation.
          </p>
          <div className="mt-3 sm:mt-0 flex items-center justify-center gap-4 text-slate-400">
            <span>No account required</span>
            <span>•</span>
            <span>Local Storage Save</span>
            <span>•</span>
            <span>Phase 1 MVP</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
