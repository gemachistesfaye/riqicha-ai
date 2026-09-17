import React from "react";
import { CVData } from "../../types/cv";
import { AccentColor } from "../../data/colors";
import {
  SectionId,
  DEFAULT_SECTION_ORDER,
  SPACING_OPTIONS,
} from "../../data/customization";
import { CVSummary } from "./sections/CVSummary";
import { CVExperience } from "./sections/CVExperience";
import { CVEducation } from "./sections/CVEducation";
import { CVSkills } from "./sections/CVSkills";
import { CVProjects } from "./sections/CVProjects";
import { CVCertifications } from "./sections/CVCertifications";
import { CVLanguages } from "./sections/CVLanguages";
import { CVAchievements } from "./sections/CVAchievements";

interface DynamicSectionListProps {
  data: CVData;
  variant: "classic" | "modern" | "professional" | "graduate" | "minimal";
  accentColor?: AccentColor;
  spacingId?: "compact" | "balanced" | "spacious";
  sectionOrder?: SectionId[];
  hiddenSections?: Record<string, boolean>;
  allowedSections?: SectionId[]; // Optional subset filter (e.g. for ModernTemplate sidebar vs main column)
}

export const DynamicSectionList: React.FC<DynamicSectionListProps> = ({
  data,
  variant,
  accentColor,
  spacingId = "balanced",
  sectionOrder = DEFAULT_SECTION_ORDER,
  hiddenSections = {},
  allowedSections,
}) => {
  const spacingConfig = SPACING_OPTIONS[spacingId] || SPACING_OPTIONS.balanced;

  return (
    <div className={spacingConfig.sectionGapClass}>
      {sectionOrder.map((secId) => {
        // Skip if explicitly hidden by user
        if (hiddenSections[secId]) return null;

        // Skip if allowedSections subset filter is provided and secId is not in allowedSections
        if (allowedSections && !allowedSections.includes(secId)) return null;

        switch (secId) {
          case "summary":
            return (
              <CVSummary
                key={secId}
                summary={data.summary}
                variant={variant}
                accentColor={accentColor}
              />
            );
          case "work":
            return (
              <CVExperience
                key={secId}
                experiences={data.workExperiences}
                variant={variant}
                accentColor={accentColor}
              />
            );
          case "education":
            return (
              <CVEducation
                key={secId}
                educations={data.educations}
                variant={variant}
                accentColor={accentColor}
              />
            );
          case "skills":
            return (
              <CVSkills
                key={secId}
                skills={data.skills}
                variant={variant}
                accentColor={accentColor}
              />
            );
          case "projects":
            return (
              <CVProjects
                key={secId}
                projects={data.projects}
                variant={variant}
                accentColor={accentColor}
              />
            );
          case "certifications":
            return (
              <CVCertifications
                key={secId}
                certifications={data.certifications}
                variant={variant}
                accentColor={accentColor}
              />
            );
          case "languages":
            return (
              <CVLanguages
                key={secId}
                languages={data.languages}
                variant={variant}
                accentColor={accentColor}
              />
            );
          case "achievements":
            return (
              <CVAchievements
                key={secId}
                achievements={data.achievements}
                variant={variant}
                accentColor={accentColor}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
