import React, { useState } from "react";
import { CVData, TemplateId } from "../../types/cv";
import { TEMPLATES } from "../../data/templates";
import { AccentColor } from "../../data/colors";
import {
  FontOption,
  FontSizeOption,
  SectionId,
} from "../../data/customization";
import { CVRenderer } from "../cv/CVRenderer";
import { CustomizationToolbar } from "../common/CustomizationToolbar";
import { PersonalSection } from "./sections/PersonalSection";
import { SummarySection } from "./sections/SummarySection";
import { WorkSection } from "./sections/WorkSection";
import { EducationSection } from "./sections/EducationSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { AchievementsSection } from "./sections/AchievementsSection";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderKanban,
  Award,
  Languages as LangIcon,
  Trophy,
  ArrowLeft,
  ArrowRight,
  Eye,
  CheckCircle,
  LayoutTemplate,
  Columns,
} from "lucide-react";

interface CVFormProps {
  cvData: CVData;
  updatePersonalInfo: (
    field: keyof CVData["personalInfo"],
    value: string,
  ) => void;
  updateSummary: (summary: string) => void;
  updateCVData: <K extends keyof CVData>(key: K, value: CVData[K]) => void;
  selectedTemplate: TemplateId;
  onChangeTemplateClick: () => void;
  accentColorId: string;
  onSelectColor: (colorId: string) => void;
  accentColor?: AccentColor;
  fontId: string;
  onSelectFont: (fontId: string) => void;
  activeFont?: FontOption;
  fontSizeId: "small" | "standard" | "large";
  onSelectFontSize: (sizeId: "small" | "standard" | "large") => void;
  activeFontSize?: FontSizeOption;
  spacingId: "compact" | "balanced" | "spacious";
  onSelectSpacing: (spacingId: "compact" | "balanced" | "spacious") => void;
  sectionOrder: SectionId[];
  onMoveSection: (index: number, direction: "up" | "down") => void;
  onResetOrder: () => void;
  hiddenSections: Record<string, boolean>;
  onToggleSection: (secId: SectionId) => void;
  onPreviewClick: () => void;
  onBackClick: () => void;
  isSaved?: boolean;
}

export const CVForm: React.FC<CVFormProps> = ({
  cvData,
  updatePersonalInfo,
  updateSummary,
  updateCVData,
  selectedTemplate,
  onChangeTemplateClick,
  accentColorId,
  onSelectColor,
  accentColor,
  fontId,
  onSelectFont,
  activeFont,
  fontSizeId,
  onSelectFontSize,
  activeFontSize,
  spacingId,
  onSelectSpacing,
  sectionOrder,
  onMoveSection,
  onResetOrder,
  hiddenSections,
  onToggleSection,
  onPreviewClick,
  onBackClick,
  isSaved = true,
}) => {
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [showLiveSplit, setShowLiveSplit] = useState<boolean>(true);

  const currentTemplateObj =
    TEMPLATES.find((t) => t.id === selectedTemplate) || TEMPLATES[0];

  const sections = [
    {
      id: "personal",
      label: "Personal Info",
      icon: User,
      count: cvData.personalInfo.fullName ? 1 : 0,
    },
    {
      id: "summary",
      label: "Summary",
      icon: FileText,
      count: cvData.summary ? 1 : 0,
    },
    {
      id: "work",
      label: "Experience",
      icon: Briefcase,
      count: cvData.workExperiences.length,
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      count: cvData.educations.length,
    },
    {
      id: "skills",
      label: "Skills",
      icon: Wrench,
      count: cvData.skills.length,
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban,
      count: cvData.projects.length,
    },
    {
      id: "certifications",
      label: "Certifications",
      icon: Award,
      count: cvData.certifications.length,
    },
    {
      id: "languages",
      label: "Languages",
      icon: LangIcon,
      count: cvData.languages.length,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Trophy,
      count: cvData.achievements.length,
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-brand-50 border border-brand-200 text-brand-700">
            <LayoutTemplate className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">
                Selected Template:
              </span>
              <span className="text-xs font-bold text-slate-900 px-2 py-0.5 bg-slate-100 rounded border border-slate-200">
                {currentTemplateObj.name}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">
              {currentTemplateObj.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={() => setShowLiveSplit(!showLiveSplit)}
            className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              showLiveSplit
                ? "bg-brand-50 text-brand-700 border-brand-200"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            {showLiveSplit ? "Hide Side Preview" : "Show Side Preview"}
          </button>

          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{isSaved ? "Draft saved locally" : "Saving draft..."}</span>
          </div>

          <button
            onClick={onChangeTemplateClick}
            className="text-xs font-medium text-brand-700 hover:text-brand-800 hover:underline"
          >
            Change Template
          </button>
        </div>
      </div>

      {/* Customization Toolbar */}
      <CustomizationToolbar
        fontId={fontId}
        onSelectFont={onSelectFont}
        fontSizeId={fontSizeId}
        onSelectFontSize={onSelectFontSize}
        spacingId={spacingId}
        onSelectSpacing={onSelectSpacing}
        accentColorId={accentColorId}
        onSelectColor={onSelectColor}
        sectionOrder={sectionOrder}
        onMoveSection={onMoveSection}
        onResetOrder={onResetOrder}
        hiddenSections={hiddenSections}
        onToggleSection={onToggleSection}
      />

      {/* Main Layout Grid */}
      <div
        className={`grid grid-cols-1 gap-6 items-start ${showLiveSplit ? "xl:grid-cols-12" : "lg:grid-cols-12"}`}
      >
        {/* Navigation Sidebar */}
        <div
          className={`${showLiveSplit ? "xl:col-span-2 lg:col-span-3" : "lg:col-span-3"} bg-white rounded-xl border border-slate-200 p-3 shadow-subtle lg:sticky lg:top-24`}
        >
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 hidden lg:block">
            Form Sections
          </div>

          <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap lg:whitespace-normal ${
                    isActive
                      ? "bg-brand-700 text-white shadow-xs font-semibold"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`}
                    />
                    <span>{sec.label}</span>
                  </div>
                  {sec.count > 0 && (
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-brand-800 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {sec.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Active Form Section */}
        <div
          className={`${showLiveSplit ? "xl:col-span-5 lg:col-span-9" : "lg:col-span-9"} space-y-6`}
        >
          {activeTab === "personal" && (
            <PersonalSection
              data={cvData.personalInfo}
              onChange={updatePersonalInfo}
            />
          )}

          {activeTab === "summary" && (
            <SummarySection summary={cvData.summary} onChange={updateSummary} />
          )}

          {activeTab === "work" && (
            <WorkSection
              workExperiences={cvData.workExperiences}
              onChange={(list) => updateCVData("workExperiences", list)}
            />
          )}

          {activeTab === "education" && (
            <EducationSection
              educations={cvData.educations}
              onChange={(list) => updateCVData("educations", list)}
            />
          )}

          {activeTab === "skills" && (
            <SkillsSection
              skills={cvData.skills}
              onChange={(list) => updateCVData("skills", list)}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsSection
              projects={cvData.projects}
              onChange={(list) => updateCVData("projects", list)}
            />
          )}

          {activeTab === "certifications" && (
            <CertificationsSection
              certifications={cvData.certifications}
              onChange={(list) => updateCVData("certifications", list)}
            />
          )}

          {activeTab === "languages" && (
            <LanguagesSection
              languages={cvData.languages}
              onChange={(list) => updateCVData("languages", list)}
            />
          )}

          {activeTab === "achievements" && (
            <AchievementsSection
              achievements={cvData.achievements}
              onChange={(list) => updateCVData("achievements", list)}
            />
          )}

          {/* Form Action Controls Navigation Footer */}
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-subtle grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-between sm:gap-4">
            <button
              onClick={onBackClick}
              className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors shadow-xs w-full sm:w-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>Back</span>
            </button>

            {activeTab !== "achievements" ? (
              <button
                onClick={() => {
                  const currentIndex = sections.findIndex(
                    (s) => s.id === activeTab,
                  );
                  if (currentIndex < sections.length - 1) {
                    setActiveTab(sections[currentIndex + 1].id);
                  }
                }}
                className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 rounded-lg border border-slate-300 transition-colors shadow-xs whitespace-nowrap w-full sm:w-auto"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={onPreviewClick}
              className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-2 text-xs font-semibold text-white bg-brand-700 hover:bg-brand-800 rounded-lg shadow-xs transition-colors whitespace-nowrap w-full sm:w-auto"
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xs:inline sm:inline">Full Preview</span>
              <span className="xs:hidden sm:hidden">Preview</span>
            </button>
          </div>
        </div>

        {/* Instant Live Side Preview */}
        {showLiveSplit && (
          <div className="hidden xl:block xl:col-span-5 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
            <div className="bg-slate-200/60 p-4 rounded-xl border border-slate-300/80 shadow-card">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-300/80">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-brand-700" />
                  Live Updating Preview
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Updates in real-time
                </span>
              </div>
              <div className="transform scale-[0.88] origin-top">
                <CVRenderer
                  data={cvData}
                  templateId={selectedTemplate}
                  accentColor={accentColor}
                  font={activeFont}
                  fontSize={activeFontSize}
                  spacingId={spacingId}
                  sectionOrder={sectionOrder}
                  hiddenSections={hiddenSections}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
