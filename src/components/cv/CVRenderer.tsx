import React from "react";
import { CVData, TemplateId } from "../../types/cv";
import { AccentColor } from "../../data/colors";
import {
  FontOption,
  FontSizeOption,
  SectionId,
} from "../../data/customization";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { GraduateTemplate } from "./templates/GraduateTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";

interface CVRendererProps {
  data: CVData;
  templateId: TemplateId;
  accentColor?: AccentColor;
  font?: FontOption;
  fontSize?: FontSizeOption;
  spacingId?: "compact" | "balanced" | "spacious";
  sectionOrder?: SectionId[];
  hiddenSections?: Record<string, boolean>;
  isPrintMode?: boolean;
}

export const CVRenderer: React.FC<CVRendererProps> = ({
  data,
  templateId,
  accentColor,
  font,
  fontSize,
  spacingId = "balanced",
  sectionOrder,
  hiddenSections,
  isPrintMode = false,
}) => {
  const renderTemplate = () => {
    const props = {
      data,
      accentColor,
      spacingId,
      sectionOrder,
      hiddenSections,
    };

    switch (templateId) {
      case "modern":
        return <ModernTemplate {...props} />;
      case "professional":
        return <ProfessionalTemplate {...props} />;
      case "graduate":
        return <GraduateTemplate {...props} />;
      case "minimal":
        return <MinimalTemplate {...props} />;
      case "classic":
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  const fontFamilyStyle = font ? font.fontFamily : "'Inter', sans-serif";
  const fontSizeStyle = fontSize ? `${fontSize.scale * 100}%` : "100%";

  return (
    <div
      style={{ fontFamily: fontFamilyStyle, fontSize: fontSizeStyle }}
      className={`cv-document bg-white text-slate-900 mx-auto transition-all ${
        isPrintMode
          ? "w-full p-0 shadow-none border-none"
          : "w-full max-w-[210mm] min-h-[297mm] p-5 sm:p-8 border-0 sm:border sm:border-slate-200/80 shadow-none sm:shadow-card rounded-none sm:rounded-xl print:shadow-none print:border-none print:m-0"
      }`}
    >
      {renderTemplate()}
    </div>
  );
};
