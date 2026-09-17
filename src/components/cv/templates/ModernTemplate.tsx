import React from "react";
import { CVData } from "../../../types/cv";
import { AccentColor } from "../../../data/colors";
import { SectionId } from "../../../data/customization";
import { CVHeader } from "../sections/CVHeader";
import { DynamicSectionList } from "../DynamicSectionList";

interface TemplateProps {
  data: CVData;
  accentColor?: AccentColor;
  spacingId?: "compact" | "balanced" | "spacious";
  sectionOrder?: SectionId[];
  hiddenSections?: Record<string, boolean>;
}

export const ModernTemplate: React.FC<TemplateProps> = ({
  data,
  accentColor,
  spacingId,
  sectionOrder,
  hiddenSections,
}) => {
  const { personalInfo } = data;

  return (
    <div className="w-full text-slate-900">
      <CVHeader
        info={personalInfo}
        variant="modern"
        accentColor={accentColor}
      />
      <DynamicSectionList
        data={data}
        variant="modern"
        accentColor={accentColor}
        spacingId={spacingId}
        sectionOrder={sectionOrder}
        hiddenSections={hiddenSections}
      />
    </div>
  );
};
