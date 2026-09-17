import React, { useEffect, useRef, useState } from "react";
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
import { ArrowLeft, Printer, LayoutTemplate, Check } from "lucide-react";

interface PreviewProps {
  cvData: CVData;
  selectedTemplate: TemplateId;
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
  onEditClick: () => void;
  onChangeTemplateClick: () => void;
  onSelectTemplate?: (templateId: TemplateId) => void;
}

// A4 at 96 dpi = 794px wide, 1123px tall
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export const PreviewPlaceholder: React.FC<PreviewProps> = ({
  cvData,
  selectedTemplate,
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
  onEditClick,
  onChangeTemplateClick,
  onSelectTemplate,
}) => {
  const currentTemplate =
    TEMPLATES.find((t) => t.id === selectedTemplate) || TEMPLATES[0];

  const handlePrint = () => {
    window.print();
  };

  // Mobile scale: shrink A4 doc to fit the viewport width on small screens
  const cvWrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 640 && cvWrapperRef.current) {
        const availableWidth = cvWrapperRef.current.offsetWidth;
        const newScale = availableWidth / A4_WIDTH_PX;
        setScale(Math.min(1, newScale));
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const isMobileScaled = scale < 1;

  return (
    <div className="flex-1 bg-slate-200/70 py-6 sm:py-8 px-0 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full print:bg-white print:p-0 print:m-0 print:max-w-none">
      {/* Control Toolbar (Hidden during print) */}
      <div className="mx-4 sm:mx-0 bg-white rounded-xl border border-slate-200 p-4 mb-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onEditClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Form
          </button>

          <span className="text-slate-300">|</span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Template:
            </span>
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              {currentTemplate.name}
            </span>
          </div>
        </div>

        {/* Quick Template Switcher Selector Pill */}
        {onSelectTemplate && (
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {TEMPLATES.map((tmpl) => {
              const isActive = tmpl.id === selectedTemplate;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => onSelectTemplate(tmpl.id)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                    isActive
                      ? "bg-white text-brand-700 shadow-xs border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive && <Check className="w-3 h-3 text-brand-600" />}
                  {tmpl.name}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={onChangeTemplateClick}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-brand-700 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-colors"
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            All Templates
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-brand-700 hover:bg-brand-800 rounded-lg shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            Download PDF / Print
          </button>
        </div>
      </div>

      {/* Customization Options Bar */}
      <div className="mx-4 sm:mx-0 mb-4 print:hidden">
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
      </div>

      {/* Rendered A4 Document Canvas Sheet */}
      {/* On mobile: scale the A4 doc to fit viewport width edge-to-edge */}
      <div
        ref={cvWrapperRef}
        className="w-full print:block print:w-full"
        style={
          isMobileScaled
            ? {
                height: `${A4_HEIGHT_PX * scale}px`,
                overflow: "hidden",
              }
            : { display: "flex", justifyContent: "center" }
        }
      >
        <div
          style={
            isMobileScaled
              ? {
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  width: `${A4_WIDTH_PX}px`,
                }
              : {}
          }
        >
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
  );
};
